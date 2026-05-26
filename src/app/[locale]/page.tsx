import { Hero } from '@/components/Hero'
import { Regions } from '@/components/Regions'
import { Experiences } from '@/components/Experiences'
import { HowItWorks } from '@/components/HowItWorks'
import { WineryForm } from '@/components/WineryForm'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Regions />
      <Experiences />
      <HowItWorks />
      <WineryForm />
      <Footer />
    </>
  )
}
