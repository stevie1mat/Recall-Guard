import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, AlertTriangle, CheckCircle, Activity, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export const metadata = {
  title: 'Dashboard - RecallGuard Canada',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your watched products and active recall alerts.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Watched Products</CardTitle>
            <Package className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalProducts || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 shadow-sm border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">New Matches</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{newMatches || 0}</div>
            <p className="text-xs text-slate-500 mt-1">Requires review</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Confirmed Matches</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{confirmedMatches || 0}</div>
            <p className="text-xs text-slate-500 mt-1">Action required</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">0</div>
            <p className="text-xs text-slate-500 mt-1">Issues mitigated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Matches */}
        <Card className="col-span-4 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Match Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {!recentMatches || recentMatches.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <ShieldAlert className="h-8 w-8 text-slate-300 mb-2" />
                <p className="text-sm text-slate-500">No match activity yet.</p>
                {totalProducts === 0 && (
                  <Link href="/dashboard/products/upload" className="text-sm text-blue-600 mt-2 font-medium">
                    Upload products to get started
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {recentMatches.map((match: any) => (
                  <div key={match.id} className="flex items-start justify-between border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-slate-900">
                        {match.products?.name}
                      </p>
                      <p className="text-sm text-slate-500 line-clamp-1">
                        Matched with: {match.recalls?.title}
                      </p>
                      <div className="flex items-center pt-1 text-xs text-slate-400">
                        {format(new Date(match.date_found), 'MMM d, h:mm a')}
                        <span className="mx-2">•</span>
                        Match Score: {match.score}%
                      </div>
                    </div>
                    <Badge variant="outline" className={`
                      ${match.status === 'new' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                      ${match.status === 'reviewing' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                      ${match.status === 'confirmed' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                      ${match.status === 'resolved' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                      ${match.status === 'not_a_match' ? 'bg-slate-100 text-slate-700 border-slate-200' : ''}
                    `}>
                      {match.status.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
            {recentMatches && recentMatches.length > 0 && (
              <div className="mt-4 pt-4 border-t text-center">
                <Link href="/dashboard/matches" className="text-sm text-blue-600 font-medium flex items-center justify-center hover:underline">
                  View all matches <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions / Alerts */}
        <Card className="col-span-3 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard/products/upload" className="block w-full text-left p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-md mr-3 group-hover:bg-blue-200 transition-colors">
                  <Upload className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Upload CSV</h4>
                  <p className="text-xs text-slate-500">Add products in bulk</p>
                </div>
              </div>
            </Link>
            
            <Link href="/dashboard/products" className="block w-full text-left p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <div className="flex items-center">
                <div className="bg-slate-100 p-2 rounded-md mr-3 group-hover:bg-blue-200 transition-colors">
                  <Package className="h-5 w-5 text-slate-600 group-hover:text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Manage Inventory</h4>
                  <p className="text-xs text-slate-500">Edit or manually add products</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
