import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShieldCheck, Activity, Bell } from 'lucide-react'
import { signup } from '@/app/(auth)/actions'

export const metadata = {
  title: 'Sign Up - RecallGuard Canada',
}

export default async function SignupPage(props: { searchParams: Promise<{ plan?: string, error?: string, message?: string, audience?: string }> }) {
  const searchParams = await props.searchParams;
  const plan = searchParams.plan || 'free'
  const error = searchParams.error
  const message = searchParams.message
  const audience = searchParams.audience === 'individual' ? 'individual' : 'business'
  const isIndividual = audience === 'individual'
  
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24 relative overflow-hidden">
        {/* Subtle background gradient for left side */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-[100%] bg-gradient-to-br from-[#c6f6d5]/40 to-transparent blur-[80px] pointer-events-none z-0"></div>

        <div className="mx-auto w-full max-w-sm lg:w-96 relative z-10">
          <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
            <Link
              href={`/signup?audience=business&plan=${plan}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${!isIndividual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Business
            </Link>
            <Link
              href={`/signup?audience=individual&plan=${plan}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isIndividual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Individual
            </Link>
          </div>
          
          <h2 className="mt-8 text-3xl font-semibold tracking-tight text-slate-900">
            {isIndividual ? 'Create your personal account' : 'Start your free trial'}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {isIndividual ? 'Track recalls for the products and brands you care about.' : 'Set up business monitoring for your inventory and team.'}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login?next=/dashboard" className="font-medium text-slate-900 hover:text-slate-700 underline underline-offset-4">
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
              <input type="hidden" name="audience" value={audience} />
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700 font-medium">{isIndividual ? 'Full Name' : 'Company Name'}</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={isIndividual ? 'Jane Doe' : 'Acme Inc.'}
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
                  placeholder={isIndividual ? 'name@example.com' : 'name@company.com'}
                  className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
                />
                {!isIndividual && (
                  <p className="text-xs text-slate-400">
                    Use your company email. Personal inboxes like Gmail, Outlook, or Yahoo are not accepted for business accounts.
                  </p>
                )}
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
                {isIndividual ? 'Create individual account' : 'Create business account'}
              </Button>
            </form>
            
            <p className="mt-6 text-xs text-center text-slate-400">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Testimonial/Benefits */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#f7fdf4] via-white to-[#fff8ee]">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.05]">
          <Activity className="absolute top-[18%] left-[18%] h-16 w-16 -rotate-12 text-slate-900" strokeWidth={1.25} />
          <Bell className="absolute top-[28%] right-[20%] h-20 w-20 rotate-6 text-slate-900" strokeWidth={1.25} />
          <ShieldCheck className="absolute bottom-[20%] left-[22%] h-20 w-20 rotate-12 text-slate-900" strokeWidth={1.25} />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[950px] h-[650px] rounded-[100%] bg-gradient-to-br from-[#c6f6d5]/40 via-[#e2f8dc]/45 to-[#fde0b5]/35 blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute top-24 right-[-80px] w-[420px] h-[420px] rounded-full bg-gradient-to-bl from-[#61c554]/10 to-transparent blur-[100px] pointer-events-none z-0"></div>

        <div className="flex h-full flex-col justify-center px-20 xl:px-24 relative z-10">
          <div className="max-w-md">
            <h3 className="text-3xl font-semibold text-slate-900 mb-10 leading-tight">
              {isIndividual ? 'Protect your family with faster recall alerts' : 'Protect your business and your customers'}
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
                  <h4 className="text-lg font-semibold text-slate-900">{isIndividual ? 'Watch the products you care about' : 'Automated Daily Matching'}</h4>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">{isIndividual ? 'Track recalls across brands, categories, and household essentials without checking manually.' : 'We continuously scan government feeds against your uploaded product list.'}</p>
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
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">{isIndividual ? 'Get notified as soon as a relevant recall is published so you can act quickly at home.' : 'Get notified immediately the second a potential match is found by the system.'}</p>
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
                  <h4 className="text-lg font-semibold text-slate-900">{isIndividual ? 'One place for your safety checks' : 'Compliance Made Easy'}</h4>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">{isIndividual ? 'Use your personal dashboard to keep up with recalls, alerts, and the products you are monitoring.' : 'Keep a record of your actions and maintain a clear audit trail for regulators.'}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
