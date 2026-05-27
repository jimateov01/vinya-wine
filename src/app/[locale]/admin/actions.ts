'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import type { WineryStatus, BookingStatus, InquiryStatus } from '@/types/database'
import { sendWineryWelcome } from '@/lib/email'

export async function updateWineryStatus(wineryId: string, status: WineryStatus) {
  const supabase = createAdminClient()
  await supabase.from('wineries').update({ status }).eq('id', wineryId)

  if (status === 'approved') {
    const { data } = await supabase
      .from('wineries')
      .select('name, profiles(email, name)')
      .eq('id', wineryId)
      .single()

    if (data) {
      const owner = Array.isArray(data.profiles) ? data.profiles[0] : data.profiles
      if (owner?.email) {
        await sendWineryWelcome({
          wineryName: data.name,
          ownerName: owner.name ?? null,
          ownerEmail: owner.email,
        }).catch((err) => console.error('Welcome email failed:', err))
      }
    }
  }

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
