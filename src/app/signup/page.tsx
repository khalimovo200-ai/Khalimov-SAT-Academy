'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Zap, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const perks = [
  'AI-powered personalized study plan',
  'Access to 4,800+ practice questions',
  'Full Digital SAT mock tests',
  'Performance analytics & insights',
]

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.replace('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] bg-[#111] px-12 py-12 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1a56db] rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-[15px] text-white">ScorePath</span>
        </Link>

        <div>
          <p className="text-3xl font-bold text-white leading-snug tracking-tight mb-6">
            Your SAT journey starts here.
          </p>
          <ul className="space-y-3">
            {perks.map(p => (
              <li key={p} className="flex items-start gap-3 text-sm text-[#aaa]">
                <CheckCircle size={15} className="text-emerald-400 mt-0.5 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 pt-8 border-t border-white/10">
          <div className="flex -space-x-2">
            {[
              'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
              'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
              'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
            ].map((src, i) => (
              <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-[#111] object-cover" />
            ))}
          </div>
          <p className="text-xs text-[#aaa]">Join 12,400+ students already improving their scores</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-[#1a56db] rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-[15px] text-[#111]">ScorePath</span>
          </Link>

          <div className="bg-white rounded-2xl border border-[#e8e8e8] shadow-sm p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#111] tracking-tight mb-1">Create your account</h1>
              <p className="text-sm text-[#777]">Free forever. No credit card required.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#555] mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  placeholder="Alex Johnson"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#e0e0e0] rounded-lg text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#1a56db] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#555] mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#e0e0e0] rounded-lg text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#1a56db] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#555] mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Min. 8 characters"
                    className="w-full px-3.5 py-2.5 pr-10 text-sm border border-[#e0e0e0] rounded-lg text-[#111] placeholder:text-[#bbb] focus:outline-none focus:border-[#1a56db] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#555]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a56db] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1648c0] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Create Account <ArrowRight size={15} /></>
                )}
              </button>
            </form>

            <p className="text-xs text-[#aaa] text-center mt-4">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-[#555] hover:underline">Terms</a> and{' '}
              <a href="#" className="text-[#555] hover:underline">Privacy Policy</a>
            </p>

            <p className="text-center text-xs text-[#777] mt-5 pt-5 border-t border-[#f0f0f0]">
              Already have an account?{' '}
              <Link href="/login" className="text-[#1a56db] font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
