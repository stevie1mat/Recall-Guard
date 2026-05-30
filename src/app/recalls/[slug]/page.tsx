import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowLeft, ExternalLink, ShieldAlert, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const supabase = await createClient()

  try {
    const { data: recall } = await supabase
      .from('recalls')
      .select('title, summary')
      .eq('id', params.slug)
      .single()
    
    if (!recall) return { title: 'Recall Not Found' }
    
    return {
      title: `${recall.title} - RecallGuard Canada`,
      description: recall.summary || 'Details for this Canadian product recall.',
    }
  } catch (e) {
    return { title: 'Recall Details' }
  }
}

export default async function RecallDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const supabase = await createClient()

  let recall = null
  let error = null
  
  try {
    const { data, error: sbError } = await supabase
      .from('recalls')
      .select('*')
      .eq('id', params.slug)
      .single()
    
    if (sbError) throw sbError
    recall = data
  } catch (e) {
    error = true
  }

  if (!recall && !error) {
    notFound()
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <Link href="/recalls" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Search
        </Link>
        
        {error ? (
           <div className="text-center py-20 bg-white rounded-lg border border-slate-200">
            <ShieldAlert className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">Database Connection Required</h3>
            <p className="text-slate-500 mt-2">Unable to connect to the database to fetch this recall.</p>
          </div>
        ) : !recall ? null : (
          <div className="space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-50">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Recall
                </Badge>
                <Badge variant="outline">{recall.category || 'General'}</Badge>
                <Badge variant="outline">{recall.source || 'Gov of Canada'}</Badge>
                {recall.date_published && (
                  <span className="flex items-center text-sm text-slate-500 ml-auto">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(new Date(recall.date_published), 'MMMM d, yyyy')}
                  </span>
                )}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                {recall.title}
              </h1>
              
              <div className="prose prose-slate max-w-none mb-8">
                <p className="text-lg text-slate-700 lead">
                  {recall.summary}
                </p>
                {/* Normally we would render more rawData fields here if available */}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                {recall.official_url && (
                  <Button asChild className="bg-slate-900">
                    <a href={recall.official_url} target="_blank" rel="noopener noreferrer">
                      View Official Notice <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline">
                  <Link href="/signup">Check if my products match</Link>
                </Button>
              </div>
            </div>
            
            <Card className="border-slate-200 shadow-sm bg-blue-50/50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center">
                  <ShieldAlert className="h-5 w-5 mr-2 text-blue-600" />
                  Are you a retailer?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-800">
                <p className="mb-4">
                  Selling recalled products can lead to liability and damage your reputation. 
                  RecallGuard Canada can automatically monitor your inventory against new recalls.
                </p>
                <Button asChild variant="default" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/signup">Start Monitoring Your Inventory</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
