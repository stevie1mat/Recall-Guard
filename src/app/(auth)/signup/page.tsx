import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, ShieldCheck, Activity, Bell } from 'lucide-react'
import { signup } from '@/app/(auth)/actions'

export const metadata = {
  title: 'Sign Up - RecallGuard Canada',
}

export default async function SignupPage(props: { searchParams: Promise<{ plan?: string, error?: string, message?: string }> }) {
  const searchParams = await props.searchParams;
  const plan = searchParams.plan || 'free'
  const error = searchParams.error
  const message = searchParams.message
  
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24 relative overflow-hidden">
        {/* Subtle background gradient for left side */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-[100%] bg-gradient-to-br from-[#c6f6d5]/40 to-transparent blur-[80px] pointer-events-none z-0"></div>

        <div className="mx-auto w-full max-w-sm lg:w-96 relative z-10">
          <Link href="/" className="font-bold text-3xl tracking-tight text-slate-900 mb-8 block">
            RecallGuard
          </Link>
          
          <h2 className="mt-8 text-3xl font-semibold tracking-tight text-slate-900">
            Start your free trial
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-slate-900 hover:text-slate-700 underline underline-offset-4">
              Log in instead
            </Link>
          </p>

          <div className="mt-10">
            {error && (
              <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center">
                {error}
              </div>
            )}

            {message && (
              <div className="p-4 mb-6 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm font-medium text-center">
                {message}
              </div>
            )}

            <form action={signup} className="space-y-5">
              <input type="hidden" name="plan" value={plan} />
              
              <div className="space-y-2">
                <Label htmlFor="company_name" className="text-slate-700 font-medium">Company Name</Label>
                <Input
                  id="company_name"
                  name="company_name"
                  type="text"
                  required
                  placeholder="Acme Inc."
                  className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@company.com"
                  className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
                />
              </div>

              <Button type="submit" className="w-full rounded-xl bg-[#61c554] hover:bg-[#4ea843] text-white font-medium h-12 text-base border-0 mt-4">
                Create account
              </Button>
            </form>
            
            <p className="mt-6 text-xs text-center text-slate-400">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Testimonial/Benefits */}
      <div className="hidden lg:block lg:w-1/2 bg-slate-50 relative overflow-hidden">
        {/* Ambient gradient */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] rounded-[100%] bg-gradient-to-l from-[#fde0b5]/30 to-transparent blur-[80px] pointer-events-none z-0"></div>

        <div className="flex h-full flex-col justify-center px-20 xl:px-24 relative z-10">
          <div className="max-w-md">
            <h3 className="text-3xl font-semibold text-slate-900 mb-10 leading-tight">
              Protect your business and your customers
            </h3>
            
            <ul className="space-y-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm relative">
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#61c554] rounded-full border-2 border-white"></div>
                    <Activity className="h-5 w-5 text-slate-700" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="ml-5">
                  <h4 className="text-lg font-semibold text-slate-900">Automated Daily Matching</h4>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">We continuously scan government feeds against your uploaded product list.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm relative">
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#61c554] rounded-full border-2 border-white"></div>
                    <Bell className="h-5 w-5 text-slate-700" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="ml-5">
                  <h4 className="text-lg font-semibold text-slate-900">Instant Email Alerts</h4>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">Get notified immediately the second a potential match is found by the system.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm relative">
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#61c554] rounded-full border-2 border-white"></div>
                    <ShieldCheck className="h-5 w-5 text-slate-700" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="ml-5">
                  <h4 className="text-lg font-semibold text-slate-900">Compliance Made Easy</h4>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">Keep a record of your actions and maintain a clear audit trail for regulators.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
