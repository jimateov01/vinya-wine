import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import type { WineryWithExperiences } from '@/types/database'
import BodegaClient from './BodegaClient'
import RoleSwitcher from '@/components/RoleSwitcher'

export default async function BodegaPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login?redirect=/dashboard/bodega')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, name, email')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/')

  const { data: winery } = await supabase
    .from('wineries')
    .select('*, experiences(*)')
    .eq('owner_id', user.id)
    .order('created_at', { foreignTable: 'experiences', ascending: false })
    .single()

  const t = await getTranslations('dashboardBodega')

  if (profile.role !== 'winery' && profile.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4">
        <p className="text-stone-600 text-center max-w-sm">{t('noAccess')}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <header className="bg-[#2C4A3E] text-white px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-[family-name:var(--font-playfair)] italic text-lg">
          Vinya.wine
        </a>
        <div className="flex items-center gap-4">
          <RoleSwitcher active="bodega" />
          <span className="text-sm opacity-70">{profile.name ?? profile.email}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[#2C4A3E] mb-8">
          {t('title')}
        </h1>

        {winery ? (
          <BodegaClient winery={winery as WineryWithExperiences} />
        ) : (
          <p className="text-stone-600">{t('noWinery')}</p>
        )}
      </main>
    </div>
  )
}
