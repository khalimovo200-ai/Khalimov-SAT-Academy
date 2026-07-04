'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  TrendingUp, Flame, Trophy, Zap, BookOpen, FileText,
  HelpCircle, BarChart2, Bot, ArrowRight, Target,
  CheckCircle, Clock, Users, Video, Calendar
} from 'lucide-react'
import AppShell from '@/components/AppShell'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'

const quickLinks = [
  { href: '/courses', icon: BookOpen, label: 'Courses', color: '#1a56db', bg: '#eff6ff' },
  { href: '/mock-tests', icon: FileText, label: 'Mock Test', color: '#047857', bg: '#ecfdf5' },
  { href: '/question-bank', icon: HelpCircle, label: 'Practice', color: '#7c3aed', bg: '#f5f3ff' },
  { href: '/ai-tutor', icon: Bot, label: 'AI Tutor', color: '#d97706', bg: '#fffbeb' },
  { href: '/analytics', icon: BarChart2, label: 'Analytics', color: '#0891b2', bg: '#ecfeff' },
  { href: '/community', icon: Users, label: 'Community', color: '#dc2626', bg: '#fff1f1' },
]

const studyPlan = [
  { subject: 'Math', topic: 'Quadratic equations', time: '20 min', done: true },
  { subject: 'Reading', topic: 'Central idea passages', time: '25 min', done: false },
  { subject: 'Writing', topic: 'Transition words', time: '15 min', done: false },
]

type Stats = {
  coursesCompleted: number
  questionsAnswered: number
  mockTestsTaken: number
  accuracy: number
}

