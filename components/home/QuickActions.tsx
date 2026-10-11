'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Heart, Zap, MapPin, Utensils, Gamepad2, Calendar } from 'lucide-react'

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  onClick: () => void
}

interface QuickActionsProps {
  onFeed: () => void
  onPlay: () => void
  onWalk: () => void
  onSchedule: () => void
}

export function QuickActions({
  onFeed,
  onPlay,
  onWalk,
  onSchedule,
}: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      id: 'feed',
      label: 'Покормить',
      icon: <Utensils size={24} />,
      color: 'accentPrimary',
      onClick: onFeed,
    },
    {
      id: 'play',
      label: 'Поиграть',
      icon: <Gamepad2 size={24} />,
      color: 'warning',
      onClick: onPlay,
    },
    {
      id: 'walk',
      label: 'Прогулка',
      icon: <MapPin size={24} />,
      color: 'success',
      onClick: onWalk,
    },
    {
      id: 'schedule',
      label: 'Расписание',
      icon: <Calendar size={24} />,
      color: 'accentSecondary',
      onClick: onSchedule,
    },
  ]

  return (
    <div>
      <h3 className="font-heading text-xl font-bold mb-4">Быстрые действия</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              hoverable
              onClick={action.onClick}
              className="text-center p-6"
            >
              <motion.div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  action.color === 'accentPrimary' ? 'bg-accentPrimary/20' :
                  action.color === 'warning' ? 'bg-warning/20' :
                  action.color === 'success' ? 'bg-success/20' :
                  'bg-accentSecondary/20'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className={
                  action.color === 'accentPrimary' ? 'text-accentPrimary' :
                  action.color === 'warning' ? 'text-warning' :
                  action.color === 'success' ? 'text-success' :
                  'text-accentSecondary'
                }>{action.icon}</div>
              </motion.div>
              <p className="font-body font-semibold">{action.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

