'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'

const REGIONS = [
  { key: 'penedes', seed: 'penedes-vineyard' },
  { key: 'priorat', seed: 'priorat-rocks' },
  { key: 'emporda', seed: 'emporda-sea' },
  { key: 'alella', seed: 'alella-hills' },
] as const

export function Regions() {
  const t = useTranslations('regions')

  return (
    <section id="regions" className="bg-off-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif text-deep-green text-4xl md:text-5xl text-center mb-16"
        >
          {t('heading')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
          {REGIONS.map(({ key, seed }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
            >
              <Image
                src={`https://picsum.photos/seed/${seed}/800/600`}
                alt={t(`${key}.name`)}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/80 via-deep-green/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="font-serif text-off-white text-3xl mb-2">
                  {t(`${key}.name`)}
                </h3>
                <p className="text-off-white/70 text-sm leading-relaxed">
                  {t(`${key}.tagline`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
