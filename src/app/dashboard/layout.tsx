import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ShieldAlert, Home, Package, AlertTriangle, Settings, CreditCard, LogOut, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/(auth)/actions'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch business profile
  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-white md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg tracking-tight text-slate-900">
            <ShieldAlert className="h-5 w-5 text-blue-600" />
            <span>RecallGuard</span>
          </Link>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          <nav className="flex-1 space-y-1 px-4 py-4">
            <Link href="/dashboard" className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600">
              <Home className="mr-3 h-5 w-5 text-slate-400" />
              Dashboard
            </Link>
            <Link href="/dashboard/products" className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600">
              <Package className="mr-3 h-5 w-5 text-slate-400" />
              Products
            </Link>
            <Link href="/dashboard/products/upload" className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600">
              <Upload className="mr-3 h-5 w-5 text-slate-400" />
              CSV Upload
            </Link>
            <Link href="/dashboard/matches" className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600">
              <AlertTriangle className="mr-3 h-5 w-5 text-slate-400" />
              Matches
            </Link>
            <Link href="/dashboard/alerts" className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600">
              <ShieldAlert className="mr-3 h-5 w-5 text-slate-400" />
              Alerts
            </Link>
          </nav>
          <div className="border-t p-4">
            <nav className="space-y-1">
              <Link href="/dashboard/billing" className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                <CreditCard className="mr-3 h-5 w-5 text-slate-400" />
                Billing
              </Link>
              <Link href="/dashboard/settings" className="flex items-center rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                <Settings className="mr-3 h-5 w-5 text-slate-400" />
                Settings
              </Link>
              <form action={logout}>
                <button type="submit" className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600 text-left">
                  <LogOut className="mr-3 h-5 w-5 text-slate-400" />
                  Log out
                </button>
              </form>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <div className="font-medium text-slate-900 truncate">
            {business?.name || 'My Business'}
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm" className="hidden sm:flex">
              <Link href="/dashboard/products/upload">Upload CSV</Link>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
