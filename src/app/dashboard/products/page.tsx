import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Upload, Package } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'My Products - RecallGuard Canada',
}

export default async function ProductsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  if (user.user_metadata?.account_type === 'individual') {
    redirect('/dashboard')
  }

  // Fetch business profile
  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('user_id', user.id)
    .single()
    
  if (!business) return <div>Please complete your profile.</div>

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('business_id', business.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#61c554]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">Inventory</h1>
          <p className="text-lg text-slate-600 mt-2">Manage the products you want us to monitor for recalls.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto relative z-10">
          <Button asChild variant="outline" className="w-full sm:w-auto rounded-xl bg-white/80 backdrop-blur-sm border-slate-200 text-slate-700 hover:bg-slate-50 h-11 px-6 shadow-sm">
            <Link href="/dashboard/products/upload">
              <Upload className="mr-2 h-4 w-4" /> Bulk Upload
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-auto rounded-xl bg-[#61c554] hover:bg-[#4ea843] text-white h-11 px-6 border-0 shadow-[0_8px_30px_rgb(97,197,84,0.3)] hover:scale-[1.02] transition-all">
            <Link href="/dashboard/products/new">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Link>
          </Button>
        </div>
      </div>

      <Card className="rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100/60 bg-white/70 backdrop-blur-2xl overflow-hidden">
        {(!products || products.length === 0) ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="h-20 w-20 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
              <Package className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">No products found</h3>
            <p className="text-slate-500 mt-2 max-w-sm text-base">
              Get started by uploading a CSV of your inventory or adding products manually.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild variant="outline" className="rounded-xl h-11 px-6 bg-white shadow-sm border-slate-200 hover:bg-slate-50">
                <Link href="/dashboard/products/upload">Upload CSV</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium">Product Details</th>
                  <th className="px-6 py-4 font-medium">Brand</th>
                  <th className="px-6 py-4 font-medium">Identifiers</th>
                  <th className="px-6 py-4 font-medium">Added</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {products.map((product) => (
                  <tr key={product.id} className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{product.name}</div>
                      {product.category && <div className="text-xs text-slate-500 mt-1">{product.category}</div>}
                    </td>
                    <td className="px-6 py-4">{product.brand || '-'}</td>
                    <td className="px-6 py-4 space-y-1">
                      {product.sku && <div className="text-xs"><span className="text-slate-400">SKU:</span> {product.sku}</div>}
                      {product.barcode && <div className="text-xs"><span className="text-slate-400">UPC:</span> {product.barcode}</div>}
                      {!product.sku && !product.barcode && '-'}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-slate-500 font-medium">
                      {format(new Date(product.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link href={`/dashboard/products/${product.id}`} className="font-semibold text-[#61c554] hover:text-[#4ea843] hover:underline">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
