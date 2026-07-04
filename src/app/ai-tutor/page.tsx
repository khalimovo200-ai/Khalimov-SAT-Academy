'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, BookOpen, FileText, RefreshCw, Zap } from 'lucide-react'
import AppShell from '@/components/AppShell'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

const suggestedPrompts = [
  'Explain how to solve quadratic equations',
  'What are the best strategies for SAT reading passages?',
  'Create a 5-day study plan for me',
  'Why is option C wrong in this question?',
  'Teach me grammar shortcuts for the SAT',
  'Give me 3 harder practice questions on algebra',
]

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isUser ? 'bg-[#1a56db]' : 'bg-[#111]'}`}>
        {isUser ? <User size={13} className="text-white" /> : <Bot size={13} className="text-white" />}
      </div>
      <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
        isUser ? 'bg-[#1a56db] text-white rounded-tr-md' : 'bg-white border border-[#e8e8e8] text-[#333] rounded-tl-md'
      }`}>
        <p className="whitespace-pre-wrap">{msg.content}</p>
      </div>
    </div>
  )
}

const aiResponses: Record<string, string> = {
  'explain quadratic': `Great question! Quadratic equations have the form **ax² + bx + c = 0**.

There are 3 main approaches:

**1. Factoring** (fastest when possible)
x² + 5x + 6 = (x+2)(x+3) = 0 → x = -2 or x = -3

**2. Quadratic Formula** (always works)
x = (-b ± √(b² - 4ac)) / 2a

**3. Completing the Square** (rare on SAT, but useful)

**SAT Tip:** Most SAT quadratics factor neatly. Always try factoring first — it's much faster than the formula.

Want me to give you 3 practice problems?`,

  'study plan': `Here's a **5-day focused SAT study plan** based on your current performance:

**Day 1 — Math Foundations**
- Linear equations & inequalities (30 min)
- 15 algebra practice questions (20 min)
- Review mistakes (10 min)

**Day 2 — Reading Strategy**
- Central ideas & evidence (30 min)
- Full reading passage with questions (25 min)

**Day 3 — Grammar Mastery**
- Subject-verb agreement (20 min)
- Punctuation rules (20 min)
- 10 grammar drills (15 min)

**Day 4 — Advanced Math**
- Quadratics & polynomials (40 min)
- 10 hard math questions (20 min)

**Day 5 — Mixed Practice + Review**
- 30-minute timed mini-test
- Review all mistakes in notebook
- AI session for weak areas

**Total: ~3 hours of focused study** 🎯`,

  'default': `I'm ScorePath's AI Tutor, trained specifically on Digital SAT content and strategies.

I can help you with:
• **Explaining concepts** from any SAT topic
• **Question breakdowns** — why an answer is right or wrong
• **Study plans** tailored to your goals and timeline
• **Strategy tips** for reading, math, and writing
• **Practice problems** at any difficulty level

What would you like to work on today?`,
}

function getAIResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('quadratic') || lower.includes('equation')) return aiResponses['explain quadratic']
  if (lower.includes('study plan') || lower.includes('plan')) return aiResponses['study plan']
  if (lower.includes('reading') || lower.includes('passage')) return `Here are the top 3 strategies for SAT Reading passages:\n\n**1. Read the question first**\nKnow what you're looking for before reading the passage. This saves time.\n\n**2. Line references are your friends**\nWhen a question references specific lines, go back to those lines + 2-3 lines before and after.\n\n**3. Eliminate extremes**\nSAT answers that use words like "always," "never," "proves," or "disproves" are almost always wrong. Look for balanced language.\n\nWant me to walk through a full passage strategy together?`
  if (lower.includes('grammar') || lower.includes('writing')) return `**Top 5 SAT Grammar Rules:**\n\n1. **Subject-verb agreement** — the verb agrees with its subject, not nearby nouns\n2. **Pronoun clarity** — pronouns must clearly refer to a specific noun\n3. **Parallel structure** — items in a list must use the same grammatical form\n4. **Comma splices** — two independent clauses need a semicolon or conjunction\n5. **Transition words** — match the logical relationship (however, therefore, furthermore)\n\nShortcut: If you can remove a phrase and the sentence still makes sense, the phrase needs commas around it.`
  return `That's a great question! Let me break this down for you.\n\nOn the Digital SAT, this type of question typically tests your ability to:\n• Identify the most relevant information\n• Apply the right strategy efficiently\n• Eliminate incorrect answer choices systematically\n\n**Key approach:** Always read the question carefully before diving into answer choices. Look for evidence in the passage/problem before selecting your answer.\n\nWould you like me to generate a similar practice question so you can try applying this strategy?`
}

export default function AITutorPage() {
  const { profile } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hi ${profile?.full_name?.split(' ')[0] || 'there'}! 👋 I'm your AI SAT Tutor. I'm here to help you understand concepts, improve your strategy, and build your confidence for test day.\n\nWhat would you like to work on?`,
      created_at: new Date().toISOString(),
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim()
    if (!content || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      created_at: new Date().toISOString(),
    }
    setMessages(m => [...m, userMsg])
    setInput('')
    setLoading(true)

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600))

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getAIResponse(content),
      created_at: new Date().toISOString(),
    }
    setMessages(m => [...m, aiMsg])
    setLoading(false)
  }

  return (
    <AppShell title="AI Tutor">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-white border-b border-[#f0f0f0] px-6 py-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#111] rounded-lg flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#111]">SAT AI Tutor</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
              <p className="text-xs text-[#777]">Always available</p>
            </div>
          </div>
          <button
            onClick={() => setMessages([messages[0]])}
            className="ml-auto text-xs text-[#777] hover:text-[#333] flex items-center gap-1.5"
          >
            <RefreshCw size={12} /> New Chat
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}

            {loading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#111] flex items-center justify-center shrink-0">
                  <Bot size={13} className="text-white" />
                </div>
                <div className="bg-white border border-[#e8e8e8] rounded-2xl rounded-tl-md px-4 py-3">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 bg-[#ccc] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Suggested prompts (only when few messages) */}
            {messages.length <= 2 && !loading && (
              <div className="mt-4">
                <p className="text-xs text-[#999] mb-3 text-center">Try asking me:</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {suggestedPrompts.map(p => (
                    <button
                      key={p}
                      onClick={() => sendMessage(p)}
                      className="text-left text-xs text-[#555] p-3 rounded-xl border border-[#e8e8e8] hover:border-[#1a56db]/30 hover:bg-[#fafafa] transition-all"
                    >
                      <Sparkles size={11} className="inline mr-1.5 text-[#1a56db]" />
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input */}
        <div className="bg-white border-t border-[#f0f0f0] p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-3 bg-[#f5f5f5] rounded-xl p-2 pr-2">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Ask anything about the SAT..."
                rows={1}
                className="flex-1 bg-transparent resize-none text-sm text-[#111] placeholder:text-[#aaa] focus:outline-none px-2 py-1.5 max-h-28"
                style={{ minHeight: '36px' }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-9 h-9 bg-[#1a56db] rounded-lg flex items-center justify-center text-white hover:bg-[#1648c0] transition-colors disabled:opacity-40 shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
            <p className="text-[10px] text-[#ccc] text-center mt-2">AI responses are for educational guidance only.</p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
