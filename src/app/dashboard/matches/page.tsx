import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ExternalLink, ShieldAlert, Check } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export const metadata = {
  title: 'Recall Matches - RecallGuard Canada',
}

export default async function MatchesPage() {
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

  const { data: matches } = await supabase
    .from('recall_matches')
    .select(`
      id,
      score,
      reason,
      status,
      date_found,
      products (*),
      recalls (*)
    `)
    .eq('business_id', business.id)
    .order('status', { ascending: true }) // Group by status (new usually comes first alphabetically compared to resolved, wait, 'new' vs 'confirmed', 'new' is 'n', confirmed is 'c'. This is just simple ordering.)
    .order('date_found', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Recall Alerts</h1>
          <p className="text-slate-500 mt-1">Possible matches between your products and official recalls.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {!matches || matches.length === 0 ? (
          <Card className="border-slate-200 shadow-sm border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">You're all clear!</h3>
              <p className="text-slate-500 mt-2 max-w-sm">
                We haven't found any matches between your inventory and the latest recalls.
              </p>
            </CardContent>
          </Card>
        ) : (
          matches.map((match: any) => (
            <Card key={match.id} className={`border-slate-200 shadow-sm overflow-hidden ${match.status === 'new' ? 'border-l-4 border-l-blue-500' : match.status === 'confirmed' ? 'border-l-4 border-l-red-500' : ''}`}>
              <div className="flex flex-col md:flex-row">
                {/* Recall Side */}
                <div className="flex-1 p-6 md:border-r border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50">
                      <AlertTriangle className="h-3 w-3 mr-1" /> Official Recall
                    </Badge>
                    <span className="text-xs text-slate-500">
                      {format(new Date(match.recalls.date_published), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    <Link href={`/recalls/${match.recalls.id}`} className="hover:text-blue-600 hover:underline">
                      {match.recalls.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                    {match.recalls.summary}
                  </p>
                  {match.recalls.official_url && (
                    <a href={match.recalls.official_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center">
                      View Official Notice <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  )}
                </div>

                {/* Product Side */}
                <div className="flex-1 p-6 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-slate-500 bg-slate-50 mb-2">
                        Your Inventory
                      </Badge>
                      <h4 className="font-semibold text-slate-900">{match.products.name}</h4>
                      <div className="text-sm text-slate-500">
                        {match.products.brand && <span>Brand: {match.products.brand} &bull; </span>}
                        {match.products.sku && <span>SKU: {match.products.sku}</span>}
                      </div>
                    </div>
                    <Badge variant="outline" className={`
                      ${match.status === 'new' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                      ${match.status === 'reviewing' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                      ${match.status === 'confirmed' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                      ${match.status === 'resolved' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                      ${match.status === 'not_a_match' ? 'bg-slate-100 text-slate-700 border-slate-200' : ''}
                    `}>
                      {match.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-md border border-slate-100 mb-4">
                    <p className="text-sm">
                      <span className="font-medium text-slate-700">Match Reason:</span>{' '}
                      <span className="text-slate-600">{match.reason}</span>
                      <span className="ml-2 text-xs text-slate-400">(Score: {match.score}%)</span>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    {/* These buttons would ideally call server actions to update the match status */}
                    {match.status !== 'confirmed' && match.status !== 'resolved' && (
                      <form action={async () => {
                        'use server'
                        const supabaseClient = await createClient()
                        await supabaseClient.from('recall_matches').update({ status: 'confirmed' }).eq('id', match.id)
                      }}>
                        <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                          Confirm Match
                        </Button>
                      </form>
                    )}
                    
                    {match.status !== 'not_a_match' && match.status !== 'resolved' && (
                      <form action={async () => {
                        'use server'
                        const supabaseClient = await createClient()
                        await supabaseClient.from('recall_matches').update({ status: 'not_a_match' }).eq('id', match.id)
                      }}>
                        <Button type="submit" variant="outline" size="sm">
                          Not a Match
                        </Button>
                      </form>
                    )}

                    {match.status === 'confirmed' && (
                      <form action={async () => {
                        'use server'
                        const supabaseClient = await createClient()
                        await supabaseClient.from('recall_matches').update({ status: 'resolved' }).eq('id', match.id)
                      }}>
                        <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          Mark Resolved
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
