'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Suspense } from 'react'

function ResultContent() {
  const searchParams = useSearchParams()
  const winner = searchParams.get('winner')
  const category = searchParams.get('category')

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-8 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                <span className="text-4xl">🏆</span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                투표 완료!
              </h1>

              <p className="text-gray-600 mb-4">
                당신이 선택한 Pride of Encar
              </p>
            </div>

            {winner && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-bold text-indigo-600 mb-1">
                  {winner}
                </h2>
                {category && (
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                    {category}
                  </span>
                )}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                📅 최종 결과는 <strong>2025년 12월 18일</strong> 행사에서 발표됩니다!
              </p>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              소중한 투표 감사합니다.<br />
              함께 빛나는 엔카를 만들어가요!
            </p>

            <div className="space-y-3">
              <Link href="/vote" className="block">
                <Button variant="outline" className="w-full">
                  다시 투표하기
                </Button>
              </Link>

              <Link href="/" className="block">
                <Button variant="ghost" className="w-full">
                  홈으로
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
