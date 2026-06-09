import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Package, AlertTriangle, CheckCircle, Activity, ArrowRight, ShieldAlert, Upload, Bell, Search, Home, Bookmark } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export const metadata = {
  title: 'Dashboard - RecallGuard Canada',
}

export default async function DashboardPage(props: { searchParams: Promise<{ message?: string }> }) {
  const supabase = await createClient()
  const searchParams = await props.searchParams
  const rawMessage = searchParams.message
  const message = rawMessage ? rawMessage.replace(' You can log in now.', '').trim() : undefined
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const accountType = user.user_metadata?.account_type === 'individual' ? 'individual' : 'business'

  if (accountType === 'individual') {
    const name =
      user.user_metadata?.full_name ||
      user.email?.split('@')[0] ||
      'there'

    const { count: trackedProducts } = await supabase
      .from('user_watchlists')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('item_type', 'product')
      
    const { count: trackedCategoriesBrands } = await supabase
      .from('user_watchlists')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .in('item_type', ['category', 'brand'])
      
    const { count: savedChecks } = await supabase
      .from('user_saved_recalls')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)

    // Fetch watchlists to find recent matching alerts
    const { data: watchlists } = await supabase
      .from('user_watchlists')
      .select('value')
      .eq('user_id', user.id)

    const watchValues = watchlists?.map(w => w.value.toLowerCase()) || []
    let recentAlerts: any[] = []
    
    if (watchValues.length > 0) {
      const { data: recent } = await supabase.from('recalls').select('*').order('date_published', { ascending: false }).limit(50)
      if (recent) {
        recentAlerts = recent.filter(r => 
          watchValues.some(val => 
            (r.title && r.title.toLowerCase().includes(val)) || 
            (r.summary && r.summary.toLowerCase().includes(val)) ||
            (r.category && r.category.toLowerCase().includes(val))
          )
        ).slice(0, 5)
      }
    }

    return (
      <div className="space-y-8">
        {message && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-800 shadow-sm">
            <p className="text-sm font-semibold">Success</p>
            <p className="mt-1 text-sm">{message}</p>
          </div>
        )}

        <div className="mb-10 relative">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#61c554]/10 rounded-full blur-3xl pointer-events-none"></div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3 relative z-10">Personal Dashboard</h1>
          <p className="text-lg text-slate-600 relative z-10 max-w-2xl">Welcome back, <span className="font-semibold text-slate-900">{name}</span>. Stay on top of recalls that matter to your home and family.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100/60 bg-white/70 backdrop-blur-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 pointer-events-none"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Tracked Products</CardTitle>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 rounded-2xl bg-[#61c554]/5 blur-md"></div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#61c554] rounded-full border-2 border-white shadow-sm"></div>
                <Package className="h-5 w-5 text-slate-700 relative z-10" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold tracking-tighter text-slate-900">{trackedProducts || 0}</div>
              <p className="text-sm text-slate-500 mt-1 font-medium">Specific items you want to watch.</p>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100/60 bg-white/70 backdrop-blur-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/0 pointer-events-none"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Recent Alerts</CardTitle>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 rounded-2xl bg-blue-500/5 blur-md"></div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                <Bell className="h-5 w-5 text-slate-700 relative z-10" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold tracking-tighter text-slate-900">{recentAlerts.length}</div>
              <p className="text-sm text-slate-500 mt-1 font-medium">Matches found in recent recalls.</p>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100/60 bg-white/70 backdrop-blur-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-white/0 pointer-events-none"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Saved Checks</CardTitle>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 rounded-2xl bg-amber-400/5 blur-md"></div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-amber-400 rounded-full border-2 border-white shadow-sm"></div>
                <Bookmark className="h-5 w-5 text-slate-700 relative z-10" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold tracking-tighter text-slate-900">{savedChecks || 0}</div>
              <p className="text-sm text-slate-500 mt-1 font-medium">Keep your safety checks organized.</p>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100/60 bg-white/70 backdrop-blur-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-white/0 pointer-events-none"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Categories</CardTitle>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 rounded-2xl bg-slate-400/5 blur-md"></div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-slate-400 rounded-full border-2 border-white shadow-sm"></div>
                <Home className="h-5 w-5 text-slate-700 relative z-10" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold tracking-tighter text-slate-900">{trackedCategoriesBrands || 0}</div>
              <p className="text-sm text-slate-500 mt-1 font-medium">Home, baby, electronics, and more.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-8">
          <Card className="col-span-4 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100/60 bg-white/70 backdrop-blur-2xl">
            <CardHeader className="border-b border-slate-100/60 pb-6 px-8 pt-8">
              <CardTitle className="font-bold text-2xl tracking-tight text-slate-900">Personal Recall Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {recentAlerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-56 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <ShieldAlert className="h-8 w-8 text-slate-300 mb-3" />
                  <p className="text-sm text-slate-500 font-medium">No recent matches found.</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    Start by browsing the recall database and following the products, brands, or categories you care about.
                  </p>
                  <Button asChild variant="link" className="text-sm text-slate-900 mt-2 font-semibold">
                    <Link href="/dashboard/watchlist">Manage your watchlist</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {recentAlerts.map((match: any) => (
                    <div key={match.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 last:border-0 pb-4 last:pb-0 gap-3 sm:gap-0">
                      <div className="space-y-1.5">
                        <p className="text-sm font-semibold tracking-tight text-slate-900">
                          <Link href={`/recalls/${match.id}`} className="hover:text-blue-600 hover:underline">
                            {match.title}
                          </Link>
                        </p>
                        <p className="text-sm text-slate-500 line-clamp-1">
                          {match.summary}
                        </p>
                        <div className="flex items-center pt-1 text-xs text-slate-400 font-medium">
                          {match.date_published && format(new Date(match.date_published), 'MMM d, yyyy')}
                          <span className="mx-2 text-slate-200">•</span>
                          {match.category}
                        </div>
                      </div>
                      <div>
                        <Badge variant="outline" className="rounded-lg px-2.5 py-0.5 font-medium border-0 bg-red-50 text-red-700">
                          Match
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-3 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100/60 bg-white/70 backdrop-blur-2xl">
            <CardHeader className="border-b border-slate-100/60 pb-6 px-8 pt-8">
              <CardTitle className="font-bold text-2xl tracking-tight text-slate-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              <Link href="/recalls" className="block w-full text-left p-5 rounded-2xl border border-slate-100 bg-white hover:border-[#61c554]/30 hover:shadow-md transition-all group">
                <div className="flex items-center">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-sm mr-4 group-hover:bg-[#61c554]/10 transition-all">
                    <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-[#61c554] rounded-full border-2 border-white"></div>
                    <Search className="h-5 w-5 text-slate-600 group-hover:text-[#61c554]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-[#61c554]">Browse Recalls</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Search toys, food, electronics, and more</p>
                  </div>
                </div>
              </Link>

              <Link href="/dashboard/watchlist" className="block w-full text-left p-5 rounded-2xl border border-slate-100 bg-white hover:border-[#61c554]/30 hover:shadow-md transition-all group">
                <div className="flex items-center">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-sm mr-4 group-hover:bg-[#61c554]/10 transition-all">
                    <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-slate-900 rounded-full border-2 border-white"></div>
                    <Bookmark className="h-5 w-5 text-slate-600 group-hover:text-[#61c554]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-[#61c554]">Manage Watchlist</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Set the products and brands you care about</p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Fetch business profile
  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', user.id)
    .single()
    
  if (!business) return <div>Please complete your profile.</div>

  // Fetch stats
  const { count: totalProducts } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .eq('status', 'active')

  const { count: newMatches } = await supabase
    .from('recall_matches')
    .select('id', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .eq('status', 'new')
    
  const { count: confirmedMatches } = await supabase
    .from('recall_matches')
    .select('id', { count: 'exact', head: true })
    .eq('business_id', business.id)
    .eq('status', 'confirmed')

  // Fetch recent matches for the activity feed
  const { data: recentMatches } = await supabase
    .from('recall_matches')
    .select(`
      id,
      score,
      status,
      date_found,
      products (name, brand),
      recalls (title, category)
    `)
    .eq('business_id', business.id)
    .order('date_found', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8">
      {message && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-800 shadow-sm">
          <p className="text-sm font-semibold">Success</p>
          <p className="mt-1 text-sm">{message}</p>
        </div>
      )}

      <div className="mb-10 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#61c554]/10 rounded-full blur-3xl pointer-events-none"></div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3 relative z-10">Dashboard</h1>
        <p className="text-lg text-slate-600 relative z-10 max-w-2xl">Overview of your watched products and active recall alerts.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100/60 bg-white/70 backdrop-blur-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 pointer-events-none"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Watched Products</CardTitle>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 rounded-2xl bg-[#61c554]/5 blur-md"></div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#61c554] rounded-full border-2 border-white shadow-sm"></div>
              <Package className="h-5 w-5 text-slate-700 relative z-10" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold tracking-tighter text-slate-900">{totalProducts || 0}</div>
            <p className="text-sm text-slate-500 mt-1 font-medium">Actively monitored SKUs.</p>
          </CardContent>
        </Card>
        
        <Card className="rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100/60 bg-white/70 backdrop-blur-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/0 pointer-events-none"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">New Matches</CardTitle>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 rounded-2xl bg-blue-500/5 blur-md"></div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
              <Activity className="h-5 w-5 text-slate-700 relative z-10" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold tracking-tighter text-slate-900">{newMatches || 0}</div>
            <p className="text-sm text-slate-500 mt-1 font-medium">Requires review</p>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100/60 bg-white/70 backdrop-blur-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-white/0 pointer-events-none"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Confirmed</CardTitle>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 rounded-2xl bg-red-500/5 blur-md"></div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
              <AlertTriangle className="h-5 w-5 text-slate-700 relative z-10" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold tracking-tighter text-slate-900">{confirmedMatches || 0}</div>
            <p className="text-sm text-slate-500 mt-1 font-medium">Action required</p>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100/60 bg-white/70 backdrop-blur-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-white/0 pointer-events-none"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Resolved</CardTitle>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 rounded-2xl bg-green-500/5 blur-md"></div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              <CheckCircle className="h-5 w-5 text-slate-700 relative z-10" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold tracking-tighter text-slate-900">0</div>
            <p className="text-sm text-slate-500 mt-1 font-medium">Issues mitigated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-8">
        {/* Recent Matches */}
        <Card className="col-span-4 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100/60 bg-white/70 backdrop-blur-2xl">
          <CardHeader className="border-b border-slate-100/60 pb-6 px-8 pt-8">
            <CardTitle className="font-bold text-2xl tracking-tight text-slate-900">Recent Match Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {!recentMatches || recentMatches.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-56 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <ShieldAlert className="h-8 w-8 text-slate-300 mb-3" />
                <p className="text-sm text-slate-500 font-medium">No match activity yet.</p>
                {totalProducts === 0 && (
                  <Button asChild variant="link" className="text-sm text-[#61c554] mt-2 font-semibold">
                    <Link href="/dashboard/products/upload">Upload products to get started</Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {recentMatches.map((match: any) => (
                  <div key={match.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 last:border-0 pb-4 last:pb-0 gap-3 sm:gap-0">
                    <div className="space-y-1.5">
                      <p className="text-sm font-semibold tracking-tight text-slate-900">
                        {match.products?.name}
                      </p>
                      <p className="text-sm text-slate-500 line-clamp-1">
                        Matched with: {match.recalls?.title}
                      </p>
                      <div className="flex items-center pt-1 text-xs text-slate-400 font-medium">
                        {format(new Date(match.date_found), 'MMM d, h:mm a')}
                        <span className="mx-2 text-slate-200">•</span>
                        Match Score: {match.score}%
                      </div>
                    </div>
                    <div>
                      <Badge variant="outline" className={`rounded-lg px-2.5 py-0.5 font-medium border-0
                        ${match.status === 'new' ? 'bg-blue-50 text-blue-700' : ''}
                        ${match.status === 'reviewing' ? 'bg-yellow-50 text-yellow-700' : ''}
                        ${match.status === 'confirmed' ? 'bg-red-50 text-red-700' : ''}
                        ${match.status === 'resolved' ? 'bg-green-50 text-green-700' : ''}
                        ${match.status === 'not_a_match' ? 'bg-slate-100 text-slate-700' : ''}
                      `}>
                        {match.status.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {recentMatches && recentMatches.length > 0 && (
              <div className="mt-4 pt-6 border-t border-slate-100 text-center">
                <Link href="/dashboard/matches" className="text-sm text-[#61c554] font-semibold flex items-center justify-center hover:underline hover:text-[#4ea843]">
                  View all matches <ArrowRight className="ml-1.5 w-4 h-4" />
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions / Alerts */}
        <Card className="col-span-3 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100/60 bg-white/70 backdrop-blur-2xl">
          <CardHeader className="border-b border-slate-100/60 pb-6 px-8 pt-8">
            <CardTitle className="font-bold text-2xl tracking-tight text-slate-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            <Link href="/dashboard/products/upload" className="block w-full text-left p-5 rounded-2xl border border-slate-100 bg-white hover:border-[#61c554]/30 hover:shadow-md transition-all group">
              <div className="flex items-center">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-sm mr-4 group-hover:bg-[#61c554]/10 group-hover:border-[#61c554]/20 transition-all">
                  <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-[#61c554] rounded-full border-2 border-white"></div>
                  <Upload className="h-5 w-5 text-slate-600 group-hover:text-[#61c554]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#61c554] transition-colors">Upload CSV</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Add products in bulk</p>
                </div>
              </div>
            </Link>
            
            <Link href="/dashboard/products" className="block w-full text-left p-5 rounded-2xl border border-slate-100 bg-white hover:border-[#61c554]/30 hover:shadow-md transition-all group">
              <div className="flex items-center">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-sm mr-4 group-hover:bg-[#61c554]/10 group-hover:border-[#61c554]/20 transition-all">
                  <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-[#61c554] rounded-full border-2 border-white"></div>
                  <Package className="h-5 w-5 text-slate-600 group-hover:text-[#61c554]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#61c554] transition-colors">Manage Inventory</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Edit or manually add products</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
