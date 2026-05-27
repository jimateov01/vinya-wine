'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="https://picsum.photos/seed/vinya-hero/1920/1080"
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-deep-green/75" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-terracotta uppercase tracking-[0.3em] text-xs font-medium mb-8"
        >
          {t('eyebrow')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="font-serif text-off-white text-5xl md:text-7xl leading-[1.1] mb-8 whitespace-pre-line"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="text-off-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.36 }}
        >
          <Link
            href="/experiences"
            className="inline-block bg-terracotta text-off-white px-12 py-4 text-xs uppercase tracking-[0.25em] font-medium hover:bg-terracotta/90 transition-colors"
          >
            {t('cta')}
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-off-white/30" />
        </motion.div>
      </div>
    </section>
  )
}
