'use client'

import { motion } from 'framer-motion'
import { PERSONALITY_TAGS } from '@/lib/dogBreeds'
import { cn } from '@/lib/utils'

interface PersonalitySelectorProps {
  selectedTags: string[]
  onToggle: (tag: string) => void
}

export function PersonalitySelector({
  selectedTags,
  onToggle,
}: PersonalitySelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-heading text-xl font-bold text-center mb-4">
        Характер вашего питомца
      </h3>
      <p className="font-body text-textMuted text-center text-sm mb-4">
        Выберите до 5 характеристик
      </p>
      <div className="flex flex-wrap gap-2">
        {PERSONALITY_TAGS.map((tag) => {
          const isSelected = selectedTags.includes(tag)
          return (
            <motion.button
              key={tag}
              className={cn(
                'px-4 py-2 rounded-plush font-body font-semibold text-sm transition-all',
                isSelected
                  ? 'bg-accentPrimary text-white shadow-claymorphismSoft'
                  : 'bg-surfaceSecondary text-textMain shadow-claymorphismSoft'
              )}
              onClick={() => onToggle(tag)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: isSelected ? 1.05 : 1,
              }}
            >
              {tag}
            </motion.button>
          )
        })}
      </div>
      {selectedTags.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center font-body text-textMuted text-sm"
        >
          Выбрано: {selectedTags.length} / 5
        </motion.p>
      )}
    </div>
  )
}

