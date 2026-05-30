import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ShieldAlert, Home, Package, AlertTriangle, Settings, CreditCard, LogOut, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/(auth)/actions'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'

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
    <div className="flex min-h-screen bg-white relative overflow-hidden">
      {/* Premium ambient UI gradient centered behind the dashboard */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] max-w-[100vw] h-[800px] rounded-[100%] bg-gradient-to-br from-[#c6f6d5]/30 via-[#e2f8dc]/40 to-[#fde0b5]/30 blur-[120px] pointer-events-none z-0"></div>

      {/* Sidebar Component */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        <header className="flex h-[88px] items-center justify-between px-8">
          <div className="font-semibold text-xl tracking-tight text-slate-900 truncate">
            {business?.name || 'My Business'}
          </div>
          <div className="flex items-center gap-4">
            <Button asChild className="hidden sm:flex rounded-xl bg-[#61c554] hover:bg-[#4ea843] text-white font-medium px-6 h-11 border-0 shadow-sm">
              <Link href="/dashboard/products/upload">Upload CSV</Link>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto px-8 pb-12 pt-4">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
