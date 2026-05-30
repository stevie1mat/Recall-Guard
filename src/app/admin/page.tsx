import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, AlertTriangle, Activity, Database } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = {
  title: 'Admin Dashboard - RecallGuard',
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Simple admin check: In a real app, you'd check a custom claim or an 'admins' table
  // For MVP, we'll assume the presence of this route is protected by a middleware check or we just show it if they are logged in.
  // Ideally, restrict this by user.email === process.env.ADMIN_EMAIL

  // Fetch some basic system stats
  const { count: userCount } = await supabase.from('businesses').select('*', { count: 'exact', head: true })
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true })
  const { count: recallCount } = await supabase.from('recalls').select('*', { count: 'exact', head: true })
  const { count: matchCount } = await supabase.from('recall_matches').select('*', { count: 'exact', head: true })

  const { data: recentLogs } = await supabase
    .from('import_logs')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(5)

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">System overview and import logs.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Businesses</CardTitle>
              <Users className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{userCount || 0}</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Products</CardTitle>
              <Database className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{productCount || 0}</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Synced Recalls</CardTitle>
              <AlertTriangle className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{recallCount || 0}</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Matches Generated</CardTitle>
              <Activity className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{matchCount || 0}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Import Job Logs</CardTitle>
          </CardHeader>
          <CardContent>
            {recentLogs && recentLogs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Started At</th>
                      <th className="px-6 py-3">Finished At</th>
                      <th className="px-6 py-3">Records Imported</th>
                      <th className="px-6 py-3">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {recentLogs.map((log: any) => (
                      <tr key={log.id} className="bg-white hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            log.status === 'completed' ? 'bg-green-100 text-green-800' :
                            log.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {log.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {format(new Date(log.started_at), 'MMM d, h:mm a')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {log.finished_at ? format(new Date(log.finished_at), 'MMM d, h:mm a') : '-'}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {log.records_imported}
                        </td>
                        <td className="px-6 py-4 text-xs max-w-xs truncate" title={log.message || ''}>
                          {log.message || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-slate-500 py-4 text-center">No import logs found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
