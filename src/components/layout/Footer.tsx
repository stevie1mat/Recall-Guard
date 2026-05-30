import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-slate-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 mb-4">
              <ShieldAlert className="h-6 w-6 text-blue-600" />
              <span>RecallGuard Canada</span>
            </Link>
            <p className="text-sm text-slate-500 mb-6 max-w-xs">
              Monitor Canadian recalls against your product list and protect your business and customers.
            </p>
            <div className="text-xs text-slate-400 p-4 bg-white rounded-lg border border-slate-200">
              <p className="font-semibold mb-1 text-slate-500">Disclaimer</p>
              This website is not affiliated with the Government of Canada. Recall data is sourced from Government of Canada open data. Users should always confirm details on the official recall page.
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="/recalls" className="hover:text-blue-600 transition-colors">Search Recalls</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-600 transition-colors">Business Dashboard</Link></li>
              <li><Link href="/login" className="hover:text-blue-600 transition-colors">Log in</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Categories</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="/recalls/category/food" className="hover:text-blue-600 transition-colors">Food Recalls</Link></li>
              <li><Link href="/recalls/category/baby" className="hover:text-blue-600 transition-colors">Baby Products</Link></li>
              <li><Link href="/recalls/category/health" className="hover:text-blue-600 transition-colors">Health Products</Link></li>
              <li><Link href="/recalls/category/pet" className="hover:text-blue-600 transition-colors">Pet Food</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} RecallGuard Canada. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
