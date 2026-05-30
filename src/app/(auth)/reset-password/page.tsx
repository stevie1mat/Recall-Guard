import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resetPassword } from '@/app/(auth)/actions'

export const metadata = {
  title: 'Reset Password - RecallGuard Canada',
}

export default async function ResetPasswordPage(props: { searchParams: Promise<{ error?: string, message?: string }> }) {
  const searchParams = await props.searchParams;
  const error = searchParams.error
  const message = searchParams.message

  return (
    <div className="flex min-h-screen items-center justify-center bg-white relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Premium ambient UI gradient centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-[90vw] h-[600px] rounded-[100%] bg-gradient-to-r from-[#c6f6d5]/40 via-[#e2f8dc]/50 to-[#fde0b5]/40 blur-[100px] pointer-events-none z-0"></div>

      <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 relative z-10">
        <div className="flex flex-col items-center">
          <Link href="/" className="font-bold text-3xl tracking-tight text-slate-900 mb-2">
            RecallGuard
          </Link>
          <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900">
            Create new password
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Please enter your new password below.
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

        <form className="mt-8 space-y-6" action={resetPassword}>
          <div className="space-y-5 rounded-md">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
              />
            </div>
          </div>

          <Button type="submit" className="w-full rounded-xl bg-[#61c554] hover:bg-[#4ea843] text-white font-medium h-12 text-base border-0">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  )
}
