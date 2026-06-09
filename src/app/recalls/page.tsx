import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Calendar, ExternalLink, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'

export const metadata = {
  title: 'Search Canadian Product Recalls - RecallGuard Canada',
}

export default async function RecallsPage(
  props: {
    searchParams: Promise<{ q?: string; category?: string }>
  }
) {
  const searchParams = await props.searchParams;
  const query = searchParams.q || ''
  const category = searchParams.category || ''

  const supabase = await createClient()

  let recalls: any[] = []
  let error = null
  
  try {
    let queryBuilder = supabase
      .from('recalls')
      .select('*')
      .order('date_published', { ascending: false })
      .limit(50)

    if (query) {
      // Basic ilike search for title and summary
      queryBuilder = queryBuilder.or(`title.ilike.%${query}%,summary.ilike.%${query}%`)
    }

    if (category) {
      queryBuilder = queryBuilder.ilike('category', `%${category}%`)
    }

    const { data, error: sbError } = await queryBuilder

    if (sbError) throw sbError
    if (data) recalls = data

  } catch (e) {
    error = "Unable to connect to the database or fetch recalls."
    console.error(e)
  }

  return (
    <div className="bg-[#fcfdfc] min-h-screen py-16 relative overflow-hidden">
      {/* Premium ambient UI gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-[100%] bg-gradient-to-b from-[#61c554]/10 to-transparent blur-[80px] pointer-events-none z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 text-center md:text-left">
          <div className="w-full">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3">Canadian Product Recalls</h1>
            <p className="text-lg text-slate-500">Search the latest recalls from the Government of Canada.</p>
          </div>
        </div>

        {/* Search & Filters */}
        <Card className="mb-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100/60 bg-white/70 backdrop-blur-xl">
          <CardContent className="p-6 sm:p-8">
            <form className="flex flex-col sm:flex-row gap-4" action="/recalls" method="GET">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <Input 
                  name="q"
                  defaultValue={query}
                  placeholder="Search by keyword, brand, or product name..." 
                  className="pl-12 h-12 rounded-xl border-slate-200 text-base shadow-sm focus-visible:ring-[#61c554]"
                />
              </div>
              <div className="w-full sm:w-64">
                <select 
                  name="category" 
                  defaultValue={category}
                  className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#61c554] focus:ring-offset-2"
                >
                  <option value="">All Categories</option>
                  <option value="Food">Food</option>
                  <option value="Consumer Products">Consumer Products</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Health Products">Health Products</option>
                </select>
              </div>
              <Button type="submit" className="h-12 rounded-xl bg-[#61c554] hover:bg-[#4ea843] text-white px-8 text-base shadow-md hover:shadow-lg transition-all border-0">
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {error ? (
          <div className="text-center py-20 bg-white rounded-lg border border-slate-200">
            <ShieldAlert className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">Database Connection Required</h3>
            <p className="text-slate-500 mt-2">{error}</p>
          </div>
        ) : recalls.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-slate-200">
            <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No recalls found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search filters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {recalls.map((recall) => (
              <Card key={recall.id} className="rounded-3xl border-slate-100/60 bg-white/80 backdrop-blur-sm shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col md:flex-row group border-l-4 border-l-transparent hover:border-l-[#61c554]">
                <div className="flex-1 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <Badge variant="secondary" className="bg-[#61c554]/10 text-[#4ea843] hover:bg-[#61c554]/20 border-0 rounded-lg px-3 py-1 font-medium">
                      {recall.category || 'General'}
                    </Badge>
                    <Badge variant="outline" className="text-slate-500 border-slate-200 rounded-lg px-3 py-1 font-medium bg-white">
                      {recall.source || 'Gov of Canada'}
                    </Badge>
                    {recall.date_published && (
                      <span className="flex items-center text-xs text-slate-500 ml-auto">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(new Date(recall.date_published), 'MMM d, yyyy')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-3 leading-snug">
                    <Link href={`/recalls/${recall.id}`} className="group-hover:text-[#61c554] transition-colors">
                      {recall.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed line-clamp-3 mb-6">
                    {recall.summary || 'No summary available.'}
                  </p>
                  <div className="flex items-center gap-4">
                    <Button asChild variant="outline" className="rounded-xl border-slate-200 bg-white hover:bg-slate-50 hover:text-[#61c554] transition-colors shadow-sm h-10 px-6">
                      <Link href={`/recalls/${recall.id}`}>View Details</Link>
                    </Button>
                    {recall.official_url && (
                      <a 
                        href={recall.official_url}  
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center transition-colors"
                      >
                        Official Notice <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
