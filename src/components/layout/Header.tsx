'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])
  
  if (pathname?.startsWith('/dashboard')) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-colors">
      <div className="container mx-auto flex h-16 sm:h-20 items-center px-4 md:px-6 max-w-7xl">
        <Link href="/" className="flex items-center">
          <Logo theme="light" />
        </Link>
        
        {/* Desktop nav */}
        <nav className="ml-auto hidden md:flex gap-8 items-center text-base font-semibold text-slate-600">
          <Link href="/recalls" className="hover:text-slate-900 transition-colors">
            Search Recalls
          </Link>
          <Link href="/pricing" className="hover:text-slate-900 transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-slate-900 transition-colors">
            About
          </Link>
        </nav>
        
        {/* Desktop actions */}
        <div className="ml-auto md:ml-8 hidden md:flex items-center gap-6">
          <Link href="/login" className="text-base font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            Log in
          </Link>
          <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 h-12 text-base font-medium">
            <Link href="/signup">Join now</Link>
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="ml-auto flex md:hidden items-center gap-3">
          <Button asChild size="sm" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 h-9 text-sm font-medium">
            <Link href="/signup">Join now</Link>
          </Button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[calc(4rem+1px)] sm:top-[calc(5rem+1px)] z-50 bg-white/98 backdrop-blur-xl">
          <nav className="flex flex-col px-6 pt-6 pb-8 gap-1">
            {[
              { label: 'Search Recalls', href: '/recalls' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'About', href: '/about' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center px-4 py-4 rounded-2xl text-lg font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="border-t border-slate-100 mt-4 pt-4">
              <Link
                href="/login"
                className="flex items-center px-4 py-4 rounded-2xl text-lg font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </Link>
            </div>
            <div className="mt-4 px-4">
              <Button asChild className="w-full bg-[#61c554] hover:bg-[#4ea843] text-white rounded-full h-14 text-lg font-semibold shadow-[0_8px_30px_rgb(97,197,84,0.3)]">
                <Link href="/signup" onClick={() => setMobileOpen(false)}>Get Started Free</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
