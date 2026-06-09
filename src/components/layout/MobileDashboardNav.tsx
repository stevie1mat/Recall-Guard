'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ShieldAlert, Home, Package, AlertTriangle, Settings, CreditCard, LogOut, Upload, Search, Bell } from 'lucide-react'
import { logout } from '@/app/(auth)/actions'
import Image from 'next/image'

type MobileDashboardNavProps = {
  accountType?: 'business' | 'individual'
}

export function MobileDashboardNav({ accountType = 'business' }: MobileDashboardNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isIndividual = accountType === 'individual'

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/98 backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100">
            <Link href="/dashboard" className="flex items-center" onClick={() => setIsOpen(false)}>
              <Image src="/logo-recall.png" alt="RecallGuard" width={140} height={32} className="h-8 w-auto object-contain" />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4">
            <nav className="space-y-2">
              <Link 
                href="/dashboard" 
                className="flex items-center rounded-2xl px-4 py-4 text-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Home className="mr-4 h-6 w-6 text-slate-400" />
                Dashboard
              </Link>
              {isIndividual ? (
                <>
                  <Link 
                    href="/recalls" 
                    className="flex items-center rounded-2xl px-4 py-4 text-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Search className="mr-4 h-6 w-6 text-slate-400" />
                    Browse Recalls
                  </Link>
                  <Link 
                    href="/recalls" 
                    className="flex items-center rounded-2xl px-4 py-4 text-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Bell className="mr-4 h-6 w-6 text-slate-400" />
                    Saved Alerts
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href="/dashboard/products" 
                    className="flex items-center rounded-2xl px-4 py-4 text-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Package className="mr-4 h-6 w-6 text-slate-400" />
                    Products
                  </Link>
                  <Link 
                    href="/dashboard/products/upload" 
                    className="flex items-center rounded-2xl px-4 py-4 text-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Upload className="mr-4 h-6 w-6 text-slate-400" />
                    CSV Upload
                  </Link>
                  <Link 
                    href="/dashboard/matches" 
                    className="flex items-center rounded-2xl px-4 py-4 text-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <AlertTriangle className="mr-4 h-6 w-6 text-slate-400" />
                    Matches
                  </Link>
                  <Link 
                    href="/dashboard/alerts" 
                    className="flex items-center rounded-2xl px-4 py-4 text-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShieldAlert className="mr-4 h-6 w-6 text-slate-400" />
                    Alerts
                  </Link>
                </>
              )}
            </nav>

            <div className="mt-8 border-t border-slate-100 pt-8">
              <nav className="space-y-2">
                {!isIndividual && (
                  <Link 
                    href="/dashboard/billing" 
                    className="flex items-center rounded-2xl px-4 py-4 text-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <CreditCard className="mr-4 h-6 w-6 text-slate-400" />
                    Billing
                  </Link>
                )}
                <Link 
                  href="/dashboard/settings" 
                  className="flex items-center rounded-2xl px-4 py-4 text-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="mr-4 h-6 w-6 text-slate-400" />
                  Settings
                </Link>
                <form action={logout}>
                  <button 
                    type="submit" 
                    className="flex w-full items-center rounded-2xl px-4 py-4 text-lg font-semibold text-slate-700 hover:bg-red-50 hover:text-red-700 text-left transition-colors"
                  >
                    <LogOut className="mr-4 h-6 w-6 text-slate-400" />
                    Log out
                  </button>
                </form>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
