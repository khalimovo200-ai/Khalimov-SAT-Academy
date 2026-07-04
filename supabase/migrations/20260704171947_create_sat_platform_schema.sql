/*
# SAT Learning Platform - Core Schema

## Summary
Creates the complete database schema for a premium SAT learning platform.

## Tables Created

### User Data
- `profiles` - Extended user info (target score, exam date, XP, streak, plan)
- `achievements` - Badge/achievement definitions
- `user_achievements` - Junction: which user earned which achievement

### Courses & Content
- `courses` - Course catalog (Math, Reading, Writing, etc.)
- `lessons` - Individual lessons within courses
- `user_lesson_progress` - Tracks lesson completion per user

### Question Bank
- `questions` - SAT practice questions with subject/domain/difficulty
- `question_options` - Answer choices for each question

### Mock Tests
- `mock_tests` - Mock test definitions
- `mock_test_questions` - Questions included in a mock test
- `user_test_attempts` - A student's attempt at a mock test
- `user_test_answers` - Individual answers within an attempt

### Mistake Notebook
- `mistake_notebook` - Saved incorrect questions with notes

### AI Tutor
- `ai_chat_sessions` - Chat sessions with AI tutor
- `ai_messages` - Individual messages in a session

### Community
- `community_channels` - Discussion channels (General, Math Help, etc.)
- `community_posts` - Posts within channels
- `community_comments` - Comments on posts

### Live Classes
- `live_classes` - Scheduled live sessions
- `user_class_registrations` - Who registered for a class

### Notifications
- `notifications` - Per-user notification records

### Admin
- `announcements` - Admin announcements
- `coupons` - Discount coupon codes

## Security
- RLS enabled on all tables
- Authenticated-only access for personal data
- Public read for courses, questions, live classes, community channels
*/

-- ───────────────────────────────────────────────
-- PROFILES
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  target_score integer DEFAULT 1400,
  predicted_score integer DEFAULT 1000,
  exam_date date,
  plan text DEFAULT 'free' CHECK (plan IN ('free','basic','premium','vip')),
  xp integer DEFAULT 0,
  study_streak integer DEFAULT 0,
  last_study_date date,
  role text DEFAULT 'student' CHECK (role IN ('student','admin','parent')),
  parent_of uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select" ON profiles;
CREATE POLICY "profiles_select" ON profiles FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "profiles_insert" ON profiles;
CREATE POLICY "profiles_insert" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update" ON profiles;
CREATE POLICY "profiles_update" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_delete" ON profiles;
CREATE POLICY "profiles_delete" ON profiles FOR DELETE TO authenticated USING (auth.uid() = id);

-- ───────────────────────────────────────────────
-- ACHIEVEMENTS
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  xp_reward integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "achievements_select" ON achievements;
CREATE POLICY "achievements_select" ON achievements FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "achievements_insert" ON achievements;
CREATE POLICY "achievements_insert" ON achievements FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "achievements_update" ON achievements;
CREATE POLICY "achievements_update" ON achievements FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "achievements_delete" ON achievements;
CREATE POLICY "achievements_delete" ON achievements FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id uuid NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "user_achievements_select" ON user_achievements;
CREATE POLICY "user_achievements_select" ON user_achievements FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_achievements_insert" ON user_achievements;
CREATE POLICY "user_achievements_insert" ON user_achievements FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_achievements_update" ON user_achievements;
CREATE POLICY "user_achievements_update" ON user_achievements FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_achievements_delete" ON user_achievements;
CREATE POLICY "user_achievements_delete" ON user_achievements FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ───────────────────────────────────────────────
-- COURSES & LESSONS
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subject text NOT NULL CHECK (subject IN ('math','reading','writing','grammar','strategy','live','tips')),
  thumbnail_url text,
  total_lessons integer DEFAULT 0,
  estimated_hours integer DEFAULT 0,
  difficulty text DEFAULT 'beginner' CHECK (difficulty IN ('beginner','intermediate','advanced')),
  is_published boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "courses_select" ON courses;
CREATE POLICY "courses_select" ON courses FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "courses_insert" ON courses;
CREATE POLICY "courses_insert" ON courses FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "courses_update" ON courses;
CREATE POLICY "courses_update" ON courses FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "courses_delete" ON courses;
CREATE POLICY "courses_delete" ON courses FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  video_url text,
  notes text,
  pdf_url text,
  homework_url text,
  estimated_minutes integer DEFAULT 30,
  sort_order integer DEFAULT 0,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "lessons_select" ON lessons;
