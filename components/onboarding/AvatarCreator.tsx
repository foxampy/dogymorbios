'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { NOSE_COLORS } from '@/lib/dogBreeds'
import { cn } from '@/lib/utils'
import type { DogBreed } from '@/lib/dogBreeds'

interface AvatarConfig {
  breed: DogBreed | null
  furColor: string
  noseColor: string
  size: 'small' | 'medium' | 'large'
}

interface AvatarCreatorProps {
  config: AvatarConfig
  onConfigChange: (config: AvatarConfig) => void
}

export function AvatarCreator({ config, onConfigChange }: AvatarCreatorProps) {
  const updateConfig = (updates: Partial<AvatarConfig>) => {
    onConfigChange({ ...config, ...updates })
  }

  const breedColors = config.breed?.colors || ['#D4A574']

  return (
    <div className="space-y-6">
      <h3 className="font-heading text-xl font-bold text-center mb-4">
        Создайте аватар
      </h3>

      {/* Предпросмотр аватара */}
      <Card className="p-8">
        <div className="flex justify-center mb-6">
          <motion.div
            className={cn(
              'rounded-full flex items-center justify-center shadow-claymorphism',
              config.size === 'small' && 'w-24 h-24 text-4xl',
              config.size === 'medium' && 'w-32 h-32 text-5xl',
              config.size === 'large' && 'w-40 h-40 text-6xl'
            )}
            style={{ backgroundColor: config.furColor }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {config.breed?.emoji || '🐕'}
          </motion.div>
        </div>
        <div className="text-center">
          <p className="font-body text-textMuted text-sm">
            {config.breed?.name || 'Выберите породу'}
          </p>
        </div>
      </Card>

      {/* Цвет шерсти */}
      {config.breed && (
        <>
          <div>
            <label className="font-body font-semibold mb-2 block">
              Цвет шерсти
            </label>
            <div className="flex gap-3">
              {breedColors.map((color) => (
                <motion.button
                  key={color}
                  className={cn(
                    'w-12 h-12 rounded-full shadow-claymorphismSoft',
                    config.furColor === color && 'ring-4 ring-accentPrimary'
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => updateConfig({ furColor: color })}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

          {/* Цвет носа */}
          <div>
            <label className="font-body font-semibold mb-2 block">
              Цвет носа
            </label>
            <div className="flex gap-3 flex-wrap">
              {NOSE_COLORS.map((nose) => (
                <motion.button
                  key={nose.value}
                  className={cn(
                    'px-4 py-2 rounded-plush shadow-claymorphismSoft text-sm font-body',
                    config.noseColor === nose.value
                      ? 'bg-accentPrimary text-white'
                      : 'bg-surfaceSecondary text-textMain'
                  )}
                  onClick={() => updateConfig({ noseColor: nose.value })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {nose.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Размер */}
          <div>
            <label className="font-body font-semibold mb-2 block">
              Размер
            </label>
            <div className="flex gap-3">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <motion.button
                  key={size}
                  className={cn(
                    'flex-1 px-4 py-3 rounded-plush shadow-claymorphismSoft font-body font-semibold',
                    config.size === size
                      ? 'bg-accentPrimary text-white'
                      : 'bg-surfaceSecondary text-textMain'
                  )}
                  onClick={() => updateConfig({ size })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {size === 'small' && 'Маленький'}
                  {size === 'medium' && 'Средний'}
                  {size === 'large' && 'Большой'}
                </motion.button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

