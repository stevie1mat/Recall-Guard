import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShieldAlert, Check } from 'lucide-react'
import { signup } from '@/app/(auth)/actions'

export const metadata = {
  title: 'Sign Up - RecallGuard Canada',
}

export default async function SignupPage(props: { searchParams: Promise<{ plan?: string }> }) {
  const searchParams = await props.searchParams;
  const plan = searchParams.plan || 'free'
  
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-slate-900 mb-8">
            <ShieldAlert className="h-8 w-8 text-blue-600" />
            <span>RecallGuard</span>
          </Link>
          
          <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
            Start your free trial
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Log in instead
            </Link>
          </p>

          <div className="mt-8">
            <form action={signup} className="space-y-6">
              <input type="hidden" name="plan" value={plan} />
              
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  name="company_name"
                  type="text"
                  required
                  placeholder="Acme Inc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@company.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Create account
              </Button>
            </form>
            
            <p className="mt-6 text-xs text-center text-slate-500">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Image/Testimonial */}
      <div className="hidden lg:block lg:w-1/2 bg-slate-50 border-l border-slate-200">
        <div className="flex h-full flex-col justify-center px-20 xl:px-24">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Protect your business and your customers
            </h3>
            
            <ul className="space-y-6">
              <li className="flex">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Check className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-slate-900">Automated Daily Matching</h4>
                  <p className="mt-1 text-sm text-slate-600">We scan the Government of Canada feed every day against your product list.</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Check className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-slate-900">Instant Email Alerts</h4>
                  <p className="mt-1 text-sm text-slate-600">Get notified immediately when a potential match is found.</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Check className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-slate-900">Compliance Made Easy</h4>
                  <p className="mt-1 text-sm text-slate-600">Keep a record of your actions and maintain a clear audit trail.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
