import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from '@/app/(auth)/actions'

export const metadata = {
  title: 'Log in - RecallGuard Canada',
}

export default async function LoginPage(props: { searchParams: Promise<{ error?: string, message?: string, next?: string }> }) {
  const searchParams = await props.searchParams;
  const error = searchParams.error
  const message = searchParams.message
  const next = searchParams.next
  const signupHref = '/signup'

  return (
    <div className="flex min-h-screen items-center justify-center bg-white relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Premium ambient UI gradient centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-[90vw] h-[600px] rounded-[100%] bg-gradient-to-r from-[#c6f6d5]/40 via-[#e2f8dc]/50 to-[#fde0b5]/40 blur-[100px] pointer-events-none z-0"></div>

      <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 relative z-10">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900">
            Log in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Or{' '}
            <Link href={signupHref} className="font-medium text-slate-900 hover:text-slate-700 underline underline-offset-4">
              start your free trial
            </Link>
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm font-medium text-center">
            {message}
          </div>
        )}

        <form className="mt-8 space-y-6" action={login}>
          <input type="hidden" name="next" value={next || ''} />
          <div className="space-y-5 rounded-md">
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
                autoComplete="current-password"
                required
                minLength={6}
                className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-slate-600 hover:text-slate-900 hover:underline underline-offset-4">
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full rounded-xl bg-[#61c554] hover:bg-[#4ea843] text-white font-medium h-12 text-base border-0">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}
