import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  const categories = [
    { name: 'AI', emoji: '🤖', description: 'AI 기술 활용' },
    { name: '공유', emoji: '🤝', description: '지식과 경험 공유' },
    { name: '협업', emoji: '👥', description: '팀워크와 협력' },
    { name: '자율과책임', emoji: '🎯', description: '주도적 업무 수행' },
    { name: '현장고객 가치실현', emoji: '💎', description: '고객 중심 가치 창출' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pride of Encar 2025
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            올해 가장 빛난 동료를 선택해주세요
          </p>
          <p className="text-sm text-gray-500">
            이상형 월드컵 방식으로 5명의 후보 중 1명을 선택합니다
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-center text-gray-700 mb-6">
            5가지 핵심 가치
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <Card key={cat.name} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="text-2xl mb-2">{cat.emoji}</div>
                  <div className="font-medium text-sm">{cat.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How it works */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-center">투표 방법</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-indigo-600">1</span>
                </div>
                <p className="text-sm text-gray-600">2명 중 1명 선택</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-indigo-600">2</span>
                </div>
                <p className="text-sm text-gray-600">선택자 vs 다음 후보</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-indigo-600">3</span>
                </div>
                <p className="text-sm text-gray-600">4라운드 진행</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-indigo-600">4</span>
                </div>
                <p className="text-sm text-gray-600">최종 1명 선택!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <div className="text-center">
          <Link href="/vote">
            <Button size="lg" className="text-lg px-8 py-6">
              투표 시작하기
            </Button>
          </Link>
        </div>

        {/* Event Info */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-yellow-50 border border-yellow-200 rounded-lg px-6 py-3">
            <p className="text-sm text-yellow-800">
              📅 최종 결과는 <strong>2025년 12월 18일</strong> 행사에서 발표됩니다
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-400">
          <p>© 2025 Encar. Pride of Encar</p>
        </footer>
      </div>
    </div>
  )
}
