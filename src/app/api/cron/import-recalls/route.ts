import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendRecallAlertEmail } from '@/lib/email'

const GOC_RECALL_URL = 'https://recalls-rappels.canada.ca/sites/default/files/opendata-donneesouvertes/SCRSAMDonneesOuvertes.json'

// Use the service role key for the cron job to bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  
  // Verify cron secret for security
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  let importLogId: string | undefined

  try {
    const { data: importLog } = await supabase.from('import_logs').insert({
      status: 'running'
    }).select('id').single()

    if (importLog) importLogId = importLog.id

    // 1. Fetch Government of Canada JSON feed
    const response = await fetch(GOC_RECALL_URL)
    if (!response.ok) {
      throw new Error(`Failed to fetch recall data: ${response.statusText}`)
    }
    
    const data = await response.json()
    // The JSON structure from Canada Open Data can vary, but typically it's an array or an object containing an array.
    const recalls = Array.isArray(data) ? data : (data.results || data.recalls || [])
    
    let importedCount = 0

    // 2 & 3. Parse and Normalize fields
    for (const rawRecall of recalls) {
      const sourceId = rawRecall.recallId || rawRecall.id?.toString()
      if (!sourceId) continue;
      
      const title = rawRecall.title?.en || rawRecall.title || 'Unknown Title'
      const summary = rawRecall.summary?.en || rawRecall.description || ''
      const category = rawRecall.category?.en || rawRecall.category || 'General'
      const datePublished = rawRecall.date_published ? new Date(rawRecall.date_published * 1000).toISOString() : new Date().toISOString()
      const officialUrl = rawRecall.url?.en || rawRecall.url || ''

      // 4. Upsert recalls into database
      const { data: recall, error: upsertError } = await supabase.from('recalls').upsert({
        source_id: sourceId,
        source: 'Government of Canada',
        title,
        summary,
        category,
        date_published: datePublished,
        official_url: officialUrl,
        raw_data: rawRecall,
      }, { onConflict: 'source_id' }).select('*').single()

      if (upsertError || !recall) {
        console.error("Error upserting recall:", upsertError)
        continue;
      }
      
      importedCount++

      // 5. Run matching engine
      await runMatchingEngineForRecall(supabase, recall)
    }

    if (importLogId) {
      await supabase.from('import_logs').update({
        status: 'completed', 
        records_imported: importedCount,
        finished_at: new Date().toISOString()
      }).eq('id', importLogId)
    }

    return NextResponse.json({ success: true, imported: importedCount })
  } catch (error: any) {
    console.error('Import job failed:', error)
    if (importLogId) {
      await supabase.from('import_logs').update({
        status: 'failed', 
        message: error.message,
        finished_at: new Date().toISOString()
      }).eq('id', importLogId)
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

async function runMatchingEngineForRecall(supabase: any, recall: any) {
  // Fetch all active products
  const { data: products } = await supabase
    .from('products')
    .select('*, businesses(*)')
    .eq('status', 'active')

  if (!products) return

  for (const product of products) {
    const { score, reason } = calculateMatchScore(product, recall)

    if (score >= 50) {
      // 6. Create RecallMatch record
      const { data: match, error } = await supabase.from('recall_matches').upsert({
        business_id: product.business_id,
        product_id: product.id,
        recall_id: recall.id,
        score,
        reason,
        date_found: new Date().toISOString()
      }, { onConflict: 'product_id,recall_id' }).select('*').single()

      if (error) {
        console.error("Error creating match:", error)
        continue
      }

      // 7. Send email alerts for NEW matches
      if (match && match.status === 'new' && !match.email_sent && product.businesses?.notification_email) {
        // Trigger email logic here
        await sendRecallAlertEmail(
          product.businesses.notification_email,
          product.name,
          recall.title,
          match.score,
          match.id
        )
        await supabase.from('recall_matches').update({ email_sent: true }).eq('id', match.id)
      }
    }
  }
}

function calculateMatchScore(product: any, recall: any): { score: number, reason: string } {
  const recallTitle = (recall.title || '').toLowerCase()
  const recallSummary = (recall.summary || '').toLowerCase()
  const recallText = `${recallTitle} ${recallSummary}`
  
  let score = 0
  let reason = ''

  if (product.barcode && recallText.includes(product.barcode.toLowerCase())) {
    return { score: 100, reason: 'Exact barcode match' }
  }
  
  if (product.sku && recallText.includes(product.sku.toLowerCase())) {
    return { score: 95, reason: 'Exact SKU match' }
  }

  const pName = (product.name || '').toLowerCase()
  const pBrand = (product.brand || '').toLowerCase()
  const pCategory = (product.category || '').toLowerCase()

  if (pBrand && pName && recallTitle.includes(pBrand) && recallTitle.includes(pName)) {
    return { score: 85, reason: 'Brand and product name matched' }
  }

  if (pBrand && pCategory && recallTitle.includes(pBrand) && recallText.includes(pCategory)) {
    return { score: 70, reason: 'Brand and category matched' }
  }

  if (pName && recallTitle.includes(pName)) {
    return { score: 60, reason: 'Product name found in recall title' }
  }

  if (pName && recallSummary.includes(pName)) {
    return { score: 40, reason: 'Product name mentioned in recall details' }
  }

  return { score, reason: 'No significant match' }
}
