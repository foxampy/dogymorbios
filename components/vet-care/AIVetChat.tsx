'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MessageCircle, Send, Bot } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface AIVetChatProps {
  onStartChat: () => void
}

export function AIVetChat({ onStartChat }: AIVetChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я AI-ветеринар. Чем могу помочь?',
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])

    // Симуляция ответа бота
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Спасибо за вопрос! Рекомендую проконсультироваться с ветеринаром для точного диагноза.',
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInput('')
  }

  if (!isOpen) {
    return (
      <Card className="bg-gradient-to-br from-accentSecondary to-success">
        <div className="text-center text-white p-8">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bot className="text-white" size={40} />
          </div>
          <h3 className="font-heading text-2xl font-bold mb-2">AI Ветеринар</h3>
          <p className="font-body opacity-90 mb-4">
            Получите консультацию от умного бордер-колли
          </p>
          <Button
            variant="secondary"
            className="bg-white text-accentSecondary"
            onClick={() => {
              setIsOpen(true)
              onStartChat()
            }}
          >
            <MessageCircle className="inline mr-2" size={20} />
            Начать чат
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="h-[500px] flex flex-col">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-surfaceSecondary">
        <Bot className="text-accentPrimary" size={24} />
        <h3 className="font-heading text-xl font-bold">AI Ветеринар</h3>
        <button
          className="ml-auto text-textMuted"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-plush ${
                message.isBot
                  ? 'bg-surfaceSecondary text-textMain'
                  : 'bg-accentPrimary text-white'
              }`}
            >
              <p className="font-body text-sm">{message.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Введите вопрос..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1"
        />
        <motion.button
          className="p-3 bg-accentPrimary text-white rounded-plush"
          onClick={handleSend}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send size={20} />
        </motion.button>
      </div>
    </Card>
  )
}

