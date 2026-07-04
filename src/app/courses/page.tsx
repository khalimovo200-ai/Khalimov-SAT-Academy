'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen, Clock, ChevronRight, Play, Lock, CheckCircle, Filter } from 'lucide-react'
import AppShell from '@/components/AppShell'
import { supabase, Course } from '@/lib/supabase'
import { getSubjectColor, cn } from '@/lib/utils'

const subjectLabels: Record<string, string> = {
  all: 'All',
  math: 'Math',
  reading: 'Reading',
  writing: 'Writing',
  grammar: 'Grammar',
  strategy: 'Strategy',
  live: 'Live Classes',
  tips: 'Quick Tips',
}

const mockCourses: Course[] = [
  { id: '1', title: 'Digital SAT Math — Complete Course', description: 'Master every Math domain tested on the Digital SAT, from algebra to advanced math.', subject: 'math', thumbnail_url: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400', total_lessons: 42, estimated_hours: 20, difficulty: 'beginner', is_published: true, sort_order: 1 },
  { id: '2', title: 'Reading Comprehension Mastery', description: 'Build speed and precision for all Reading & Writing question types on the new SAT format.', subject: 'reading', thumbnail_url: 'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=400', total_lessons: 28, estimated_hours: 14, difficulty: 'intermediate', is_published: true, sort_order: 2 },
  { id: '3', title: 'Writing & Grammar Foundations', description: 'Perfect your grammar, punctuation, and sentence structure skills for full writing marks.', subject: 'grammar', thumbnail_url: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400', total_lessons: 24, estimated_hours: 12, difficulty: 'beginner', is_published: true, sort_order: 3 },
  { id: '4', title: 'SAT Strategy & Time Management', description: 'Learn the best test-taking strategies, including elimination techniques and time saving shortcuts.', subject: 'strategy', thumbnail_url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400', total_lessons: 16, estimated_hours: 8, difficulty: 'beginner', is_published: true, sort_order: 4 },
  { id: '5', title: 'Advanced Math — 800 Score Path', description: 'Tackle the hardest Math problems with expert techniques for near-perfect scores.', subject: 'math', thumbnail_url: 'https://images.pexels.com/photos/3729553/pexels-photo-3729553.jpeg?auto=compress&cs=tinysrgb&w=400', total_lessons: 30, estimated_hours: 15, difficulty: 'advanced', is_published: true, sort_order: 5 },
  { id: '6', title: 'Recorded Live Classes Archive', description: 'Access all past live session recordings organized by topic and date.', subject: 'live', thumbnail_url: 'https://images.pexels.com/photos/4492126/pexels-photo-4492126.jpeg?auto=compress&cs=tinysrgb&w=400', total_lessons: 60, estimated_hours: 30, difficulty: 'intermediate', is_published: true, sort_order: 6 },
  { id: '7', title: 'Quick Tips & Shortcuts', description: '5-minute video tips covering the fastest ways to solve common SAT question types.', subject: 'tips', thumbnail_url: 'https://images.pexels.com/photos/5676740/pexels-photo-5676740.jpeg?auto=compress&cs=tinysrgb&w=400', total_lessons: 50, estimated_hours: 4, difficulty: 'beginner', is_published: true, sort_order: 7 },
  { id: '8', title: 'Writing: Advanced Rhetoric', description: 'Master rhetorical synthesis and evidence-based writing for the toughest Writing questions.', subject: 'writing', thumbnail_url: 'https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=400', total_lessons: 18, estimated_hours: 9, difficulty: 'advanced', is_published: true, sort_order: 8 },
]

const difficultyBadge = (d: string) => {
  if (d === 'beginner') return <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-medium">Beginner</span>
  if (d === 'intermediate') return <span className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full font-medium">Intermediate</span>
  return <span className="text-[10px] px-2 py-0.5 bg-red-50 text-red-600 rounded-full font-medium">Advanced</span>
}

export default function CoursesPage() {
  const [activeSubject, setActiveSubject] = useState('all')
  const [courses, setCourses] = useState<Course[]>(mockCourses)

  useEffect(() => {
    supabase.from('courses').select('*').eq('is_published', true).order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setCourses(data as Course[])
      })
  }, [])

  const filtered = activeSubject === 'all' ? courses : courses.filter(c => c.subject === activeSubject)

  return (
    <AppShell title="Course Library">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#111] tracking-tight mb-1">Course Library</h2>
          <p className="text-sm text-[#777]">Structured courses to master every SAT section</p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {Object.entries(subjectLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveSubject(key)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                activeSubject === key
                  ? 'bg-[#1a56db] text-white'
                  : 'bg-white border border-[#e8e8e8] text-[#555] hover:bg-[#f5f5f5]'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(course => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group bg-white rounded-xl border border-[#e8e8e8] overflow-hidden hover:shadow-md hover:border-[#1a56db]/20 transition-all duration-200"
            >
              <div className="relative h-36 overflow-hidden bg-[#f5f5f5]">
                {course.thumbnail_url && (
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div
                  className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-semibold text-white uppercase tracking-wide"
                  style={{ backgroundColor: getSubjectColor(course.subject) }}
                >
                  {subjectLabels[course.subject] || course.subject}
                </div>
                <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play size={14} className="text-white fill-white ml-0.5" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  {difficultyBadge(course.difficulty)}
                </div>
                <h3 className="text-sm font-semibold text-[#111] line-clamp-2 mb-3 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-[#777] line-clamp-2 mb-3">{course.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-[#999] pt-3 border-t border-[#f5f5f5]">
                  <span className="flex items-center gap-1">
                    <BookOpen size={11} />
                    {course.total_lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {course.estimated_hours}h
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
