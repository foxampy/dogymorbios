'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Calendar, Bell, Check } from 'lucide-react'

interface Vaccination {
  id: string
  name: string
  dueDate: string
  daysUntil: number
  isOverdue: boolean
}

interface VaccinationRemindersProps {
  vaccinations: Vaccination[]
  onComplete: (id: string) => void
}

export function VaccinationReminders({
  vaccinations,
  onComplete,
}: VaccinationRemindersProps) {
  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="text-accentPrimary" size={24} />
        <h3 className="font-heading text-xl font-bold">Ближайшие прививки</h3>
      </div>
      <div className="space-y-3">
        {vaccinations.length === 0 ? (
          <p className="font-body text-textMuted text-center py-4">
            Нет предстоящих прививок
          </p>
        ) : (
          vaccinations.map((vaccination) => (
            <motion.div
              key={vaccination.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-plush ${
                vaccination.isOverdue
                  ? 'bg-redRubberBall/10 border-2 border-redRubberBall/30'
                  : 'bg-surfaceSecondary'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-heading font-bold mb-1">
                    {vaccination.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm">
                    <Bell
                      className={
                        vaccination.isOverdue
                          ? 'text-redRubberBall'
                          : 'text-warning'
                      }
                      size={14}
                    />
                    <span
                      className={
                        vaccination.isOverdue
                          ? 'text-redRubberBall font-semibold'
                          : 'text-textMuted'
                      }
                    >
                      {vaccination.isOverdue
                        ? `Просрочено на ${Math.abs(vaccination.daysUntil)} дней`
                        : `Через ${vaccination.daysUntil} дней`}
                    </span>
                    <span className="text-textMuted">• {vaccination.dueDate}</span>
                  </div>
                </div>
                <motion.button
                  className="p-2 bg-success/20 text-success rounded-plush"
                  onClick={() => onComplete(vaccination.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Check size={20} />
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  )
}

