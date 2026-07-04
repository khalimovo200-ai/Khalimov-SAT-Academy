import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatScore(score: number | null | undefined): string {
  if (!score) return '—'
  return score.toLocaleString()
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getInitials(name: string | null | undefined): string {
  if (!name) return 'S'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export function getSubjectColor(subject: string): string {
  const colors: Record<string, string> = {
    math: '#1a56db',
    reading: '#047857',
    writing: '#7c3aed',
    grammar: '#dc2626',
    strategy: '#d97706',
    live: '#0891b2',
    tips: '#059669',
  }
  return colors[subject] || '#6b7280'
}

export function getDifficultyLabel(difficulty: string): string {
  const labels: Record<string, string> = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }
  return labels[difficulty] || difficulty
}
