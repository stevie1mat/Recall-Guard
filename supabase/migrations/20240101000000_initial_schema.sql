-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Businesses Table
CREATE TABLE public.businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    name TEXT NOT NULL,
    website TEXT,
    industry TEXT,
    country TEXT,
    notification_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Subscriptions Table
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE UNIQUE,
    stripe_customer_id TEXT UNIQUE,
    stripe_subscription_id TEXT UNIQUE,
    plan TEXT DEFAULT 'free' NOT NULL,
    status TEXT DEFAULT 'inactive' NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Products Table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    brand TEXT,
    vendor TEXT,
    sku TEXT,
    barcode TEXT,
    category TEXT,
    tags TEXT,
    notes TEXT,
    status TEXT DEFAULT 'active' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Recalls Table
CREATE TABLE public.recalls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    category TEXT,
    source TEXT,
    date_published TIMESTAMP WITH TIME ZONE,
    official_url TEXT,
    raw_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Recall Matches Table
CREATE TABLE public.recall_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    recall_id UUID NOT NULL REFERENCES public.recalls(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    reason TEXT,
    status TEXT DEFAULT 'new' NOT NULL,
    email_sent BOOLEAN DEFAULT FALSE NOT NULL,
    date_found TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(product_id, recall_id)
);

-- Email Logs Table
CREATE TABLE public.email_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    recall_match_id UUID REFERENCES public.recall_matches(id) ON DELETE CASCADE,
    "to" TEXT NOT NULL,
    subject TEXT NOT NULL,
    status TEXT DEFAULT 'sent' NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Import Logs Table
CREATE TABLE public.import_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source TEXT DEFAULT 'canada_recalls' NOT NULL,
    status TEXT NOT NULL,
    records_imported INTEGER DEFAULT 0 NOT NULL,
    message TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    finished_at TIMESTAMP WITH TIME ZONE
);

-- Setup Row Level Security (RLS)

ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recalls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recall_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
-- import_logs is typically server-only, but let's enable RLS for safety
ALTER TABLE public.import_logs ENABLE ROW LEVEL SECURITY;

-- Policies

-- Businesses
CREATE POLICY "Users can view their own business." ON public.businesses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own business." ON public.businesses FOR UPDATE USING (auth.uid() = user_id);

-- Subscriptions
CREATE POLICY "Users can view their own subscription." ON public.subscriptions FOR SELECT USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);

-- Products
CREATE POLICY "Users can view their own products." ON public.products FOR SELECT USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);
CREATE POLICY "Users can insert their own products." ON public.products FOR INSERT WITH CHECK (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update their own products." ON public.products FOR UPDATE USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);
CREATE POLICY "Users can delete their own products." ON public.products FOR DELETE USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);

-- Recalls (Public Read)
CREATE POLICY "Anyone can view recalls." ON public.recalls FOR SELECT USING (true);
-- Server role handles inserts/updates via Service Role Key

-- Recall Matches
CREATE POLICY "Users can view their own matches." ON public.recall_matches FOR SELECT USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update their own matches." ON public.recall_matches FOR UPDATE USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);

-- Set up function and trigger to handle automatic Business creation on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
    new_business_id UUID;
BEGIN
    -- Create Business
    INSERT INTO public.businesses (user_id, name)
    VALUES (new.id, COALESCE(new.raw_user_meta_data->>'company_name', 'My Business'))
    RETURNING id INTO new_business_id;

    -- Create Subscription
    INSERT INTO public.subscriptions (business_id, plan, status)
    VALUES (new_business_id, COALESCE(new.raw_user_meta_data->>'plan', 'free'), 'active');

    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create a helper function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER handle_updated_at_businesses BEFORE UPDATE ON public.businesses FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at_subscriptions BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at_products BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at_recalls BEFORE UPDATE ON public.recalls FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at_recall_matches BEFORE UPDATE ON public.recall_matches FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
