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
  const message = searchParams.message
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const accountType = user.user_metadata?.account_type === 'individual' ? 'individual' : 'business'

  if (accountType === 'individual') {
    const name =
      user.user_metadata?.full_name ||
      user.email?.split('@')[0] ||
      'there'

    return (
      <div className="space-y-8">
        {message && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-800 shadow-sm">
            <p className="text-sm font-semibold">Success</p>
            <p className="mt-1 text-sm">{message}</p>
          </div>
        )}

        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Personal Dashboard</h1>
          <p className="text-slate-500 mt-2">Welcome back, {name}. Stay on top of recalls that matter to your home and family.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100 bg-white/80 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Tracked Products</CardTitle>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm">
                <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-[#61c554] rounded-full border-2 border-white"></div>
                <Package className="h-4 w-4 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight text-slate-900">0</div>
              <p className="text-xs text-slate-500 mt-1">Products and brands you want to watch.</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100 bg-white/80 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Recent Alerts</CardTitle>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm">
                <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-blue-500 rounded-full border-2 border-white"></div>
                <Bell className="h-4 w-4 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight text-slate-900">0</div>
              <p className="text-xs text-slate-500 mt-1">No personal recall alerts yet.</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100 bg-white/80 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Saved Checks</CardTitle>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm">
                <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-amber-400 rounded-full border-2 border-white"></div>
                <Bookmark className="h-4 w-4 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight text-slate-900">0</div>
              <p className="text-xs text-slate-500 mt-1">Keep your safety checks organized.</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100 bg-white/80 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Categories Watching</CardTitle>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm">
                <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-slate-400 rounded-full border-2 border-white"></div>
                <Home className="h-4 w-4 text-slate-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight text-slate-900">0</div>
              <p className="text-xs text-slate-500 mt-1">Home, baby, electronics, and more.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100 bg-white/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="font-semibold text-lg">Personal Recall Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-56 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <ShieldAlert className="h-8 w-8 text-slate-300 mb-3" />
                <p className="text-sm text-slate-500 font-medium">No saved alerts yet.</p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Start by browsing the recall database and following the products, brands, or categories you care about.
                </p>
                <Button asChild variant="link" className="text-sm text-slate-900 mt-2 font-semibold">
                  <Link href="/recalls">Browse recalls to get started</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100 bg-white/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="font-semibold text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/recalls" className="block w-full text-left p-5 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-md transition-all group">
                <div className="flex items-center">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-sm mr-4 transition-all">
                    <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-[#61c554] rounded-full border-2 border-white"></div>
                    <Search className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 transition-colors">Browse Recalls</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Search toys, food, electronics, and more</p>
                  </div>
                </div>
              </Link>

              <Link href="/signup?audience=individual" className="block w-full text-left p-5 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-md transition-all group">
                <div className="flex items-center">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-sm mr-4 transition-all">
                    <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-slate-900 rounded-full border-2 border-white"></div>
                    <Bookmark className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 transition-colors">Manage Watchlist</h4>
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

      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-2">Overview of your watched products and active recall alerts.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100 bg-white/80 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Watched Products</CardTitle>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm">
              <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-[#61c554] rounded-full border-2 border-white"></div>
              <Package className="h-4 w-4 text-slate-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-slate-900">{totalProducts || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100 bg-white/80 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">New Matches</CardTitle>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm">
              <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-blue-500 rounded-full border-2 border-white"></div>
              <Activity className="h-4 w-4 text-slate-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-slate-900">{newMatches || 0}</div>
            <p className="text-xs text-slate-500 mt-1">Requires review</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100 bg-white/80 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Confirmed</CardTitle>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm">
              <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></div>
              <AlertTriangle className="h-4 w-4 text-slate-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-slate-900">{confirmedMatches || 0}</div>
            <p className="text-xs text-slate-500 mt-1">Action required</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100 bg-white/80 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Resolved</CardTitle>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm">
              <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></div>
              <CheckCircle className="h-4 w-4 text-slate-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-slate-900">0</div>
            <p className="text-xs text-slate-500 mt-1">Issues mitigated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Matches */}
        <Card className="col-span-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="font-semibold text-lg">Recent Match Activity</CardTitle>
          </CardHeader>
          <CardContent>
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
                  <div key={match.id} className="flex items-start justify-between border-b border-slate-100 last:border-0 pb-4 last:pb-0">
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
        <Card className="col-span-3 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="font-semibold text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
