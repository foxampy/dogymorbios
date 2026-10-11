'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Trophy, MapPin, Calendar, Coins, Heart } from 'lucide-react'

interface StatsOverviewProps {
  totalWalks: number
  totalDistance: number
  streakDays: number
  bonesEarned: number
  achievements: number
}

export function StatsOverview({
  totalWalks,
  totalDistance,
  streakDays,
  bonesEarned,
  achievements,
}: StatsOverviewProps) {
  const stats = [
    {
      icon: <MapPin className="text-accentPrimary" size={24} />,
      label: 'Прогулок',
      value: totalWalks,
      color: 'accentPrimary',
    },
    {
      icon: <Trophy className="text-warning" size={24} />,
      label: 'Дней подряд',
      value: streakDays,
      color: 'warning',
    },
    {
      icon: <Coins className="text-success" size={24} />,
      label: 'Костей заработано',
      value: bonesEarned,
      color: 'success',
    },
    {
      icon: <Heart className="text-accentSecondary" size={24} />,
      label: 'Достижений',
      value: achievements,
      color: 'accentSecondary',
    },
  ]

  return (
    <Card>
      <h3 className="font-heading text-xl font-bold mb-4">Статистика</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-4 bg-surfaceSecondary rounded-plush"
          >
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <div className="font-heading text-2xl font-bold text-textMain mb-1">
              {stat.value}
            </div>
            <div className="font-body text-sm text-textMuted">{stat.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="pt-4 border-t border-surfaceSecondary">
        <div className="flex items-center justify-between">
          <span className="font-body text-textMuted">Всего пройдено:</span>
          <span className="font-heading font-bold text-accentPrimary">
            {totalDistance.toFixed(1)} км
          </span>
        </div>
      </div>
    </Card>
  )
}

