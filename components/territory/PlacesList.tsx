'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { TreePine, Droplet, ShoppingBag, AlertCircle, MapPin, Star } from 'lucide-react'

interface Place {
  id: string
  name: string
  type: 'park' | 'water' | 'shop' | 'danger'
  distance: number
  rating?: number
  description: string
}

const places: Place[] = [
  {
    id: '1',
    name: 'Парк Победы',
    type: 'park',
    distance: 0.5,
    rating: 4.8,
    description: 'Большой парк с дорожками для прогулок',
  },
  {
    id: '2',
    name: 'Фонтан на площади',
    type: 'water',
    distance: 0.8,
    rating: 4.5,
    description: 'Место для водопоя и отдыха',
  },
  {
    id: '3',
    name: 'Зоомагазин "Лапки"',
    type: 'shop',
    distance: 1.2,
    rating: 4.9,
    description: 'Корм, игрушки и аксессуары',
  },
  {
    id: '4',
    name: 'Опасная зона',
    type: 'danger',
    distance: 0.3,
    description: 'Осторожно: стекло на дороге',
  },
]

export function PlacesList() {
  const getIcon = (type: Place['type']) => {
    switch (type) {
      case 'park':
        return <TreePine className="text-success" size={24} />
      case 'water':
        return <Droplet className="text-blue-500" size={24} />
      case 'shop':
        return <ShoppingBag className="text-accentPrimary" size={24} />
      case 'danger':
        return <AlertCircle className="text-redRubberBall" size={24} />
    }
  }

  const getBgColor = (type: Place['type']) => {
    switch (type) {
      case 'park':
        return 'bg-success/20'
      case 'water':
        return 'bg-blue-100'
      case 'shop':
        return 'bg-accentPrimary/20'
      case 'danger':
        return 'bg-redRubberBall/20'
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-2xl font-bold">Близлежащие места</h2>
      {places.map((place, index) => (
        <motion.div
          key={place.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            hoverable
            className={
              place.type === 'danger'
                ? 'border-2 border-redRubberBall/30'
                : ''
            }
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 ${getBgColor(place.type)} rounded-plush flex items-center justify-center flex-shrink-0`}
              >
                {getIcon(place.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-heading font-bold">{place.name}</h3>
                  {place.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="text-warning" size={16} fill="currentColor" />
                      <span className="font-body text-sm font-semibold">
                        {place.rating}
                      </span>
                    </div>
                  )}
                </div>
                <p className="font-body text-textMuted text-sm mb-2">
                  {place.description}
                </p>
                <div className="flex items-center gap-2">
                  <MapPin className="text-accentPrimary" size={14} />
                  <span className="font-body text-textMuted text-sm">
                    {place.distance} км от вас
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

