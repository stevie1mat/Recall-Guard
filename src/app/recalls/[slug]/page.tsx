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
    <div className="bg-[#fcfdfc] min-h-screen py-16 relative overflow-hidden">
      {/* Premium ambient UI gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-[100%] bg-gradient-to-b from-[#61c554]/10 to-transparent blur-[80px] pointer-events-none z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        <Link href="/recalls" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-[#61c554] mb-8 transition-colors group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Search
        </Link>
        
        {error ? (
           <div className="text-center py-20 bg-white rounded-lg border border-slate-200">
            <ShieldAlert className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">Database Connection Required</h3>
            <p className="text-slate-500 mt-2">Unable to connect to the database to fetch this recall.</p>
          </div>
        ) : !recall ? null : (
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] border border-slate-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-50 border-0 rounded-lg px-3 py-1.5 font-medium">
                  <AlertTriangle className="h-3.5 w-3.5 mr-1.5" /> Recall
                </Badge>
                <Badge variant="outline" className="text-slate-500 border-slate-200 rounded-lg px-3 py-1.5 font-medium bg-white">{recall.category || 'General'}</Badge>
                <Badge variant="outline" className="text-slate-500 border-slate-200 rounded-lg px-3 py-1.5 font-medium bg-white">{recall.source || 'Gov of Canada'}</Badge>
                {recall.date_published && (
                  <span className="flex items-center text-sm text-slate-500 ml-auto">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(new Date(recall.date_published), 'MMMM d, yyyy')}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6 leading-snug">
                {recall.title}
              </h1>
              
              <div className="prose prose-slate max-w-none mb-10">
                <p className="text-lg text-slate-600 leading-relaxed">
                  {recall.summary}
                </p>
                {/* Normally we would render more rawData fields here if available */}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100/60">
                {recall.official_url && (
                  <Button asChild className="h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-8 shadow-md transition-all">
                    <a href={recall.official_url} target="_blank" rel="noopener noreferrer">
                      View Official Notice <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" className="h-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50 px-8 shadow-sm">
                  <Link href="/signup">Check if my products match</Link>
                </Button>
              </div>
            </div>
            
            <Card className="rounded-[2rem] border-0 shadow-[0_8px_30px_rgb(97,197,84,0.1)] bg-gradient-to-br from-[#f0fbee] to-[#e4f7e1] overflow-hidden relative">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#61c554]/20 rounded-full blur-3xl pointer-events-none"></div>
              <CardHeader className="relative z-10 pb-4 pt-8 px-8">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                  <ShieldAlert className="h-6 w-6 mr-3 text-[#61c554]" />
                  Are you a retailer?
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 text-slate-700 px-8 pb-8">
                <p className="mb-6 text-base leading-relaxed">
                  Selling recalled products can lead to liability and damage your reputation. 
                  RecallGuard Canada can automatically monitor your inventory against new recalls.
                </p>
                <Button asChild variant="default" className="h-12 rounded-xl bg-[#61c554] hover:bg-[#4ea843] text-white px-8 border-0 shadow-md transition-all">
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
