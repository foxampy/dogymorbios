'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { X, ShoppingCart, Coins } from 'lucide-react'
import { useState } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartProps {
  items: CartItem[]
  isOpen: boolean
  onClose: () => void
  onRemove: (id: string) => void
  onCheckout: () => void
  total: number
  userBones: number
}

export function Cart({
  items,
  isOpen,
  onClose,
  onRemove,
  onCheckout,
  total,
  userBones,
}: CartProps) {
  const canCheckout = userBones >= total && items.length > 0

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart */}
          <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
            <motion.div
              className="bg-surfacePrimary rounded-t-[40px] shadow-claymorphism p-6 max-h-[80vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="text-accentPrimary" size={24} />
                  <h2 className="font-heading text-2xl font-bold">Корзина</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-surfaceSecondary rounded-plush"
                >
                  <X size={20} className="text-textMuted" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="mx-auto mb-4 text-textMuted" size={48} />
                  <p className="font-body text-textMuted">Корзина пуста</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 bg-surfaceSecondary rounded-plush"
                      >
                        <div className="flex-1">
                          <h3 className="font-heading font-bold mb-1">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Coins className="text-accentPrimary" size={16} />
                            <span className="font-body font-semibold">
                              {item.price} × {item.quantity}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="p-2 hover:bg-surfacePrimary rounded-plush text-redRubberBall"
                        >
                          <X size={20} />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-surfaceSecondary pt-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-body font-semibold">Итого:</span>
                      <div className="flex items-center gap-1">
                        <Coins className="text-accentPrimary" size={20} />
                        <span className="font-heading text-2xl font-bold text-accentPrimary">
                          {total}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-body text-textMuted">Ваш баланс:</span>
                      <span className="font-body font-semibold">{userBones} костей</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={onCheckout}
                    disabled={!canCheckout}
                  >
                    {canCheckout ? 'Оформить заказ' : 'Недостаточно костей'}
                  </Button>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

