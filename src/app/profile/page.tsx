'use client'

import { useState } from 'react'
import { User, Target, Calendar, Trophy, Flame, Zap, BookOpen, Edit3, Save, X, CheckCircle } from 'lucide-react'
import AppShell from '@/components/AppShell'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { getInitials, formatDate, cn } from '@/lib/utils'

const achievements = [
  { name: 'First Login', icon: '⭐', earned: true, xp: 50 },
  { name: 'First Lesson', icon: '📚', earned: true, xp: 100 },
  { name: '7-Day Streak', icon: '🔥', earned: true, xp: 200 },
  { name: 'First Mock Test', icon: '📋', earned: true, xp: 150 },
  { name: '30-Day Streak', icon: '💪', earned: false, xp: 500 },
  { name: 'Score 1400+', icon: '🏆', earned: false, xp: 500 },
  { name: 'Perfect Math', icon: '🧮', earned: false, xp: 1000 },
  { name: 'Community Star', icon: '👥', earned: false, xp: 200 },
]

export default function ProfilePage() {
  const { profile, refreshProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    full_name: profile?.full_name || '',
    target_score: profile?.target_score || 1400,
    exam_date: profile?.exam_date || '',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    if (!profile) return
    setSaving(true)
    await supabase.from('profiles').update({
      full_name: form.full_name,
      target_score: form.target_score,
      exam_date: form.exam_date || null,
    }).eq('id', profile.id)
    await refreshProfile()
    setSaving(false)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const levelInfo = {
    level: Math.floor((profile?.xp || 0) / 1000) + 1,
    progress: ((profile?.xp || 0) % 1000) / 10,
    nextXP: (Math.floor((profile?.xp || 0) / 1000) + 1) * 1000,
  }

  return (
    <AppShell title="Profile">
      <div className="p-6 max-w-4xl mx-auto space-y-5">
        {/* Profile header */}
        <div className="bg-white rounded-xl border border-[#e8e8e8] p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#1a56db] flex items-center justify-center text-white text-xl font-bold">
                {getInitials(profile?.full_name)}
              </div>
              <div>
                {editing ? (
                  <input
                    value={form.full_name}
                    onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                    className="text-xl font-bold text-[#111] border-b border-[#1a56db] focus:outline-none bg-transparent"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-[#111]">{profile?.full_name || 'Student'}</h2>
                )}
                <p className="text-sm text-[#777] capitalize mt-0.5">{profile?.plan} plan · {profile?.role}</p>
                <p className="text-xs text-[#999] mt-0.5">Member since {formatDate(profile?.created_at)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {saved && (
                <span className="flex items-center gap-1 text-xs text-emerald-600">
                  <CheckCircle size={13} /> Saved!
                </span>
              )}
              {editing ? (
                <>
                  <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a56db] text-white rounded-lg text-xs font-medium hover:bg-[#1648c0] transition-colors disabled:opacity-60">
                    {saving ? <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" /> : <Save size={13} />}
                    Save
                  </button>
                  <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e8e8e8] text-[#555] rounded-lg text-xs font-medium hover:bg-[#f5f5f5] transition-colors">
                    <X size={13} /> Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e8e8e8] text-[#555] rounded-lg text-xs font-medium hover:bg-[#f5f5f5] transition-colors">
                  <Edit3 size={13} /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* XP / Level */}
          <div className="mt-5 pt-5 border-t border-[#f5f5f5]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#111]">Level {levelInfo.level}</span>
                <span className="text-xs text-[#777]">— {profile?.xp?.toLocaleString() || 0} XP</span>
              </div>
              <span className="text-xs text-[#999]">{levelInfo.nextXP.toLocaleString()} XP to next level</span>
            </div>
            <div className="h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#1a56db] to-[#1a56db]/70 rounded-full transition-all" style={{ width: `${levelInfo.progress}%` }} />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Stats */}
          <div className="bg-white rounded-xl border border-[#e8e8e8] p-5 space-y-4">
            <h3 className="text-sm font-semibold text-[#111]">Stats</h3>
            {[
              { icon: Flame, label: 'Study Streak', value: `${profile?.study_streak || 0} days`, color: 'text-orange-500', bg: 'bg-orange-50' },
              { icon: Target, label: 'Target Score', value: editing ? null : String(profile?.target_score || 1400), color: 'text-[#1a56db]', bg: 'bg-[#eff6ff]' },
              { icon: Zap, label: 'Predicted Score', value: String(profile?.predicted_score || 1000), color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: BookOpen, label: 'Mock Tests', value: '3 completed', color: 'text-[#7c3aed]', bg: 'bg-purple-50' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-3">
                <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center shrink-0`}>
                  <s.icon size={15} className={s.color} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#777]">{s.label}</p>
                  {s.label === 'Target Score' && editing ? (
                    <input
                      type="number"
                      value={form.target_score}
                      onChange={e => setForm(f => ({ ...f, target_score: Number(e.target.value) }))}
                      min={400} max={1600}
                      className="text-sm font-semibold text-[#111] border-b border-[#1a56db] focus:outline-none bg-transparent w-20"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-[#111]">{s.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Exam date */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
                <Calendar size={15} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#777]">Exam Date</p>
                {editing ? (
                  <input
                    type="date"
                    value={form.exam_date}
                    onChange={e => setForm(f => ({ ...f, exam_date: e.target.value }))}
                    className="text-sm font-semibold text-[#111] border-b border-[#1a56db] focus:outline-none bg-transparent"
                  />
                ) : (
                  <p className="text-sm font-semibold text-[#111]">{profile?.exam_date ? formatDate(profile.exam_date) : 'Not set'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="md:col-span-2 bg-white rounded-xl border border-[#e8e8e8] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#111]">Achievements</h3>
              <span className="text-xs text-[#777]">{achievements.filter(a => a.earned).length}/{achievements.length} earned</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {achievements.map(a => (
                <div
                  key={a.name}
                  className={cn(
                    'flex flex-col items-center gap-2 p-3 rounded-xl border text-center',
                    a.earned ? 'border-[#e8e8e8] bg-white' : 'border-[#f5f5f5] bg-[#fafafa] opacity-50'
                  )}
                >
                  <span className="text-2xl">{a.icon}</span>
                  <p className="text-xs font-medium text-[#111] leading-tight">{a.name}</p>
                  <span className="text-[10px] text-[#1a56db] font-medium">+{a.xp} XP</span>
                  {a.earned && (
                    <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle size={10} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
