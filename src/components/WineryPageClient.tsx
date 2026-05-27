'use client'

import { useState, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Winery, Locale, Experience } from '@/types/winery'

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating)
        const half = !filled && i < rating
        return (
          <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
            {filled ? (
              <path
                fill="#C4622D"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            ) : half ? (
              <>
                <path
                  fill="#C4622D"
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z"
                />
                <path
                  fill="#C4622D"
                  fillOpacity="0.2"
                  d="M12 2l-3.09 6.26L2 9.27l5 4.87-1.18 6.88L12 17.77V2z"
                />
              </>
            ) : (
              <path
                fill="#C4622D"
                fillOpacity="0.15"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            )}
          </svg>
        )
      })}
      <span className="text-xs text-deep-green/50 ml-1">{rating.toFixed(1)}</span>
    </span>
  )
}

type BookingFormProps = {
  experience: Experience
  winery: Winery
  locale: Locale
  onClose: () => void
}

function BookingForm({ experience, winery, locale, onClose }: BookingFormProps) {
  const t = useTranslations('wineryPage')
  const tTypes = useTranslations('experienceTypes')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
    >
      <div className="absolute inset-0 bg-deep-green/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md z-10 shadow-2xl">
        <div className="bg-deep-green text-off-white px-8 py-6">
          <p className="text-terracotta text-xs uppercase tracking-widest mb-1">
            {tTypes(experience.type)} · {t('hours', { n: experience.duration })}
          </p>
          <h3 className="font-serif text-2xl">{experience.title[locale]}</h3>
          <p className="text-off-white/50 text-sm mt-1">{winery.name}</p>
        </div>

        <div className="px-8 py-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-terracotta/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-serif text-deep-green text-xl mb-2">{t('bookingSuccess')}</p>
              <button
                onClick={onClose}
                className="mt-4 text-xs uppercase tracking-widest text-deep-green/50 hover:text-deep-green transition-colors"
              >
                {t('bookingClose')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-deep-green/50 mb-1.5">
                  {t('bookingName')}
                </label>
                <input
                  required
                  type="text"
                  className="w-full border border-deep-green/20 px-4 py-3 text-deep-green text-sm focus:outline-none focus:border-terracotta bg-off-white"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-deep-green/50 mb-1.5">
                  {t('bookingEmail')}
                </label>
                <input
                  required
                  type="email"
                  className="w-full border border-deep-green/20 px-4 py-3 text-deep-green text-sm focus:outline-none focus:border-terracotta bg-off-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-deep-green/50 mb-1.5">
                    {t('bookingDate')}
                  </label>
                  <input
                    required
                    type="date"
                    className="w-full border border-deep-green/20 px-4 py-3 text-deep-green text-sm focus:outline-none focus:border-terracotta bg-off-white"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-deep-green/50 mb-1.5">
                    {t('bookingGuests')}
                  </label>
                  <input
                    required
                    type="number"
                    min={1}
                    max={20}
                    defaultValue={2}
                    className="w-full border border-deep-green/20 px-4 py-3 text-deep-green text-sm focus:outline-none focus:border-terracotta bg-off-white"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-terracotta text-off-white text-xs uppercase tracking-[0.25em] py-4 hover:bg-terracotta/90 transition-colors mt-2"
              >
                {t('bookingSubmit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function WineryPageClient({ winery }: { winery: Winery }) {
  const t = useTranslations('wineryPage')
  const tTypes = useTranslations('experienceTypes')
  const tRegions = useTranslations('regions')
  const locale = useLocale() as Locale
  const bookRef = useRef<HTMLElement>(null)

  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)

  function handleBook(exp: Experience) {
    setSelectedExperience(exp)
  }

  return (
    <>
      {selectedExperience && (
        <BookingForm
          experience={selectedExperience}
          winery={winery}
          locale={locale}
          onClose={() => setSelectedExperience(null)}
        />
      )}

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <Image
          src={winery.image}
          alt={winery.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-green/80 via-deep-green/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/experiences"
              className="inline-flex items-center gap-2 text-off-white/60 hover:text-off-white text-xs uppercase tracking-widest mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M19 12H5m7-7l-7 7 7 7" />
              </svg>
              {t('back')}
            </Link>
            <span className="inline-block bg-terracotta text-off-white text-[10px] uppercase tracking-widest px-3 py-1.5 mb-4">
              {tRegions(`${winery.region}.name`)}
            </span>
            <h1 className="font-serif text-off-white text-4xl md:text-6xl mb-3">{winery.name}</h1>
            <div className="flex items-center gap-4 text-off-white/60 text-sm">
              <StarRating rating={winery.rating} />
              <span>·</span>
              <span>{winery.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <p className="text-deep-green/80 text-lg leading-relaxed">
              {winery.description[locale]}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="border-l-2 border-terracotta pl-5">
              <p className="text-xs uppercase tracking-widest text-deep-green/40 mb-1">{t('rating')}</p>
              <StarRating rating={winery.rating} />
            </div>
            <div className="border-l-2 border-terracotta/30 pl-5">
              <p className="text-xs uppercase tracking-widest text-deep-green/40 mb-1">
                {tRegions(`${winery.region}.name`)}
              </p>
              <p className="text-deep-green text-sm">{winery.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-off-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-deep-green text-3xl mb-8">{t('gallery')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-deep-green/10">
            {winery.gallery.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative aspect-square overflow-hidden bg-white"
              >
                <Image
                  src={src}
                  alt={`${winery.name} ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section ref={bookRef} id="book" className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-deep-green text-3xl mb-10">{t('experiences')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-deep-green/10">
            {winery.experiences.map((exp, i) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 flex flex-col gap-5"
              >
                <div>
                  <p className="text-terracotta text-xs uppercase tracking-widest mb-3">
                    {tTypes(exp.type)} · {t('hours', { n: exp.duration })}
                  </p>
                  <h3 className="font-serif text-deep-green text-2xl leading-snug">
                    {exp.title[locale]}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-deep-green/10">
                  <p className="text-deep-green">
                    <span className="text-xs uppercase tracking-wider text-deep-green/40 mr-1">
                      {t('from')}
                    </span>
                    <span className="font-serif text-3xl">{exp.price}€</span>
                  </p>
                  <button
                    onClick={() => handleBook(exp)}
                    className="bg-terracotta text-off-white text-xs uppercase tracking-[0.25em] px-8 py-4 hover:bg-terracotta/90 transition-colors"
                  >
                    {t('book')}
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
