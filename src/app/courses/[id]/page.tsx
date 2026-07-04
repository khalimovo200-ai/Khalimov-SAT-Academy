'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft, Play, FileText, Download, BookOpen, CheckCircle, Clock, Lock } from 'lucide-react'
import Link from 'next/link'
import AppShell from '@/components/AppShell'

const mockLessons = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 1),
  title: [
    'Introduction & Course Overview',
    'Linear Equations & Inequalities',
    'Systems of Equations',
    'Quadratic Functions',
    'Exponential Functions',
    'Word Problems: Strategy',
    'Data Analysis & Statistics',
    'Advanced Problem Solving',
  ][i],
  estimated_minutes: [10, 25, 30, 35, 30, 20, 25, 40][i],
  completed: i < 3,
  locked: i > 4,
}))

export default function CourseDetailPage() {
  const params = useParams()
  const [activeLesson, setActiveLesson] = useState(mockLessons[3])

  return (
    <AppShell>
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-72 shrink-0 bg-white border-r border-[#f0f0f0] flex flex-col hidden md:flex">
          <div className="p-4 border-b border-[#f0f0f0]">
            <Link href="/courses" className="flex items-center gap-1.5 text-xs text-[#777] hover:text-[#111] mb-3">
              <ArrowLeft size={13} />
              Back to Courses
            </Link>
            <h2 className="text-sm font-semibold text-[#111] leading-snug">Digital SAT Math — Complete Course</h2>
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#777]">Progress</span>
                <span className="font-medium text-[#111]">3/8 lessons</span>
              </div>
              <div className="h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                <div className="h-full bg-[#1a56db] rounded-full" style={{ width: '37.5%' }} />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {mockLessons.map((lesson, i) => (
              <button
                key={lesson.id}
                onClick={() => !lesson.locked && setActiveLesson(lesson)}
                disabled={lesson.locked}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                  activeLesson.id === lesson.id
                    ? 'bg-[#eff6ff] border border-[#1a56db]/20'
                    : lesson.locked
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#f5f5f5]'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  lesson.completed ? 'bg-emerald-500 text-white' : activeLesson.id === lesson.id ? 'bg-[#1a56db] text-white' : 'bg-[#f0f0f0] text-[#777]'
                }`}>
                  {lesson.completed ? <CheckCircle size={12} /> : lesson.locked ? <Lock size={11} /> : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate ${activeLesson.id === lesson.id ? 'text-[#1a56db]' : 'text-[#333]'}`}>
                    {lesson.title}
                  </p>
                  <p className="text-[10px] text-[#999] flex items-center gap-1 mt-0.5">
                    <Clock size={9} />{lesson.estimated_minutes} min
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-xl font-bold text-[#111] mb-1">{activeLesson.title}</h1>
            <div className="flex items-center gap-3 text-xs text-[#777] mb-5">
              <span className="flex items-center gap-1"><Clock size={12} />{activeLesson.estimated_minutes} min</span>
              {activeLesson.completed && (
                <span className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle size={12} />Completed
                </span>
              )}
            </div>

            {/* Video player placeholder */}
            <div className="aspect-video bg-[#111] rounded-xl overflow-hidden flex items-center justify-center mb-6 relative">
              <img
                src="https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="lesson"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                <Play size={24} className="text-white fill-white ml-1" />
              </div>
            </div>

            {/* Lesson tabs */}
            <div className="border-b border-[#f0f0f0] mb-5">
              <div className="flex gap-5">
                {['Notes', 'Downloads', 'Homework', 'Quiz'].map(tab => (
                  <button
                    key={tab}
                    className="pb-3 text-sm font-medium text-[#777] hover:text-[#111] border-b-2 border-transparent hover:border-[#1a56db] transition-all first:text-[#111] first:border-[#1a56db]"
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes content */}
            <div className="prose prose-sm max-w-none">
              <div className="bg-[#f9f9f9] rounded-xl p-5 space-y-3">
                <h3 className="text-base font-semibold text-[#111]">Key Concepts</h3>
                <p className="text-sm text-[#555] leading-relaxed">
                  Quadratic functions take the form f(x) = ax² + bx + c, where a ≠ 0. The graph of a quadratic is a parabola that opens upward when a &gt; 0 and downward when a &lt; 0.
                </p>
                <div className="bg-white border border-[#e8e8e8] rounded-lg p-4">
                  <p className="text-xs font-semibold text-[#1a56db] mb-2">Key Formula</p>
                  <p className="text-sm font-mono text-[#111]">x = (-b ± √(b² - 4ac)) / 2a</p>
                  <p className="text-xs text-[#777] mt-1">The Quadratic Formula — use when factoring is difficult.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <span className="text-base">💡</span>
                  <p className="text-xs text-[#555]">
                    <strong>SAT Tip:</strong> On the Digital SAT, most quadratic questions can be solved by factoring. Always check if the quadratic factors neatly before using the formula.
                  </p>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              {[
                { icon: Download, label: 'Lesson PDF', desc: 'Notes & formulas', color: 'text-[#1a56db]', bg: 'bg-[#eff6ff]' },
                { icon: FileText, label: 'Homework', desc: '12 practice problems', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              ].map(r => (
                <button key={r.label} className="flex items-center gap-3 p-3.5 bg-white border border-[#e8e8e8] rounded-xl hover:border-[#1a56db]/30 hover:shadow-sm transition-all">
                  <div className={`w-9 h-9 ${r.bg} rounded-lg flex items-center justify-center shrink-0`}>
                    <r.icon size={16} className={r.color} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-[#111]">{r.label}</p>
                    <p className="text-xs text-[#777]">{r.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Next lesson button */}
            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-[#1a56db] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#1648c0] transition-colors flex items-center justify-center gap-2">
                <CheckCircle size={15} />
                Mark Complete & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
