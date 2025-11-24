import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  const categories = [
    { name: 'AI', emoji: '🤖', description: 'AI 기술 활용', color: 'from-blue-500 to-cyan-500' },
    { name: '공유', emoji: '🤝', description: '지식과 경험 공유', color: 'from-green-500 to-emerald-500' },
    { name: '협업', emoji: '👥', description: '팀워크와 협력', color: 'from-purple-500 to-pink-500' },
    { name: '자율과책임', emoji: '🎯', description: '주도적 업무 수행', color: 'from-orange-500 to-red-500' },
    { name: '현장고객 가치실현', emoji: '💎', description: '고객 중심 가치 창출', color: 'from-indigo-500 to-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-6xl animate-bounce inline-block">🏆</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-fade-in">
            Pride of Encar 2025
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-2 animate-fade-in-delay">
            올해 가장 빛난 동료를 선택해주세요
          </p>
          <p className="text-sm text-gray-500 animate-fade-in-delay-2">
            이상형 월드컵 방식으로 후보 중 1명을 선택합니다
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-center text-gray-700 mb-6">
            5가지 핵심 가치
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map((cat, index) => (
              <Card
                key={cat.name}
                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 group cursor-pointer border-0 bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${cat.color} flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}>
                    <span className="text-2xl">{cat.emoji}</span>
                  </div>
                  <div className="font-medium text-sm">{cat.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {cat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How it works */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              투표 방법
            </h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="group">
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-indigo-500/50 transition-shadow">
                  <span className="font-bold text-white">1</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">2명 중 1명 선택</p>
              </div>
              <div className="group">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
                  <span className="font-bold text-white">2</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">선택자 vs 다음 후보</p>
              </div>
              <div className="group">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-pink-500/50 transition-shadow">
                  <span className="font-bold text-white">3</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">4라운드 진행</p>
              </div>
              <div className="group">
                <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-rose-500/50 transition-shadow">
                  <span className="font-bold text-white">4</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">최종 1명 선택!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <div className="text-center">
          <Link href="/vote">
            <Button
              size="lg"
              className="text-lg px-10 py-7 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 rounded-xl font-bold"
            >
              <span className="mr-2">✨</span>
              투표 시작하기
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>

        {/* Event Info */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl px-8 py-4 shadow-lg">
            <p className="text-sm text-yellow-800">
              📅 최종 결과는 <strong className="text-amber-700">2025년 12월 18일</strong> 행사에서 발표됩니다
            </p>
          </div>
        </div>

        {/* Sparkle Effects */}
        <div className="mt-8 flex justify-center gap-2">
          <span className="animate-pulse">⭐</span>
          <span className="animate-pulse animation-delay-200">✨</span>
          <span className="animate-pulse animation-delay-400">⭐</span>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-400">
          <p>© 2025 Encar. Pride of Encar</p>
        </footer>
      </div>
    </div>
  )
}
