'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Candidate, Category, CATEGORIES } from '@/types/database'

export default function AdminPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [name, setName] = useState('')
  const [category, setCategory] = useState<Category | ''>('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCandidates()
  }, [])

  console.log("supabase:", supabase)

  const fetchCandidates = async () => {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('category')

    if (error) {
      console.error('Error fetching candidates:', error)
      return
    }

    setCandidates(data || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !category || !reason) {
      alert('모든 필드를 입력해주세요.')
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from('candidates')
      .insert({ name, category, reason })

    if (error) {
      console.error('Error adding candidate:', error)
      alert('후보자 등록에 실패했습니다.')
    } else {
      setName('')
      setCategory('')
      setReason('')
      fetchCandidates()
      alert('후보자가 등록되었습니다.')
    }

    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    const { error } = await supabase
      .from('candidates')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting candidate:', error)
      alert('삭제에 실패했습니다.')
    } else {
      fetchCandidates()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Pride of Encar - 관리자
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>후보자 등록</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="후보자 이름"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">카테고리</Label>
                <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">추천 이유</Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="추천 이유를 입력해주세요"
                  rows={4}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? '등록 중...' : '후보자 등록'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>등록된 후보자 ({candidates.length}/5)</CardTitle>
          </CardHeader>
          <CardContent>
            {candidates.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                등록된 후보자가 없습니다.
              </p>
            ) : (
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="border rounded-lg p-4 flex justify-between items-start"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{candidate.name}</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          {candidate.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{candidate.reason}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(candidate.id)}
                    >
                      삭제
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
