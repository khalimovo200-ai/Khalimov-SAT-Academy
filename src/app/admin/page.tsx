'use client'

import { useState } from 'react'
import { Users, BookOpen, FileText, HelpCircle, Video, Bell, Tag, BarChart2, Upload, Plus, Edit3, Trash2, CheckCircle, X, Search } from 'lucide-react'
import AppShell from '@/components/AppShell'
import { cn } from '@/lib/utils'

const adminSections = [
  { id: 'overview', label: 'Overview', icon: BarChart2 },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'questions', label: 'Questions', icon: HelpCircle },
  { id: 'tests', label: 'Mock Tests', icon: FileText },
  { id: 'classes', label: 'Live Classes', icon: Video },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'announcements', label: 'Announcements', icon: Bell },
  { id: 'coupons', label: 'Coupons', icon: Tag },
]

const mockUsers = [
  { name: 'Alex Chen', email: 'alex@example.com', plan: 'premium', streak: 14, score: 1380, joined: '2025-04-12' },
  { name: 'Maya Rodriguez', email: 'maya@example.com', plan: 'vip', streak: 32, score: 1520, joined: '2025-03-05' },
  { name: 'James Kim', email: 'james@example.com', plan: 'free', streak: 3, score: 1100, joined: '2025-06-01' },
  { name: 'Sofia Patel', email: 'sofia@example.com', plan: 'premium', streak: 21, score: 1460, joined: '2025-04-28' },
  { name: 'Ryan Moore', email: 'ryan@example.com', plan: 'basic', streak: 7, score: 1200, joined: '2025-05-15' },
]

