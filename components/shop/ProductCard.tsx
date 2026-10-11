'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ShoppingBag, Star, Coins } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  rating?: number
  image?: string
  category: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  userBones: number
}

export function ProductCard({
  product,
  onAddToCart,
  userBones,
}: ProductCardProps) {
  const canAfford = userBones >= product.price

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card hoverable className="overflow-hidden">
        <div className="flex gap-4">
          {/* Изображение товара */}
          <div className="w-24 h-24 bg-surfaceSecondary rounded-plush flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="text-textMuted" size={32} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-heading font-bold text-lg mb-1 truncate">
                  {product.name}
                </h3>
                <p className="font-body text-textMuted text-sm line-clamp-2 mb-2">
                  {product.description}
                </p>
              </div>
              {product.rating && (
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <Star className="text-warning" size={16} fill="currentColor" />
                  <span className="font-body text-sm font-semibold">
                    {product.rating}
                  </span>
                </div>
              )}
            </div>

            {/* Цена */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Coins className="text-accentPrimary" size={18} />
                <span className="font-heading text-xl font-bold text-accentPrimary">
                  {product.price}
                </span>
              </div>
              {product.originalPrice && (
                <>
                  <span className="font-body text-textMuted line-through text-sm">
                    {product.originalPrice}
                  </span>
                  {product.discount && (
                    <span className="font-body text-success text-sm font-semibold">
                      -{product.discount}%
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Кнопка покупки */}
            <Button
              size="sm"
              className="w-full"
              onClick={() => onAddToCart(product)}
              disabled={!canAfford}
            >
              {canAfford ? (
                <>
                  <ShoppingBag size={16} className="inline mr-2" />
                  В корзину
                </>
              ) : (
                'Недостаточно костей'
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

