'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { DigitalPassport } from '@/components/vet-care/DigitalPassport'
import { VaccinationReminders } from '@/components/vet-care/VaccinationReminders'
import { HealthTracker } from '@/components/vet-care/HealthTracker'
import { AIVetChat } from '@/components/vet-care/AIVetChat'

interface Document {
  id: string
  type: string
  name: string
  date: string
  vet: string
  file?: string
}

interface Vaccination {
  id: string
  name: string
  dueDate: string
  daysUntil: number
  isOverdue: boolean
}

interface HealthRecord {
  id: string
  date: string
  weight: number
  notes: string
  mood: 'good' | 'normal' | 'bad'
}

export default function VetCarePage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      type: 'Вакцинация',
      name: 'Комплексная вакцинация',
      date: '2024-01-15',
      vet: 'Клиника "ВетДоктор"',
    },
  ])

  const [vaccinations, setVaccinations] = useState<Vaccination[]>([
    {
      id: '1',
      name: 'Комплексная вакцинация',
      dueDate: '2024-02-15',
      daysUntil: 14,
      isOverdue: false,
    },
    {
      id: '2',
      name: 'Прививка от бешенства',
      dueDate: '2024-01-20',
      daysUntil: -5,
      isOverdue: true,
    },
  ])

  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      date: '2024-01-10',
      weight: 25.5,
      notes: 'Все хорошо',
      mood: 'good',
    },
    {
      id: '2',
      date: '2024-01-05',
      weight: 25.2,
      notes: 'Немного вялый',
      mood: 'normal',
    },
  ])

  return (
    <div className="min-h-screen bg-background plush-texture p-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl font-bold text-textMain mb-2">
            Ветеринар и уход
          </h1>
          <p className="font-body text-textMuted">
            Здоровье вашего питомца под контролем
          </p>
        </div>

        {/* Цифровой паспорт */}
        <DigitalPassport
          documents={documents}
          onAddDocument={(doc) => setDocuments([...documents, doc])}
        />

        {/* Напоминания о вакцинации */}
        <VaccinationReminders
          vaccinations={vaccinations}
          onComplete={(id) =>
            setVaccinations(vaccinations.filter((v) => v.id !== id))
          }
        />

        {/* Трекер здоровья */}
        <HealthTracker
          records={healthRecords}
          onAddRecord={(record) => setHealthRecords([...healthRecords, record])}
        />

        {/* AI Ветеринар */}
        <AIVetChat onStartChat={() => console.log('Chat started')} />
      </motion.div>
    </div>
  )
}