function OverviewSection() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: '12,408', change: '+124 this week', color: 'text-[#1a56db]' },
          { label: 'Active Today', value: '847', change: '+12% vs yesterday', color: 'text-emerald-600' },
          { label: 'Mock Tests Today', value: '234', change: '+18% vs average', color: 'text-amber-600' },
          { label: 'Premium Subs', value: '3,241', change: '+45 this month', color: 'text-[#7c3aed]' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-[#e8e8e8] rounded-xl p-4">
            <p className="text-xs text-[#777] mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-[#aaa] mt-1">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#e8e8e8] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-[#111] mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { event: 'New student joined', name: 'Jordan Taylor', time: '2 min ago', icon: '👤' },
            { event: 'Mock test completed', name: 'Alex Chen — Score: 1380', time: '5 min ago', icon: '📋' },
            { event: 'Community post flagged', name: 'Review required', time: '12 min ago', icon: '🚩' },
            { event: 'New payment received', name: 'Premium plan · $29', time: '18 min ago', icon: '💳' },
            { event: 'Live class registered', name: 'Advanced Math — 23 students', time: '25 min ago', icon: '🎥' },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-[#f9f9f9] last:border-0">
              <span className="text-base">{a.icon}</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-[#111]">{a.event}</p>
                <p className="text-[11px] text-[#777]">{a.name}</p>
              </div>
              <span className="text-[11px] text-[#aaa] shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function UsersSection() {
  const [search, setSearch] = useState('')
  const filtered = mockUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-8 pr-3 py-2 text-xs border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#1a56db] bg-white"
          />
        </div>
        <span className="text-xs text-[#777]">{filtered.length} students</span>
      </div>
      <div className="bg-white border border-[#e8e8e8] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#fafafa] border-b border-[#f0f0f0]">
            <tr>
              {['Student', 'Plan', 'Streak', 'Score', 'Joined', 'Actions'].map(h => (
                <th key={h} className="text-[11px] font-semibold text-[#777] px-4 py-2.5 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f5f5f5]">
            {filtered.map(u => (
              <tr key={u.email} className="hover:bg-[#fafafa] transition-colors">
                <td className="px-4 py-3">
                  <p className="text-xs font-medium text-[#111]">{u.name}</p>
                  <p className="text-[11px] text-[#777]">{u.email}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium capitalize',
                    u.plan === 'vip' ? 'bg-amber-50 text-amber-700' :
                    u.plan === 'premium' ? 'bg-[#eff6ff] text-[#1a56db]' :
                    u.plan === 'basic' ? 'bg-purple-50 text-purple-700' :
                    'bg-[#f0f0f0] text-[#777]'
                  )}>
                    {u.plan}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-[#555]">{u.streak}d 🔥</td>
                <td className="px-4 py-3 text-xs font-semibold text-[#111]">{u.score}</td>
                <td className="px-4 py-3 text-xs text-[#777]">{new Date(u.joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                <td className="px-4 py-3">
                  <button className="text-xs text-[#1a56db] hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CoursesSection() {
  const [showForm, setShowForm] = useState(false)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#111]">Manage Courses</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a56db] text-white rounded-lg text-xs font-medium hover:bg-[#1648c0] transition-colors"
        >
          <Plus size={13} /> New Course
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-[#e8e8e8] rounded-xl p-5">
          <h4 className="text-sm font-semibold text-[#111] mb-4">Create New Course</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Title', placeholder: 'SAT Math Complete Course' },
              { label: 'Subject', placeholder: 'math' },
              { label: 'Difficulty', placeholder: 'beginner' },
              { label: 'Estimated Hours', placeholder: '20' },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-medium text-[#555] block mb-1.5">{f.label}</label>
                <input
                  placeholder={f.placeholder}
                  className="w-full px-3 py-2 text-sm border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#1a56db] transition-colors"
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="text-xs font-medium text-[#555] block mb-1.5">Description</label>
            <textarea rows={3} placeholder="Course description..." className="w-full px-3 py-2 text-sm border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#1a56db] resize-none" />
          </div>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 bg-[#1a56db] text-white rounded-lg text-xs font-semibold hover:bg-[#1648c0] transition-colors">
              Create Course
            </button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-[#e8e8e8] text-[#555] rounded-lg text-xs font-medium hover:bg-[#f5f5f5] transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-[#e8e8e8] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#fafafa] border-b border-[#f0f0f0]">
            <tr>
              {['Course', 'Subject', 'Lessons', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-[11px] font-semibold text-[#777] px-4 py-2.5 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f5f5f5]">
            {[
              { title: 'Digital SAT Math', subject: 'Math', lessons: 42, published: true },
              { title: 'Reading Comprehension', subject: 'Reading', lessons: 28, published: true },
              { title: 'Writing & Grammar', subject: 'Grammar', lessons: 24, published: false },
            ].map(c => (
              <tr key={c.title} className="hover:bg-[#fafafa] transition-colors">
                <td className="px-4 py-3 text-xs font-medium text-[#111]">{c.title}</td>
                <td className="px-4 py-3 text-xs text-[#555]">{c.subject}</td>
                <td className="px-4 py-3 text-xs text-[#555]">{c.lessons}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c.published ? 'bg-emerald-50 text-emerald-700' : 'bg-[#f0f0f0] text-[#777]'}`}>
                    {c.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-[#1a56db] hover:underline">Edit</button>
                    <button className="text-xs text-red-500 hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AnnouncementsSection() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  return (
    <div className="space-y-5">
      <div className="bg-white border border-[#e8e8e8] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-[#111] mb-4">Send Announcement</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-[#555] block mb-1.5">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Announcement title" className="w-full px-3 py-2 text-sm border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#1a56db]" />
          </div>
          <div>
            <label className="text-xs font-medium text-[#555] block mb-1.5">Message</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={4} placeholder="Write your announcement..." className="w-full px-3 py-2 text-sm border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#1a56db] resize-none" />
          </div>
          <button className="px-4 py-2 bg-[#1a56db] text-white rounded-lg text-xs font-semibold hover:bg-[#1648c0] transition-colors">
            Publish Announcement
          </button>
        </div>
      </div>
    </div>
  )
}

function CouponsSection() {
  const [coupons] = useState([
    { code: 'SUMMER25', discount: 25, uses: 145, max: 200, expires: '2025-08-31', active: true },
    { code: 'SCHOOL50', discount: 50, uses: 89, max: 100, expires: '2025-07-15', active: true },
    { code: 'WELCOME10', discount: 10, uses: 312, max: null, expires: null, active: false },
  ])

  return (
    <div className="space-y-5">
      <div className="bg-white border border-[#e8e8e8] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-[#111] mb-4">Create Coupon</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-medium text-[#555] block mb-1.5">Code</label>
            <input placeholder="SAVE20" className="w-full px-3 py-2 text-sm border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#1a56db] uppercase" />
          </div>
          <div>
            <label className="text-xs font-medium text-[#555] block mb-1.5">Discount %</label>
            <input type="number" placeholder="20" min="1" max="100" className="w-full px-3 py-2 text-sm border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#1a56db]" />
          </div>
          <div>
            <label className="text-xs font-medium text-[#555] block mb-1.5">Max Uses</label>
            <input type="number" placeholder="100" className="w-full px-3 py-2 text-sm border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#1a56db]" />
          </div>
          <div>
            <label className="text-xs font-medium text-[#555] block mb-1.5">Expires</label>
            <input type="date" className="w-full px-3 py-2 text-sm border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#1a56db]" />
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-[#1a56db] text-white rounded-lg text-xs font-semibold hover:bg-[#1648c0] transition-colors">
          Create Coupon
        </button>
      </div>

      <div className="bg-white border border-[#e8e8e8] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#fafafa] border-b border-[#f0f0f0]">
            <tr>
              {['Code', 'Discount', 'Used', 'Expires', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-[11px] font-semibold text-[#777] px-4 py-2.5 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f5f5f5]">
            {coupons.map(c => (
              <tr key={c.code} className="hover:bg-[#fafafa] transition-colors">
                <td className="px-4 py-3 text-xs font-mono font-semibold text-[#111]">{c.code}</td>
                <td className="px-4 py-3 text-xs text-[#555]">{c.discount}% off</td>
                <td className="px-4 py-3 text-xs text-[#555]">{c.uses}{c.max ? `/${c.max}` : ''}</td>
                <td className="px-4 py-3 text-xs text-[#777]">{c.expires || 'Never'}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c.active ? 'bg-emerald-50 text-emerald-700' : 'bg-[#f0f0f0] text-[#777]'}`}>
                    {c.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-xs text-red-500 hover:underline">Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('overview')

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <OverviewSection />
      case 'users': return <UsersSection />
      case 'courses': return <CoursesSection />
      case 'announcements': return <AnnouncementsSection />
      case 'coupons': return <CouponsSection />
      default: return (
        <div className="bg-white border border-[#e8e8e8] rounded-xl p-8 text-center text-sm text-[#777]">
          This section is coming soon.
        </div>
      )
    }
  }

  return (
    <AppShell title="Admin">
      <div className="flex h-full overflow-hidden">
        {/* Admin sidebar */}
        <div className="w-48 shrink-0 bg-white border-r border-[#f0f0f0] flex flex-col hidden md:flex">
          <div className="p-4 border-b border-[#f0f0f0]">
            <p className="text-xs font-bold text-[#777] uppercase tracking-wider">Admin Panel</p>
          </div>
          <nav className="flex-1 p-2 space-y-0.5">
            {adminSections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-xs font-medium',
                  activeSection === s.id ? 'bg-[#eff6ff] text-[#1a56db]' : 'text-[#555] hover:bg-[#f5f5f5] hover:text-[#111]'
                )}
              >
                <s.icon size={14} className="shrink-0" />
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[#111]">
                {adminSections.find(s => s.id === activeSection)?.label}
              </h2>
            </div>
            {renderSection()}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
