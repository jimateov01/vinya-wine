'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import type { WineryStatus, BookingStatus, InquiryStatus } from '@/types/database'

export async function updateWineryStatus(wineryId: string, status: WineryStatus) {
  const supabase = createAdminClient()
  await supabase.from('wineries').update({ status }).eq('id', wineryId)
  revalidatePath('/admin')
}

export async function updateBookingStatus(bookingId: string, status: BookingStatus) {
  const supabase = createAdminClient()
  await supabase.from('bookings').update({ status }).eq('id', bookingId)
  revalidatePath('/admin')
}

export async function updateInquiryStatus(inquiryId: string, status: InquiryStatus) {
  const supabase = createAdminClient()
  await supabase.from('inquiries').update({ status }).eq('id', inquiryId)
  revalidatePath('/admin')
}
