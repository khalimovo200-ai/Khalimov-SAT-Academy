'use client'

import { useState, useEffect } from 'react'
import { Video, Calendar, Clock, Users, ExternalLink, CheckCircle, Play } from 'lucide-react'
import AppShell from '@/components/AppShell'
import { supabase, LiveClass } from '@/lib/supabase'
import { formatDate, cn } from '@/lib/utils'

const mockClasses: (LiveClass & { registered?: boolean })[] = [
  { id: '1', title: 'SAT Math: Advanced Quadratics & Functions', description: 'Deep dive into the hardest quadratic questions on the Digital SAT with shortcuts and patterns.', instructor: 'Dr. Sarah Chen', scheduled_at: '2025-07-10T18:00:00Z', duration_minutes: 90, meeting_url: '#', recording_url: null, subject: 'math', is_published: true, max_seats: 50, registered: false },
  { id: '2', title: 'Reading Comprehension: Mastering Evidence Questions', description: 'How to find and use textual evidence to answer the most challenging reading questions.', instructor: 'Prof. Michael Brown', scheduled_at: '2025-07-12T16:00:00Z', duration_minutes: 60, meeting_url: '#', recording_url: null, subject: 'reading', is_published: true, max_seats: 40, registered: true },
  { id: '3', title: 'Writing & Grammar: Full Rules Breakdown', description: 'Every grammar rule tested on the SAT, explained with clear examples and practice questions.', instructor: 'Emma Wilson', scheduled_at: '2025-07-15T19:00:00Z', duration_minutes: 75, meeting_url: '#', recording_url: null, subject: 'writing', is_published: true, max_seats: 60, registered: false },
  { id: '4', title: 'Office Hours: Ask Anything', description: 'Open Q&A session. Bring your toughest questions from mock tests and practice sessions.', instructor: 'ScorePath Team', scheduled_at: '2025-07-17T17:00:00Z', duration_minutes: 60, meeting_url: '#', recording_url: null, subject: 'strategy', is_published: true, max_seats: null, registered: false },
]

const recordings = [
  { title: 'SAT Math: Data Analysis Mastery', instructor: 'Dr. Sarah Chen', date: '2025-06-28', duration: '85 min', subject: 'math' },
  { title: 'Reading: How to Approach Paired Passages', instructor: 'Prof. Michael Brown', date: '2025-06-21', duration: '70 min', subject: 'reading' },
  { title: 'Test Strategy: Managing Time & Anxiety', instructor: 'Emma Wilson', date: '2025-06-14', duration: '55 min', subject: 'strategy' },
]

const subjectColor: Record<string, string> = {
  math: 'bg-blue-50 text-blue-700 border-blue-100',
  reading: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  writing: 'bg-purple-50 text-purple-700 border-purple-100',
  strategy: 'bg-amber-50 text-amber-700 border-amber-100',
}

export default function LiveClassesPage() {
  const [classes, setClasses] = useState(mockClasses)

  const toggleRegister = (id: string) => {
    setClasses(cs => cs.map(c => c.id === id ? { ...c, registered: !c.registered } : c))
  }

  return (
    <AppShell title="Live Classes">
      <div className="p-6 max-w-5xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-[#111] tracking-tight mb-1">Live Classes</h2>
          <p className="text-sm text-[#777]">Expert-led sessions, office hours, and recorded replays</p>
        </div>

        {/* Upcoming */}
        <div>
          <h3 className="text-sm font-semibold text-[#111] mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
            Upcoming Sessions
          </h3>
          <div className="space-y-3">
            {classes.map(cls => {
              const isPast = new Date(cls.scheduled_at) < new Date()
              return (
                <div key={cls.id} className="bg-white border border-[#e8e8e8] rounded-xl p-5 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border capitalize ${subjectColor[cls.subject || 'strategy']}`}>
                          {cls.subject}
                        </span>
                        {cls.registered && (
                          <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-medium flex items-center gap-1">
                            <CheckCircle size={10} /> Registered
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-[#111] mb-1">{cls.title}</h4>
                      <p className="text-xs text-[#777] mb-3">{cls.description}</p>
                      <div className="flex items-center gap-4 text-xs text-[#777]">
                        <span className="flex items-center gap-1.5"><Calendar size={12} />{formatDate(cls.scheduled_at)}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} />{cls.duration_minutes} min</span>
                        {cls.instructor && <span className="flex items-center gap-1.5"><Users size={12} />with {cls.instructor}</span>}
                        {cls.max_seats && <span className="text-[#aaa]">{cls.max_seats} seats</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {cls.registered ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleRegister(cls.id)}
                            className="text-xs text-[#999] hover:text-red-500 px-3 py-1.5 border border-[#e8e8e8] rounded-lg hover:border-red-200 transition-all"
                          >
                            Unregister
                          </button>
                          <a
                            href={cls.meeting_url || '#'}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a56db] text-white rounded-lg text-xs font-medium hover:bg-[#1648c0] transition-colors"
                          >
                            <ExternalLink size={12} /> Join
                          </a>
                        </div>
                      ) : (
                        <button
                          onClick={() => toggleRegister(cls.id)}
                          className="px-4 py-2 bg-[#1a56db] text-white rounded-lg text-xs font-semibold hover:bg-[#1648c0] transition-colors"
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recordings */}
        <div>
          <h3 className="text-sm font-semibold text-[#111] mb-3">Past Recordings</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {recordings.map(r => (
              <div key={r.title} className="bg-white border border-[#e8e8e8] rounded-xl overflow-hidden hover:shadow-sm transition-shadow group">
                <div className="h-28 bg-[#f5f5f5] flex items-center justify-center relative">
                  <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-105 transition-transform cursor-pointer">
                    <Play size={18} className="text-[#111] fill-[#111] ml-1" />
                  </div>
                  <span className={`absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${subjectColor[r.subject] || ''}`}>
                    {r.subject}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="text-xs font-semibold text-[#111] mb-1 line-clamp-2">{r.title}</h4>
                  <p className="text-[11px] text-[#777] mb-2">with {r.instructor}</p>
                  <div className="flex items-center gap-3 text-[10px] text-[#999]">
                    <span>{new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock size={9} />{r.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
