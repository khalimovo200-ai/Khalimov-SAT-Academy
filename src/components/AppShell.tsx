'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AppSidebar from '@/components/AppSidebar'
import AppHeader from '@/components/AppHeader'

export default function AppShell({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#1a56db] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#777]">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AppHeader title={title} />
        <main className="flex-1 overflow-y-auto bg-[#fafafa]">
          {children}
        </main>
      </div>
    </div>
  )
}