CREATE POLICY "lessons_select" ON lessons FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "lessons_insert" ON lessons;
CREATE POLICY "lessons_insert" ON lessons FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "lessons_update" ON lessons;
CREATE POLICY "lessons_update" ON lessons FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "lessons_delete" ON lessons;
CREATE POLICY "lessons_delete" ON lessons FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS user_lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ulp_select" ON user_lesson_progress;
CREATE POLICY "ulp_select" ON user_lesson_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "ulp_insert" ON user_lesson_progress;
CREATE POLICY "ulp_insert" ON user_lesson_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "ulp_update" ON user_lesson_progress;
CREATE POLICY "ulp_update" ON user_lesson_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "ulp_delete" ON user_lesson_progress;
CREATE POLICY "ulp_delete" ON user_lesson_progress FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ───────────────────────────────────────────────
-- QUESTION BANK
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL CHECK (subject IN ('math','reading','writing')),
  domain text,
  difficulty text DEFAULT 'medium' CHECK (difficulty IN ('easy','medium','hard')),
  question_type text DEFAULT 'mcq' CHECK (question_type IN ('mcq','grid_in')),
  question_text text NOT NULL,
  explanation text,
  correct_answer text NOT NULL,
  time_limit_seconds integer DEFAULT 90,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "questions_select" ON questions;
CREATE POLICY "questions_select" ON questions FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "questions_insert" ON questions;
CREATE POLICY "questions_insert" ON questions FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "questions_update" ON questions;
CREATE POLICY "questions_update" ON questions FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "questions_delete" ON questions;
CREATE POLICY "questions_delete" ON questions FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS question_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  label text NOT NULL,
  text text NOT NULL,
  sort_order integer DEFAULT 0
);

ALTER TABLE question_options ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "qopts_select" ON question_options;
CREATE POLICY "qopts_select" ON question_options FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "qopts_insert" ON question_options;
CREATE POLICY "qopts_insert" ON question_options FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "qopts_update" ON question_options;
CREATE POLICY "qopts_update" ON question_options FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "qopts_delete" ON question_options;
CREATE POLICY "qopts_delete" ON question_options FOR DELETE TO authenticated USING (true);

-- ───────────────────────────────────────────────
-- MOCK TESTS
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mock_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  total_questions integer DEFAULT 0,
  time_limit_minutes integer DEFAULT 134,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mock_tests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "mock_tests_select" ON mock_tests;
CREATE POLICY "mock_tests_select" ON mock_tests FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "mock_tests_insert" ON mock_tests;
CREATE POLICY "mock_tests_insert" ON mock_tests FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "mock_tests_update" ON mock_tests;
CREATE POLICY "mock_tests_update" ON mock_tests FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "mock_tests_delete" ON mock_tests;
CREATE POLICY "mock_tests_delete" ON mock_tests FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS mock_test_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mock_test_id uuid NOT NULL REFERENCES mock_tests(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  sort_order integer DEFAULT 0
);

ALTER TABLE mock_test_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "mtq_select" ON mock_test_questions;
CREATE POLICY "mtq_select" ON mock_test_questions FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "mtq_insert" ON mock_test_questions;
CREATE POLICY "mtq_insert" ON mock_test_questions FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "mtq_update" ON mock_test_questions;
CREATE POLICY "mtq_update" ON mock_test_questions FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "mtq_delete" ON mock_test_questions;
CREATE POLICY "mtq_delete" ON mock_test_questions FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS user_test_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  mock_test_id uuid NOT NULL REFERENCES mock_tests(id) ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  total_score integer,
  math_score integer,
  reading_writing_score integer,
  total_correct integer DEFAULT 0,
  total_wrong integer DEFAULT 0,
  status text DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed','abandoned'))
);

ALTER TABLE user_test_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "uta_select" ON user_test_attempts;
CREATE POLICY "uta_select" ON user_test_attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "uta_insert" ON user_test_attempts;
CREATE POLICY "uta_insert" ON user_test_attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "uta_update" ON user_test_attempts;
CREATE POLICY "uta_update" ON user_test_attempts FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "uta_delete" ON user_test_attempts;
CREATE POLICY "uta_delete" ON user_test_attempts FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS user_test_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL REFERENCES user_test_attempts(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  selected_answer text,
  is_correct boolean,
  time_taken_seconds integer,
  answered_at timestamptz DEFAULT now()
);

ALTER TABLE user_test_answers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "utans_select" ON user_test_answers;
CREATE POLICY "utans_select" ON user_test_answers FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM user_test_attempts WHERE id = attempt_id AND user_id = auth.uid()));

