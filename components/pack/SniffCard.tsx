'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Heart, X, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface DogProfile {
  id: string
  name: string
  breed: string
  age: number
  avatar: string
  personality: string[]
  distance: number
}

interface SniffCardProps {
  profile: DogProfile
  onLike: (id: string) => void
  onPass: (id: string) => void
}

export function SniffCard({ profile, onLike, onPass }: SniffCardProps) {
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSwipe = (dir: 'left' | 'right') => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(dir)

    setTimeout(() => {
      if (dir === 'right') {
        onLike(profile.id)
      } else {
        onPass(profile.id)
      }
      setIsAnimating(false)
      setDirection(null)
    }, 300)
  }

  return (
    <motion.div
      className="relative"
      animate={{
        x: direction === 'left' ? -500 : direction === 'right' ? 500 : 0,
        opacity: direction ? 0 : 1,
        rotate: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-8 min-h-[500px] flex flex-col">
        {/* Аватар */}
        <div className="flex justify-center mb-6">
          <motion.div
            className="w-32 h-32 bg-accentPrimary rounded-full flex items-center justify-center text-6xl shadow-claymorphism"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {profile.avatar}
          </motion.div>
        </div>

        {/* Информация */}
        <div className="text-center mb-6">
          <h2 className="font-heading text-3xl font-bold mb-2">{profile.name}</h2>
          <p className="font-body text-textMuted text-lg mb-2">{profile.breed}</p>
          <p className="font-body text-textMuted text-sm mb-4">
            {profile.age} лет • {profile.distance} км от вас
          </p>

          {/* Характер */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {profile.personality.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-accentPrimary/20 text-accentPrimary rounded-plush font-body text-sm font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex gap-4 mt-auto">
          <motion.button
            className="flex-1 py-4 bg-redRubberBall/20 text-redRubberBall rounded-plush font-heading font-bold flex items-center justify-center gap-2"
            onClick={() => handleSwipe('left')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={24} />
            Пропустить
          </motion.button>
          <motion.button
            className="flex-1 py-4 bg-success/20 text-success rounded-plush font-heading font-bold flex items-center justify-center gap-2"
            onClick={() => handleSwipe('right')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart size={24} fill="currentColor" />
            Нравится
          </motion.button>
        </div>
      </Card>
    </motion.div>
  )
}

