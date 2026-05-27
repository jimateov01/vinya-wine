import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { AdminWinery, AdminBooking, AdminInquiry } from '@/types/database'
import AdminClient from './AdminClient'
import RoleSwitcher from '@/components/RoleSwitcher'

export default async function AdminPage() {
  const serverClient = await createServerClient()
  const {
    data: { user },
  } = await serverClient.auth.getUser()

  if (!user) redirect('/auth/login?redirect=/admin')

  const { data: profile } = await serverClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/')

  const adminClient = createAdminClient()

  const [{ data: wineries }, { data: bookings }, { data: inquiries }] = await Promise.all([
    adminClient
      .from('wineries')
      .select('*, profiles!owner_id(email, name)')
      .order('created_at', { ascending: false }),
    adminClient
      .from('bookings')
      .select('*, experiences(title, wineries(name)), profiles!traveler_id(email, name)')
      .order('created_at', { ascending: false }),
    adminClient
      .from('inquiries')
      .select('*, wineries(name)')
      .order('created_at', { ascending: false }),
  ])

  const t = await getTranslations('admin')

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <header className="bg-[#2C4A3E] text-white px-6 py-4 flex items-center justify-between">
        <span className="font-[family-name:var(--font-playfair)] italic text-lg">Vinya.wine</span>
        <RoleSwitcher active="admin" />
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[#2C4A3E] mb-8">
          {t('title')}
        </h1>

        <AdminClient
          wineries={(wineries as AdminWinery[]) ?? []}
          bookings={(bookings as AdminBooking[]) ?? []}
          inquiries={(inquiries as AdminInquiry[]) ?? []}
        />
      </main>
    </div>
  )
}
