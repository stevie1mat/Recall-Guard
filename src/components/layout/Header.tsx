'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  
  if (pathname?.startsWith('/dashboard')) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-colors">
      <div className="container mx-auto flex h-20 items-center px-4 md:px-6 max-w-7xl">
        <Link href="/" className="flex items-center">
          <Image src="/logo-recall.png" alt="RecallGuard" width={160} height={40} className="h-10 w-auto object-contain" priority />
        </Link>
        
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
        
        <div className="ml-auto md:ml-8 flex items-center gap-6">
          <Link href="/login" className="text-base font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">
            Log in
          </Link>
          <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 h-12 text-base font-medium">
            <Link href="/signup">Join now</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
