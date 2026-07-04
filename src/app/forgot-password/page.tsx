'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, ArrowLeft, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) { setError(error.message); setLoading(false) }
    else setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[#1a56db] rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-[15px] text-[#111]">ScorePath</span>
        </Link>

        <div className="bg-white rounded-2xl border border-[#e8e8e8] shadow-sm p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={20} className="text-emerald-500" />
              </div>
              <h1 className="text-xl font-bold text-[#111] mb-2">Check your email</h1>
              <p className="text-sm text-[#777] mb-5">We've sent a password reset link to <span className="font-medium text-[#111]">{email}</span></p>
              <Link href="/login" className="text-sm text-[#1a56db] font-medium hover:underline flex items-center justify-center gap-1.5">
                <ArrowLeft size={14} /> Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#111] tracking-tight mb-1">Reset your password</h1>
                <p className="text-sm text-[#777]">Enter your email to receive a reset link</p>
              </div>
              {error && <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#555] mb-1.5">Email</label>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#e0e0e0] rounded-lg text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#1a56db] transition-colors"
                  />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-[#1a56db] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1648c0] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Send Reset Link'}
                </button>
              </form>
              <div className="text-center mt-5">
                <Link href="/login" className="text-xs text-[#777] hover:text-[#111] flex items-center justify-center gap-1.5">
                  <ArrowLeft size={12} /> Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
