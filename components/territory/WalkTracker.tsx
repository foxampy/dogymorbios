'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Clock, MapPin, Activity, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'

interface WalkTrackerProps {
  isWalking: boolean
  startTime: Date | null
  distance: number
  path: Array<{ lat: number; lng: number }>
}

export function WalkTracker({
  isWalking,
  startTime,
  distance,
  path,
}: WalkTrackerProps) {
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    if (!isWalking || !startTime) return

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [isWalking, startTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const calculateBones = () => {
    return Math.floor(distance * 10) // 10 костей за километр
  }

  if (!isWalking) {
    return null
  }

  return (
    <Card className="bg-gradient-to-r from-accentPrimary to-accentSecondary text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-xl font-bold">Прогулка активна</h3>
        <Activity className="animate-pulse" size={24} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <Clock className="mx-auto mb-2" size={24} />
          <div className="font-heading text-2xl font-bold">
            {formatTime(elapsedTime)}
          </div>
          <div className="font-body text-sm opacity-90">Время</div>
        </div>
        <div className="text-center">
          <MapPin className="mx-auto mb-2" size={24} />
          <div className="font-heading text-2xl font-bold">
            {distance.toFixed(2)} км
          </div>
          <div className="font-body text-sm opacity-90">Расстояние</div>
        </div>
        <div className="text-center">
          <Trophy className="mx-auto mb-2" size={24} />
          <div className="font-heading text-2xl font-bold">
            +{calculateBones()}
          </div>
          <div className="font-body text-sm opacity-90">Кости</div>
        </div>
      </div>
    </Card>
  )
}

