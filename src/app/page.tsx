'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Zap, ChevronRight, ArrowRight, Bot, BarChart2, BookOpen,
  Target, Users, Video, CheckCircle, Star, Trophy, Flame,
  BookMarked, HelpCircle, FileText, Brain, TrendingUp,
  Shield, Clock, Menu, X
} from 'lucide-react'

const stats = [
  { value: '12,400+', label: 'Active Students' },
  { value: '+187', label: 'Avg Score Improvement' },
  { value: '4,800+', label: 'Practice Questions' },
  { value: '98.2%', label: 'Student Satisfaction' },
]

const features = [
  {
    icon: Brain,
    title: 'Adaptive Learning',
    description: 'Our AI adjusts question difficulty based on your performance, ensuring you always train at the right level.',
  },
  {
    icon: Bot,
    title: 'AI Tutor',
    description: 'Ask anything. Get instant explanations, strategy tips, and personalized study plans from your AI mentor.',
  },
  {
    icon: BarChart2,
    title: 'Deep Analytics',
    description: 'Understand exactly where you stand. Track every domain, identify weak spots, and predict your official score.',
  },
  {
    icon: Target,
    title: 'Personal Study Plans',
    description: 'Get a customized roadmap based on your goal score, exam date, and available study time.',
  },
  {
    icon: FileText,
    title: 'Full Mock Tests',
    description: 'Realistic Digital SAT simulations with instant scoring, review tools, and score improvement tracking.',
  },
  {
    icon: BookMarked,
    title: 'Mistake Notebook',
    description: 'Every missed question is automatically saved. Review, annotate, and master your weak areas.',
  },
  {
    icon: Video,
    title: 'Live Classes',
    description: 'Join expert-led live sessions, watch recordings, and attend office hours at your convenience.',
  },
  {
    icon: Users,
    title: 'Student Community',
    description: 'Connect with thousands of fellow test-takers, share strategies, and stay motivated together.',
  },
]

const testimonials = [
  {
    name: 'Ava Chen',
    score: '1560',
    improvement: '+240',
    text: 'ScorePath changed everything. The AI tutor explained concepts in ways my textbooks never did. I went from 1320 to 1560 in three months.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    name: 'Marcus Williams',
    score: '1520',
    improvement: '+190',
    text: 'The mock tests felt exactly like the real thing. The analytics showed me my weakest areas and the courses fixed them fast.',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    name: 'Sofia Patel',
    score: '1580',
    improvement: '+210',
    text: "I loved the mistake notebook. Instead of just moving on, I actually understood my errors. That's what got me to 1580.",
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
]

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with the basics',
    features: ['10 practice questions/day', 'Basic analytics', '2 free lessons', 'Community access'],
    cta: 'Start Free',
    href: '/signup',
    accent: false,
  },
  {
    name: 'Premium',
    price: '$29',
    period: 'per month',
    description: 'Everything you need to score higher',
    features: ['Unlimited practice', 'Full mock tests', 'AI Tutor', 'All courses', 'Deep analytics', 'Mistake notebook', 'Live classes'],
    cta: 'Start Premium',
    href: '/signup',
    accent: true,
    badge: 'Most Popular',
  },
  {
    name: 'VIP Mentorship',
    price: '$199',
    period: 'per month',
    description: 'One-on-one expert coaching',
    features: ['Everything in Premium', '4 tutoring sessions/month', 'Personal study plan', 'Priority support', 'Score guarantee'],
    cta: 'Apply Now',
    href: '/signup',
    accent: false,
  },
]

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-[#f0f0f0] shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1a56db] rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-[15px] text-[#111]">ScorePath</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-[#555] hover:text-[#111] transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-[#555] hover:text-[#111] transition-colors">Pricing</a>
          <a href="#testimonials" className="text-sm text-[#555] hover:text-[#111] transition-colors">Results</a>
          <Link href="/login" className="text-sm text-[#555] hover:text-[#111] transition-colors">Sign In</Link>
          <Link
            href="/signup"
            className="bg-[#1a56db] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1648c0] transition-colors"
          >
            Start Free
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#333]">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#f0f0f0] px-6 py-4 space-y-4">
          <a href="#features" onClick={() => setMobileOpen(false)} className="block text-sm text-[#555]">Features</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)} className="block text-sm text-[#555]">Pricing</a>
          <a href="#testimonials" onClick={() => setMobileOpen(false)} className="block text-sm text-[#555]">Results</a>
          <Link href="/login" className="block text-sm text-[#555]">Sign In</Link>
          <Link href="/signup" className="block w-full bg-[#1a56db] text-white px-4 py-2.5 rounded-lg text-sm font-medium text-center">
            Start Free
          </Link>
        </div>
      )}
    </nav>
  )
}

