'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShieldAlert, Home, Package, AlertTriangle, Settings, CreditCard, LogOut, Upload, ChevronLeft, ChevronRight, Search, Bell } from 'lucide-react'
import { logout } from '@/app/(auth)/actions'

type DashboardSidebarProps = {
  accountType?: 'business' | 'individual'
}

export function DashboardSidebar({ accountType = 'business' }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isIndividual = accountType === 'individual'

  return (
    <div 
      className={`hidden flex-col md:flex relative z-10 shadow-[8px_0_30px_rgb(0,0,0,0.1)] transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
      style={{ background: 'linear-gradient(160deg, #0d2a14 0%, #102e18 40%, #0a2010 100%)' }}
    >
      {/* Decorative ambient light */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(97,197,84,0.15) 0%, transparent 70%)' }}></div>
      </div>
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-20 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#0d2a14] text-white/50 shadow-md hover:text-white hover:border-[#61c554]/50 hover:bg-[#102e18] transition-all focus:outline-none"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      <div className={`flex h-16 items-center px-6 mt-4 ${isCollapsed ? 'justify-center px-2' : ''}`}>
        <Link href="/dashboard" className="flex items-center">
          {isCollapsed ? (
            <Image src="/logo-recall.png" alt="RecallGuard" width={36} height={36} className="h-9 w-9 object-contain" />
          ) : (
            <Image src="/logo-recall.png" alt="RecallGuard" width={150} height={36} className="h-9 w-auto object-contain" />
          )}
        </Link>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto mt-4">
        <nav className="flex-1 space-y-2 px-4 py-4">
          <Link 
            href="/dashboard" 
            className={`flex items-center rounded-2xl px-3 py-3 text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white transition-all group relative z-10 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? "Dashboard" : undefined}
          >
            <Home className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-white/40 group-hover:text-[#61c554] transition-colors flex-shrink-0`} />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          {isIndividual ? (
            <>
              <Link 
                href="/recalls" 
                className={`flex items-center rounded-2xl px-3 py-3 text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white transition-all group relative z-10 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "Browse Recalls" : undefined}
              >
                <Search className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-white/40 group-hover:text-[#61c554] transition-colors flex-shrink-0`} />
                {!isCollapsed && <span>Browse Recalls</span>}
              </Link>
              <Link 
                href="/recalls" 
                className={`flex items-center rounded-2xl px-3 py-3 text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white transition-all group relative z-10 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "Saved Alerts" : undefined}
              >
                <Bell className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-white/40 group-hover:text-[#61c554] transition-colors flex-shrink-0`} />
                {!isCollapsed && <span>Saved Alerts</span>}
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/dashboard/products" 
                className={`flex items-center rounded-2xl px-3 py-3 text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white transition-all group relative z-10 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "Products" : undefined}
              >
                <Package className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-white/40 group-hover:text-[#61c554] transition-colors flex-shrink-0`} />
                {!isCollapsed && <span>Products</span>}
              </Link>
              <Link 
                href="/dashboard/products/upload" 
                className={`flex items-center rounded-2xl px-3 py-3 text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white transition-all group relative z-10 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "CSV Upload" : undefined}
              >
                <Upload className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-white/40 group-hover:text-[#61c554] transition-colors flex-shrink-0`} />
                {!isCollapsed && <span>CSV Upload</span>}
              </Link>
              <Link 
                href="/dashboard/matches" 
                className={`flex items-center rounded-2xl px-3 py-3 text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white transition-all group relative z-10 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "Matches" : undefined}
              >
                <AlertTriangle className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-white/40 group-hover:text-[#61c554] transition-colors flex-shrink-0`} />
                {!isCollapsed && <span>Matches</span>}
              </Link>
              <Link 
                href="/dashboard/alerts" 
                className={`flex items-center rounded-2xl px-3 py-3 text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white transition-all group relative z-10 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "Alerts" : undefined}
              >
                <ShieldAlert className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-white/40 group-hover:text-[#61c554] transition-colors flex-shrink-0`} />
                {!isCollapsed && <span>Alerts</span>}
              </Link>
            </>
          )}
        </nav>
        
        <div className="p-4 mb-4">
          <nav className="space-y-2">
            {!isIndividual && (
              <Link 
                href="/dashboard/billing" 
                className={`flex items-center rounded-2xl px-3 py-3 text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white transition-all group relative z-10 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "Billing" : undefined}
              >
                <CreditCard className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-white/40 group-hover:text-[#61c554] transition-colors flex-shrink-0`} />
                {!isCollapsed && <span>Billing</span>}
              </Link>
            )}
            <Link 
              href="/dashboard/settings" 
              className={`flex items-center rounded-2xl px-3 py-3 text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white transition-all group relative z-10 ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title={isCollapsed ? "Settings" : undefined}
            >
              <Settings className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-white/40 group-hover:text-[#61c554] transition-colors flex-shrink-0`} />
              {!isCollapsed && <span>Settings</span>}
            </Link>
            <form action={logout}>
              <button 
                type="submit" 
                className={`flex w-full items-center rounded-2xl px-3 py-3 text-sm font-semibold text-white/60 hover:bg-red-900/30 hover:text-red-400 text-left transition-all group relative z-10 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "Log out" : undefined}
              >
                <LogOut className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-white/40 group-hover:text-red-400 transition-colors flex-shrink-0`} />
                {!isCollapsed && <span>Log out</span>}
              </button>
            </form>
          </nav>
        </div>
      </div>
    </div>
  )
}
