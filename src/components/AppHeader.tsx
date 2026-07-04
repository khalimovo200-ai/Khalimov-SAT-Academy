'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bell, Search, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, Notification } from '@/lib/supabase'
import { getInitials, cn } from '@/lib/utils'

export default function AppHeader({ title }: { title?: string }) {
  const { profile } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifs, setShowNotifs] = useState(false)

  useEffect(() => {
    if (!profile) return
    supabase
      .from('notifications')
      .select('*')
      .eq('user_id', profile.id)
      .eq('is_read', false)
      .order('created_at', { ascending: false })
      .limit(10)
      .then(({ data }) => {
        if (data) setNotifications(data as Notification[])
      })
  }, [profile])

  const markAllRead = async () => {
    if (!profile) return
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', profile.id)
    setNotifications([])
    setShowNotifs(false)
  }

  return (
    <header className="sticky top-0 z-30 h-14 bg-white border-b border-[#f0f0f0] flex items-center px-4 md:px-6 gap-4">
      {title && (
        <h1 className="text-[15px] font-semibold text-[#111] hidden md:block">{title}</h1>
      )}

      <div className="flex-1 max-w-sm hidden md:block">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
          <input
            type="text"
            placeholder="Search lessons, questions..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-[#f5f5f5] border border-transparent rounded-lg text-[#111] placeholder:text-[#aaa] focus:outline-none focus:border-[#1a56db] focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className={cn(
              'relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
              showNotifs ? 'bg-[#eff6ff] text-[#1a56db]' : 'hover:bg-[#f5f5f5] text-[#555]'
            )}
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#1a56db] rounded-full" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#e8e8e8] rounded-xl shadow-xl z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0f0f0]">
                <span className="text-sm font-semibold text-[#111]">Notifications</span>
                <div className="flex items-center gap-2">
                  {notifications.length > 0 && (
                    <button onClick={markAllRead} className="text-xs text-[#1a56db] hover:underline">
                      Mark all read
                    </button>
                  )}
                  <button onClick={() => setShowNotifs(false)} className="text-[#999]">
                    <X size={14} />
                  </button>
                </div>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-[#999]">
                    No new notifications
                  </div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className="px-4 py-3 border-b border-[#f9f9f9] hover:bg-[#f9f9f9]">
                      <p className="text-sm font-medium text-[#111]">{n.title}</p>
                      {n.body && <p className="text-xs text-[#777] mt-0.5">{n.body}</p>}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <Link href="/profile">
          <div className="w-9 h-9 rounded-full bg-[#1a56db] flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:opacity-90 transition-opacity">
            {getInitials(profile?.full_name)}
          </div>
        </Link>
      </div>
    </header>
  )
}
