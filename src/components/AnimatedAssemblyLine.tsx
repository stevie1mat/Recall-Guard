'use client'

import React, { useEffect, useState } from 'react'

const PRODUCTS = [
  // 0: Box 1
  {
    path: <path d="M30 180V130H80V180 M30 145H80" />,
    rect: { x: 50, y: 155 }
  },
  // 1: Bottle
  {
    path: <path d="M110 180V100C110 90 120 80 120 70V60H130V70C130 80 140 90 140 100V180Z" />,
    rect: { x: 120, y: 140 }
  },
  // 2: Stacked Boxes
  {
    path: <path d="M170 180V140H230V180 M180 140V110H220V140" />,
    rect: { x: 195, y: 120 }
  },
  // 3: Tin Can
  {
    path: <path d="M270 180V120H320V180 M270 130H320 M270 170H320" />,
    rect: { x: 290, y: 155 }
  },
  // 4: Monitor / Tech
  {
    path: <path d="M360 160V110H430V160H360Z M385 180V160 M405 180V160 M370 180H420" />,
    rect: { x: 390, y: 125 }
  },
  // 5: Tall Box
  {
    path: <path d="M470 180V80H520V180 M480 80L495 100L510 80" />,
    rect: { x: 490, y: 140 }
  },
  // 6: Spray Bottle
  {
    path: <path d="M560 180V110C560 100 580 90 580 90H560V80H590V90H600V110C600 110 590 130 590 180H560Z" />,
    rect: { x: 575, y: 150 }
  },
  // 7: Large Box with X
  {
    path: <path d="M630 180V120H710V180 M630 120L710 180 M630 180L710 120" />,
    rect: { x: 665, y: 145 }
  },
  // 8: Small Stack
  {
    path: <path d="M750 180V150H780V180 M750 150V130H770V150 M780 180V160H800V180" />,
    rect: { x: 760, y: 165 }
  },
  // 9: Jar
  {
    path: <path d="M840 180V120C840 110 850 100 850 100V90H890V100C890 100 900 110 900 120V180Z M840 110H900" />,
    rect: { x: 865, y: 135 }
  },
  // 10: Box 2
  {
    path: <path d="M930 180V140H980V180 M930 150H980" />,
    rect: { x: 950, y: 155 }
  }
]

export default function AnimatedAssemblyLine() {
  const [recalledIndices, setRecalledIndices] = useState<number[]>([])

  useEffect(() => {
    const shuffleRecalls = () => {
      const indices = new Set<number>()
      // Pick 3 random items to be 'recalled'
      while (indices.size < 3) {
        indices.add(Math.floor(Math.random() * PRODUCTS.length))
      }
      setRecalledIndices(Array.from(indices))
    }

    // Shuffle on mount (page reload)
    shuffleRecalls()
    
    // Reshuffle every 30 seconds (which matches the marquee loop animation time)
    const interval = setInterval(shuffleRecalls, 30000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-48 md:h-64 relative border-b border-slate-200 overflow-hidden opacity-50 flex items-end">
      <div className="flex w-max animate-marquee">
        {[1, 2, 3, 4].map((i) => (
          <svg key={i} className="w-[1000px] h-48 md:h-64 shrink-0" viewBox="0 0 1000 200" preserveAspectRatio="xMinYMax meet" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Solid Shelf/Conveyor line */}
            <path d="M0 180H1000" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Products */}
            {PRODUCTS.map((prod, idx) => {
              const isRecalled = recalledIndices.includes(idx)
              // Create a random-ish delay so they don't pulse synchronously
              const delay = ((idx * 0.3) % 2) + 's'
              
              return (
                <g key={idx}>
                  {/* The main product shape */}
                  {React.cloneElement(prod.path, {
                    stroke: isRecalled ? '#ef4444' : '#cbd5e1',
                    strokeWidth: isRecalled ? 2 : 1.5,
                    className: isRecalled ? 'animate-pulse' : '',
                    style: isRecalled ? { animationDelay: delay } : {}
                  })}
                  
                  {/* The status indicator rect (green = safe, red = recalled) */}
                  <rect 
                    x={prod.rect.x} 
                    y={prod.rect.y} 
                    width="10" 
                    height="10" 
                    fill={isRecalled ? '#ef4444' : 'var(--primary)'}
                    className={isRecalled ? 'animate-pulse' : ''}
                    style={isRecalled ? { animationDelay: delay } : {}}
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
