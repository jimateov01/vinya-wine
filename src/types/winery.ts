export type Region = 'penedes' | 'priorat' | 'emporda' | 'alella' | 'bages'
export type ExperienceType = 'tasting' | 'harvest' | 'pairing' | 'tour' | 'workshop'
export type Locale = 'es' | 'en' | 'ca'

export interface LocalizedString {
  es: string
  en: string
  ca: string
}

export interface Experience {
  id: string
  title: LocalizedString
  duration: number
  price: number
  type: ExperienceType
}

export interface Winery {
  id: string
  slug: string
  name: string
  region: Region
  location: string
  description: LocalizedString
  experiences: Experience[]
  rating: number
  image: string
  gallery: string[]
}
