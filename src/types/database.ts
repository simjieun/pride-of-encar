export type Category = 'AI' | '공유' | '협업' | '자율과책임' | '현장고객 가치실현'

export interface Candidate {
  id: string
  name: string
  category: Category
  reason: string
  created_at: string
}

export interface Vote {
  id: string
  winner_id: string
  voter_session: string
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      candidates: {
        Row: Candidate
        Insert: Omit<Candidate, 'id' | 'created_at'>
        Update: Partial<Omit<Candidate, 'id' | 'created_at'>>
      }
      votes: {
        Row: Vote
        Insert: Omit<Vote, 'id' | 'created_at'>
        Update: Partial<Omit<Vote, 'id' | 'created_at'>>
      }
    }
  }
}

export const CATEGORIES: Category[] = [
  'AI',
  '공유',
  '협업',
  '자율과책임',
  '현장고객 가치실현'
]
