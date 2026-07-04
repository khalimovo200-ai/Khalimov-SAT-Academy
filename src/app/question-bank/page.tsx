'use client'

import { useState, useEffect } from 'react'
import { Filter, ChevronRight, CheckCircle, X, Clock, BookOpen, Zap } from 'lucide-react'
import AppShell from '@/components/AppShell'
import { cn } from '@/lib/utils'

type Question = {
  id: string
  subject: string
  domain: string
  difficulty: 'easy' | 'medium' | 'hard'
  question_text: string
  options: { label: string; text: string }[]
  correct_answer: string
  explanation: string
  time_limit_seconds: number
}

const mockQuestions: Question[] = [
  {
    id: '1', subject: 'math', domain: 'Algebra', difficulty: 'medium',
    question_text: 'If 3x + 7 = 22, what is the value of x?',
    options: [
      { label: 'A', text: '3' }, { label: 'B', text: '5' }, { label: 'C', text: '7' }, { label: 'D', text: '9' }
    ],
    correct_answer: 'B', explanation: 'Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5.',
    time_limit_seconds: 60,
  },
  {
    id: '2', subject: 'math', domain: 'Advanced Math', difficulty: 'hard',
    question_text: 'Which of the following is equivalent to (x² - 9)/(x - 3) for x ≠ 3?',
    options: [
      { label: 'A', text: 'x + 3' }, { label: 'B', text: 'x - 3' }, { label: 'C', text: 'x² + 3' }, { label: 'D', text: '(x - 3)²' }
    ],
    correct_answer: 'A', explanation: 'Factor the numerator: (x-3)(x+3)/(x-3) = x+3 for x ≠ 3.',
    time_limit_seconds: 90,
  },
  {
    id: '3', subject: 'reading', domain: 'Central Ideas', difficulty: 'medium',
    question_text: "The author's primary purpose in the passage is best described as which of the following?",
    options: [
      { label: 'A', text: 'To argue that technology harms social interaction' },
      { label: 'B', text: 'To describe how digital communication has evolved' },
      { label: 'C', text: 'To compare traditional and modern communication methods' },
      { label: 'D', text: 'To explain why face-to-face communication is superior' },
    ],
    correct_answer: 'B', explanation: 'The passage focuses on the evolution of digital communication over time without explicitly arguing for one form over another.',
    time_limit_seconds: 90,
  },
  {
    id: '4', subject: 'writing', domain: 'Grammar', difficulty: 'easy',
    question_text: 'Which choice best completes the sentence with correct grammar?\n\nThe team _____ working on the project for three months before presenting their findings.',
    options: [
      { label: 'A', text: 'was' }, { label: 'B', text: 'had been' }, { label: 'C', text: 'have been' }, { label: 'D', text: 'are' }
    ],
    correct_answer: 'B', explanation: '"Had been" is the past perfect progressive, indicating an action that was ongoing before another past event.',
    time_limit_seconds: 60,
  },
  {
    id: '5', subject: 'math', domain: 'Data Analysis', difficulty: 'easy',
    question_text: 'The mean of five numbers is 12. If four of the numbers are 8, 10, 14, and 16, what is the fifth number?',
    options: [
      { label: 'A', text: '10' }, { label: 'B', text: '12' }, { label: 'C', text: '14' }, { label: 'D', text: '16' }
    ],
    correct_answer: 'B', explanation: 'Total = 12 × 5 = 60. Known sum = 8 + 10 + 14 + 16 = 48. Fifth number = 60 - 48 = 12.',
    time_limit_seconds: 60,
  },
]

const subjects = ['all', 'math', 'reading', 'writing']
const difficulties = ['all', 'easy', 'medium', 'hard']
const domains = ['All Domains', 'Algebra', 'Advanced Math', 'Data Analysis', 'Central Ideas', 'Grammar', 'Vocabulary']

