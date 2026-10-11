'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

export function Card({ children, className, onClick, hoverable = true }: CardProps) {
  return (
    <motion.div
      className={cn(
        'bg-surfacePrimary rounded-plush shadow-claymorphismSoft p-6 plush-texture',
        hoverable && 'cursor-pointer',
        className
      )}
      whileHover={hoverable ? { y: -4, scale: 1.02 } : {}}
      whileTap={hoverable ? { scale: 0.98 } : {}}
      onClick={onClick}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  )
}

