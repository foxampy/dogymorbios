'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Sun, Cloud, CloudRain, Wind, Thermometer } from 'lucide-react'
import { useState, useEffect } from 'react'

interface WeatherData {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'windy'
  temperature: number
  canWalk: boolean
  message: string
}

const weatherConditions: WeatherData[] = [
  {
    condition: 'sunny',
    temperature: 22,
    canWalk: true,
    message: 'Идеально для прогулки!',
  },
  {
    condition: 'cloudy',
    temperature: 18,
    canWalk: true,
    message: 'Хорошая погода для прогулки',
  },
  {
    condition: 'rainy',
    temperature: 15,
    canWalk: false,
    message: 'Лучше остаться дома',
  },
  {
    condition: 'windy',
    temperature: 20,
    canWalk: true,
    message: 'Можно гулять, но осторожно',
  },
]

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>(
    weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
  )

  useEffect(() => {
    // Симуляция изменения погоды
    const interval = setInterval(() => {
      setWeather(
        weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
      )
    }, 300000) // Каждые 5 минут

    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="text-warning" size={48} fill="currentColor" />
      case 'cloudy':
        return <Cloud className="text-textMuted" size={48} />
      case 'rainy':
        return <CloudRain className="text-accentSecondary" size={48} />
      case 'windy':
        return <Wind className="text-accentPrimary" size={48} />
    }
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-heading text-lg font-bold mb-1">Погода</h3>
          <p
            className={`font-body text-sm mb-2 ${
              weather.canWalk ? 'text-success' : 'text-redRubberBall'
            }`}
          >
            {weather.message}
          </p>
          <div className="flex items-center gap-2">
            <Thermometer className="text-accentPrimary" size={16} />
            <span className="font-body font-semibold">{weather.temperature}°C</span>
          </div>
        </div>
        <motion.div
          animate={{
            rotate: weather.condition === 'windy' ? [0, 10, -10, 0] : 0,
            scale: weather.condition === 'sunny' ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {getWeatherIcon()}
        </motion.div>
      </div>
    </Card>
  )
}

