import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return {
    title: 'Edit Product - RecallGuard Canada',
  }
}

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const productId = params.id;
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

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

  // Fetch the product
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .eq('business_id', business.id)
    .single()

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h3 className="text-lg font-medium text-slate-900">Product not found</h3>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/dashboard/products">Return to Inventory</Link>
        </Button>
      </div>
    )
  }

  async function updateProduct(formData: FormData) {
    'use server'
    const supabaseServer = await createClient()
    
    const name = formData.get('name') as string
    const brand = formData.get('brand') as string
    const vendor = formData.get('vendor') as string
    const sku = formData.get('sku') as string
    const barcode = formData.get('barcode') as string
    const category = formData.get('category') as string
    const tags = formData.get('tags') as string
    const notes = formData.get('notes') as string

    if (!name) return

    const { error } = await supabaseServer
      .from('products')
      .update({
        name,
        brand,
        vendor,
        sku,
        barcode,
        category,
        tags,
        notes
      })
      .eq('id', productId)
      .eq('business_id', business!.id)

    if (!error) {
      redirect('/dashboard/products')
    }
  }

  async function deleteProduct() {
    'use server'
    const supabaseServer = await createClient()
    
    const { error } = await supabaseServer
      .from('products')
      .delete()
      .eq('id', productId)
      .eq('business_id', business!.id)

    if (!error) {
      redirect('/dashboard/products')
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon" className="h-10 w-10 rounded-full">
            <Link href="/dashboard/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Edit Product</h1>
            <p className="text-slate-500 mt-1">Update details for {product.name}</p>
          </div>
        </div>
        
        <form action={deleteProduct}>
          <Button type="submit" variant="destructive" className="h-10">
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </Button>
        </form>
      </div>

      <form action={updateProduct}>
        <Card className="border-slate-200 shadow-sm overflow-hidden rounded-3xl">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
            <CardTitle className="text-lg">Product Details</CardTitle>
            <CardDescription>Update the primary information for this item.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name" className="text-slate-700">Product Name <span className="text-red-500">*</span></Label>
                <Input id="name" name="name" defaultValue={product.name} required className="h-12 bg-slate-50 border-slate-200" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brand" className="text-slate-700">Brand</Label>
                <Input id="brand" name="brand" defaultValue={product.brand || ''} className="h-12 bg-slate-50 border-slate-200" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-700">Category</Label>
                <Input id="category" name="category" defaultValue={product.category || ''} className="h-12 bg-slate-50 border-slate-200" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sku" className="text-slate-700">SKU / Item Number</Label>
                <Input id="sku" name="sku" defaultValue={product.sku || ''} className="h-12 bg-slate-50 border-slate-200" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="barcode" className="text-slate-700">UPC / Barcode</Label>
                <Input id="barcode" name="barcode" defaultValue={product.barcode || ''} className="h-12 bg-slate-50 border-slate-200" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendor" className="text-slate-700">Vendor / Manufacturer</Label>
                <Input id="vendor" name="vendor" defaultValue={product.vendor || ''} className="h-12 bg-slate-50 border-slate-200" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-slate-700">Tags (comma separated)</Label>
                <Input id="tags" name="tags" defaultValue={product.tags || ''} className="h-12 bg-slate-50 border-slate-200" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes" className="text-slate-700">Internal Notes</Label>
                <Textarea id="notes" name="notes" defaultValue={product.notes || ''} className="min-h-[100px] bg-slate-50 border-slate-200 resize-y" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <Button asChild variant="outline" className="px-6 h-12">
                <Link href="/dashboard/products">Cancel</Link>
              </Button>
              <Button type="submit" className="bg-[#61c554] hover:bg-[#4ea843] text-white px-8 h-12">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
