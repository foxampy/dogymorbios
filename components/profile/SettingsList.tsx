'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import {
  Settings,
  Bell,
  Shield,
  HelpCircle,
  Moon,
  Globe,
  LogOut,
} from 'lucide-react'
import { Toggle } from '@/components/ui/Toggle'
import { useState } from 'react'

interface SettingsListProps {
  onLogout: () => void
}

export function SettingsList({ onLogout }: SettingsListProps) {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('ru')

  const settings = [
    {
      icon: <Settings className="text-accentPrimary" size={24} />,
      label: 'Общие настройки',
      onClick: () => console.log('General settings'),
    },
    {
      icon: <Bell className="text-accentPrimary" size={24} />,
      label: 'Уведомления',
      hasToggle: true,
      toggleValue: notifications,
      onToggle: setNotifications,
    },
    {
      icon: <Shield className="text-accentPrimary" size={24} />,
      label: 'Приватность',
      onClick: () => console.log('Privacy'),
    },
    {
      icon: <Moon className="text-accentPrimary" size={24} />,
      label: 'Темная тема',
      hasToggle: true,
      toggleValue: darkMode,
      onToggle: setDarkMode,
    },
    {
      icon: <Globe className="text-accentPrimary" size={24} />,
      label: 'Язык',
      value: 'Русский',
      onClick: () => console.log('Language'),
    },
    {
      icon: <HelpCircle className="text-accentPrimary" size={24} />,
      label: 'Помощь и поддержка',
      onClick: () => console.log('Help'),
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-heading text-xl font-bold">Настройки</h3>
      {settings.map((setting, index) => (
        <motion.div
          key={setting.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card hoverable={!setting.hasToggle}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                {setting.icon}
                <span className="font-body font-semibold flex-1">
                  {setting.label}
                </span>
                {setting.value && (
                  <span className="font-body text-textMuted text-sm">
                    {setting.value}
                  </span>
                )}
              </div>
              {setting.hasToggle ? (
                <Toggle
                  checked={setting.toggleValue}
                  onChange={setting.onToggle}
                />
              ) : (
                <span className="text-textMuted">›</span>
              )}
            </div>
          </Card>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: settings.length * 0.05 }}
      >
        <Card
          hoverable
          className="border-2 border-redRubberBall/30"
          onClick={onLogout}
        >
          <div className="flex items-center gap-4">
            <LogOut className="text-redRubberBall" size={24} />
            <span className="font-body font-semibold flex-1 text-redRubberBall">
              Выйти
            </span>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