DROP POLICY IF EXISTS "utans_insert" ON user_test_answers;
CREATE POLICY "utans_insert" ON user_test_answers FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM user_test_attempts WHERE id = attempt_id AND user_id = auth.uid()));

DROP POLICY IF EXISTS "utans_update" ON user_test_answers;
CREATE POLICY "utans_update" ON user_test_answers FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM user_test_attempts WHERE id = attempt_id AND user_id = auth.uid()));

DROP POLICY IF EXISTS "utans_delete" ON user_test_answers;
CREATE POLICY "utans_delete" ON user_test_answers FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM user_test_attempts WHERE id = attempt_id AND user_id = auth.uid()));

-- ───────────────────────────────────────────────
-- MISTAKE NOTEBOOK
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mistake_notebook (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  notes text,
  is_bookmarked boolean DEFAULT false,
  is_mastered boolean DEFAULT false,
  added_at timestamptz DEFAULT now(),
  UNIQUE(user_id, question_id)
);

ALTER TABLE mistake_notebook ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "mn_select" ON mistake_notebook;
CREATE POLICY "mn_select" ON mistake_notebook FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "mn_insert" ON mistake_notebook;
CREATE POLICY "mn_insert" ON mistake_notebook FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "mn_update" ON mistake_notebook;
CREATE POLICY "mn_update" ON mistake_notebook FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "mn_delete" ON mistake_notebook;
CREATE POLICY "mn_delete" ON mistake_notebook FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ───────────────────────────────────────────────
-- AI TUTOR
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  title text DEFAULT 'New Chat',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_chat_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "aic_select" ON ai_chat_sessions;
CREATE POLICY "aic_select" ON ai_chat_sessions FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "aic_insert" ON ai_chat_sessions;
CREATE POLICY "aic_insert" ON ai_chat_sessions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "aic_update" ON ai_chat_sessions;
CREATE POLICY "aic_update" ON ai_chat_sessions FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "aic_delete" ON ai_chat_sessions;
CREATE POLICY "aic_delete" ON ai_chat_sessions FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS ai_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user','assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "aim_select" ON ai_messages;
CREATE POLICY "aim_select" ON ai_messages FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM ai_chat_sessions WHERE id = session_id AND user_id = auth.uid()));

DROP POLICY IF EXISTS "aim_insert" ON ai_messages;
CREATE POLICY "aim_insert" ON ai_messages FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM ai_chat_sessions WHERE id = session_id AND user_id = auth.uid()));

DROP POLICY IF EXISTS "aim_update" ON ai_messages;
CREATE POLICY "aim_update" ON ai_messages FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM ai_chat_sessions WHERE id = session_id AND user_id = auth.uid()));

DROP POLICY IF EXISTS "aim_delete" ON ai_messages;
CREATE POLICY "aim_delete" ON ai_messages FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM ai_chat_sessions WHERE id = session_id AND user_id = auth.uid()));

-- ───────────────────────────────────────────────
-- COMMUNITY
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS community_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  sort_order integer DEFAULT 0
);

ALTER TABLE community_channels ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cc_select" ON community_channels;
CREATE POLICY "cc_select" ON community_channels FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "cc_insert" ON community_channels;
CREATE POLICY "cc_insert" ON community_channels FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "cc_update" ON community_channels;
CREATE POLICY "cc_update" ON community_channels FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "cc_delete" ON community_channels;
CREATE POLICY "cc_delete" ON community_channels FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id uuid NOT NULL REFERENCES community_channels(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  title text,
  content text NOT NULL,
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cp_select" ON community_posts;
CREATE POLICY "cp_select" ON community_posts FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "cp_insert" ON community_posts;
CREATE POLICY "cp_insert" ON community_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "cp_update" ON community_posts;
CREATE POLICY "cp_update" ON community_posts FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "cp_delete" ON community_posts;
CREATE POLICY "cp_delete" ON community_posts FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS community_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ccom_select" ON community_comments;
CREATE POLICY "ccom_select" ON community_comments FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "ccom_insert" ON community_comments;
CREATE POLICY "ccom_insert" ON community_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "ccom_update" ON community_comments;
CREATE POLICY "ccom_update" ON community_comments FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "ccom_delete" ON community_comments;
CREATE POLICY "ccom_delete" ON community_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ───────────────────────────────────────────────
-- LIVE CLASSES
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS live_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  instructor text,
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer DEFAULT 60,
  meeting_url text,
  recording_url text,
  subject text,
  max_seats integer,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE live_classes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "lc_select" ON live_classes;
CREATE POLICY "lc_select" ON live_classes FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "lc_insert" ON live_classes;
CREATE POLICY "lc_insert" ON live_classes FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "lc_update" ON live_classes;
CREATE POLICY "lc_update" ON live_classes FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "lc_delete" ON live_classes;
CREATE POLICY "lc_delete" ON live_classes FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS user_class_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  class_id uuid NOT NULL REFERENCES live_classes(id) ON DELETE CASCADE,
  registered_at timestamptz DEFAULT now(),
  UNIQUE(user_id, class_id)
);

