import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  full_name: string | null
  avatar_url: string | null
  target_score: number
  predicted_score: number
  exam_date: string | null
  plan: 'free' | 'basic' | 'premium' | 'vip'
  xp: number
  study_streak: number
  last_study_date: string | null
  role: 'student' | 'admin' | 'parent'
  created_at: string
}

export type Course = {
  id: string
  title: string
  description: string | null
  subject: string
  thumbnail_url: string | null
  total_lessons: number
  estimated_hours: number
  difficulty: string
  is_published: boolean
  sort_order: number
}

export type Lesson = {
  id: string
  course_id: string
  title: string
  description: string | null
  video_url: string | null
  notes: string | null
  pdf_url: string | null
  estimated_minutes: number
  sort_order: number
  is_published: boolean
}

export type Question = {
  id: string
  subject: string
  domain: string | null
  difficulty: string
  question_type: string
  question_text: string
  explanation: string | null
  correct_answer: string
  time_limit_seconds: number
  question_options?: QuestionOption[]
}

export type QuestionOption = {
  id: string
  question_id: string
  label: string
  text: string
  sort_order: number
}

export type MockTest = {
  id: string
  title: string
  description: string | null
  total_questions: number
  time_limit_minutes: number
  is_published: boolean
}

export type UserTestAttempt = {
  id: string
  user_id: string
  mock_test_id: string
  started_at: string
  completed_at: string | null
  total_score: number | null
  math_score: number | null
  reading_writing_score: number | null
  total_correct: number
  total_wrong: number
  status: string
}

export type CommunityPost = {
  id: string
  channel_id: string
  user_id: string
  title: string | null
  content: string
  likes: number
  created_at: string
  profiles?: Profile
}

export type LiveClass = {
  id: string
  title: string
  description: string | null
  instructor: string | null
  scheduled_at: string
  duration_minutes: number
  meeting_url: string | null
  recording_url: string | null
  subject: string | null
  is_published: boolean
  max_seats?: number | null
}

export type Notification = {
  id: string
  user_id: string
  type: string
  title: string
  body: string | null
  is_read: boolean
  created_at: string
}