function DashboardMockup() {
  return (
    <div className="bg-white rounded-2xl border border-[#e8e8e8] shadow-2xl shadow-black/8 p-5 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-[#777]">Predicted Score</p>
          <p className="text-2xl font-bold text-[#111]">1,420 <span className="text-sm font-normal text-emerald-600">+80</span></p>
        </div>
        <div className="w-10 h-10 bg-[#eff6ff] rounded-xl flex items-center justify-center">
          <TrendingUp size={18} className="text-[#1a56db]" />
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {[
          { label: 'Math', pct: 82, color: '#1a56db' },
          { label: 'Reading', pct: 74, color: '#047857' },
          { label: 'Writing', pct: 68, color: '#7c3aed' },
        ].map(s => (
          <div key={s.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#555]">{s.label}</span>
              <span className="font-medium text-[#111]">{s.pct}%</span>
            </div>
            <div className="h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'Streak', value: '12 days', icon: '🔥' },
          { label: 'Questions', value: '847', icon: '✅' },
          { label: 'XP', value: '4,200', icon: '⚡' },
        ].map(s => (
          <div key={s.label} className="bg-[#f9f9f9] rounded-lg p-2 text-center">
            <p className="text-base">{s.icon}</p>
            <p className="text-xs font-semibold text-[#111] mt-0.5">{s.value}</p>
            <p className="text-[10px] text-[#999]">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#eff6ff] rounded-lg p-3">
        <p className="text-xs font-semibold text-[#1a56db] mb-1">Today's Plan</p>
        <div className="space-y-1.5">
          {['Linear equations — 15 mins', 'Reading passage #3 — 20 mins', 'Grammar drill — 10 mins'].map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-[#333]">
              <div className={`w-3.5 h-3.5 rounded-full border ${i === 0 ? 'border-[#1a56db] bg-[#1a56db]' : 'border-[#ccc]'} flex items-center justify-center`}>
                {i === 0 && <CheckCircle size={10} className="text-white" />}
              </div>
              <span className={i === 0 ? 'line-through text-[#aaa]' : ''}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-[#eff6ff] text-[#1a56db] px-3 py-1.5 rounded-full text-xs font-semibold mb-6">
              <Zap size={12} />
              Digital SAT Prep Platform
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#111] leading-[1.1] tracking-tight mb-6">
              Score higher.<br />
              <span className="text-[#1a56db]">Study smarter.</span>
            </h1>
            <p className="text-lg text-[#555] leading-relaxed mb-8 max-w-md">
              ScorePath combines AI tutoring, adaptive practice, live classes, and deep analytics into one premium SAT preparation experience.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-[#1a56db] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#1648c0] transition-colors shadow-sm"
              >
                Start Learning Free
                <ArrowRight size={16} />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 text-sm text-[#555] font-medium hover:text-[#111] transition-colors"
              >
                Explore Features
                <ChevronRight size={16} />
              </a>
            </div>
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-[#f0f0f0]">
              <div className="flex -space-x-2">
                {[
                  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
                  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
                  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <p className="text-sm text-[#555]">
                <span className="font-semibold text-[#111]">12,400+ students</span> improved their scores
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-[#f0f0f0] bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-[#111] tracking-tight">{s.value}</p>
              <p className="text-sm text-[#777] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#111] tracking-tight mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-[#555] max-w-xl mx-auto">
              We built the platform we wish existed when preparing for the SAT — complete, intelligent, and beautifully designed.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group p-5 rounded-xl border border-[#f0f0f0] hover:border-[#1a56db]/30 hover:shadow-sm transition-all duration-200 bg-white"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-9 h-9 bg-[#eff6ff] rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#1a56db] transition-colors duration-200">
                  <f.icon size={18} className="text-[#1a56db] group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="font-semibold text-[#111] text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-[#777] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#111] tracking-tight mb-4">
              From sign-up to score improvement
            </h2>
            <p className="text-lg text-[#555]">A clear, structured path to your goal score.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Take the diagnostic', desc: 'A 30-question diagnostic identifies your strengths and weaknesses to build your personalized plan.' },
              { step: '02', title: 'Study with AI guidance', desc: 'Follow adaptive courses, practice questions, and ask your AI tutor anything at any time.' },
              { step: '03', title: 'Track and improve', desc: 'Take full mock tests, review detailed analytics, and watch your predicted score climb.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="text-5xl font-bold text-[#f0f0f0] mb-4">{s.step}</div>
                <h3 className="text-lg font-semibold text-[#111] mb-2">{s.title}</h3>
                <p className="text-sm text-[#777] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#111] tracking-tight mb-4">
              Real results from real students
            </h2>
            <p className="text-lg text-[#555]">Average score improvement of 187 points across all students.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white border border-[#f0f0f0] rounded-2xl p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[#444] leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={t.image} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-[#111]">{t.name}</p>
                      <p className="text-xs text-[#777]">SAT Score: {t.score}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-600">{t.improvement}</p>
                    <p className="text-[10px] text-[#999]">pts improvement</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#111] tracking-tight mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-[#555]">Start free. Upgrade when you're ready to go all-in.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map(p => (
              <div
                key={p.name}
                className={`relative rounded-2xl p-6 border ${p.accent ? 'border-[#1a56db] shadow-lg' : 'border-[#e8e8e8] bg-white'}`}
                style={p.accent ? { background: 'white' } : {}}
              >
                {p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a56db] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {p.badge}
                  </div>
                )}
                <div className="mb-5">
                  <p className="font-semibold text-[#111] mb-1">{p.name}</p>
                  <p className="text-3xl font-bold text-[#111] tracking-tight">{p.price}</p>
                  <p className="text-xs text-[#777]">{p.period}</p>
                  <p className="text-sm text-[#555] mt-2">{p.description}</p>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#444]">
                      <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className={`block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    p.accent
                      ? 'bg-[#1a56db] text-white hover:bg-[#1648c0]'
                      : 'bg-[#f0f0f0] text-[#111] hover:bg-[#e8e8e8]'
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-[#1a56db] rounded-2xl flex items-center justify-center">
              <Trophy size={24} className="text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-[#111] tracking-tight mb-4">
            Your target score is reachable
          </h2>
          <p className="text-lg text-[#555] mb-8">
            Join over 12,000 students who trusted ScorePath and saw real, measurable improvement in their SAT scores.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-[#1a56db] text-white px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-[#1648c0] transition-colors shadow-sm"
          >
            Start Learning Free
            <ArrowRight size={16} />
          </Link>
          <p className="text-xs text-[#999] mt-4">No credit card required. Free forever plan available.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#f0f0f0] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#1a56db] rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm text-[#111]">ScorePath</span>
          </div>
          <p className="text-xs text-[#999]">© 2025 ScorePath. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#" className="text-xs text-[#777] hover:text-[#111] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
