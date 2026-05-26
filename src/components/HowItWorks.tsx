'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

type Step = {
  number: string
  title: string
  desc: string
}

export function HowItWorks() {
  const t = useTranslations('howItWorks')
  const steps = t.raw('steps') as Step[]

  return (
    <section className="bg-deep-green py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif text-off-white text-4xl md:text-5xl text-center mb-20"
        >
          {t('heading')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col"
            >
              <span className="font-serif text-terracotta text-6xl md:text-7xl leading-none mb-6">
                {step.number}
              </span>
              <div className="w-8 h-px bg-off-white/20 mb-6" />
              <h3 className="font-serif text-off-white text-2xl mb-4">
                {step.title}
              </h3>
              <p className="text-off-white/60 leading-relaxed text-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
