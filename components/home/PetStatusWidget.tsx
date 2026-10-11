'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Heart, Zap, Smile, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

interface PetStatus {
  hunger: number
  energy: number
  mood: number
}

interface PetStatusWidgetProps {
  status: PetStatus
  onFeed?: () => void
  onPlay?: () => void
}

export function PetStatusWidget({ status, onFeed, onPlay }: PetStatusWidgetProps) {
  const [animatedStatus, setAnimatedStatus] = useState(status)

  useEffect(() => {
    const timer = setInterval(() => {
      // Постепенное уменьшение показателей (симуляция)
      setAnimatedStatus((prev) => ({
        hunger: Math.max(0, prev.hunger - 0.1),
        energy: Math.max(0, prev.energy - 0.05),
        mood: Math.max(0, prev.mood - 0.02),
      }))
    }, 60000) // Каждую минуту

    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (value: number) => {
    if (value > 70) return 'success'
    if (value > 40) return 'warning'
    return 'accentPrimary'
  }

  const getStatusEmoji = (value: number) => {
    if (value > 70) return '😊'
    if (value > 40) return '😐'
    return '😢'
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-2xl font-bold">Статус питомца</h2>
        <span className="text-3xl">{getStatusEmoji(animatedStatus.mood)}</span>
      </div>
      <div className="space-y-4">
        <StatusBar
          icon={<Heart className="text-accentPrimary" />}
          label="Голод"
          value={Math.round(animatedStatus.hunger)}
          color={getStatusColor(animatedStatus.hunger) as 'accentPrimary' | 'warning' | 'success'}
          action={onFeed}
          actionLabel="Покормить"
        />
        <StatusBar
          icon={<Zap className="text-warning" />}
          label="Энергия"
          value={Math.round(animatedStatus.energy)}
          color={getStatusColor(animatedStatus.energy) as 'accentPrimary' | 'warning' | 'success'}
          action={onPlay}
          actionLabel="Поиграть"
        />
        <StatusBar
          icon={<Smile className="text-success" />}
          label="Настроение"
          value={Math.round(animatedStatus.mood)}
          color={getStatusColor(animatedStatus.mood) as 'accentPrimary' | 'warning' | 'success'}
        />
      </div>
      <div className="mt-4 pt-4 border-t border-surfaceSecondary">
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-textMuted">Общее состояние</span>
          <div className="flex items-center gap-2">
            <TrendingUp className="text-success" size={16} />
            <span className="font-body font-semibold text-success">
              {Math.round((animatedStatus.hunger + animatedStatus.energy + animatedStatus.mood) / 3)}%
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}

function StatusBar({
  icon,
  label,
  value,
  color,
  action,
  actionLabel,
}: {
  icon: React.ReactNode
  label: string
  value: number
  color: 'accentPrimary' | 'warning' | 'success'
  action?: () => void
  actionLabel?: string
}) {
  const colorClasses = {
    accentPrimary: 'bg-accentPrimary',
    warning: 'bg-warning',
    success: 'bg-success',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-body font-semibold">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-body text-textMuted">{value}%</span>
          {action && actionLabel && (
            <motion.button
              className="text-xs px-2 py-1 bg-accentPrimary/20 text-accentPrimary rounded-plush font-body font-semibold"
              onClick={action}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {actionLabel}
            </motion.button>
          )}
        </div>
      </div>
      <div className="h-4 bg-surfaceSecondary rounded-full overflow-hidden shadow-dugHole">
        <motion.div
          className={`h-full ${colorClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

