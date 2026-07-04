'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, Clock, CheckCircle, TrendingUp, BarChart2, Trophy, ArrowRight, Play, X } from 'lucide-react'
import AppShell from '@/components/AppShell'

const mockTests = [
  { id: '1', title: 'Full SAT Practice Test #1', total_questions: 98, time_limit_minutes: 134, description: 'Module 1 & 2 for both Math and Reading & Writing sections.', is_published: true },
  { id: '2', title: 'Full SAT Practice Test #2', total_questions: 98, time_limit_minutes: 134, description: 'Another complete simulation of the real Digital SAT format.', is_published: true },
  { id: '3', title: 'Math Focus Test', total_questions: 44, time_limit_minutes: 70, description: 'Both Math modules — perfect for targeted math practice.', is_published: true },
  { id: '4', title: 'Reading & Writing Focus', total_questions: 54, time_limit_minutes: 64, description: 'Both Reading & Writing modules with full timing.', is_published: true },
  { id: '5', title: 'Diagnostic Mini Test', total_questions: 30, time_limit_minutes: 40, description: 'A fast 30-question diagnostic to identify your weaknesses.', is_published: true },
]

const previousAttempts = [
  { test: 'Full SAT Practice Test #1', date: '2025-06-15', total: 1380, math: 700, rw: 680, correct: 78, wrong: 20 },
  { test: 'Math Focus Test', date: '2025-06-08', total: 720, math: 720, rw: 0, correct: 36, wrong: 8 },
  { test: 'Full SAT Practice Test #1', date: '2025-05-22', total: 1290, math: 640, rw: 650, correct: 71, wrong: 27 },
]

export default function MockTestsPage() {
  const [confirmTest, setConfirmTest] = useState<typeof mockTests[0] | null>(null)

  return (
    <AppShell title="Mock Tests">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#111] tracking-tight mb-1">Mock Tests</h2>
          <p className="text-sm text-[#777]">Full Digital SAT simulations with instant scoring and detailed analysis</p>
        </div>

        {/* Score trend */}
        <div className="bg-white rounded-xl border border-[#e8e8e8] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#111]">Score History</h3>
            <Link href="/analytics" className="text-xs text-[#1a56db] hover:underline">Full Analytics</Link>
          </div>
          <div className="flex items-end gap-4">
            {previousAttempts.slice().reverse().map((a, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="text-lg font-bold text-[#111]">{a.total > 800 ? a.total : `${a.total}M`}</div>
                <div className="text-[10px] text-[#999] mb-2">{new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                <div className="h-20 bg-[#f0f0f0] rounded-t relative overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-[#1a56db] rounded-t transition-all"
                    style={{ height: `${((a.total > 800 ? a.total : a.total * 2.2) / 1600) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="flex-1 text-center">
              <div className="text-lg font-bold text-[#1a56db]">Next</div>
              <div className="text-[10px] text-[#999] mb-2">You</div>
              <div className="h-20 bg-[#eff6ff] rounded-t border-2 border-dashed border-[#1a56db]/30" />
            </div>
          </div>
          {previousAttempts.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-500" />
              <p className="text-xs text-[#555]">
                Score improvement: <span className="font-semibold text-emerald-600">+{previousAttempts[0].total - previousAttempts[previousAttempts.length - 1].total} pts</span> across {previousAttempts.length} tests
              </p>
            </div>
          )}
        </div>

        {/* Available tests */}
        <div>
          <h3 className="text-sm font-semibold text-[#111] mb-3">Available Tests</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTests.map(test => (
              <div key={test.id} className="bg-white rounded-xl border border-[#e8e8e8] p-5 hover:shadow-sm hover:border-[#1a56db]/20 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 bg-[#eff6ff] rounded-lg flex items-center justify-center">
                    <FileText size={16} className="text-[#1a56db]" />
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-[#111] mb-1.5">{test.title}</h4>
                <p className="text-xs text-[#777] mb-4">{test.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-[#999] mb-4">
                  <span className="flex items-center gap-1"><CheckCircle size={11} />{test.total_questions} questions</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{test.time_limit_minutes} min</span>
                </div>
                <button
                  onClick={() => setConfirmTest(test)}
                  className="w-full flex items-center justify-center gap-2 bg-[#1a56db] text-white py-2.5 rounded-lg text-xs font-semibold hover:bg-[#1648c0] transition-colors"
                >
                  <Play size={12} className="fill-white" /> Start Test
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Previous attempts */}
        {previousAttempts.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-[#111] mb-3">Previous Attempts</h3>
            <div className="bg-white rounded-xl border border-[#e8e8e8] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#fafafa] border-b border-[#f0f0f0]">
                  <tr>
                    {['Test', 'Date', 'Total Score', 'Math', 'R&W', 'Correct', 'Actions'].map(h => (
                      <th key={h} className="text-[11px] font-semibold text-[#777] px-4 py-2.5 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5f5f5]">
                  {previousAttempts.map((a, i) => (
                    <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium text-[#111]">{a.test}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#777]">
                        {new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-bold text-[#111]">{a.total}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#555]">{a.math > 0 ? a.math : '—'}</td>
                      <td className="px-4 py-3 text-xs text-[#555]">{a.rw > 0 ? a.rw : '—'}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-emerald-600 font-medium">{a.correct}</span>
                        <span className="text-xs text-[#999]"> / </span>
                        <span className="text-xs text-red-500 font-medium">{a.wrong} wrong</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-xs text-[#1a56db] hover:underline flex items-center gap-1">
                          Review <ArrowRight size={11} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Confirm modal */}
      {confirmTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setConfirmTest(null)} />
          <div className="relative bg-white rounded-2xl border border-[#e8e8e8] shadow-2xl p-6 w-full max-w-sm">
            <button onClick={() => setConfirmTest(null)} className="absolute top-4 right-4 text-[#999] hover:text-[#333]">
              <X size={16} />
            </button>
            <div className="w-12 h-12 bg-[#eff6ff] rounded-xl flex items-center justify-center mb-4">
              <FileText size={20} className="text-[#1a56db]" />
            </div>
            <h3 className="text-lg font-bold text-[#111] mb-1">{confirmTest.title}</h3>
            <p className="text-sm text-[#777] mb-4">{confirmTest.description}</p>
            <div className="grid grid-cols-2 gap-3 mb-5 p-3 bg-[#fafafa] rounded-xl">
              <div className="text-center">
                <p className="text-base font-bold text-[#111]">{confirmTest.total_questions}</p>
                <p className="text-[11px] text-[#777]">Questions</p>
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-[#111]">{confirmTest.time_limit_minutes} min</p>
                <p className="text-[11px] text-[#777]">Time Limit</p>
              </div>
            </div>
            <div className="space-y-2.5 mb-5">
              {['Find a quiet place free from distractions', 'Have scratch paper and pencil ready', 'Once started, the timer cannot be paused'].map(tip => (
                <div key={tip} className="flex items-start gap-2 text-xs text-[#555]">
                  <CheckCircle size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                  {tip}
                </div>
              ))}
            </div>
            <button
              onClick={() => setConfirmTest(null)}
              className="w-full bg-[#1a56db] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#1648c0] transition-colors flex items-center justify-center gap-2"
            >
              <Play size={15} className="fill-white" /> Begin Test
            </button>
          </div>
        </div>
      )}
    </AppShell>
  )
}
