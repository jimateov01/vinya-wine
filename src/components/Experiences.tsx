'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'

type ExperienceItem = {
  title: string
  winery: string
  hours: string
  type: string
  price: string
}

const SEEDS = ['wine-cellar-1', 'vineyard-sunset', 'wine-tasting-3']

export function Experiences() {
  const t = useTranslations('experiences')
  const items = t.raw('items') as ExperienceItem[]

  return (
    <section id="experiences" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-deep-green text-4xl md:text-5xl mb-4">
            {t('heading')}
          </h2>
          <p className="text-deep-green/60 text-lg">
            {t('subheading')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-deep-green/10">
          {items.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-white flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${SEEDS[i]}/600/450`}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 flex flex-col flex-1">
                <p className="text-terracotta text-xs uppercase tracking-widest mb-3">
                  {item.type} · {t('hours', { n: item.hours })}
                </p>
                <h3 className="font-serif text-deep-green text-2xl leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-deep-green/50 text-sm mb-6">{item.winery}</p>

                <div className="mt-auto flex items-center justify-between">
                  <p className="text-deep-green">
                    <span className="text-xs uppercase tracking-wider text-deep-green/50 mr-1">
                      {t('from')}
                    </span>
                    <span className="font-serif text-2xl">{item.price}€</span>
                  </p>
                  <a
                    href="#"
                    className="bg-terracotta text-off-white text-xs uppercase tracking-[0.2em] px-6 py-3 hover:bg-terracotta/90 transition-colors"
                  >
                    {t('book')}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