ALTER TABLE user_class_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ucr_select" ON user_class_registrations;
CREATE POLICY "ucr_select" ON user_class_registrations FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "ucr_insert" ON user_class_registrations;
CREATE POLICY "ucr_insert" ON user_class_registrations FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "ucr_update" ON user_class_registrations;
CREATE POLICY "ucr_update" ON user_class_registrations FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "ucr_delete" ON user_class_registrations;
CREATE POLICY "ucr_delete" ON user_class_registrations FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ───────────────────────────────────────────────
-- NOTIFICATIONS
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  body text,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "notif_select" ON notifications;
CREATE POLICY "notif_select" ON notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "notif_insert" ON notifications;
CREATE POLICY "notif_insert" ON notifications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "notif_update" ON notifications;
CREATE POLICY "notif_update" ON notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "notif_delete" ON notifications;
CREATE POLICY "notif_delete" ON notifications FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ───────────────────────────────────────────────
-- ANNOUNCEMENTS
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ann_select" ON announcements;
CREATE POLICY "ann_select" ON announcements FOR SELECT TO anon, authenticated USING (is_published = true);

DROP POLICY IF EXISTS "ann_insert" ON announcements;
CREATE POLICY "ann_insert" ON announcements FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "ann_update" ON announcements;
CREATE POLICY "ann_update" ON announcements FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "ann_delete" ON announcements;
CREATE POLICY "ann_delete" ON announcements FOR DELETE TO authenticated USING (true);

-- ───────────────────────────────────────────────
-- COUPONS
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_percent integer NOT NULL CHECK (discount_percent BETWEEN 1 AND 100),
  max_uses integer,
  used_count integer DEFAULT 0,
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "coupons_select" ON coupons;
CREATE POLICY "coupons_select" ON coupons FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "coupons_insert" ON coupons;
CREATE POLICY "coupons_insert" ON coupons FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "coupons_update" ON coupons;
CREATE POLICY "coupons_update" ON coupons FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "coupons_delete" ON coupons;
CREATE POLICY "coupons_delete" ON coupons FOR DELETE TO authenticated USING (true);

-- ───────────────────────────────────────────────
-- SEED: Default Community Channels
-- ───────────────────────────────────────────────
INSERT INTO community_channels (name, description, icon, sort_order) VALUES
  ('General', 'General discussion for all students', 'hash', 1),
  ('Math Help', 'Get help with SAT Math questions', 'calculator', 2),
  ('Reading Help', 'Discuss reading comprehension strategies', 'book-open', 3),
  ('Writing Help', 'Grammar and writing strategy help', 'pencil', 4),
  ('Daily Goals', 'Share your daily study goals', 'target', 5),
  ('Success Stories', 'Celebrate your wins!', 'trophy', 6),
  ('Announcements', 'Important announcements from instructors', 'bell', 7)
ON CONFLICT DO NOTHING;

-- ───────────────────────────────────────────────
-- SEED: Default Achievements
-- ───────────────────────────────────────────────
INSERT INTO achievements (name, description, icon, xp_reward) VALUES
  ('First Login', 'Welcome to ScorePath!', 'star', 50),
  ('First Lesson', 'Completed your first lesson', 'book', 100),
  ('7-Day Streak', 'Studied 7 days in a row', 'flame', 200),
  ('30-Day Streak', 'Studied 30 days in a row', 'fire', 500),
  ('First Mock Test', 'Completed your first full mock test', 'clipboard', 150),
  ('Score 1400+', 'Reached 1400+ on a mock test', 'trophy', 500),
  ('Score 1500+', 'Reached 1500+ on a mock test', 'trophy', 750),
  ('Perfect Math', 'Got a perfect Math score', 'calculator', 1000),
  ('Community Star', 'Made 10 helpful posts', 'users', 200),
  ('Mistake Master', 'Reviewed all notebook mistakes', 'check-circle', 300)
ON CONFLICT DO NOTHING;
