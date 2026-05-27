'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const LOCALES = ['es', 'en', 'ca'] as const

export function Footer() {
  const t = useTranslations('footer')
  const currentLocale = useLocale()
  const pathname = usePathname()

  return (
    <footer className="bg-deep-green text-off-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-off-white/10">
          <div>
            <p className="font-serif text-3xl text-off-white mb-4">Vinya.wine</p>
            <p className="text-off-white/50 text-sm leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
          </div>

          <nav className="flex flex-col gap-4">
            <Link href="/experiences" className="text-off-white/60 hover:text-off-white text-sm transition-colors">
              {t('experiences')}
            </Link>
            <a href="#regions" className="text-off-white/60 hover:text-off-white text-sm transition-colors">
              {t('regions')}
            </a>
            <a href="#wineries" className="text-off-white/60 hover:text-off-white text-sm transition-colors">
              {t('forWineries')}
            </a>
            <a href="#" className="text-off-white/60 hover:text-off-white text-sm transition-colors">
              {t('about')}
            </a>
          </nav>

          <div className="flex flex-col gap-4">
            <p className="text-off-white/50 text-xs uppercase tracking-widest">Idioma / Language</p>
            <div className="flex gap-4">
              {LOCALES.map((locale) => (
                <Link
                  key={locale}
                  href={pathname}
                  locale={locale}
                  className={`text-sm uppercase tracking-widest transition-colors ${
                    currentLocale === locale
                      ? 'text-terracotta'
                      : 'text-off-white/50 hover:text-off-white'
                  }`}
                >
                  {locale}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <p className="pt-8 text-off-white/30 text-xs">
          {t('copyright')}
        </p>
      </div>
    </footer>
  )
}
