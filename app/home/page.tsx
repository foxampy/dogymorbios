'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'next/navigation'
import { PetStatusWidget } from '@/components/home/PetStatusWidget'
import { QuickActions } from '@/components/home/QuickActions'
import { WeatherWidget } from '@/components/home/WeatherWidget'
import { StatsWidget } from '@/components/home/StatsWidget'
import { WalkButton } from '@/components/home/WalkButton'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { PawPrint, Sparkles } from 'lucide-react'

export default function HomePage() {
  const { user, isOnboarded } = useUserStore()
  const router = useRouter()
  const [showFeedModal, setShowFeedModal] = useState(false)
  const [showPlayModal, setShowPlayModal] = useState(false)

  const [petStatus, setPetStatus] = useState({
    hunger: 75,
    energy: 60,
    mood: 90,
  })

  const [stats, setStats] = useState({
    totalWalks: 12,
    totalDistance: 45.8,
    streakDays: 5,
    bonesEarned: user?.bonesBalance || 50,
  })

  useEffect(() => {
    if (!isOnboarded) {
      router.push('/onboarding')
    }
  }, [isOnboarded, router])

  const handleFeed = () => {
    setShowFeedModal(true)
    setTimeout(() => {
      setPetStatus((prev) => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 30),
        mood: Math.min(100, prev.mood + 5),
      }))
      setShowFeedModal(false)
    }, 1500)
  }

  const handlePlay = () => {
    setShowPlayModal(true)
    setTimeout(() => {
      setPetStatus((prev) => ({
        ...prev,
        energy: Math.min(100, prev.energy + 20),
        mood: Math.min(100, prev.mood + 15),
      }))
      setShowPlayModal(false)
    }, 1500)
  }

  const handleWalk = () => {
    router.push('/territory')
  }

  const handleSchedule = () => {
    // TODO: Открыть расписание
  }

  if (!user) {
    return null
  }

  const dogName = user.dogs[0]?.name || 'Питомец'

  return (
    <div className="min-h-screen bg-background plush-texture p-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        {/* Приветствие */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-heading text-4xl font-bold text-textMain mb-2">
            Добро пожаловать домой!
          </h1>
          <p className="font-body text-textMuted">
            {dogName} скучает по вам
          </p>
        </motion.div>

        {/* Статус питомца */}
        <PetStatusWidget
          status={petStatus}
          onFeed={handleFeed}
          onPlay={handlePlay}
        />

        {/* Кнопка прогулки */}
        <WalkButton />

        {/* Погода */}
        <WeatherWidget />

        {/* Статистика */}
        <StatsWidget
          totalWalks={stats.totalWalks}
          totalDistance={stats.totalDistance}
          streakDays={stats.streakDays}
          bonesEarned={stats.bonesEarned}
        />

        {/* Быстрые действия */}
        <QuickActions
          onFeed={handleFeed}
          onPlay={handlePlay}
          onWalk={handleWalk}
          onSchedule={handleSchedule}
        />

        {/* Достижения */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-xl font-bold">Достижения</h3>
            <Sparkles className="text-warning" size={24} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { emoji: '🏆', label: 'Первая прогулка', earned: true },
              { emoji: '🔥', label: '5 дней подряд', earned: true },
              { emoji: '⭐', label: '10 прогулок', earned: false },
            ].map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`text-center p-3 rounded-plush ${
                  achievement.earned
                    ? 'bg-accentPrimary/20'
                    : 'bg-surfaceSecondary opacity-50'
                }`}
              >
                <div className="text-3xl mb-1">{achievement.emoji}</div>
                <p className="font-body text-xs text-textMuted">
                  {achievement.label}
                </p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Модальные окна */}
      <Modal
        isOpen={showFeedModal}
        onClose={() => setShowFeedModal(false)}
        title="Кормление"
      >
        <div className="text-center py-8">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 0.5 }}
            className="text-6xl mb-4"
          >
            🍖
          </motion.div>
          <p className="font-body text-lg">Кормление...</p>
        </div>
      </Modal>

      <Modal
        isOpen={showPlayModal}
        onClose={() => setShowPlayModal(false)}
        title="Игра"
      >
        <div className="text-center py-8">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🎾
          </motion.div>
          <p className="font-body text-lg">Играем...</p>
        </div>
      </Modal>
    </div>
  )
}
