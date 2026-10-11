'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { MapPin, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useWalkStore } from '@/stores/useWalkStore'

export function WalkButton() {
  const router = useRouter()
  const { startWalk } = useWalkStore()

  const handleStartWalk = () => {
    startWalk()
    router.push('/territory')
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Button
        size="lg"
        className="w-full text-xl py-6 relative overflow-hidden"
        onClick={handleStartWalk}
      >
        <motion.div
          className="absolute inset-0 bg-white/20"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <MapPin className="inline mr-2" size={28} />
        Пора на прогулку!
        <Play className="inline ml-2" size={20} />
      </Button>
    </motion.div>
  )
}

