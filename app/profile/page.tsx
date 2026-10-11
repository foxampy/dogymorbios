'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'next/navigation'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { SettingsList } from '@/components/profile/SettingsList'
import { StatsOverview } from '@/components/profile/StatsOverview'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Trophy, Award } from 'lucide-react'

export default function ProfilePage() {
  const { user, setUser } = useUserStore()
  const router = useRouter()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  if (!user) {
    router.push('/onboarding')
    return null
  }

  const dog = user.dogs[0]
  const stats = {
    totalWalks: 12,
    totalDistance: 45.8,
    streakDays: 5,
    bonesEarned: user.bonesBalance,
    achievements: 3,
  }

  const handleUpdateProfile = (data: { name: string; dogName: string }) => {
    setUser({
      ...user,
      humanName: data.name,
      dogs: [
        {
          ...dog,
          name: data.dogName,
        },
      ],
    })
  }

  const handleLogout = () => {
    // TODO: Реализовать выход
    router.push('/onboarding')
  }

  const achievements = [
    { id: '1', name: 'Первая прогулка', emoji: '🏆', earned: true },
    { id: '2', name: '5 дней подряд', emoji: '🔥', earned: true },
    { id: '3', name: '10 прогулок', emoji: '⭐', earned: true },
    { id: '4', name: '50 км пройдено', emoji: '🚶', earned: false },
    { id: '5', name: '100 костей', emoji: '💰', earned: false },
  ]

  return (
    <div className="min-h-screen bg-background plush-texture p-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        {/* Профиль */}
        <ProfileHeader
          name={user.humanName}
          dogName={dog.name}
          avatar={dog.name[0]}
          onUpdate={handleUpdateProfile}
        />

        {/* Статистика */}
        <StatsOverview {...stats} />

        {/* Достижения */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-xl font-bold">Достижения</h3>
            <Trophy className="text-warning" size={24} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`text-center p-4 rounded-plush ${
                  achievement.earned
                    ? 'bg-accentPrimary/20'
                    : 'bg-surfaceSecondary opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{achievement.emoji}</div>
                <p className="font-body text-xs text-textMuted">
                  {achievement.name}
                </p>
                {achievement.earned && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-2"
                  >
                    <Award className="mx-auto text-accentPrimary" size={16} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Настройки */}
        <SettingsList onLogout={() => setShowLogoutModal(true)} />
      </motion.div>

      {/* Модальное окно выхода */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Выход из аккаунта"
      >
        <div className="space-y-4">
          <p className="font-body text-textMuted text-center">
            Вы уверены, что хотите выйти?
          </p>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowLogoutModal(false)}
            >
              Отмена
            </Button>
            <Button className="flex-1" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
