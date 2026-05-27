import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { ExperiencesPageClient } from '@/components/ExperiencesPageClient'
import { Footer } from '@/components/Footer'

type Props = { params: Promise<{ locale: string }> }

const titles: Record<string, string> = {
  es: 'Experiencias de enoturismo — Vinya.wine',
  en: 'Wine Tourism Experiences — Vinya.wine',
  ca: 'Experiències d\'enoturisme — Vinya.wine',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return { title: titles[locale] ?? titles.es }
}

export default function ExperiencesPage() {
  return (
    <>
      <Navbar />
      <ExperiencesPageClient />
      <Footer />
    </>
  )
}
