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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Inventory</h1>
          <p className="text-slate-500 mt-1">Manage the products you want us to monitor for recalls.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button asChild variant="outline" className="w-full sm:w-auto bg-white">
            <Link href="/dashboard/products/upload">
              <Upload className="mr-2 h-4 w-4" /> Bulk Upload
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/dashboard/products/new">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        {(!products || products.length === 0) ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No products found</h3>
            <p className="text-slate-500 mt-2 max-w-sm">
              Get started by uploading a CSV of your inventory or adding products manually.
            </p>
            <div className="mt-6 flex gap-4">
              <Button asChild variant="outline">
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
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                      {format(new Date(product.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/dashboard/products/${product.id}`} className="font-medium text-blue-600 hover:text-blue-800">
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
