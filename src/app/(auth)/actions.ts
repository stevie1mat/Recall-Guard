'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

const PERSONAL_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'yahoo.com',
  'ymail.com',
  'rocketmail.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'pm.me',
  'gmx.com',
  'mail.com',
  'zoho.com',
])

export async function login(formData: FormData) {
  const supabase = await createClient()
  const next = formData.get('next') as string | null

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    const nextQuery = next ? `&next=${encodeURIComponent(next)}` : ''
    redirect(`/login?error=${encodeURIComponent(error.message)}${nextQuery}`)
  }

  revalidatePath('/', 'layout')

  if (next) {
    redirect(next)
  }

  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const plan = (formData.get('plan') as string) || 'free'
  const audience = (formData.get('audience') as string) === 'individual' ? 'individual' : 'business'
  const name = (formData.get('name') as string) || ''
  const email = (formData.get('email') as string).trim().toLowerCase()
  const confirmationNext = '/login?message=Email confirmed! You can log in now.'
  const emailRedirectTo = `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(confirmationNext)}`

  if (audience === 'business') {
    const domain = email.split('@')[1] || ''

    if (!domain || PERSONAL_EMAIL_DOMAINS.has(domain)) {
      redirect(`/signup?audience=business&plan=${encodeURIComponent(plan)}&error=${encodeURIComponent('Please use your business email address. Personal email providers like Gmail or Outlook are not allowed for business accounts.')}`)
    }
  }

  const data = {
    email,
    password: formData.get('password') as string,
    options: {
      emailRedirectTo,
      data: {
        account_type: audience,
        company_name: audience === 'business' ? name : '',
        full_name: audience === 'individual' ? name : '',
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect(`/signup?audience=${audience}&plan=${encodeURIComponent(plan)}&error=${encodeURIComponent(error.message)}`)
  }

  // If email confirmation is enabled, user will need to check their email
  redirect(`/login?message=${encodeURIComponent('Registration successful! Please check your email to verify your account.')}&next=/dashboard`)
}

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  
  // URL to redirect back to after clicking the link in the email
  const redirectUrl = `${getSiteUrl()}/auth/callback?next=/reset-password`

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  })

  if (error) {
    redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/forgot-password?message=Check your email for a password reset link.')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    redirect('/reset-password?error=Passwords do not match')
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    redirect(`/reset-password?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/login?message=Password updated successfully. Please log in with your new password.')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
