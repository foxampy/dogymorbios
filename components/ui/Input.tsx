'use client'

import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block font-heading font-semibold text-textMain mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-plush',
            'bg-surfaceSecondary text-textMain',
            'shadow-dugHole border-none outline-none',
            'font-body placeholder:text-textMuted',
            'focus:ring-2 focus:ring-accentPrimary focus:ring-opacity-50',
            error && 'ring-2 ring-redRubberBall ring-opacity-50',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-redRubberBall font-body">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

