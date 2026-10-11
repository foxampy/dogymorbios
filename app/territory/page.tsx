'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { MapView } from '@/components/territory/MapView'
import { WalkTracker } from '@/components/territory/WalkTracker'
import { PlacesList } from '@/components/territory/PlacesList'
import { useWalkStore } from '@/stores/useWalkStore'
import { useUserStore } from '@/stores/useUserStore'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Trophy, Coins } from 'lucide-react'

export default function TerritoryPage() {
  const { currentWalk, startWalk, endWalk, addPathPoint } = useWalkStore()
  const { updateBonesBalance } = useUserStore()
  const [showWalkComplete, setShowWalkComplete] = useState(false)
  const [walkStats, setWalkStats] = useState({ distance: 0, time: 0, bones: 0 })

  const isWalking = currentWalk !== null
  const distance = currentWalk
    ? currentWalk.path.length * 0.1 // Симуляция: каждый пункт = 0.1 км
    : 0

  useEffect(() => {
    if (!isWalking) return

    // Симуляция добавления точек маршрута
    const interval = setInterval(() => {
      addPathPoint({
        lat: 55.7558 + Math.random() * 0.01,
        lng: 37.6173 + Math.random() * 0.01,
      })
    }, 5000) // Каждые 5 секунд

    return () => clearInterval(interval)
  }, [isWalking, addPathPoint])

  const handleStartWalk = () => {
    startWalk()
  }

  const handleStopWalk = () => {
    if (!currentWalk) return

    const walkTime = Math.floor(
      (Date.now() - currentWalk.startTime.getTime()) / 1000
    )
    const earnedBones = Math.floor(distance * 10)

    setWalkStats({
      distance,
      time: walkTime,
      bones: earnedBones,
    })

    updateBonesBalance(earnedBones)
    endWalk()
    setShowWalkComplete(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins} мин ${secs} сек`
  }

  return (
    <div className="min-h-screen bg-background plush-texture p-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl font-bold text-textMain mb-2">
            Территория
          </h1>
          <p className="font-body text-textMuted">
            Исследуйте окрестности и находите новые места
          </p>
        </div>

        {/* Трекер прогулки */}
        <WalkTracker
          isWalking={isWalking}
          startTime={currentWalk?.startTime || null}
          distance={distance}
          path={currentWalk?.path || []}
        />

        {/* Карта */}
        <MapView
          isWalking={isWalking}
          onStartWalk={handleStartWalk}
          onStopWalk={handleStopWalk}
          currentPath={currentWalk?.path || []}
        />

        {/* Список мест */}
        <PlacesList />
      </motion.div>

      {/* Модальное окно завершения прогулки */}
      <Modal
        isOpen={showWalkComplete}
        onClose={() => setShowWalkComplete(false)}
        title="Прогулка завершена!"
      >
        <div className="text-center py-6 space-y-4">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 0.5 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-surfaceSecondary rounded-plush">
              <span className="font-body font-semibold">Расстояние:</span>
              <span className="font-heading font-bold">
                {walkStats.distance.toFixed(2)} км
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surfaceSecondary rounded-plush">
              <span className="font-body font-semibold">Время:</span>
              <span className="font-heading font-bold">
                {formatTime(walkStats.time)}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-accentPrimary/20 rounded-plush">
              <div className="flex items-center gap-2">
                <Coins className="text-accentPrimary" size={20} />
                <span className="font-body font-semibold">Заработано:</span>
              </div>
              <span className="font-heading font-bold text-accentPrimary">
                +{walkStats.bones} костей
              </span>
            </div>
          </div>
          <Button
            className="w-full mt-6"
            onClick={() => setShowWalkComplete(false)}
          >
            Отлично!
          </Button>
        </div>
      </Modal>
    </div>
  )
}
