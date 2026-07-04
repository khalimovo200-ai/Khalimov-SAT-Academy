'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'
import AppShell from '@/components/AppShell'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const scoreHistory = [
  { month: 'Jan', score: 1100 },
  { month: 'Feb', score: 1180 },
  { month: 'Mar', score: 1220 },
  { month: 'Apr', score: 1290 },
  { month: 'May', score: 1340 },
  { month: 'Jun', score: 1380 },
]

const accuracyData = [
  { domain: 'Algebra', accuracy: 88, count: 124 },
  { domain: 'Adv. Math', accuracy: 72, count: 98 },
  { domain: 'Data', accuracy: 81, count: 76 },
  { domain: 'Geometry', accuracy: 65, count: 54 },
  { domain: 'Reading', accuracy: 74, count: 112 },
  { domain: 'Grammar', accuracy: 82, count: 90 },
  { domain: 'Vocabulary', accuracy: 70, count: 66 },
]

const radarData = [
  { subject: 'Algebra', A: 88 },
  { subject: 'Adv Math', A: 72 },
  { subject: 'Data', A: 81 },
  { subject: 'Geometry', A: 65 },
  { subject: 'Reading', A: 74 },
  { subject: 'Grammar', A: 82 },
]

const weeklyStudy = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 60 },
  { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 75 },
  { day: 'Fri', minutes: 55 },
  { day: 'Sat', minutes: 90 },
  { day: 'Sun', minutes: 20 },
]

function StatCard({ label, value, change, changeLabel }: { label: string; value: string; change: 'up' | 'down' | 'neutral'; changeLabel: string }) {
  return (
    <div className="bg-white rounded-xl border border-[#e8e8e8] p-4">
      <p className="text-xs text-[#777] mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#111]">{value}</p>
      <div className={`flex items-center gap-1 mt-1 text-xs ${change === 'up' ? 'text-emerald-600' : change === 'down' ? 'text-red-500' : 'text-[#999]'}`}>
        {change === 'up' ? <TrendingUp size={12} /> : change === 'down' ? <TrendingDown size={12} /> : <Minus size={12} />}
        {changeLabel}
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <AppShell title="Analytics">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#111] tracking-tight mb-1">Performance Analytics</h2>
          <p className="text-sm text-[#777]">Track your progress and identify where to focus next</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Predicted Score" value="1,380" change="up" changeLabel="+90 this month" />
          <StatCard label="Overall Accuracy" value="77%" change="up" changeLabel="+5% vs last month" />
          <StatCard label="Questions Answered" value="847" change="up" changeLabel="+124 this week" />
          <StatCard label="Avg. Time / Question" value="68s" change="down" changeLabel="-8s improvement" />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Score progress */}
          <div className="bg-white rounded-xl border border-[#e8e8e8] p-5">
            <h3 className="text-sm font-semibold text-[#111] mb-4">Score Progress</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
                <YAxis domain={[900, 1600]} tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ border: '1px solid #e8e8e8', borderRadius: 8, fontSize: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                  labelStyle={{ fontWeight: 600, color: '#111' }}
                />
                <Line type="monotone" dataKey="score" stroke="#1a56db" strokeWidth={2.5} dot={{ fill: '#1a56db', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly study time */}
          <div className="bg-white rounded-xl border border-[#e8e8e8] p-5">
            <h3 className="text-sm font-semibold text-[#111] mb-4">Weekly Study Time</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyStudy} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ border: '1px solid #e8e8e8', borderRadius: 8, fontSize: 12 }}
                  formatter={(v) => [`${v} min`, 'Study Time']}
                />
                <Bar dataKey="minutes" fill="#1a56db" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Domain accuracy */}
          <div className="bg-white rounded-xl border border-[#e8e8e8] p-5">
            <h3 className="text-sm font-semibold text-[#111] mb-4">Accuracy by Domain</h3>
            <div className="space-y-3">
              {accuracyData.sort((a, b) => a.accuracy - b.accuracy).map(d => (
                <div key={d.domain}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-[#555]">{d.domain}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#999]">{d.count} Qs</span>
                      <span className="text-xs font-semibold text-[#111]">{d.accuracy}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${d.accuracy}%`,
                        backgroundColor: d.accuracy >= 80 ? '#047857' : d.accuracy >= 70 ? '#1a56db' : '#dc2626',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Radar */}
          <div className="bg-white rounded-xl border border-[#e8e8e8] p-5">
            <h3 className="text-sm font-semibold text-[#111] mb-4">Skill Overview</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#f0f0f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#777' }} />
                <Radar dataKey="A" stroke="#1a56db" fill="#1a56db" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weakest areas */}
        <div className="bg-white rounded-xl border border-[#e8e8e8] p-5">
          <h3 className="text-sm font-semibold text-[#111] mb-4">Focus Areas</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Weakest Domain', domain: 'Geometry', accuracy: 65, action: 'Practice Geometry', href: '/question-bank' },
              { label: 'Needs Attention', domain: 'Advanced Math', accuracy: 72, action: 'Review Lessons', href: '/courses' },
              { label: 'Nearly There', domain: 'Vocabulary', accuracy: 70, action: 'Drill Questions', href: '/question-bank' },
            ].map(a => (
              <div key={a.label} className="p-4 bg-[#fafafa] rounded-xl border border-[#f0f0f0]">
                <p className="text-[10px] text-[#999] font-medium uppercase tracking-wide mb-1">{a.label}</p>
                <p className="text-sm font-semibold text-[#111] mb-1">{a.domain}</p>
                <p className="text-xs text-red-500 mb-3">{a.accuracy}% accuracy</p>
                <a href={a.href} className="text-xs text-[#1a56db] font-medium hover:underline">{a.action} →</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
