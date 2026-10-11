'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ProductCard } from '@/components/shop/ProductCard'
import { Cart } from '@/components/shop/Cart'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ShoppingBag, Coins, Search, Filter } from 'lucide-react'
import { useUserStore } from '@/stores/useUserStore'
import { SHOP_PRODUCTS, CATEGORIES, type Product } from '@/lib/shopProducts'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export default function TreatShopPage() {
  const { user, updateBonesBalance } = useUserStore()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const bones = user?.bonesBalance || 0

  const filteredProducts = SHOP_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const handleCheckout = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    updateBonesBalance(-total)
    setCartItems([])
    setIsCartOpen(false)
    // TODO: Показать уведомление об успешной покупке
  }

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="min-h-screen bg-background plush-texture p-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl font-bold text-textMain mb-2">
            Магазин лакомств
          </h1>
          <p className="font-body text-textMuted">
            Обменивайте кости на товары
          </p>
        </div>

        {/* Баланс костей */}
        <Card className="bg-gradient-to-r from-warning to-accentPrimary text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body opacity-90 mb-1">Ваш баланс</p>
              <div className="flex items-center gap-2">
                <Coins className="text-white" size={32} fill="white" />
                <span className="font-heading text-4xl font-bold">{bones}</span>
              </div>
            </div>
            <motion.button
              className="relative p-3 bg-white/20 rounded-plush"
              onClick={() => setIsCartOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag size={24} />
              {cartItems.length > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-redRubberBall text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {cartItems.length}
                </motion.span>
              )}
            </motion.button>
          </div>
        </Card>

        {/* Поиск */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-textMuted" size={20} />
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surfaceSecondary rounded-plush shadow-dugHole border-none outline-none font-body placeholder:text-textMuted"
          />
        </div>

        {/* Категории */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              className={`px-4 py-2 rounded-plush font-body font-semibold whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-accentPrimary text-white'
                  : 'bg-surfaceSecondary text-textMain'
              }`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Товары */}
        <div className="space-y-4">
          {filteredProducts.length === 0 ? (
            <Card className="text-center p-12">
              <ShoppingBag className="mx-auto mb-4 text-textMuted" size={48} />
              <p className="font-body text-textMuted">
                Товары не найдены
              </p>
            </Card>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                userBones={bones}
              />
            ))
          )}
        </div>

        {/* Как заработать кости */}
        <Card>
          <h3 className="font-heading text-xl font-bold mb-4">
            Как заработать кости?
          </h3>
          <div className="space-y-3">
            {[
              { action: 'Прогулка', reward: '+10 костей', emoji: '🚶' },
              { action: 'Публикация фото', reward: '+5 костей', emoji: '📷' },
              { action: 'Ежедневный вход', reward: '+3 кости', emoji: '📅' },
            ].map((item, index) => (
              <motion.div
                key={item.action}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-surfaceSecondary rounded-plush"
              >
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1">
                  <p className="font-body font-semibold">{item.action}</p>
                </div>
                <span className="font-body font-bold text-accentPrimary">
                  {item.reward}
                </span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Корзина */}
      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
        total={cartTotal}
        userBones={bones}
      />
    </div>
  )
}
