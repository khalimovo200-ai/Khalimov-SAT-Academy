'use client'

import Link from 'next/link'
import { CheckCircle, Zap, Crown, Star, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get a taste of ScorePath',
    icon: Zap,
    iconBg: 'bg-[#f5f5f5]',
    iconColor: 'text-[#555]',
    features: [
      '10 practice questions per day',
      'Basic performance analytics',
      '2 free course lessons',
      'Community access',
      'AI Tutor (5 messages/day)',
    ],
    limitations: ['No mock tests', 'No mistake notebook', 'Limited analytics'],
    cta: 'Get Started Free',
    href: '/signup',
    accent: false,
  },
  {
    name: 'Premium',
    price: '$29',
    period: '/month',
    description: 'Everything to score your best',
    icon: Star,
    iconBg: 'bg-[#1a56db]',
    iconColor: 'text-white',
    features: [
      'Unlimited practice questions',
      'Full Digital SAT mock tests',
      'All courses & lessons',
      'AI Tutor (unlimited)',
      'Mistake notebook',
      'Deep performance analytics',
      'Live class access',
      'Community (full access)',
      'PDF downloads & homework',
    ],
    cta: 'Start Premium',
    href: '/signup',
    accent: true,
    badge: 'Most Popular',
  },
  {
    name: 'VIP Mentorship',
    price: '$199',
    period: '/month',
    description: 'Personal coaching & guarantee',
    icon: Crown,
    iconBg: 'bg-[#111]',
    iconColor: 'text-white',
    features: [
      'Everything in Premium',
      '4 private tutoring sessions/mo',
      'Custom study roadmap',
      'Weekly progress review',
      'Priority 1-on-1 support',
      'Score improvement guarantee',
      'Parent progress reports',
    ],
    cta: 'Apply for VIP',
    href: '/signup',
    accent: false,
  },
]

const faqs = [
  { q: 'Can I cancel anytime?', a: 'Yes. All paid plans can be cancelled at any time. You\'ll retain access until the end of your billing period.' },
  { q: 'Is there a free trial for Premium?', a: 'You can start with our Free plan immediately, which includes a taste of all major features. There\'s no credit card required.' },
  { q: 'Do you offer student discounts?', a: 'Yes. Use a coupon code at checkout for student discounts. We partner with several schools to offer subsidized access.' },
  { q: 'What is the score guarantee?', a: 'VIP Mentorship students who follow their personalized plan and complete all required work receive a full refund if their official SAT score doesn\'t improve.' },
  { q: 'What happens to my data if I cancel?', a: 'All your data — mock test results, mistake notebook, analytics — is preserved for 90 days after cancellation, giving you time to resubscribe or export.' },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <Link href="/" className="text-xs text-[#777] hover:text-[#111] mb-4 inline-block">← Back to Home</Link>
          <h1 className="text-4xl font-bold text-[#111] tracking-tight mb-3">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-[#555] max-w-xl mx-auto">
            Start free and upgrade when you're ready to go all-in on your SAT preparation.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-6 border ${plan.accent ? 'border-[#1a56db] shadow-lg shadow-[#1a56db]/10' : 'border-[#e8e8e8]'}`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1a56db] text-white text-xs font-semibold px-4 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className={`w-10 h-10 ${plan.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <plan.icon size={18} className={plan.iconColor} />
              </div>

              <h3 className="text-lg font-bold text-[#111] mb-0.5">{plan.name}</h3>
              <p className="text-xs text-[#777] mb-3">{plan.description}</p>

              <div className="mb-5">
                <span className="text-3xl font-bold text-[#111]">{plan.price}</span>
                <span className="text-sm text-[#777] ml-1">{plan.period}</span>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#444]">
                    <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
                {'limitations' in plan && plan.limitations?.map(l => (
                  <li key={l} className="flex items-start gap-2 text-sm text-[#bbb]">
                    <div className="w-3.5 h-0.5 bg-[#ddd] mt-2.5 shrink-0 ml-0.5" />
                    {l}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  plan.accent
                    ? 'bg-[#1a56db] text-white hover:bg-[#1648c0]'
                    : 'bg-[#f5f5f5] text-[#111] hover:bg-[#e8e8e8]'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Coupon */}
        <div className="bg-white border border-[#e8e8e8] rounded-2xl p-6 text-center mb-16">
          <p className="text-sm font-semibold text-[#111] mb-1">Have a coupon code?</p>
          <p className="text-xs text-[#777] mb-4">Enter your discount code during checkout to apply your discount.</p>
          <div className="flex items-center gap-2 max-w-xs mx-auto">
            <input
              type="text"
              placeholder="SAVE20"
              className="flex-1 px-3 py-2 text-sm border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#1a56db] uppercase tracking-wide"
            />
            <button className="px-4 py-2 bg-[#111] text-white rounded-lg text-sm font-medium hover:bg-[#333] transition-colors">
              Apply
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-bold text-[#111] text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {faqs.map(faq => (
              <div key={faq.q} className="bg-white border border-[#e8e8e8] rounded-xl p-5">
                <p className="text-sm font-semibold text-[#111] mb-2">{faq.q}</p>
                <p className="text-sm text-[#555] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
