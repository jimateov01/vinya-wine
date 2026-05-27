import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/server'
import type { BookingWithDetails } from '@/types/database'

const STATUS_COLORS: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-800',
  confirmed: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-stone-100 text-stone-500',
}

export default async function ViajeroPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login?redirect=/dashboard/viajero')

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, email')
    .eq('id', user.id)
    .single()

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, experiences(title, wineries(name))')
    .eq('traveler_id', user.id)
    .order('created_at', { ascending: false })

  const t = await getTranslations('dashboardViajero')

  const typedBookings = (bookings as BookingWithDetails[]) ?? []

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <header className="bg-[#2C4A3E] text-white px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-[family-name:var(--font-playfair)] italic text-lg">
          Vinya.wine
        </a>
        <span className="text-sm opacity-70">{profile?.name ?? profile?.email}</span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[#2C4A3E] mb-8">
          {t('title')}
        </h1>

        {typedBookings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-stone-500 mb-6">{t('empty')}</p>
            <Link
              href="/experiences"
              className="inline-block bg-[#C4622D] text-white px-6 py-3 text-sm font-medium hover:bg-[#a8531f] transition-colors"
            >
              {t('browseLink')}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {typedBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-stone-200 px-6 py-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-stone-800">
                      {booking.experiences?.title ?? '—'}
                    </p>
                    <p className="text-sm text-stone-500 mt-0.5">
                      {booking.experiences?.wineries?.name ?? '—'}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 shrink-0 ${
                      STATUS_COLORS[booking.status] ?? 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {t(`status.${booking.status}` as Parameters<typeof t>[0])}
                  </span>
                </div>

                <div className="flex gap-6 mt-4 text-sm text-stone-500">
                  <span>
                    <span className="text-stone-400">{t('date')} </span>
                    {booking.date}
                  </span>
                  <span>
                    {t('guests', { n: booking.guests })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
