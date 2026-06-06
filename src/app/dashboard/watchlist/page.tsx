import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from '@/components/ui/badge'
import { Trash2, Plus, Bookmark } from 'lucide-react'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export const metadata = {
  title: 'My Watchlist - RecallGuard Canada',
}

export default async function WatchlistPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  if (user.user_metadata?.account_type !== 'individual') {
    redirect('/dashboard')
  }

  // Fetch watchlist items
  const { data: watchlistItems } = await supabase
    .from('user_watchlists')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Fetch saved recalls
  const { data: savedRecalls } = await supabase
    .from('user_saved_recalls')
    .select(`
      id,
      created_at,
      recalls (
        id,
        title,
        category,
        date_published
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  async function addWatchlistItem(formData: FormData) {
    'use server'
    const supabaseServer = await createClient()
    const { data: { user } } = await supabaseServer.auth.getUser()
    
    if (!user) return

    const item_type = formData.get('item_type') as string
    const value = formData.get('value') as string

    if (!item_type || !value) return

    await supabaseServer
      .from('user_watchlists')
      .insert({
        user_id: user.id,
        item_type,
        value: value.trim()
      })
      
    revalidatePath('/dashboard/watchlist')
    revalidatePath('/dashboard')
  }

  async function removeWatchlistItem(formData: FormData) {
    'use server'
    const supabaseServer = await createClient()
    const { data: { user } } = await supabaseServer.auth.getUser()
    
    if (!user) return

    const id = formData.get('id') as string

    await supabaseServer
      .from('user_watchlists')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
      
    revalidatePath('/dashboard/watchlist')
    revalidatePath('/dashboard')
  }

  async function removeSavedRecall(formData: FormData) {
    'use server'
    const supabaseServer = await createClient()
    const { data: { user } } = await supabaseServer.auth.getUser()
    
    if (!user) return

    const id = formData.get('id') as string

    await supabaseServer
      .from('user_saved_recalls')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
      
    revalidatePath('/dashboard/watchlist')
    revalidatePath('/dashboard')
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manage Watchlist</h1>
        <p className="text-slate-500 mt-1">Add brands, categories, or specific products you want to track for safety alerts.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="rounded-3xl shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg">Add to Watchlist</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form action={addWatchlistItem} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Type</label>
                  <Select name="item_type" defaultValue="brand">
                    <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brand">Brand (e.g., Fisher-Price)</SelectItem>
                      <SelectItem value="category">Category (e.g., Baby Toys)</SelectItem>
                      <SelectItem value="product">Specific Product (e.g., Ultra Blender Pro)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Name</label>
                  <Input name="value" placeholder="What should we watch for?" required className="h-12 bg-slate-50 border-slate-200" />
                </div>
                <Button type="submit" className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white">
                  <Plus className="h-4 w-4 mr-2" /> Add to Watchlist
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg">Currently Watching</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {(!watchlistItems || watchlistItems.length === 0) ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  Your watchlist is empty. Add items above to get started.
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {watchlistItems.map((item) => (
                    <li key={item.id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-slate-100 text-slate-600 border-0">
                          {item.item_type.charAt(0).toUpperCase() + item.item_type.slice(1)}
                        </Badge>
                        <span className="font-medium text-slate-900">{item.value}</span>
                      </div>
                      <form action={removeWatchlistItem}>
                        <input type="hidden" name="id" value={item.id} />
                        <Button type="submit" variant="ghost" size="icon" className="text-slate-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="rounded-3xl shadow-sm border-slate-200 h-full">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-amber-500" />
                Saved Recalls
              </CardTitle>
              <CardDescription>Official recalls you have bookmarked for reference.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {(!savedRecalls || savedRecalls.length === 0) ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No saved recalls yet. You can bookmark recalls from the database.
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {savedRecalls.map((saved: any) => (
                    <li key={saved.id} className="p-4 hover:bg-slate-50 flex justify-between items-start">
                      <div>
                        <div className="text-xs text-slate-400 mb-1">
                          {saved.recalls?.category || 'General'}
                        </div>
                        <a href={`/recalls/${saved.recalls?.id}`} className="font-medium text-blue-600 hover:underline line-clamp-2">
                          {saved.recalls?.title}
                        </a>
                      </div>
                      <form action={removeSavedRecall} className="ml-4">
                        <input type="hidden" name="id" value={saved.id} />
                        <Button type="submit" variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
