'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { TrendingUp, Calendar, MapPin, Heart } from 'lucide-react'

interface StatsWidgetProps {
  totalWalks: number
  totalDistance: number
  streakDays: number
  bonesEarned: number
}

export function StatsWidget({
  totalWalks,
  totalDistance,
  streakDays,
  bonesEarned,
}: StatsWidgetProps) {
  const stats = [
    {
      label: 'Прогулок',
      value: totalWalks,
      icon: <MapPin className="text-accentPrimary" size={20} />,
      color: 'accentPrimary',
    },
    {
      label: 'Км пройдено',
      value: totalDistance.toFixed(1),
      icon: <TrendingUp className="text-success" size={20} />,
      color: 'success',
    },
    {
      label: 'Дней подряд',
      value: streakDays,
      icon: <Calendar className="text-warning" size={20} />,
      color: 'warning',
    },
    {
      label: 'Костей заработано',
      value: bonesEarned,
      icon: <Heart className="text-accentSecondary" size={20} />,
      color: 'accentSecondary',
    },
  ]

  return (
    <Card>
      <h3 className="font-heading text-xl font-bold mb-4">Статистика</h3>
      <div className="grid grid-cols-2 gap-4">
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
    </Card>
  )
}

