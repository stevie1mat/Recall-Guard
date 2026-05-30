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
      className={`hidden flex-col border-r border-slate-100 bg-white/60 backdrop-blur-2xl md:flex relative z-10 shadow-[4px_0_24px_rgb(0,0,0,0.02)] transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-20 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-slate-900 focus:outline-none"
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
            className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900 transition-all ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? "Dashboard" : undefined}
          >
            <Home className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-slate-400 flex-shrink-0`} />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          {isIndividual ? (
            <>
              <Link 
                href="/recalls" 
                className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900 transition-all ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "Browse Recalls" : undefined}
              >
                <Search className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-slate-400 flex-shrink-0`} />
                {!isCollapsed && <span>Browse Recalls</span>}
              </Link>
              <Link 
                href="/recalls" 
                className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900 transition-all ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "Saved Alerts" : undefined}
              >
                <Bell className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-slate-400 flex-shrink-0`} />
                {!isCollapsed && <span>Saved Alerts</span>}
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/dashboard/products" 
                className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900 transition-all ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "Products" : undefined}
              >
                <Package className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-slate-400 flex-shrink-0`} />
                {!isCollapsed && <span>Products</span>}
              </Link>
              <Link 
                href="/dashboard/products/upload" 
                className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900 transition-all ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "CSV Upload" : undefined}
              >
                <Upload className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-slate-400 flex-shrink-0`} />
                {!isCollapsed && <span>CSV Upload</span>}
              </Link>
              <Link 
                href="/dashboard/matches" 
                className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900 transition-all ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "Matches" : undefined}
              >
                <AlertTriangle className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-slate-400 flex-shrink-0`} />
                {!isCollapsed && <span>Matches</span>}
              </Link>
              <Link 
                href="/dashboard/alerts" 
                className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900 transition-all ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "Alerts" : undefined}
              >
                <ShieldAlert className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-slate-400 flex-shrink-0`} />
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
                className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900 transition-all ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "Billing" : undefined}
              >
                <CreditCard className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-slate-400 flex-shrink-0`} />
                {!isCollapsed && <span>Billing</span>}
              </Link>
            )}
            <Link 
              href="/dashboard/settings" 
              className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900 transition-all ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title={isCollapsed ? "Settings" : undefined}
            >
              <Settings className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-slate-400 flex-shrink-0`} />
              {!isCollapsed && <span>Settings</span>}
            </Link>
            <form action={logout}>
              <button 
                type="submit" 
                className={`flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-700 text-left transition-all ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? "Log out" : undefined}
              >
                <LogOut className={`${isCollapsed ? '' : 'mr-3'} h-5 w-5 text-slate-400 flex-shrink-0`} />
                {!isCollapsed && <span>Log out</span>}
              </button>
            </form>
          </nav>
        </div>
      </div>
    </div>
  )
}
