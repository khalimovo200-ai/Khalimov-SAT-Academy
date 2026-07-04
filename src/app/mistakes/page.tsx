'use client'

import { useState } from 'react'
import { BookMarked, Search, Filter, StickyNote, RefreshCw, CheckCircle, Bookmark, Tag } from 'lucide-react'
import AppShell from '@/components/AppShell'
import { cn } from '@/lib/utils'

const mockMistakes = [
  { id: '1', subject: 'math', domain: 'Advanced Math', difficulty: 'hard', question_text: 'Which of the following is equivalent to (x² - 9)/(x - 3) for x ≠ 3?', correct_answer: 'A', explanation: 'Factor the numerator: (x-3)(x+3)/(x-3) = x+3 for x ≠ 3.', notes: 'Remember to factor the difference of squares!', bookmarked: true, mastered: false, added: '2025-06-14' },
  { id: '2', subject: 'reading', domain: 'Central Ideas', difficulty: 'medium', question_text: 'The author\'s primary purpose in the passage is best described as...', correct_answer: 'B', explanation: 'The passage focuses on evolution without making explicit arguments.', notes: '', bookmarked: false, mastered: false, added: '2025-06-12' },
  { id: '3', subject: 'writing', domain: 'Rhetoric', difficulty: 'hard', question_text: 'Which choice most effectively uses evidence from the passage to support the claim?', correct_answer: 'C', explanation: 'Evidence questions require selecting the most directly relevant support.', notes: 'Key: look for direct connection to the specific claim made.', bookmarked: true, mastered: true, added: '2025-06-10' },
  { id: '4', subject: 'math', domain: 'Geometry', difficulty: 'medium', question_text: 'In the figure, triangle ABC has angle A = 35° and angle B = 75°. What is angle C?', correct_answer: 'D', explanation: 'Sum of angles in a triangle = 180°. C = 180 - 35 - 75 = 70°.', notes: '', bookmarked: false, mastered: false, added: '2025-06-08' },
  { id: '5', subject: 'math', domain: 'Data Analysis', difficulty: 'easy', question_text: 'Based on the table, what is the median of the data set?', correct_answer: 'B', explanation: 'Arrange values in order and find the middle value.', notes: 'Forgot to arrange values first.', bookmarked: false, mastered: true, added: '2025-06-05' },
]

type Mistake = typeof mockMistakes[0]

