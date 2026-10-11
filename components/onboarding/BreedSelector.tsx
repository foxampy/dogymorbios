'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { DOG_BREEDS, type DogBreed } from '@/lib/dogBreeds'
import { cn } from '@/lib/utils'

interface BreedSelectorProps {
  selectedBreed: DogBreed | null
  onSelect: (breed: DogBreed) => void
}

export function BreedSelector({ selectedBreed, onSelect }: BreedSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-heading text-xl font-bold text-center mb-4">
        Выберите породу
      </h3>
      <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
        {DOG_BREEDS.map((breed, index) => (
          <motion.div
            key={breed.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              hoverable
              onClick={() => onSelect(breed)}
              className={cn(
                'p-4 text-center cursor-pointer transition-all',
                selectedBreed?.id === breed.id
                  ? 'ring-4 ring-accentPrimary bg-accentPrimary/10'
                  : ''
              )}
            >
              <div className="text-5xl mb-2">{breed.emoji}</div>
              <p className="font-body font-semibold text-sm">{breed.name}</p>
              {selectedBreed?.id === breed.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2"
                >
                  <span className="text-accentPrimary text-xs">✓ Выбрано</span>
                </motion.div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

