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
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Canadian Product Recalls</h1>
            <p className="text-slate-500 mt-1">Search the latest recalls from the Government of Canada.</p>
          </div>
        </div>

        {/* Search & Filters */}
        <Card className="mb-8 border-slate-200 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <form className="flex flex-col sm:flex-row gap-4" action="/recalls" method="GET">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  name="q"
                  defaultValue={query}
                  placeholder="Search by keyword, brand, or product name..." 
                  className="pl-10"
                />
              </div>
              <div className="w-full sm:w-64">
                <select 
                  name="category" 
                  defaultValue={category}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">All Categories</option>
                  <option value="Food">Food</option>
                  <option value="Consumer Products">Consumer Products</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Health Products">Health Products</option>
                </select>
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
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
          <div className="grid gap-6">
            {recalls.map((recall) => (
              <Card key={recall.id} className="border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                      {recall.category || 'General'}
                    </Badge>
                    <Badge variant="outline" className="text-slate-500">
                      {recall.source || 'Gov of Canada'}
                    </Badge>
                    {recall.date_published && (
                      <span className="flex items-center text-xs text-slate-500 ml-auto">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(new Date(recall.date_published), 'MMM d, yyyy')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    <Link href={`/recalls/${recall.id}`} className="hover:text-blue-600 hover:underline">
                      {recall.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                    {recall.summary || 'No summary available.'}
                  </p>
                  <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/recalls/${recall.id}`}>View Details</Link>
                    </Button>
                    {recall.official_url && (
                      <a 
                        href={recall.official_url}  
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        Official Notice <ExternalLink className="h-3 w-3 ml-1" />
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
