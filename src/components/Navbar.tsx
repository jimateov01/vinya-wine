'use client'

import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const LOCALES = ['es', 'en', 'ca'] as const

export function Navbar() {
  const currentLocale = useLocale()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-off-white/95 backdrop-blur-sm border-b border-deep-green/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-deep-green text-xl tracking-tight hover:text-terracotta transition-colors">
          Vinya.wine
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/experiences"
            className="text-xs uppercase tracking-[0.2em] text-deep-green/60 hover:text-deep-green transition-colors hidden sm:block"
          >
            Experiencias
          </Link>
          <div className="flex items-center gap-3">
            {LOCALES.map((locale) => (
              <Link
                key={locale}
                href={pathname}
                locale={locale}
                className={`text-xs uppercase tracking-widest transition-colors ${
                  currentLocale === locale
                    ? 'text-terracotta font-medium'
                    : 'text-deep-green/40 hover:text-deep-green'
                }`}
              >
                {locale}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
