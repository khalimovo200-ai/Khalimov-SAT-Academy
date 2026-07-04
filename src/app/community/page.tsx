'use client'

import { useState, useEffect } from 'react'
import { Hash, Calculator, BookOpen, Pencil, Target, Trophy, Bell, Users, Send, ThumbsUp, MessageSquare } from 'lucide-react'
import AppShell from '@/components/AppShell'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { getInitials, formatDate, cn } from '@/lib/utils'

const channels = [
  { id: 'general', name: 'General', icon: Hash, desc: 'General discussion' },
  { id: 'math', name: 'Math Help', icon: Calculator, desc: 'SAT Math questions' },
  { id: 'reading', name: 'Reading Help', icon: BookOpen, desc: 'Reading strategies' },
  { id: 'writing', name: 'Writing Help', icon: Pencil, desc: 'Grammar & writing' },
  { id: 'goals', name: 'Daily Goals', icon: Target, desc: 'Share your goals' },
  { id: 'success', name: 'Success Stories', icon: Trophy, desc: 'Celebrate wins!' },
  { id: 'announcements', name: 'Announcements', icon: Bell, desc: 'Important updates' },
]

const mockPosts = [
  { id: '1', channel: 'math', user: 'Alex C.', avatar: 'AC', content: 'Can anyone explain the difference between permutations and combinations? I keep mixing them up on practice tests.', likes: 12, comments: 4, time: '2h ago' },
  { id: '2', channel: 'success', user: 'Maya R.', avatar: 'MR', content: '🎉 Just got my first 1500+ on a mock test! Three months ago I was at 1200. ScorePath and this community made the difference. Thank you all!', likes: 47, comments: 12, time: '3h ago' },
  { id: '3', channel: 'general', user: 'James K.', avatar: 'JK', content: "Quick tip: For reading passages, I've found it super helpful to underline the author's main claim in each paragraph before answering questions. Cut my time significantly.", likes: 23, comments: 6, time: '5h ago' },
  { id: '4', channel: 'writing', user: 'Sofia L.', avatar: 'SL', content: 'Can someone clarify when to use semicolons vs. em dashes? The rules feel similar to me.', likes: 8, comments: 7, time: '6h ago' },
  { id: '5', channel: 'goals', user: 'Ryan M.', avatar: 'RM', content: 'Today\'s goal: complete 30 math questions and review my mistake notebook from last week. Who\'s joining me?', likes: 19, comments: 5, time: '8h ago' },
  { id: '6', channel: 'announcements', user: 'ScorePath Team', avatar: 'SP', content: '📢 New feature alert! The Mistake Notebook now supports custom tags. You can now organize your mistakes by topic and difficulty. Check it out!', likes: 34, comments: 2, time: '1d ago' },
]

export default function CommunityPage() {
  const { profile } = useAuth()
  const [activeChannel, setActiveChannel] = useState('general')
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState(mockPosts)
  const [likedIds, setLikedIds] = useState<string[]>([])

  const filteredPosts = activeChannel === 'general'
    ? posts
    : posts.filter(p => p.channel === activeChannel)

  const handlePost = () => {
    if (!newPost.trim() || !profile) return
    const post = {
      id: Date.now().toString(),
      channel: activeChannel,
      user: profile.full_name || 'Student',
      avatar: getInitials(profile.full_name),
      content: newPost.trim(),
      likes: 0,
      comments: 0,
      time: 'just now',
    }
    setPosts(p => [post, ...p])
    setNewPost('')
  }

  const toggleLike = (id: string) => {
    if (likedIds.includes(id)) {
      setLikedIds(l => l.filter(x => x !== id))
      setPosts(ps => ps.map(p => p.id === id ? { ...p, likes: p.likes - 1 } : p))
    } else {
      setLikedIds(l => [...l, id])
      setPosts(ps => ps.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p))
    }
  }

  const channelObj = channels.find(c => c.id === activeChannel)

  return (
    <AppShell title="Community">
      <div className="flex h-full overflow-hidden">
        {/* Channel sidebar */}
        <div className="w-52 shrink-0 bg-white border-r border-[#f0f0f0] flex flex-col hidden md:flex">
          <div className="p-4 border-b border-[#f0f0f0]">
            <div className="flex items-center gap-2">
              <Users size={15} className="text-[#777]" />
              <span className="text-xs font-semibold text-[#555]">Channels</span>
            </div>
          </div>
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
            {channels.map(ch => {
              const count = posts.filter(p => p.channel === ch.id).length
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all',
                    activeChannel === ch.id ? 'bg-[#eff6ff] text-[#1a56db]' : 'text-[#555] hover:bg-[#f5f5f5] hover:text-[#111]'
                  )}
                >
                  <ch.icon size={14} className="shrink-0" />
                  <span className="text-xs font-medium flex-1 truncate">{ch.name}</span>
                  {count > 0 && (
                    <span className="text-[10px] text-[#999]">{count}</span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Main feed */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Channel header */}
          <div className="bg-white border-b border-[#f0f0f0] px-6 py-3">
            <div className="flex items-center gap-2">
              {channelObj && <channelObj.icon size={16} className="text-[#777]" />}
              <span className="text-sm font-semibold text-[#111]">{channelObj?.name}</span>
              <span className="text-xs text-[#999]">— {channelObj?.desc}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Compose */}
              <div className="bg-white border border-[#e8e8e8] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1a56db] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {getInitials(profile?.full_name)}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={e => setNewPost(e.target.value)}
                      placeholder={`Share something with ${channelObj?.name}...`}
                      rows={2}
                      className="w-full text-sm text-[#111] placeholder:text-[#bbb] resize-none focus:outline-none"
                    />
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f5f5f5]">
                      <span className="text-xs text-[#ccc]">{newPost.length}/500</span>
                      <button
                        onClick={handlePost}
                        disabled={!newPost.trim()}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a56db] text-white rounded-lg text-xs font-medium hover:bg-[#1648c0] transition-colors disabled:opacity-40"
                      >
                        <Send size={12} /> Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts */}
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white border border-[#e8e8e8] rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#555] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm font-semibold text-[#111]">{post.user}</span>
                        <span className="text-xs text-[#aaa]">{post.time}</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-[#f0f0f0] text-[#777] rounded capitalize">{post.channel}</span>
                      </div>
                      <p className="text-sm text-[#333] leading-relaxed">{post.content}</p>
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#f9f9f9]">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={cn(
                            'flex items-center gap-1.5 text-xs transition-colors',
                            likedIds.includes(post.id) ? 'text-[#1a56db]' : 'text-[#aaa] hover:text-[#555]'
                          )}
                        >
                          <ThumbsUp size={13} className={likedIds.includes(post.id) ? 'fill-[#1a56db]' : ''} />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-[#aaa] hover:text-[#555] transition-colors">
                          <MessageSquare size={13} />
                          {post.comments} replies
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredPosts.length === 0 && (
                <div className="text-center py-12 text-sm text-[#999]">
                  No posts in this channel yet. Be the first to post!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
