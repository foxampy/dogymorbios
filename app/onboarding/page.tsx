'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { BreedSelector } from '@/components/onboarding/BreedSelector'
import { AvatarCreator } from '@/components/onboarding/AvatarCreator'
import { PersonalitySelector } from '@/components/onboarding/PersonalitySelector'
import { PawPrint, Heart, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/useUserStore'
import type { DogBreed } from '@/lib/dogBreeds'

interface FormData {
  humanName: string
  dogName: string
  breed: DogBreed | null
  birthdate: string
  avatarConfig: {
    breed: DogBreed | null
    furColor: string
    noseColor: string
    size: 'small' | 'medium' | 'large'
  }
  personalityTags: string[]
}

const TOTAL_STEPS = 5

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    humanName: '',
    dogName: '',
    breed: null,
    birthdate: '',
    avatarConfig: {
      breed: null,
      furColor: '#D4A574',
      noseColor: '#000000',
      size: 'medium',
    },
    personalityTags: [],
  })

  const router = useRouter()
  const { setUser, completeOnboarding } = useUserStore()

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.humanName.trim().length > 0
      case 2:
        return formData.dogName.trim().length > 0 && formData.breed !== null
      case 3:
        return formData.avatarConfig.breed !== null
      case 4:
        return formData.personalityTags.length > 0
      case 5:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed() && step < TOTAL_STEPS) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    if (!formData.breed) return

    const user = {
      id: `user-${Date.now()}`,
      humanName: formData.humanName,
      dogs: [
        {
          name: formData.dogName,
          breed: formData.breed.name,
          birthdate: formData.birthdate || undefined,
          personalityTags: formData.personalityTags,
          avatarConfig: formData.avatarConfig,
        },
      ],
      bonesBalance: 50, // Стартовый бонус
    }

    setUser(user)
    completeOnboarding()
    router.push('/home')
  }

  const stepTitles = [
    'Добро пожаловать!',
    'Расскажите о себе',
    'Выберите породу',
    'Создайте аватар',
    'Характер питомца',
    'Готово!',
  ]

  return (
    <div className="min-h-screen bg-background plush-texture flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
        className="w-full max-w-2xl"
      >
        {/* Логотип */}
        <motion.div
          className="flex justify-center mb-6"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-24 h-24 bg-accentPrimary rounded-full flex items-center justify-center shadow-claymorphism">
            <PawPrint size={48} className="text-white" fill="white" />
          </div>
        </motion.div>

        {/* Прогресс бар */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-body text-sm text-textMuted">
              Шаг {step} из {TOTAL_STEPS}
            </span>
            <span className="font-body text-sm text-textMuted">
              {Math.round((step / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="h-3 bg-surfaceSecondary rounded-full overflow-hidden shadow-dugHole">
            <motion.div
              className="h-full bg-accentPrimary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <Card className="mb-6 min-h-[400px]">
          <h1 className="font-heading text-3xl font-bold text-center mb-2">
            {stepTitles[step - 1]}
          </h1>
          <h2 className="font-heading text-2xl font-extrabold text-center text-accentPrimary mb-6">
            Dogymorbios World
          </h2>

          <AnimatePresence mode="wait">
            {/* Шаг 1: Имя владельца */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <p className="font-body text-textMuted text-center mb-6">
                  Давайте начнем с вашего имени!
                </p>
                <Input
                  label="Ваше имя"
                  placeholder="Введите ваше имя"
                  value={formData.humanName}
                  onChange={(e) =>
                    updateFormData({ humanName: e.target.value })
                  }
                />
              </motion.div>
            )}

            {/* Шаг 2: Имя собаки и порода */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <p className="font-body text-textMuted text-center mb-6">
                  Расскажите о вашем питомце
                </p>
                <Input
                  label="Имя вашей собаки"
                  placeholder="Введите имя"
                  value={formData.dogName}
                  onChange={(e) => updateFormData({ dogName: e.target.value })}
                />
                <div>
                  <label className="font-body font-semibold mb-2 block">
                    Дата рождения (опционально)
                  </label>
                  <Input
                    type="date"
                    value={formData.birthdate}
                    onChange={(e) =>
                      updateFormData({ birthdate: e.target.value })
                    }
                  />
                </div>
                <BreedSelector
                  selectedBreed={formData.breed}
                  onSelect={(breed) => {
                    updateFormData({
                      breed,
                      avatarConfig: {
                        ...formData.avatarConfig,
                        breed,
                        furColor: breed.colors[0],
                      },
                    })
                  }}
                />
              </motion.div>
            )}

            {/* Шаг 3: Создание аватара */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <AvatarCreator
                  config={formData.avatarConfig}
                  onConfigChange={(config) =>
                    updateFormData({ avatarConfig: config })
                  }
                />
              </motion.div>
            )}

            {/* Шаг 4: Характер */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <PersonalitySelector
                  selectedTags={formData.personalityTags}
                  onToggle={(tag) => {
                    const tags = formData.personalityTags.includes(tag)
                      ? formData.personalityTags.filter((t) => t !== tag)
                      : formData.personalityTags.length < 5
                      ? [...formData.personalityTags, tag]
                      : formData.personalityTags
                    updateFormData({ personalityTags: tags })
                  }}
                />
              </motion.div>
            )}

            {/* Шаг 5: Финальный экран */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-6 text-center"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <Heart className="mx-auto mb-4 text-accentPrimary" size={64} fill="currentColor" />
                </motion.div>
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2">
                    Отлично, {formData.humanName}!
                  </h3>
                  <p className="font-body text-lg text-textMain mb-1">
                    {formData.dogName} готов начать приключение!
                  </p>
                  <p className="font-body text-textMuted">
                    Вы получили стартовый бонус: 50 костей 🦴
                  </p>
                </div>
                <div className="flex flex-col gap-3 mt-8">
                  <div className="flex items-center gap-2 justify-center text-textMuted">
                    <Check size={20} className="text-success" />
                    <span className="font-body">Профиль создан</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center text-textMuted">
                    <Check size={20} className="text-success" />
                    <span className="font-body">Аватар настроен</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center text-textMuted">
                    <Check size={20} className="text-success" />
                    <span className="font-body">Характер определен</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Навигация */}
        <div className="flex gap-3">
          {step > 1 && (
            <Button
              variant="secondary"
              className="flex-1"
              onClick={handleBack}
            >
              <ArrowLeft className="inline mr-2" size={20} />
              Назад
            </Button>
          )}
          {step < TOTAL_STEPS ? (
            <Button
              className="flex-1"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Далее
              <ArrowRight className="inline ml-2" size={20} />
            </Button>
          ) : (
            <Button className="flex-1" onClick={handleComplete}>
              Начать путешествие!
              <PawPrint className="inline ml-2" size={20} />
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
