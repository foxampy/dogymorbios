'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { MapPin, Navigation, Play, Square } from 'lucide-react'
import { useState } from 'react'

interface MapMarker {
  id: string
  type: 'water' | 'park' | 'shop' | 'danger' | 'user'
  position: { x: number; y: number }
  name: string
  distance?: number
}

interface MapViewProps {
  isWalking: boolean
  onStartWalk: () => void
  onStopWalk: () => void
  currentPath: Array<{ lat: number; lng: number }>
}

export function MapView({
  isWalking,
  onStartWalk,
  onStopWalk,
  currentPath,
}: MapViewProps) {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null)

  const markers: MapMarker[] = [
    {
      id: '1',
      type: 'water',
      position: { x: 20, y: 25 },
      name: 'Фонтан',
      distance: 0.5,
    },
    {
      id: '2',
      type: 'park',
      position: { x: 60, y: 40 },
      name: 'Парк Победы',
      distance: 0.8,
    },
    {
      id: '3',
      type: 'shop',
      position: { x: 80, y: 20 },
      name: 'Зоомагазин',
      distance: 1.2,
    },
    {
      id: '4',
      type: 'danger',
      position: { x: 40, y: 70 },
      name: 'Опасная зона',
      distance: 0.3,
    },
  ]

  const getMarkerIcon = (type: MapMarker['type']) => {
    switch (type) {
      case 'water':
        return '💧'
      case 'park':
        return '🌳'
      case 'shop':
        return '🛍️'
      case 'danger':
        return '⚠️'
      case 'user':
        return '📍'
      default:
        return '📍'
    }
  }

  const getMarkerColor = (type: MapMarker['type']) => {
    switch (type) {
      case 'water':
        return 'bg-blue-100'
      case 'park':
        return 'bg-success/20'
      case 'shop':
        return 'bg-accentPrimary/20'
      case 'danger':
        return 'bg-redRubberBall/20'
      case 'user':
        return 'bg-accentSecondary/20'
      default:
        return 'bg-surfaceSecondary'
    }
  }

  return (
    <Card className="h-[500px] relative overflow-hidden">
      {/* Фон карты */}
      <div className="absolute inset-0 bg-gradient-to-br from-accentSecondary/30 via-surfacePrimary to-accentPrimary/20" />
      
      {/* Сетка карты */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Маршрут */}
      {currentPath.length > 0 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.path
            d={`M ${currentPath.map((p, i) => `${20 + i * 10},${30 + i * 5}`).join(' L ')}`}
            fill="none"
            stroke="#FF9F89"
            strokeWidth="4"
            strokeDasharray="10 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      )}

      {/* Маркеры */}
      {markers.map((marker) => (
        <motion.button
          key={marker.id}
          className={`absolute ${getMarkerColor(marker.type)} rounded-full w-12 h-12 flex items-center justify-center shadow-claymorphism z-10`}
          style={{
            left: `${marker.position.x}%`,
            top: `${marker.position.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => setSelectedMarker(marker)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: parseFloat(marker.id) * 0.3,
          }}
        >
          <span className="text-2xl">{getMarkerIcon(marker.type)}</span>
        </motion.button>
      ))}

      {/* Текущая позиция пользователя */}
      <motion.div
        className="absolute bg-accentSecondary rounded-full w-16 h-16 flex items-center justify-center shadow-claymorphism z-20"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <Navigation className="text-white" size={24} />
      </motion.div>

      {/* Кнопка управления прогулкой */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
        {!isWalking ? (
          <motion.button
            className="bg-accentPrimary text-white px-6 py-3 rounded-plush shadow-claymorphism font-heading font-bold flex items-center gap-2"
            onClick={onStartWalk}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={20} />
            Начать прогулку
          </motion.button>
        ) : (
          <motion.button
            className="bg-redRubberBall text-white px-6 py-3 rounded-plush shadow-claymorphism font-heading font-bold flex items-center gap-2"
            onClick={onStopWalk}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Square size={20} />
            Завершить
          </motion.button>
        )}
      </div>

      {/* Информация о выбранном маркере */}
      {selectedMarker && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 right-4 bg-surfacePrimary rounded-plush shadow-claymorphism p-4 z-30"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold">{selectedMarker.name}</h3>
              {selectedMarker.distance && (
                <p className="font-body text-textMuted text-sm">
                  {selectedMarker.distance} км от вас
                </p>
              )}
            </div>
            <button
              onClick={() => setSelectedMarker(null)}
              className="text-textMuted hover:text-textMain"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </Card>
  )
}

