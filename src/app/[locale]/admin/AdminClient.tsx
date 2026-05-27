'use client'

import { useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import type { AdminWinery, AdminBooking, AdminInquiry, WineryStatus, BookingStatus } from '@/types/database'
import { updateWineryStatus, updateBookingStatus, updateInquiryStatus } from './actions'

type Tab = 'wineries' | 'bookings' | 'inquiries'

const STATUS_COLORS: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-800',
  approved:  'bg-emerald-100 text-emerald-800',
  rejected:  'bg-red-100 text-red-800',
  confirmed: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
  new:       'bg-blue-100 text-blue-800',
  read:      'bg-stone-100 text-stone-600',
  active:    'bg-emerald-100 text-emerald-800',
  inactive:  'bg-stone-100 text-stone-600',
}

function StatusBadge({ status }: { status: string }) {
  const t = useTranslations('admin.status')
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 ${STATUS_COLORS[status] ?? 'bg-stone-100 text-stone-600'}`}>
      {t(status as Parameters<typeof t>[0])}
    </span>
  )
}

interface Props {
  wineries: AdminWinery[]
  bookings: AdminBooking[]
  inquiries: AdminInquiry[]
}

export default function AdminClient({ wineries, bookings, inquiries }: Props) {
  const t = useTranslations('admin')
  const [activeTab, setActiveTab] = useState<Tab>('wineries')
  const [pending, startTransition] = useTransition()

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'wineries', label: t('tabs.wineries'), count: wineries.length },
    { key: 'bookings', label: t('tabs.bookings'), count: bookings.length },
    { key: 'inquiries', label: t('tabs.inquiries'), count: inquiries.length },
  ]

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-0 border-b border-stone-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-[#C4622D] text-[#C4622D]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {tab.label}
            <span className="ml-2 text-xs bg-stone-100 text-stone-500 px-1.5 py-0.5">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Wineries tab */}
      {activeTab === 'wineries' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left">
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.name')}</th>
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.region')}</th>
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.owner')}</th>
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.status')}</th>
                <th className="pb-3 font-medium text-stone-600">{t('columns.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {wineries.map((w) => (
                <tr key={w.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3 pr-4 text-stone-800 font-medium">{w.name}</td>
                  <td className="py-3 pr-4 text-stone-600">{w.region}</td>
                  <td className="py-3 pr-4 text-stone-600">
                    {w.profiles?.name ?? w.profiles?.email ?? '—'}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={w.status} />
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      {w.status !== 'approved' && (
                        <ActionButton
                          label={t('approve')}
                          color="green"
                          disabled={pending}
                          onClick={() =>
                            startTransition(() => updateWineryStatus(w.id, 'approved'))
                          }
                        />
                      )}
                      {w.status !== 'rejected' && (
                        <ActionButton
                          label={t('reject')}
                          color="red"
                          disabled={pending}
                          onClick={() =>
                            startTransition(() => updateWineryStatus(w.id, 'rejected' as WineryStatus))
                          }
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bookings tab */}
      {activeTab === 'bookings' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left">
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.experience')}</th>
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.winery')}</th>
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.traveler')}</th>
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.date')}</th>
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.guests')}</th>
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.status')}</th>
                <th className="pb-3 font-medium text-stone-600">{t('columns.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3 pr-4 text-stone-800">{b.experiences?.title ?? '—'}</td>
                  <td className="py-3 pr-4 text-stone-600">{b.experiences?.wineries?.name ?? '—'}</td>
                  <td className="py-3 pr-4 text-stone-600">
                    {b.profiles?.name ?? b.profiles?.email ?? '—'}
                  </td>
                  <td className="py-3 pr-4 text-stone-600">{b.date}</td>
                  <td className="py-3 pr-4 text-stone-600">{b.guests}</td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      {b.status === 'pending' && (
                        <>
                          <ActionButton
                            label={t('confirm')}
                            color="green"
                            disabled={pending}
                            onClick={() =>
                              startTransition(() =>
                                updateBookingStatus(b.id, 'confirmed' as BookingStatus)
                              )
                            }
                          />
                          <ActionButton
                            label={t('cancel')}
                            color="red"
                            disabled={pending}
                            onClick={() =>
                              startTransition(() =>
                                updateBookingStatus(b.id, 'cancelled' as BookingStatus)
                              )
                            }
                          />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Inquiries tab */}
      {activeTab === 'inquiries' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left">
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.winery')}</th>
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.email')}</th>
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.message')}</th>
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.date')}</th>
                <th className="pb-3 pr-4 font-medium text-stone-600">{t('columns.status')}</th>
                <th className="pb-3 font-medium text-stone-600">{t('columns.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {inquiries.map((i) => (
                <tr key={i.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3 pr-4 text-stone-800">{i.wineries?.name ?? '—'}</td>
                  <td className="py-3 pr-4 text-stone-600">{i.traveler_email}</td>
                  <td className="py-3 pr-4 text-stone-500 max-w-xs truncate">{i.message}</td>
                  <td className="py-3 pr-4 text-stone-600">
                    {new Date(i.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={i.status} />
                  </td>
                  <td className="py-3">
                    {i.status === 'new' && (
                      <ActionButton
                        label={t('markRead')}
                        color="default"
                        disabled={pending}
                        onClick={() =>
                          startTransition(() => updateInquiryStatus(i.id, 'read'))
                        }
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function ActionButton({
  label,
  color,
  disabled,
  onClick,
}: {
  label: string
  color: 'green' | 'red' | 'default'
  disabled: boolean
  onClick: () => void
}) {
  const colors = {
    green: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    red: 'bg-red-700 hover:bg-red-800 text-white',
    default: 'bg-[#2C4A3E] hover:bg-[#1e3329] text-white',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-xs px-3 py-1.5 font-medium transition-colors disabled:opacity-50 ${colors[color]}`}
    >
      {label}
    </button>
  )
}
