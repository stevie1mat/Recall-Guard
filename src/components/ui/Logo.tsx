import { ShieldCheck } from 'lucide-react'

type LogoProps = {
  theme?: 'light' | 'dark'
  collapsed?: boolean
  className?: string
}

export function Logo({ theme = 'light', collapsed = false, className = '' }: LogoProps) {
  const isDark = theme === 'dark'
  
  if (collapsed) {
    return (
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#61c554] to-[#4ea843] shadow-sm flex-shrink-0 ${className}`}>
        <ShieldCheck className="h-5 w-5 text-white" />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#61c554] to-[#4ea843] shadow-sm flex-shrink-0">
        <ShieldCheck className="h-5 w-5 text-white" />
      </div>
      <span className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Recall<span className="text-[#61c554]">Guard</span>
      </span>
    </div>
  )
}
