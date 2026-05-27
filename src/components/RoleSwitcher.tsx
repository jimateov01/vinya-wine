'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

type View = 'admin' | 'bodega' | 'viajero'

const VIEWS: { key: View; href: string }[] = [
  { key: 'admin',   href: '/admin' },
  { key: 'bodega',  href: '/dashboard/bodega' },
  { key: 'viajero', href: '/dashboard/viajero' },
]

export default function RoleSwitcher({ active }: { active: View }) {
  const t = useTranslations('roleSwitcher')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors"
      >
        {t(active)}
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 10 6"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white shadow-lg border border-stone-100 z-50">
          {VIEWS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 text-sm transition-colors ${
                key === active
                  ? 'text-[#C4622D] font-medium bg-stone-50'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              {t(key)}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
