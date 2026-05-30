'use client'

import React, { useEffect, useState } from 'react'

// Premium product silhouettes — more refined, architecturally clean paths
const PRODUCTS = [
  // Tall slim bottle
  {
    viewPath: <path d="M48 175V108C48 96 42 88 42 78V64H58V78C58 88 52 96 52 108V175Z M44 72H56" />,
    dot: { cx: 50, cy: 148 },
    width: 100,
  },
  // Stacked boxes (two)
  {
    viewPath: <path d="M20 175V145H80V175Z M28 145V120H72V145Z M20 155H80 M28 132H72" />,
    dot: { cx: 50, cy: 130 },
    width: 100,
  },
  // Wide flat monitor/device
  {
    viewPath: <path d="M10 160V110H90V160H10Z M10 128H90 M38 175V160 M62 175V160 M28 175H72 M22 120H78" />,
    dot: { cx: 50, cy: 143 },
    width: 100,
  },
  // Jar with lid
  {
    viewPath: <path d="M30 175V118C30 108 36 102 36 102V92H64V102C64 102 70 108 70 118V175Z M30 112H70 M34 96H66" />,
    dot: { cx: 50, cy: 148 },
    width: 100,
  },
  // Spray / pump bottle
  {
    viewPath: <path d="M40 175V108H60V175Z M40 118C40 108 30 102 20 102V96H55V102 M52 96V86H68V96" />,
    dot: { cx: 50, cy: 148 },
    width: 88,
  },
  // Tall box with label lines
  {
    viewPath: <path d="M22 175V90H78V175Z M22 122H78 M32 104H68 M32 134H68 M32 148H68 M32 162H68" />,
    dot: { cx: 50, cy: 108 },
    width: 100,
  },
  // Compact cube
  {
    viewPath: <path d="M22 175V138H78V175Z M22 155H78 M50 138V175" />,
    dot: { cx: 50, cy: 158 },
    width: 100,
  },
  // Bag / pouch silhouette
  {
    viewPath: <path d="M30 175V130C30 115 35 105 50 100C65 105 70 115 70 130V175Z M38 107C38 100 44 94 50 92C56 94 62 100 62 107 M30 148H70" />,
    dot: { cx: 50, cy: 162 },
    width: 100,
  },
]

export default function AnimatedAssemblyLine() {
  const [recalledIndices, setRecalledIndices] = useState<number[]>([])

  useEffect(() => {
    const shuffleRecalls = () => {
      const indices = new Set<number>()
      while (indices.size < 2) {
        indices.add(Math.floor(Math.random() * PRODUCTS.length))
      }
      setRecalledIndices(Array.from(indices))
    }
    shuffleRecalls()
    const interval = setInterval(shuffleRecalls, 30000)
    return () => clearInterval(interval)
  }, [])

  // One tile = 100px * 8 products = 800px wide
  const TILE_W = 800

  return (
    <div className="w-full relative overflow-hidden" style={{ height: '180px' }}>

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, transparent 100%)' }} />
      {/* Left fade */}
      <div className="absolute top-0 left-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, transparent 100%)' }} />
      {/* Right fade */}
      <div className="absolute top-0 right-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, rgba(255,255,255,0.95) 0%, transparent 100%)' }} />

      {/* Scrolling strip */}
      <div className="flex w-max animate-marquee absolute bottom-0">
        {[1, 2, 3, 4, 5].map((tile) => (
          <svg
            key={tile}
            width={TILE_W}
            height="180"
            viewBox={`0 0 ${TILE_W} 180`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <defs>
              {/* Conveyor belt gradient */}
              <linearGradient id={`belt-${tile}`} x1="0" y1="175" x2={TILE_W} y2="175" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#61c554" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#61c554" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#61c554" stopOpacity="0.08" />
              </linearGradient>
              {/* Glow filter for recalled items */}
              <filter id={`glow-${tile}`} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Safe dot glow */}
              <filter id={`safe-glow-${tile}`} x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Conveyor belt surface */}
            <rect x="0" y="173" width={TILE_W} height="4" rx="2" fill={`url(#belt-${tile})`} />
            {/* Main shelf line */}
            <line x1="0" y1="175" x2={TILE_W} y2="175" stroke="#61c554" strokeWidth="1" strokeOpacity="0.25" />
            {/* Belt tick marks */}
            {Array.from({ length: 16 }).map((_, t) => (
              <line
                key={t}
                x1={t * 52 + 26}
                y1="173"
                x2={t * 52 + 26}
                y2="177"
                stroke="#61c554"
                strokeWidth="1"
                strokeOpacity="0.15"
              />
            ))}

            {/* Products */}
            {PRODUCTS.map((prod, idx) => {
              const isRecalled = recalledIndices.includes(idx)
              const xOffset = idx * (TILE_W / PRODUCTS.length) + (TILE_W / PRODUCTS.length - prod.width) / 2
              const delay = `${(idx * 0.4) % 1.8}s`

              return (
                <g key={idx} transform={`translate(${xOffset}, 0)`}>
                  {/* Product silhouette */}
                  {React.cloneElement(prod.viewPath, {
                    stroke: isRecalled ? '#f87171' : '#94a3b8',
                    strokeWidth: isRecalled ? 1.5 : 1,
                    strokeLinecap: 'round' as const,
                    strokeLinejoin: 'round' as const,
                    filter: isRecalled ? `url(#glow-${tile})` : undefined,
                    className: isRecalled ? 'animate-pulse' : '',
                    style: isRecalled ? { animationDelay: delay } : {},
                  })}

                  {/* Status indicator dot */}
                  <circle
                    cx={prod.dot.cx}
                    cy={prod.dot.cy}
                    r="4"
                    fill={isRecalled ? '#ef4444' : '#61c554'}
                    filter={`url(#safe-glow-${tile})`}
                    className={isRecalled ? 'animate-pulse' : ''}
                    style={isRecalled ? { animationDelay: delay } : {}}
                  />
                  {/* Dot ring */}
                  <circle
                    cx={prod.dot.cx}
                    cy={prod.dot.cy}
                    r="6"
                    fill="none"
                    stroke={isRecalled ? '#ef4444' : '#61c554'}
                    strokeWidth="0.75"
                    strokeOpacity="0.35"
                  />
                </g>
              )
            })}
          </svg>
        ))}
      </div>
    </div>
  )
}
