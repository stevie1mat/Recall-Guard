'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import Papa from 'papaparse'

export async function uploadCSV(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', user.id)
    .single()
    
  if (!business) {
    redirect('/dashboard')
  }

  const file = formData.get('file') as File
  if (!file) {
    return { error: 'No file provided' }
  }

  try {
    const text = await file.text()
    
    return new Promise<{success?: boolean, count?: number, error?: string}>((resolve) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          const rows = results.data as any[]
          
          if (rows.length === 0) {
            resolve({ error: 'The CSV file is empty.' })
            return
          }

          // Map CSV rows to Product insert payload
          // Expected headers: name, brand, sku, barcode, category
          const productsToInsert = rows.map((row: any) => ({
            business_id: business.id,
            name: row.name || row.Name || row.Product || 'Unknown Product',
            brand: row.brand || row.Brand || null,
            sku: row.sku || row.SKU || null,
            barcode: row.barcode || row.Barcode || row.UPC || row.upc || null,
            category: row.category || row.Category || null,
          }))

          const { error: insertError } = await supabase
            .from('products')
            .insert(productsToInsert)

          if (insertError) {
            console.error(insertError)
            resolve({ error: 'Failed to insert products into database.' })
            return
          }

          revalidatePath('/dashboard/products')
          resolve({ success: true, count: productsToInsert.length })
        },
        error: (error: any) => {
          console.error('CSV Parsing Error:', error)
          resolve({ error: 'Failed to parse CSV file.' })
        }
      })
    }).then((res) => {
      if (res.success) {
        redirect(`/dashboard/products?uploaded=${res.count}`)
      }
      return res
    })

  } catch (e: any) {
    return { error: e.message || 'An unexpected error occurred.' }
  }
}