export default function DashboardPage() {
  const { profile } = useAuth()
  const [stats, setStats] = useState<Stats>({ coursesCompleted: 0, questionsAnswered: 0, mockTestsTaken: 0, accuracy: 0 })
  const [upcomingClass, setUpcomingClass] = useState<{ title: string; scheduled_at: string; instructor: string } | null>(null)

  useEffect(() => {
    if (!profile) return

    Promise.all([
      supabase.from('user_test_attempts').select('id', { count: 'exact', head: true }).eq('user_id', profile.id).eq('status', 'completed'),
      supabase.from('user_test_answers').select('is_correct').eq('attempt_id', profile.id),
      supabase.from('live_classes').select('title, scheduled_at, instructor').eq('is_published', true).gte('scheduled_at', new Date().toISOString()).order('scheduled_at').limit(1),
    ]).then(([tests, , classes]) => {
      setStats(s => ({ ...s, mockTestsTaken: tests.count || 0 }))
      if (classes.data?.[0]) setUpcomingClass(classes.data[0])
    })
  }, [profile])

  const scorePercent = profile
    ? Math.round(((profile.predicted_score - 400) / (1600 - 400)) * 100)
    : 0
  const targetPercent = profile
    ? Math.round(((profile.target_score - 400) / (1600 - 400)) * 100)
    : 0

  return (
    <AppShell title="Dashboard">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Welcome */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-[#111] tracking-tight">
              Good morning, {profile?.full_name?.split(' ')[0] || 'Student'} 👋
            </h2>
            <p className="text-sm text-[#777] mt-1">
              {profile?.exam_date
                ? `Your SAT is on ${formatDate(profile.exam_date)} — keep pushing!`
                : 'Set your exam date to get a personalized countdown.'}
            </p>
          </div>
          <Link
            href="/profile"
            className="text-xs text-[#1a56db] font-medium border border-[#1a56db]/30 px-3 py-1.5 rounded-lg hover:bg-[#eff6ff] transition-colors"
          >
            Update Profile
          </Link>
        </div>

        {/* Score Progress */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Predicted vs Target */}
          <div className="bg-white rounded-xl border border-[#e8e8e8] p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-[#777] mb-0.5">Predicted Score</p>
                <p className="text-3xl font-bold text-[#111]">{profile?.predicted_score || 1000}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#777] mb-0.5">Target Score</p>
                <p className="text-xl font-bold text-[#1a56db]">{profile?.target_score || 1400}</p>
              </div>
            </div>
            <div className="relative h-3 bg-[#f0f0f0] rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-[#1a56db] rounded-full transition-all duration-1000"
                style={{ width: `${scorePercent}%` }}
              />
              <div
                className="absolute top-0 h-full w-0.5 bg-[#111] opacity-30"
                style={{ left: `${targetPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-[#999]">400</span>
              <span className="text-xs text-[#1a56db] font-medium">
                {profile?.target_score ? `${profile.target_score - (profile.predicted_score || 1000)} pts to target` : ''}
              </span>
              <span className="text-xs text-[#999]">1600</span>
            </div>
          </div>

          {/* Gamification stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Flame, label: 'Study Streak', value: `${profile?.study_streak || 0}d`, color: 'text-orange-500', bg: 'bg-orange-50' },
              { icon: Zap, label: 'XP Points', value: (profile?.xp || 0).toLocaleString(), color: 'text-[#1a56db]', bg: 'bg-[#eff6ff]' },
              { icon: Trophy, label: 'Mock Tests', value: String(stats.mockTestsTaken), color: 'text-amber-500', bg: 'bg-amber-50' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-[#e8e8e8] p-4 text-center">
                <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <s.icon size={18} className={s.color} />
                </div>
                <p className="text-lg font-bold text-[#111]">{s.value}</p>
                <p className="text-[11px] text-[#777] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-[#111] mb-3">Quick Access</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {quickLinks.map(q => (
              <Link
                key={q.href}
                href={q.href}
                className="bg-white rounded-xl border border-[#e8e8e8] p-4 flex flex-col items-center gap-2 hover:border-[#1a56db]/30 hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all" style={{ background: q.bg }}>
                  <q.icon size={18} style={{ color: q.color }} />
                </div>
                <span className="text-[11px] font-medium text-[#555] group-hover:text-[#111]">{q.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Today's study plan */}
          <div className="md:col-span-2 bg-white rounded-xl border border-[#e8e8e8] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#111]">Today's Study Plan</h3>
              <span className="text-xs text-[#777]">60 min total</span>
            </div>
            <div className="space-y-3">
              {studyPlan.map((t, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${t.done ? 'bg-[#f9f9f9] opacity-60' : 'bg-[#fafafa] border border-[#f0f0f0]'}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${t.done ? 'border-emerald-500 bg-emerald-500' : 'border-[#d0d0d0]'}`}>
                    {t.done && <CheckCircle size={12} className="text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${t.done ? 'line-through text-[#aaa]' : 'text-[#111]'}`}>{t.topic}</p>
                    <p className="text-xs text-[#999]">{t.subject}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#999]">
                    <Clock size={11} />
                    {t.time}
                  </div>
                </div>
              ))}
            </div>
            <Link href="/courses" className="mt-4 flex items-center gap-1 text-xs text-[#1a56db] font-medium hover:underline">
              Continue lessons <ArrowRight size={12} />
            </Link>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Progress */}
            <div className="bg-white rounded-xl border border-[#e8e8e8] p-5">
              <h3 className="text-sm font-semibold text-[#111] mb-3">Subject Accuracy</h3>
              <div className="space-y-3">
                {[
                  { label: 'Math', pct: 76, color: '#1a56db' },
                  { label: 'Reading', pct: 68, color: '#047857' },
                  { label: 'Writing', pct: 72, color: '#7c3aed' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#555]">{s.label}</span>
                      <span className="font-medium text-[#111]">{s.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming class */}
            {upcomingClass && (
              <div className="bg-[#eff6ff] rounded-xl border border-[#1a56db]/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Video size={14} className="text-[#1a56db]" />
                  <span className="text-xs font-semibold text-[#1a56db]">Upcoming Class</span>
                </div>
                <p className="text-sm font-semibold text-[#111]">{upcomingClass.title}</p>
                <p className="text-xs text-[#777] mt-1">{formatDate(upcomingClass.scheduled_at)}</p>
                {upcomingClass.instructor && (
                  <p className="text-xs text-[#555] mt-0.5">with {upcomingClass.instructor}</p>
                )}
                <Link href="/live-classes" className="mt-3 block text-center text-xs bg-[#1a56db] text-white py-1.5 rounded-lg font-medium hover:bg-[#1648c0] transition-colors">
                  View Details
                </Link>
              </div>
            )}

            {/* Weekly goal */}
            <div className="bg-white rounded-xl border border-[#e8e8e8] p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target size={14} className="text-[#1a56db]" />
                  <span className="text-xs font-semibold text-[#111]">Weekly Goal</span>
                </div>
                <span className="text-xs text-[#777]">4/7 days</span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${i < 4 ? 'bg-[#1a56db]' : 'bg-[#f0f0f0]'}`}
                  />
                ))}
              </div>
              <p className="text-xs text-[#777] mt-2">3 more days to complete this week's goal</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
