import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Calendar, ExternalLink, ShieldAlert, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'

// Format category string for display
const formatCategoryName = (category: string) => {
  return decodeURIComponent(category)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const categoryName = formatCategoryName(params.category)
  return {
    title: `${categoryName} Recalls Canada - RecallGuard`,
    description: `Search the latest ${categoryName} recalls from the Government of Canada.`,
  }
}

export default async function CategoryRecallsPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const categoryName = formatCategoryName(params.category)

  const supabase = await createClient()

  // Fetch recalls from database (limit to 50 for now)
  let recalls: any[] = []
  let error = null
  
  try {
    const { data, error: sbError } = await supabase
      .from('recalls')
      .select('*')
      .ilike('category', `%${categoryName.replace(' Recalls', '')}%`)
      .order('date_published', { ascending: false })
      .limit(50)
      
    if (sbError) throw sbError
    if (data) recalls = data
  } catch (e) {
    error = "Unable to connect to the database or fetch recalls."
    console.error(e)
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <Link href="/recalls" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to All Recalls
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{categoryName} Recalls in Canada</h1>
          <p className="text-slate-500 mt-1">Showing the latest alerts for {categoryName.toLowerCase()}.</p>
        </div>

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
            <p className="text-slate-500 mt-2">We couldn't find any recent recalls in this category.</p>
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
