'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Home, MessageCircle, MapPin, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/home', icon: Home, label: 'Дом', activeIcon: 'doghouse' },
  { href: '/pack', icon: MessageCircle, label: 'Общение', activeIcon: 'ear' },
  { href: '/territory', icon: MapPin, label: 'Территория', activeIcon: 'hydrant' },
  { href: '/treat-shop', icon: ShoppingBag, label: 'Магазин', activeIcon: 'jar' },
  { href: '/profile', icon: User, label: 'Профиль', activeIcon: 'tag' },
]

export function NavigationBar() {
  const pathname = usePathname()

  // Скрываем навигацию на странице onboarding
  if (pathname === '/onboarding') {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6">
      <motion.div
        className="bg-surfacePrimary rounded-[40px] shadow-claymorphism px-6 py-3 flex items-center justify-around"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href)
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={cn(
                  'flex flex-col items-center gap-1 p-2 rounded-plush transition-colors',
                  isActive ? 'text-accentPrimary' : 'text-textMuted'
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{
                    y: isActive ? -4 : 0,
                    scale: isActive ? 1.2 : 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 20,
                  }}
                >
                  <Icon size={24} strokeWidth={2.5} />
                </motion.div>
                <span className="text-xs font-body font-medium">{item.label}</span>
              </motion.div>
            </Link>
          )
        })}
      </motion.div>
    </nav>
  )
}

