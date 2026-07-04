'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, BookOpen, HelpCircle, FileText, BarChart2,
  BookMarked, Bot, Users, Video, User, Settings, Bell,
  ChevronLeft, Menu, X, Trophy, Zap, Flame, LogOut,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { getInitials, cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/courses', icon: BookOpen, label: 'Courses' },
  { href: '/question-bank', icon: HelpCircle, label: 'Question Bank' },
  { href: '/mock-tests', icon: FileText, label: 'Mock Tests' },
  { href: '/analytics', icon: BarChart2, label: 'Analytics' },
  { href: '/mistakes', icon: BookMarked, label: 'Mistake Notebook' },
  { href: '/ai-tutor', icon: Bot, label: 'AI Tutor' },
  { href: '/community', icon: Users, label: 'Community' },
  { href: '/live-classes', icon: Video, label: 'Live Classes' },
]

const bottomItems = [
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/admin', icon: Settings, label: 'Admin' },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const { profile, signOut } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const NavLink = ({ item }: { item: typeof navItems[0] }) => {
    const active = pathname === item.href || pathname.startsWith(item.href + '/')
    return (
      <Link
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
          active
            ? 'bg-[#eff6ff] text-[#1a56db]'
            : 'text-[#555] hover:bg-[#f5f5f5] hover:text-[#111]'
        )}
      >
        <item.icon size={18} className="shrink-0" />
        {!collapsed && <span>{item.label}</span>}
      </Link>
    )
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-2.5 px-4 py-5 border-b border-[#f0f0f0]',
        collapsed ? 'justify-center px-3' : ''
      )}>
        <div className="w-8 h-8 bg-[#1a56db] rounded-lg flex items-center justify-center shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-[15px] tracking-tight text-[#111]">ScorePath</span>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="ml-auto text-[#999] hover:text-[#333] transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto mt-3 text-[#999] hover:text-[#333] transition-colors"
        >
          <Menu size={18} />
        </button>
      )}

      {/* User stats */}
      {!collapsed && profile && (
        <div className="mx-3 mt-4 p-3 bg-[#f5f5f5] rounded-lg">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1a56db] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {getInitials(profile.full_name)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#111] truncate">{profile.full_name || 'Student'}</p>
              <p className="text-[11px] text-[#777] capitalize">{profile.plan} plan</p>
            </div>
          </div>
          <div className="flex gap-3 mt-2.5 pt-2.5 border-t border-[#e8e8e8]">
            <div className="flex items-center gap-1 text-[11px] text-[#555]">
              <Flame size={12} className="text-orange-500" />
              <span className="font-medium">{profile.study_streak}d</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#555]">
              <Trophy size={12} className="text-[#1a56db]" />
              <span className="font-medium">{profile.xp.toLocaleString()} XP</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#555]">
              <BarChart2 size={12} className="text-emerald-600" />
              <span className="font-medium">{profile.predicted_score}</span>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(item => <NavLink key={item.href} item={item} />)}
      </nav>

      {/* Bottom nav */}
      <div className="px-3 pb-4 space-y-0.5 border-t border-[#f0f0f0] pt-3">
        {bottomItems.map(item => <NavLink key={item.href} item={item} />)}
        <button
          onClick={signOut}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#555] hover:bg-[#fff1f1] hover:text-[#dc2626] transition-all duration-150',
            collapsed ? 'justify-center' : ''
          )}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col h-screen sticky top-0 border-r border-[#f0f0f0] bg-white transition-all duration-200 shrink-0',
        collapsed ? 'w-[60px]' : 'w-[220px]'
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#1a56db] rounded-full flex items-center justify-center shadow-lg text-white"
      >
        <Menu size={20} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-[240px] h-full bg-white shadow-xl flex flex-col">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-[#999] hover:text-[#333]"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  )
}
