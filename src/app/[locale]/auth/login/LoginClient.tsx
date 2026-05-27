'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'

export default function LoginClient() {
  const t = useTranslations('auth.login')
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') ?? '/'

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
      },
    })

    setLoading(false)
    if (authError) {
      setError(t('error'))
    } else {
      setDone(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <a href="/" className="block mb-10 text-[#2C4A3E] font-[family-name:var(--font-playfair)] text-xl italic">
          Vinya.wine
        </a>

        <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[#2C4A3E] leading-tight">
          {done ? t('checkEmail') : t('title')}
        </h1>

        {done ? (
          <p className="mt-4 text-stone-600 leading-relaxed">{t('checkEmailDesc')}</p>
        ) : (
          <>
            <p className="mt-3 text-stone-500">{t('subtitle')}</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  {t('email')}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className="w-full border border-stone-300 px-4 py-3 text-stone-800 bg-white focus:outline-none focus:border-[#2C4A3E] transition-colors"
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C4622D] text-white px-6 py-3 font-medium tracking-wide hover:bg-[#a8531f] transition-colors disabled:opacity-60"
              >
                {loading ? '...' : t('submit')}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  )
}
