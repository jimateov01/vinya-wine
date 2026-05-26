'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const REGIONS = ['Penedès', 'Priorat', 'Empordà', 'Alella', 'Bages']

type FormState = {
  name: string
  winery: string
  email: string
  region: string
}

export function WineryForm() {
  const t = useTranslations('wineryForm')
  const [form, setForm] = useState<FormState>({ name: '', winery: '', email: '', region: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="wineries" className="bg-off-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-deep-green text-4xl md:text-5xl leading-tight mb-8">
              {t('heading')}
            </h2>
            <p className="text-deep-green/70 leading-relaxed mb-8 text-lg">
              {t('pitch')}
            </p>
            <p className="text-terracotta text-xs uppercase tracking-[0.25em]">
              {t('note')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-deep-green text-2xl leading-relaxed"
              >
                {t('success')}
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                  <label className="text-deep-green/50 text-xs uppercase tracking-widest">
                    {t('name')}
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('namePlaceholder')}
                    className="bg-transparent border-b border-deep-green/25 focus:border-terracotta focus:outline-none py-3 text-deep-green placeholder-deep-green/30 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-deep-green/50 text-xs uppercase tracking-widest">
                    {t('wineryName')}
                  </label>
                  <input
                    name="winery"
                    type="text"
                    required
                    value={form.winery}
                    onChange={handleChange}
                    placeholder={t('wineryPlaceholder')}
                    className="bg-transparent border-b border-deep-green/25 focus:border-terracotta focus:outline-none py-3 text-deep-green placeholder-deep-green/30 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-deep-green/50 text-xs uppercase tracking-widest">
                    {t('email')}
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('emailPlaceholder')}
                    className="bg-transparent border-b border-deep-green/25 focus:border-terracotta focus:outline-none py-3 text-deep-green placeholder-deep-green/30 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-deep-green/50 text-xs uppercase tracking-widest">
                    {t('region')}
                  </label>
                  <select
                    name="region"
                    required
                    value={form.region}
                    onChange={handleChange}
                    className="bg-transparent border-b border-deep-green/25 focus:border-terracotta focus:outline-none py-3 text-deep-green transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-deep-green/30">
                      {t('regionPlaceholder')}
                    </option>
                    {REGIONS.map((r) => (
                      <option key={r} value={r} className="text-deep-green">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-terracotta text-off-white text-xs uppercase tracking-[0.25em] py-4 px-8 hover:bg-terracotta/90 transition-colors mt-2 self-start"
                >
                  {t('submit')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
