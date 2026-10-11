'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Edit2, Camera } from 'lucide-react'
import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface ProfileHeaderProps {
  name: string
  dogName: string
  avatar: string
  onUpdate: (data: { name: string; dogName: string }) => void
}

export function ProfileHeader({
  name,
  dogName,
  avatar,
  onUpdate,
}: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ name, dogName })

  const handleSave = () => {
    onUpdate(editData)
    setIsEditing(false)
  }

  return (
    <Card>
      <div className="text-center">
        <div className="relative inline-block mb-4">
          <motion.div
            className="w-24 h-24 bg-accentPrimary rounded-full flex items-center justify-center text-4xl font-heading font-bold text-white shadow-claymorphism"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {avatar}
          </motion.div>
          <motion.button
            className="absolute bottom-0 right-0 w-8 h-8 bg-accentPrimary rounded-full flex items-center justify-center text-white shadow-claymorphism"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Camera size={16} />
          </motion.button>
        </div>
        {!isEditing ? (
          <>
            <h2 className="font-heading text-2xl font-bold mb-1">{name}</h2>
            <p className="font-body text-textMuted mb-4">Владелец {dogName}</p>
            <motion.button
              className="px-4 py-2 bg-surfaceSecondary rounded-plush font-body font-semibold text-textMain"
              onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit2 size={16} className="inline mr-2" />
              Редактировать
            </motion.button>
          </>
        ) : (
          <div className="space-y-4">
            <Input
              label="Ваше имя"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
            <Input
              label="Имя питомца"
              value={editData.dogName}
              onChange={(e) =>
                setEditData({ ...editData, dogName: e.target.value })
              }
            />
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setEditData({ name, dogName })
                  setIsEditing(false)
                }}
              >
                Отмена
              </Button>
              <Button className="flex-1" onClick={handleSave}>
                Сохранить
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

