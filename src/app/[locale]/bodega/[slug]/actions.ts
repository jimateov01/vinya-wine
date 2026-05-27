'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import {
  sendBookingConfirmation,
  sendWineryBookingNotification,
} from '@/lib/email'

export interface CreateBookingInput {
  travelerName: string
  travelerEmail: string
  experienceId: string
  experienceName: string
  wineryName: string
  date: string
  guests: number
  pricePerPerson: number
}

export interface CreateBookingResult {
  success: boolean
  error?: string
}

export async function createBooking(
  input: CreateBookingInput,
): Promise<CreateBookingResult> {
  const supabase = createAdminClient()

  // Try to resolve a profile for this email so we have a valid traveler_id
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', input.travelerEmail)
    .maybeSingle()

  const { data: booking, error } = await supabase
    .from('bookings')
    .insert({
      experience_id: input.experienceId,
      traveler_id: profile?.id ?? null,
      date: input.date,
      guests: input.guests,
      status: 'pending',
    })
    .select('id')
    .single()

  if (error) {
    console.error('Booking insert error:', error)
    // FK violation means traveler_id is NOT NULL in the schema — guide user to log in
    if (error.code === '23502' || error.code === '23503') {
      return {
        success: false,
        error: 'Para reservar necesitas iniciar sesión con tu cuenta de Vinya.wine.',
      }
    }
    return { success: false, error: 'No se ha podido crear la reserva. Inténtalo de nuevo.' }
  }

  const emailData = {
    travelerName: input.travelerName,
    travelerEmail: input.travelerEmail,
    experienceName: input.experienceName,
    wineryName: input.wineryName,
    date: input.date,
    guests: input.guests,
    pricePerPerson: input.pricePerPerson,
  }

  // Send emails fire-and-forget — don't fail the booking if email fails
  await Promise.allSettled([
    sendBookingConfirmation(emailData),
    // Winery notification goes to platform inbox; in production swap for winery owner email
    sendWineryBookingNotification('reservas@vinya.app', emailData),
  ])

  console.log('Booking created:', booking.id)
  return { success: true }
}
