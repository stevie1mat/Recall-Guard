import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Add Product - RecallGuard Canada',
}

export default async function NewProductPage() {
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

  async function addProduct(formData: FormData) {
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

    const { error } = await supabaseServer.from('products').insert({
      business_id: business!.id,
      name,
      brand,
      vendor,
      sku,
      barcode,
      category,
      tags,
      notes
    })

    if (!error) {
      redirect('/dashboard/products')
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon" className="h-10 w-10 rounded-full">
          <Link href="/dashboard/products">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Add Product</h1>
          <p className="text-slate-500 mt-1">Manually enter a new product to monitor.</p>
        </div>
      </div>

      <form action={addProduct}>
        <Card className="border-slate-200 shadow-sm overflow-hidden rounded-3xl">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-6">
            <CardTitle className="text-lg">Product Details</CardTitle>
            <CardDescription>Enter the primary information for this item.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name" className="text-slate-700">Product Name <span className="text-red-500">*</span></Label>
                <Input id="name" name="name" required placeholder="e.g., Ultra Blend Pro Blender" className="h-12 bg-slate-50 border-slate-200" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brand" className="text-slate-700">Brand</Label>
                <Input id="brand" name="brand" placeholder="e.g., KitchenMaster" className="h-12 bg-slate-50 border-slate-200" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-700">Category</Label>
                <Input id="category" name="category" placeholder="e.g., Appliances" className="h-12 bg-slate-50 border-slate-200" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sku" className="text-slate-700">SKU / Item Number</Label>
                <Input id="sku" name="sku" placeholder="e.g., KM-UBP-100" className="h-12 bg-slate-50 border-slate-200" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="barcode" className="text-slate-700">UPC / Barcode</Label>
                <Input id="barcode" name="barcode" placeholder="e.g., 012345678905" className="h-12 bg-slate-50 border-slate-200" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendor" className="text-slate-700">Vendor / Manufacturer</Label>
                <Input id="vendor" name="vendor" placeholder="e.g., Home Goods Distributing" className="h-12 bg-slate-50 border-slate-200" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-slate-700">Tags (comma separated)</Label>
                <Input id="tags" name="tags" placeholder="e.g., 2023 model, clearance" className="h-12 bg-slate-50 border-slate-200" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes" className="text-slate-700">Internal Notes</Label>
                <Textarea id="notes" name="notes" placeholder="Any extra details about this product..." className="min-h-[100px] bg-slate-50 border-slate-200 resize-y" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <Button asChild variant="outline" className="px-6 h-12">
                <Link href="/dashboard/products">Cancel</Link>
              </Button>
              <Button type="submit" className="bg-[#61c554] hover:bg-[#4ea843] text-white px-8 h-12">
                <Save className="w-4 h-4 mr-2" /> Save Product
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