export default function MistakesPage() {
  const [mistakes, setMistakes] = useState(mockMistakes)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<Mistake | null>(null)
  const [editNote, setEditNote] = useState('')

  const filtered = mistakes.filter(m => {
    const matchesSearch = !search || m.question_text.toLowerCase().includes(search.toLowerCase()) || m.domain.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || (filter === 'bookmarked' && m.bookmarked) || (filter === 'unmastered' && !m.mastered) || (filter === 'mastered' && m.mastered) || m.subject === filter
    return matchesSearch && matchesFilter
  })

  const toggleMastered = (id: string) => {
    setMistakes(ms => ms.map(m => m.id === id ? { ...m, mastered: !m.mastered } : m))
    if (selected?.id === id) setSelected(s => s ? { ...s, mastered: !s.mastered } : null)
  }

  const toggleBookmark = (id: string) => {
    setMistakes(ms => ms.map(m => m.id === id ? { ...m, bookmarked: !m.bookmarked } : m))
    if (selected?.id === id) setSelected(s => s ? { ...s, bookmarked: !s.bookmarked } : null)
  }

  const saveNote = (id: string) => {
    setMistakes(ms => ms.map(m => m.id === id ? { ...m, notes: editNote } : m))
    if (selected?.id === id) setSelected(s => s ? { ...s, notes: editNote } : null)
  }

  const diffBadge = (d: string) => {
    const c = { easy: 'bg-emerald-50 text-emerald-700', medium: 'bg-amber-50 text-amber-700', hard: 'bg-red-50 text-red-600' }
    return <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c[d as keyof typeof c]}`}>{d}</span>
  }

  return (
    <AppShell title="Mistake Notebook">
      <div className="flex h-full overflow-hidden">
        {/* List */}
        <div className={`${selected ? 'hidden md:flex' : 'flex'} flex-col flex-1 p-6 overflow-y-auto`}>
          <div className="max-w-3xl mx-auto w-full">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-[#111] tracking-tight mb-1">Mistake Notebook</h2>
              <p className="text-sm text-[#777]">Your personal learning journal — review, annotate, and master your mistakes</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Total Mistakes', value: mistakes.length },
                { label: 'Mastered', value: mistakes.filter(m => m.mastered).length },
                { label: 'To Review', value: mistakes.filter(m => !m.mastered).length },
              ].map(s => (
                <div key={s.label} className="bg-white border border-[#e8e8e8] rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-[#111]">{s.value}</p>
                  <p className="text-xs text-[#777]">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Search + filter */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <div className="relative flex-1 min-w-0">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search mistakes..."
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#1a56db] transition-colors"
                />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {['all', 'bookmarked', 'unmastered', 'mastered', 'math', 'reading', 'writing'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn('px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all capitalize',
                      filter === f ? 'bg-[#1a56db] text-white' : 'bg-white border border-[#e8e8e8] text-[#555] hover:bg-[#f5f5f5]'
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {filtered.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setSelected(m); setEditNote(m.notes) }}
                  className={cn(
                    'w-full text-left bg-white border rounded-xl p-4 hover:shadow-sm transition-all',
                    selected?.id === m.id ? 'border-[#1a56db]' : 'border-[#e8e8e8] hover:border-[#1a56db]/30',
                    m.mastered ? 'opacity-70' : ''
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] px-2 py-0.5 bg-[#f0f0f0] text-[#555] rounded-full capitalize">{m.subject}</span>
                        <span className="text-[10px] text-[#999]">{m.domain}</span>
                        {diffBadge(m.difficulty)}
                        {m.mastered && <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full font-medium">Mastered</span>}
                      </div>
                      <p className="text-sm text-[#333] line-clamp-2">{m.question_text}</p>
                      {m.notes && (
                        <div className="flex items-center gap-1 mt-1.5 text-xs text-[#777]">
                          <StickyNote size={11} />
                          <span className="truncate">{m.notes}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {m.bookmarked && <Bookmark size={13} className="text-[#1a56db] fill-[#1a56db]" />}
                    </div>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12 text-sm text-[#999]">No mistakes found matching your filters</div>
              )}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-full md:w-96 shrink-0 bg-white border-l border-[#f0f0f0] flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-[#f0f0f0] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#111]">Question Detail</h3>
              <button onClick={() => setSelected(null)} className="text-[#999] hover:text-[#333] text-xs">Close</button>
            </div>

            <div className="p-4 space-y-4 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] px-2 py-0.5 bg-[#f0f0f0] text-[#555] rounded-full capitalize">{selected.subject}</span>
                <span className="text-[10px] px-2 py-0.5 bg-[#f0f0f0] text-[#555] rounded-full">{selected.domain}</span>
                {diffBadge(selected.difficulty)}
              </div>

              <div className="bg-[#fafafa] rounded-xl p-3">
                <p className="text-sm text-[#111] leading-relaxed">{selected.question_text}</p>
              </div>

              <div className="p-3 bg-[#eff6ff] rounded-xl border border-[#1a56db]/20">
                <p className="text-xs font-semibold text-[#1a56db] mb-1">Correct Answer: {selected.correct_answer}</p>
                <p className="text-xs text-[#333] leading-relaxed">{selected.explanation}</p>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-medium text-[#555] block mb-1.5">My Notes</label>
                <textarea
                  value={editNote}
                  onChange={e => setEditNote(e.target.value)}
                  placeholder="Add your personal notes here..."
                  rows={4}
                  className="w-full text-xs p-3 border border-[#e0e0e0] rounded-xl resize-none focus:outline-none focus:border-[#1a56db] transition-colors"
                />
                <button
                  onClick={() => saveNote(selected.id)}
                  className="mt-2 text-xs text-white bg-[#1a56db] px-3 py-1.5 rounded-lg hover:bg-[#1648c0] transition-colors"
                >
                  Save Note
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleBookmark(selected.id)}
                  className={cn('flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium border transition-all',
                    selected.bookmarked ? 'border-[#1a56db] bg-[#eff6ff] text-[#1a56db]' : 'border-[#e8e8e8] text-[#555] hover:bg-[#f5f5f5]'
                  )}
                >
                  <Bookmark size={13} className={selected.bookmarked ? 'fill-[#1a56db]' : ''} />
                  {selected.bookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button
                  onClick={() => toggleMastered(selected.id)}
                  className={cn('flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium border transition-all',
                    selected.mastered ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-[#e8e8e8] text-[#555] hover:bg-[#f5f5f5]'
                  )}
                >
                  <CheckCircle size={13} />
                  {selected.mastered ? 'Mastered!' : 'Mark Mastered'}
                </button>
              </div>

              <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium border border-[#e8e8e8] text-[#555] hover:bg-[#f5f5f5] transition-all">
                <RefreshCw size={13} />
                Retry Question
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
