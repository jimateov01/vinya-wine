export type Role = 'admin' | 'winery' | 'traveler'
export type WineryStatus = 'pending' | 'approved' | 'rejected'
export type ExperienceStatus = 'active' | 'inactive'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'
export type InquiryStatus = 'new' | 'read'

export interface Profile {
  id: string
  role: Role
  email: string
  name: string | null
  created_at: string
}

export interface Winery {
  id: string
  owner_id: string
  name: string
  region: string
  description: string | null
  status: WineryStatus
  created_at: string
}

export interface Experience {
  id: string
  winery_id: string
  title: string
  type: string
  duration: number
  price: number
  status: ExperienceStatus
  created_at: string
}

export interface Booking {
  id: string
  experience_id: string
  traveler_id: string
  date: string
  guests: number
  status: BookingStatus
  created_at: string
}

export interface Inquiry {
  id: string
  winery_id: string | null
  traveler_email: string
  message: string
  status: InquiryStatus
  created_at: string
}

// ─── Joined types for dashboard queries ───────────────────────────────────────

export interface AdminWinery extends Winery {
  profiles: { email: string; name: string | null } | null
}

export interface AdminBooking extends Booking {
  experiences: {
    title: string
    wineries: { name: string } | null
  } | null
  profiles: { email: string; name: string | null } | null
}

export interface AdminInquiry extends Inquiry {
  wineries: { name: string } | null
}

export interface WineryWithExperiences extends Winery {
  experiences: Experience[]
}

export interface BookingWithDetails extends Booking {
  experiences: {
    title: string
    wineries: { name: string } | null
  } | null
}
