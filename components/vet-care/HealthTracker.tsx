'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Activity, Plus, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface HealthRecord {
  id: string
  date: string
  weight: number
  notes: string
  mood: 'good' | 'normal' | 'bad'
}

interface HealthTrackerProps {
  records: HealthRecord[]
  onAddRecord: (record: HealthRecord) => void
}

export function HealthTracker({
  records,
  onAddRecord,
}: HealthTrackerProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    notes: '',
    mood: 'good' as 'good' | 'normal' | 'bad',
  })

  const handleAdd = () => {
    onAddRecord({
      id: Date.now().toString(),
      ...newRecord,
      weight: parseFloat(newRecord.weight),
    })
    setNewRecord({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      notes: '',
      mood: 'good',
    })
    setShowAddModal(false)
  }

  const latestWeight = records.length > 0 ? records[records.length - 1].weight : 0
  const avgMood =
    records.length > 0
      ? records.filter((r) => r.mood === 'good').length / records.length
      : 0

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-success rounded-plush flex items-center justify-center">
            <Activity className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold">Трекер здоровья</h3>
            <p className="font-body text-textMuted text-sm">
              Отслеживайте активность и самочувствие
            </p>
          </div>
        </div>
        <motion.button
          className="w-10 h-10 bg-success rounded-plush flex items-center justify-center text-white"
          onClick={() => setShowAddModal(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus size={20} />
        </motion.button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-surfaceSecondary rounded-plush text-center">
          <div className="font-heading text-2xl font-bold mb-1">
            {latestWeight} кг
          </div>
          <div className="font-body text-textMuted text-sm">Вес</div>
        </div>
        <div className="p-4 bg-surfaceSecondary rounded-plush text-center">
          <div className="font-heading text-2xl font-bold mb-1">
            {Math.round(avgMood * 100)}%
          </div>
          <div className="font-body text-textMuted text-sm">Самочувствие</div>
        </div>
      </div>

      {/* Последние записи */}
      <div className="space-y-2">
        {records.slice(-3).map((record) => (
          <div
            key={record.id}
            className="p-3 bg-surfaceSecondary rounded-plush text-sm"
          >
            <div className="flex items-center justify-between">
              <span className="font-body">{record.date}</span>
              <span
                className={`font-body font-semibold ${
                  record.mood === 'good'
                    ? 'text-success'
                    : record.mood === 'normal'
                    ? 'text-warning'
                    : 'text-redRubberBall'
                }`}
              >
                {record.mood === 'good' ? '😊' : record.mood === 'normal' ? '😐' : '😢'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Добавить запись"
      >
        <div className="space-y-4">
          <Input
            label="Дата"
            type="date"
            value={newRecord.date}
            onChange={(e) =>
              setNewRecord({ ...newRecord, date: e.target.value })
            }
          />
          <Input
            label="Вес (кг)"
            type="number"
            placeholder="Вес питомца"
            value={newRecord.weight}
            onChange={(e) =>
              setNewRecord({ ...newRecord, weight: e.target.value })
            }
          />
          <div>
            <label className="font-body font-semibold mb-2 block">
              Самочувствие
            </label>
            <div className="flex gap-2">
              {(['good', 'normal', 'bad'] as const).map((mood) => (
                <motion.button
                  key={mood}
                  className={`flex-1 py-2 rounded-plush font-body font-semibold ${
                    newRecord.mood === mood
                      ? 'bg-accentPrimary text-white'
                      : 'bg-surfaceSecondary text-textMain'
                  }`}
                  onClick={() => setNewRecord({ ...newRecord, mood })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {mood === 'good' ? '😊' : mood === 'normal' ? '😐' : '😢'}
                </motion.button>
              ))}
            </div>
          </div>
          <Input
            label="Заметки"
            placeholder="Дополнительная информация"
            value={newRecord.notes}
            onChange={(e) =>
              setNewRecord({ ...newRecord, notes: e.target.value })
            }
          />
          <Button className="w-full" onClick={handleAdd}>
            Добавить
          </Button>
        </div>
      </Modal>
    </Card>
  )
}

