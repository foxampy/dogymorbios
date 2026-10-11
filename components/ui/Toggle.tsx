'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  className?: string
}

export function Toggle({ checked, onChange, label, className }: ToggleProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {label && (
        <span className="font-body text-textMain">{label}</span>
      )}
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          'relative w-14 h-8 rounded-full transition-colors duration-300',
          checked ? 'bg-accentSecondary' : 'bg-surfaceSecondary',
          'shadow-claymorphismSoft'
        )}
        aria-label={label || 'Toggle'}
      >
        <motion.div
          className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
          animate={{
            x: checked ? 24 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>
    </div>
  )
}

