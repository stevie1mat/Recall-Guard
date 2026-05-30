import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CSVUploadClient } from './CSVUploadClient'

export default async function CSVUploadPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  if (user.user_metadata?.account_type === 'individual') {
    redirect('/dashboard')
  }

  return <CSVUploadClient />
}
