'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-heading font-bold rounded-plush transition-all duration-200 active:scale-95'
  
  const variants = {
    primary: 'wet-nose text-white shadow-squeakyToy hover:shadow-levitate',
    secondary: 'bg-surfaceSecondary text-textMain shadow-claymorphismSoft hover:shadow-levitate',
    ghost: 'bg-transparent text-accentPrimary hover:bg-surfacePrimary',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <motion.button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 20,
      }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