export default function QuestionBankPage() {
  const [filters, setFilters] = useState({ subject: 'all', difficulty: 'all', domain: 'All Domains' })
  const [practiceMode, setPracticeMode] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [showFilters, setShowFilters] = useState(false)

  const filtered = mockQuestions.filter(q =>
    (filters.subject === 'all' || q.subject === filters.subject) &&
    (filters.difficulty === 'all' || q.difficulty === filters.difficulty) &&
    (filters.domain === 'All Domains' || q.domain === filters.domain)
  )

  const current = practiceMode ? filtered[currentIdx] : null

  const handleAnswer = (label: string) => {
    if (revealed) return
    setSelected(label)
    setRevealed(true)
    setScore(s => ({ correct: s.correct + (label === current?.correct_answer ? 1 : 0), total: s.total + 1 }))
  }

  const nextQuestion = () => {
    if (currentIdx < filtered.length - 1) {
      setCurrentIdx(i => i + 1)
      setSelected(null)
      setRevealed(false)
    } else {
      setPracticeMode(false)
      setCurrentIdx(0)
    }
  }

  const diffBadge = (d: string) => {
    const styles = { easy: 'bg-emerald-50 text-emerald-700', medium: 'bg-amber-50 text-amber-700', hard: 'bg-red-50 text-red-600' }
    return <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${styles[d as keyof typeof styles] || ''}`}>{d}</span>
  }

  if (practiceMode && current) {
    return (
      <AppShell title="Practice">
        <div className="p-6 max-w-3xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setPracticeMode(false)} className="text-[#777] hover:text-[#111]">
                <X size={18} />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#777]">{currentIdx + 1} / {filtered.length}</span>
                <div className="w-32 h-1.5 bg-[#f0f0f0] rounded-full">
                  <div className="h-full bg-[#1a56db] rounded-full transition-all" style={{ width: `${((currentIdx + 1) / filtered.length) * 100}%` }} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-emerald-600 font-semibold">{score.correct} ✓</span>
              <span className="text-[#777]">·</span>
              <span className="text-red-500 font-semibold">{score.total - score.correct} ✗</span>
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-2xl border border-[#e8e8e8] p-6 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold text-[#777] uppercase tracking-wide">{current.domain}</span>
              {diffBadge(current.difficulty)}
            </div>
            <p className="text-base text-[#111] leading-relaxed mb-6 whitespace-pre-line">{current.question_text}</p>

            <div className="space-y-2.5">
              {current.options.map(opt => {
                const isSelected = selected === opt.label
                const isCorrect = opt.label === current.correct_answer
                let style = 'border-[#e8e8e8] bg-white hover:border-[#1a56db]/40 hover:bg-[#fafafa]'
                if (revealed) {
                  if (isCorrect) style = 'border-emerald-400 bg-emerald-50'
                  else if (isSelected) style = 'border-red-300 bg-red-50'
                  else style = 'border-[#f0f0f0] bg-[#fafafa] opacity-60'
                } else if (isSelected) {
                  style = 'border-[#1a56db] bg-[#eff6ff]'
                }

                return (
                  <button
                    key={opt.label}
                    onClick={() => handleAnswer(opt.label)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${style}`}
                  >
                    <div className={`w-7 h-7 rounded-full border text-xs font-bold flex items-center justify-center shrink-0 ${
                      revealed && isCorrect ? 'border-emerald-500 bg-emerald-500 text-white'
                      : revealed && isSelected ? 'border-red-400 bg-red-400 text-white'
                      : isSelected ? 'border-[#1a56db] bg-[#1a56db] text-white'
                      : 'border-[#d0d0d0] text-[#555]'
                    }`}>
                      {opt.label}
                    </div>
                    <span className="text-sm text-[#333]">{opt.text}</span>
                    {revealed && isCorrect && <CheckCircle size={15} className="ml-auto text-emerald-500 shrink-0" />}
                  </button>
                )
              })}
            </div>

            {revealed && (
              <div className="mt-5 p-4 bg-[#f9f9f9] rounded-xl border border-[#e8e8e8]">
                <p className="text-xs font-semibold text-[#555] mb-1.5">Explanation</p>
                <p className="text-sm text-[#333] leading-relaxed">{current.explanation}</p>
              </div>
            )}
          </div>

          {revealed && (
            <button
              onClick={nextQuestion}
              className="w-full bg-[#1a56db] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#1648c0] transition-colors flex items-center justify-center gap-2"
            >
              {currentIdx < filtered.length - 1 ? 'Next Question' : 'Finish Session'}
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell title="Question Bank">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-[#111] tracking-tight mb-1">Question Bank</h2>
            <p className="text-sm text-[#777]">{filtered.length} questions matching your filters</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn('flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all',
                showFilters ? 'bg-[#1a56db] text-white border-[#1a56db]' : 'bg-white text-[#555] border-[#e8e8e8] hover:bg-[#f5f5f5]'
              )}
            >
              <Filter size={13} /> Filters
            </button>
            <button
              onClick={() => { setPracticeMode(true); setCurrentIdx(0); setSelected(null); setRevealed(false); setScore({ correct: 0, total: 0 }) }}
              disabled={filtered.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-[#1a56db] text-white rounded-lg text-xs font-semibold hover:bg-[#1648c0] transition-colors disabled:opacity-50"
            >
              <Zap size={13} /> Start Practice
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white border border-[#e8e8e8] rounded-xl p-4 mb-5 grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-[#555] block mb-2">Subject</label>
              <div className="flex flex-wrap gap-1.5">
                {subjects.map(s => (
                  <button
                    key={s}
                    onClick={() => setFilters(f => ({ ...f, subject: s }))}
                    className={cn('px-2.5 py-1 rounded-md text-xs font-medium transition-all capitalize',
                      filters.subject === s ? 'bg-[#1a56db] text-white' : 'bg-[#f5f5f5] text-[#555] hover:bg-[#e8e8e8]'
                    )}
                  >
                    {s === 'all' ? 'All' : s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-[#555] block mb-2">Difficulty</label>
              <div className="flex flex-wrap gap-1.5">
                {difficulties.map(d => (
                  <button
                    key={d}
                    onClick={() => setFilters(f => ({ ...f, difficulty: d }))}
                    className={cn('px-2.5 py-1 rounded-md text-xs font-medium transition-all capitalize',
                      filters.difficulty === d ? 'bg-[#1a56db] text-white' : 'bg-[#f5f5f5] text-[#555] hover:bg-[#e8e8e8]'
                    )}
                  >
                    {d === 'all' ? 'All' : d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-[#555] block mb-2">Domain</label>
              <select
                value={filters.domain}
                onChange={e => setFilters(f => ({ ...f, domain: e.target.value }))}
                className="w-full text-xs border border-[#e0e0e0] rounded-lg px-3 py-2 text-[#333] focus:outline-none focus:border-[#1a56db]"
              >
                {domains.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Question list */}
        <div className="space-y-2">
          {filtered.map((q, i) => (
            <div key={q.id} className="bg-white border border-[#e8e8e8] rounded-xl p-4 hover:border-[#1a56db]/20 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-xs font-bold text-[#999] w-5 text-right shrink-0 mt-0.5">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-sm text-[#111] line-clamp-2 mb-2">{q.question_text}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 bg-[#f0f0f0] text-[#555] rounded-full capitalize">{q.subject}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-[#f0f0f0] text-[#555] rounded-full">{q.domain}</span>
                      {diffBadge(q.difficulty)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#999] shrink-0">
                  <Clock size={11} />
                  {q.time_limit_seconds}s
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
