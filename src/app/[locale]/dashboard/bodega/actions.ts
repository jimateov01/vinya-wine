'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function updateWineryProfile(
  wineryId: string,
  data: { name: string; region: string; description: string }
) {
  const supabase = await createClient()
  await supabase.from('wineries').update(data).eq('id', wineryId)
  revalidatePath('/dashboard/bodega')
}

export async function addExperience(
  wineryId: string,
  data: { title: string; type: string; duration: number; price: number }
) {
  const supabase = await createClient()
  await supabase.from('experiences').insert({ ...data, winery_id: wineryId })
  revalidatePath('/dashboard/bodega')
}

export async function updateExperience(
  experienceId: string,
  data: { title: string; type: string; duration: number; price: number }
) {
  const supabase = await createClient()
  await supabase.from('experiences').update(data).eq('id', experienceId)
  revalidatePath('/dashboard/bodega')
}

export async function deleteExperience(experienceId: string) {
  const supabase = await createClient()
  await supabase.from('experiences').delete().eq('id', experienceId)
  revalidatePath('/dashboard/bodega')
}
