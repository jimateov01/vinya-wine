'use client'

import { useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import type { WineryWithExperiences, Experience } from '@/types/database'
import { updateWineryProfile, addExperience, updateExperience, deleteExperience } from './actions'

const REGIONS = ['Penedès', 'Priorat', 'Empordà', 'Alella', 'Bages']
const EXP_TYPES = ['tasting', 'harvest', 'pairing', 'tour', 'workshop']

const STATUS_COLORS: Record<string, string> = {
  pending:  'bg-amber-100 text-amber-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
}

interface ExpFormData {
  title: string
  type: string
  duration: number
  price: number
}

const DEFAULT_EXP: ExpFormData = { title: '', type: 'tasting', duration: 2, price: 35 }

export default function BodegaClient({ winery }: { winery: WineryWithExperiences }) {
  const t = useTranslations('dashboardBodega')
  const tTypes = useTranslations('experienceTypes')
  const [pending, startTransition] = useTransition()

  // Profile form
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    name: winery.name,
    region: winery.region,
    description: winery.description ?? '',
  })

  // Experience form (null = closed, 'new' = adding, or experience id = editing)
  const [expModal, setExpModal] = useState<'new' | string | null>(null)
  const [expData, setExpData] = useState<ExpFormData>(DEFAULT_EXP)

  function openAddExp() {
    setExpData(DEFAULT_EXP)
    setExpModal('new')
  }

  function openEditExp(exp: Experience) {
    setExpData({ title: exp.title, type: exp.type, duration: exp.duration, price: Number(exp.price) })
    setExpModal(exp.id)
  }

  function handleProfileSave() {
    startTransition(async () => {
      await updateWineryProfile(winery.id, profileData)
      setEditingProfile(false)
    })
  }

  function handleExpSave() {
    startTransition(async () => {
      if (expModal === 'new') {
        await addExperience(winery.id, expData)
      } else if (expModal) {
        await updateExperience(expModal, expData)
      }
      setExpModal(null)
    })
  }

  function handleExpDelete(id: string) {
    if (!confirm(t('experiences.deleteConfirm'))) return
    startTransition(() => deleteExperience(id))
  }

  return (
    <div className="space-y-10">
      {/* Status banner */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-stone-600">{t('statusLabel')}</span>
        <span className={`text-xs font-medium px-2 py-0.5 ${STATUS_COLORS[winery.status] ?? ''}`}>
          {t(`statusValues.${winery.status}` as Parameters<typeof t>[0])}
        </span>
      </div>

      {/* ── Profile section ─────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[#2C4A3E]">
            {t('profile.heading')}
          </h2>
          {!editingProfile && (
            <button
              onClick={() => setEditingProfile(true)}
              className="text-sm text-[#C4622D] hover:underline"
            >
              {t('profile.edit')}
            </button>
          )}
        </div>

        {editingProfile ? (
          <div className="space-y-4 bg-white border border-stone-200 p-6">
            <Field label={t('profile.name')}>
              <input
                value={profileData.name}
                onChange={(e) => setProfileData((d) => ({ ...d, name: e.target.value }))}
                className="w-full border border-stone-300 px-3 py-2 focus:outline-none focus:border-[#2C4A3E]"
              />
            </Field>
            <Field label={t('profile.region')}>
              <select
                value={profileData.region}
                onChange={(e) => setProfileData((d) => ({ ...d, region: e.target.value }))}
                className="w-full border border-stone-300 px-3 py-2 focus:outline-none focus:border-[#2C4A3E] bg-white"
              >
                {REGIONS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </Field>
            <Field label={t('profile.description')}>
              <textarea
                rows={3}
                value={profileData.description}
                onChange={(e) => setProfileData((d) => ({ ...d, description: e.target.value }))}
                className="w-full border border-stone-300 px-3 py-2 focus:outline-none focus:border-[#2C4A3E] resize-none"
              />
            </Field>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleProfileSave}
                disabled={pending}
                className="bg-[#C4622D] text-white px-5 py-2 text-sm font-medium hover:bg-[#a8531f] transition-colors disabled:opacity-60"
              >
                {pending ? '...' : t('profile.save')}
              </button>
              <button
                onClick={() => setEditingProfile(false)}
                className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
              >
                {t('experiences.cancel')}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-stone-200 p-6 space-y-3">
            <InfoRow label={t('profile.name')} value={winery.name} />
            <InfoRow label={t('profile.region')} value={winery.region} />
            {winery.description && (
              <InfoRow label={t('profile.description')} value={winery.description} />
            )}
          </div>
        )}
      </section>

      {/* ── Experiences section ─────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[#2C4A3E]">
            {t('experiences.heading')}
          </h2>
          <button
            onClick={openAddExp}
            className="bg-[#2C4A3E] text-white text-sm px-4 py-2 hover:bg-[#1e3329] transition-colors"
          >
            + {t('experiences.add')}
          </button>
        </div>

        {winery.experiences.length === 0 ? (
          <p className="text-stone-500 text-sm">{t('experiences.empty')}</p>
        ) : (
          <div className="space-y-2">
            {winery.experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-white border border-stone-200 px-5 py-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-stone-800">{exp.title}</p>
                  <p className="text-sm text-stone-500 mt-0.5">
                    {tTypes(exp.type as Parameters<typeof tTypes>[0])} ·{' '}
                    {t('experiences.hours', { n: exp.duration })} · {exp.price} €
                  </p>
                </div>
                <div className="flex gap-3 shrink-0 ml-4">
                  <button
                    onClick={() => openEditExp(exp)}
                    className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
                  >
                    {t('experiences.edit')}
                  </button>
                  <button
                    onClick={() => handleExpDelete(exp.id)}
                    disabled={pending}
                    className="text-sm text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                  >
                    {t('experiences.delete')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Experience modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {expModal !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
            onClick={(e) => e.target === e.currentTarget && setExpModal(null)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white w-full max-w-md p-8"
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[#2C4A3E] mb-6">
                {expModal === 'new' ? t('experiences.add') : t('experiences.edit')}
              </h3>

              <div className="space-y-4">
                <Field label={t('experiences.titleField')}>
                  <input
                    value={expData.title}
                    onChange={(e) => setExpData((d) => ({ ...d, title: e.target.value }))}
                    className="w-full border border-stone-300 px-3 py-2 focus:outline-none focus:border-[#2C4A3E]"
                  />
                </Field>
                <Field label={t('experiences.type')}>
                  <select
                    value={expData.type}
                    onChange={(e) => setExpData((d) => ({ ...d, type: e.target.value }))}
                    className="w-full border border-stone-300 px-3 py-2 focus:outline-none focus:border-[#2C4A3E] bg-white"
                  >
                    {EXP_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {tTypes(type as Parameters<typeof tTypes>[0])}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label={t('experiences.duration')}>
                    <input
                      type="number"
                      min={1}
                      value={expData.duration}
                      onChange={(e) =>
                        setExpData((d) => ({ ...d, duration: Number(e.target.value) }))
                      }
                      className="w-full border border-stone-300 px-3 py-2 focus:outline-none focus:border-[#2C4A3E]"
                    />
                  </Field>
                  <Field label={t('experiences.price')}>
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={expData.price}
                      onChange={(e) =>
                        setExpData((d) => ({ ...d, price: Number(e.target.value) }))
                      }
                      className="w-full border border-stone-300 px-3 py-2 focus:outline-none focus:border-[#2C4A3E]"
                    />
                  </Field>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleExpSave}
                  disabled={pending || !expData.title}
                  className="bg-[#C4622D] text-white px-5 py-2 text-sm font-medium hover:bg-[#a8531f] transition-colors disabled:opacity-60"
                >
                  {pending ? '...' : t('experiences.save')}
                </button>
                <button
                  onClick={() => setExpModal(null)}
                  className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
                >
                  {t('experiences.cancel')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <span className="text-sm text-stone-500 w-32 shrink-0">{label}</span>
      <span className="text-sm text-stone-800">{value}</span>
    </div>
  )
}
