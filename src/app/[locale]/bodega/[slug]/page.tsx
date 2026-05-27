import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getWineryBySlug, getAllSlugs } from '@/data/wineries'
import type { Locale } from '@/types/winery'
import { Navbar } from '@/components/Navbar'
import { WineryPageClient } from '@/components/WineryPageClient'
import { Footer } from '@/components/Footer'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const winery = getWineryBySlug(slug)
  if (!winery) return {}
  return {
    title: `${winery.name} — Vinya.wine`,
    description: winery.description[locale as Locale] ?? winery.description.es,
  }
}

export default async function WineryPage({ params }: Props) {
  const { slug } = await params
  const winery = getWineryBySlug(slug)
  if (!winery) notFound()

  return (
    <>
      <Navbar />
      <WineryPageClient winery={winery} />
      <Footer />
    </>
  )
}
