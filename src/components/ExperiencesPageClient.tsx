'use client'

import { useState, useMemo } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { wineries } from '@/data/wineries'
import type { Region, ExperienceType, Locale } from '@/types/winery'

type PriceFilter = 'all' | '0-30' | '30-60' | '60+'

const REGIONS: Region[] = ['penedes', 'priorat', 'emporda', 'alella', 'bages']
const TYPES: ExperienceType[] = ['tasting', 'harvest', 'pairing', 'tour', 'workshop']

const selectClass =
  'border border-deep-green/20 bg-off-white text-deep-green text-xs uppercase tracking-wider px-4 py-3 focus:outline-none focus:border-terracotta cursor-pointer appearance-none pr-8 bg-no-repeat bg-[right_0.75rem_center] bg-[length:1em_1em]'

export function ExperiencesPageClient() {
  const t = useTranslations('experiencesPage')
  const tTypes = useTranslations('experienceTypes')
  const tRegions = useTranslations('regions')
  const locale = useLocale() as Locale

  const [search, setSearch] = useState('')
  const [regionFilter, setRegionFilter] = useState<Region | 'all'>('all')
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all')
  const [typeFilter, setTypeFilter] = useState<ExperienceType | 'all'>('all')

  const allItems = useMemo(
    () =>
      wineries.flatMap((winery) =>
        winery.experiences.map((exp, idx) => ({ winery, exp, idx }))
      ),
    []
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return allItems.filter(({ winery, exp }) => {
      if (
        q &&
        !winery.name.toLowerCase().includes(q) &&
        !exp.title[locale].toLowerCase().includes(q)
      ) {
        return false
      }
      if (regionFilter !== 'all' && winery.region !== regionFilter) return false
      if (typeFilter !== 'all' && exp.type !== typeFilter) return false
      if (priceFilter === '0-30' && exp.price > 30) return false
      if (priceFilter === '30-60' && (exp.price < 30 || exp.price > 60)) return false
      if (priceFilter === '60+' && exp.price < 60) return false
      return true
    })
  }, [allItems, search, regionFilter, priceFilter, typeFilter, locale])

  return (
    <main className="min-h-screen bg-off-white">
      {/* Page header */}
      <section className="bg-deep-green text-off-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-terracotta uppercase tracking-[0.3em] text-xs mb-5"
          >
            Vinya.wine
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl mb-4"
          >
            {t('heading')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-off-white/60 text-lg"
          >
            {t('subheading')}
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-white border-b border-deep-green/10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-deep-green/40 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth={1.5}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="search"
              placeholder={t('searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-deep-green/20 bg-off-white text-deep-green text-xs uppercase tracking-wider pl-9 pr-4 py-3 focus:outline-none focus:border-terracotta placeholder:normal-case placeholder:tracking-normal"
            />
          </div>

          {/* Region */}
          <div className="relative">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value as Region | 'all')}
              className={selectClass}
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%232C4A3E' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")" }}
            >
              <option value="all">{t('allRegions')}</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {tRegions(`${r}.name`)}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as ExperienceType | 'all')}
              className={selectClass}
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%232C4A3E' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")" }}
            >
              <option value="all">{t('allTypes')}</option>
              {TYPES.map((type) => (
                <option key={type} value={type}>
                  {tTypes(type)}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="relative">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as PriceFilter)}
              className={selectClass}
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%232C4A3E' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")" }}
            >
              <option value="all">{t('priceAll')}</option>
              <option value="0-30">{t('price0')}</option>
              <option value="30-60">{t('price30')}</option>
              <option value="60+">{t('price60')}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-deep-green/50 text-center py-24 text-lg"
            >
              {t('noResults')}
            </motion.p>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-deep-green/10"
            >
              {filtered.map(({ winery, exp, idx }, i) => (
                <motion.article
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.4) }}
                  className="bg-white flex flex-col group"
                >
                  <Link href={`/bodega/${winery.slug}`} className="block relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={winery.gallery[idx % winery.gallery.length]}
                      alt={exp.title[locale]}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute top-4 left-4 bg-deep-green text-off-white text-[10px] uppercase tracking-widest px-3 py-1.5">
                      {tRegions(`${winery.region}.name`)}
                    </span>
                  </Link>

                  <div className="p-7 flex flex-col flex-1">
                    <p className="text-terracotta text-xs uppercase tracking-widest mb-3">
                      {tTypes(exp.type)} · {t('hours', { n: exp.duration })}
                    </p>
                    <h2 className="font-serif text-deep-green text-xl leading-snug mb-2">
                      {exp.title[locale]}
                    </h2>
                    <Link
                      href={`/bodega/${winery.slug}`}
                      className="text-deep-green/50 text-sm mb-6 hover:text-terracotta transition-colors"
                    >
                      {winery.name} · {winery.location}
                    </Link>

                    <div className="mt-auto flex items-center justify-between gap-4">
                      <p className="text-deep-green shrink-0">
                        <span className="text-xs uppercase tracking-wider text-deep-green/40 mr-1">
                          {t('from')}
                        </span>
                        <span className="font-serif text-2xl">{exp.price}€</span>
                      </p>
                      <Link
                        href={`/bodega/${winery.slug}#book`}
                        className="bg-terracotta text-off-white text-xs uppercase tracking-[0.2em] px-6 py-3 hover:bg-terracotta/90 transition-colors whitespace-nowrap"
                      >
                        {t('book')}
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  )
}
