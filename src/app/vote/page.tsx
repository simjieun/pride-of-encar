'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Candidate } from '@/types/database'

export default function VotePage() {
  const router = useRouter()
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [shuffledCandidates, setShuffledCandidates] = useState<Candidate[]>([])
  const [currentRound, setCurrentRound] = useState(0)
  const [currentWinner, setCurrentWinner] = useState<Candidate | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    fetchCandidates()
  }, [])

  const fetchCandidates = async () => {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')

    if (error) {
      console.error('Error fetching candidates:', error)
      setLoading(false)
      return
    }

    if (!data || data.length !== 5) {
      alert('후보자가 5명이 아닙니다. 관리자에게 문의해주세요.')
      setLoading(false)
      return
    }

    setCandidates(data)
    const shuffled = [...data].sort(() => Math.random() - 0.5)
    setShuffledCandidates(shuffled)
    setLoading(false)
  }

  const getCurrentMatchup = (): [Candidate, Candidate] | null => {
    if (shuffledCandidates.length !== 5) return null

    if (currentRound === 0) {
      return [shuffledCandidates[0], shuffledCandidates[1]]
    } else if (currentWinner) {
      const nextOpponentIndex = currentRound + 1
      if (nextOpponentIndex <= 4) {
        return [currentWinner, shuffledCandidates[nextOpponentIndex]]
      }
    }
    return null
  }

  const handleSelect = async (selected: Candidate) => {
    if (submitting || isTransitioning) return

    setSelectedId(selected.id)
    setIsTransitioning(true)

    // 애니메이션 대기
    await new Promise(resolve => setTimeout(resolve, 600))

    if (currentRound < 3) {
      setCurrentWinner(selected)
      setCurrentRound(currentRound + 1)
      setSelectedId(null)
      setIsTransitioning(false)
    } else {
      setSubmitting(true)

      const voterSession = localStorage.getItem('voter_session') ||
        `voter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      if (!localStorage.getItem('voter_session')) {
        localStorage.setItem('voter_session', voterSession)
      }

      const { error } = await supabase
        .from('votes')
        .insert({
          winner_id: selected.id,
          voter_session: voterSession
        })

      if (error) {
        console.error('Error saving vote:', error)
        alert('투표 저장에 실패했습니다.')
        setSubmitting(false)
        setSelectedId(null)
        setIsTransitioning(false)
        return
      }

      router.push(`/result?winner=${encodeURIComponent(selected.name)}&category=${encodeURIComponent(selected.category)}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">로딩 중...</p>
        </div>
      </div>
    )
  }

  const matchup = getCurrentMatchup()

  if (!matchup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <p className="text-white text-lg">투표를 진행할 수 없습니다.</p>
      </div>
    )
  }

  const [candidateA, candidateB] = matchup
  const roundLabels = ['1라운드', '2라운드', '3라운드', '🏆 결승']

  const categoryColors: Record<string, string> = {
    'AI': 'from-cyan-400 to-blue-500',
    '공유': 'from-green-400 to-emerald-500',
    '협업': 'from-yellow-400 to-orange-500',
    '자율과책임': 'from-pink-400 to-rose-500',
    '현장고객 가치실현': 'from-purple-400 to-violet-500',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 px-4 overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Pride of Encar 2025
          </h1>
          <p className="text-blue-200 mb-6 text-lg">
            올해 가장 빛난 동료를 선택해주세요
          </p>

          {/* 라운드 표시 */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <span className="text-2xl font-bold text-white">
              {roundLabels[currentRound]}
            </span>
            <div className="flex gap-1 ml-2">
              {[0, 1, 2, 3].map((round) => (
                <div
                  key={round}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    round < currentRound
                      ? 'bg-green-400'
                      : round === currentRound
                      ? 'bg-white animate-pulse'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* VS 표시 */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-2xl w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            VS
          </div>
        </div>

        {/* 카드 그리드 */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          {[candidateA, candidateB].map((candidate, index) => {
            const isSelected = selectedId === candidate.id
            const isOther = selectedId && selectedId !== candidate.id
            const gradientClass = categoryColors[candidate.category] || 'from-indigo-400 to-purple-500'

            return (
              <Card
                key={candidate.id}
                className={`
                  cursor-pointer relative overflow-hidden
                  transform transition-all duration-500 ease-out
                  ${isSelected
                    ? 'scale-110 rotate-0 shadow-2xl shadow-indigo-500/50 z-20'
                    : isOther
                    ? 'scale-90 opacity-30 blur-sm'
                    : 'hover:scale-105 hover:-translate-y-2'
                  }
                  ${!submitting && !isTransitioning ? 'hover:shadow-2xl hover:shadow-purple-500/30' : ''}
                  bg-white/10 backdrop-blur-md border-2
                  ${isSelected ? 'border-yellow-400' : 'border-white/20 hover:border-white/40'}
                `}
                onClick={() => handleSelect(candidate)}
              >
                {/* 선택 효과 */}
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 animate-pulse" />
                )}

                <CardContent className="p-8 relative">
                  <div className="text-center">
                    {/* 아바타 */}
                    <div className={`
                      w-24 h-24 bg-gradient-to-br ${gradientClass}
                      rounded-full mx-auto mb-5 flex items-center justify-center
                      shadow-lg transform transition-transform duration-300
                      ${isSelected ? 'scale-110 animate-pulse' : 'group-hover:scale-110'}
                    `}>
                      <span className="text-white text-3xl font-bold drop-shadow-lg">
                        {candidate.name.charAt(0)}
                      </span>
                    </div>

                    {/* 이름 */}
                    <h2 className="text-2xl font-bold text-white mb-3">
                      {candidate.name}
                    </h2>

                    {/* 카테고리 */}
                    <span className={`
                      inline-block bg-gradient-to-r ${gradientClass}
                      text-white text-sm px-4 py-1.5 rounded-full mb-4
                      font-medium shadow-md
                    `}>
                      {candidate.category}
                    </span>

                    {/* 추천 이유 */}
                    <p className="text-blue-100 text-sm leading-relaxed line-clamp-3">
                      {candidate.reason}
                    </p>

                    {/* 선택 표시 */}
                    {isSelected && (
                      <div className="mt-6 py-3 rounded-lg bg-yellow-400 text-yellow-900">
                        <span className="font-semibold">✓ 선택됨!</span>
                      </div>
                    )}
                  </div>
                </CardContent>

                {/* 빛나는 테두리 효과 */}
                <div className={`
                  absolute inset-0 rounded-lg pointer-events-none
                  ${isSelected ? 'animate-ping opacity-30 border-2 border-yellow-400' : ''}
                `} />
              </Card>
            )
          })}
        </div>

        {/* 모바일 VS */}
        <div className="text-center mt-6 md:hidden">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-xl px-4 py-2 rounded-full">
            VS
          </span>
        </div>

        {/* 진행 상태 */}
        <div className="mt-12 text-center">
          <p className="text-blue-200/60 text-sm">
            {currentRound < 3
              ? `남은 대결: ${3 - currentRound}번`
              : '마지막 대결입니다!'}
          </p>
        </div>
      </div>
    </div>
  )
}
