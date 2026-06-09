import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'
import { MobileDashboardNav } from '@/components/layout/MobileDashboardNav'

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

  const accountType = user.user_metadata?.account_type === 'individual' ? 'individual' : 'business'

  // Fetch business profile
  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const displayName =
    accountType === 'individual'
      ? user.user_metadata?.full_name || user.email?.split('@')[0] || 'My Account'
      : business?.name || 'My Business'

  return (
    <div className="flex min-h-screen bg-white relative overflow-hidden">
      {/* Premium ambient UI gradient centered behind the dashboard */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] max-w-[100vw] h-[800px] rounded-[100%] bg-gradient-to-br from-[#c6f6d5]/30 via-[#e2f8dc]/40 to-[#fde0b5]/30 blur-[120px] pointer-events-none z-0"></div>

      {/* Sidebar Component */}
      <DashboardSidebar accountType={accountType} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        <header className="flex h-20 sm:h-[88px] items-center justify-between px-4 sm:px-8 border-b border-slate-100 md:border-none">
          <div className="flex items-center gap-3">
            <MobileDashboardNav accountType={accountType} />
            <div className="font-semibold text-lg sm:text-xl tracking-tight text-slate-900 truncate">
              {displayName}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {accountType === 'individual' ? (
              <Button asChild className="hidden sm:flex rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 h-11 border-0 shadow-sm">
                <Link href="/recalls">Browse Recalls</Link>
              </Button>
            ) : (
              <Button asChild className="hidden sm:flex rounded-xl bg-[#61c554] hover:bg-[#4ea843] text-white font-medium px-6 h-11 border-0 shadow-sm">
                <Link href="/dashboard/products/upload">Upload CSV</Link>
              </Button>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 pb-12 pt-4 sm:pt-4">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
