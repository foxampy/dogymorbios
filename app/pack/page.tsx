'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PostCard } from '@/components/pack/PostCard'
import { SniffCard } from '@/components/pack/SniffCard'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Search, MessageCircle, Users, Heart } from 'lucide-react'
import { MOCK_POSTS, MOCK_SNIFF_PROFILES } from '@/lib/mockData'

type ViewMode = 'feed' | 'sniff' | 'messages'

export default function PackPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('feed')
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [sniffProfiles, setSniffProfiles] = useState(MOCK_SNIFF_PROFILES)
  const [currentSniffIndex, setCurrentSniffIndex] = useState(0)

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + (post.isLiked ? -1 : 1), isLiked: !post.isLiked }
          : post
      )
    )
  }

  const handleComment = (postId: string) => {
    // TODO: Открыть модальное окно комментариев
    console.log('Comment on post:', postId)
  }

  const handleShare = (postId: string) => {
    // TODO: Реализовать шаринг
    console.log('Share post:', postId)
  }

  const handleSniffLike = (id: string) => {
    console.log('Liked profile:', id)
    if (currentSniffIndex < sniffProfiles.length - 1) {
      setCurrentSniffIndex(currentSniffIndex + 1)
    } else {
      setViewMode('feed')
    }
  }

  const handleSniffPass = (id: string) => {
    console.log('Passed profile:', id)
    if (currentSniffIndex < sniffProfiles.length - 1) {
      setCurrentSniffIndex(currentSniffIndex + 1)
    } else {
      setViewMode('feed')
    }
  }

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
            Стая
          </h1>
          <p className="font-body text-textMuted">
            Общайтесь с другими владельцами
          </p>
        </div>

        {/* Навигация по разделам */}
        <div className="flex gap-2 bg-surfacePrimary p-2 rounded-plush">
          <motion.button
            className={`flex-1 py-2 rounded-plush font-body font-semibold transition-colors ${
              viewMode === 'feed'
                ? 'bg-accentPrimary text-white'
                : 'text-textMuted'
            }`}
            onClick={() => setViewMode('feed')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Лента
          </motion.button>
          <motion.button
            className={`flex-1 py-2 rounded-plush font-body font-semibold transition-colors ${
              viewMode === 'sniff'
                ? 'bg-accentPrimary text-white'
                : 'text-textMuted'
            }`}
            onClick={() => setViewMode('sniff')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sniff
          </motion.button>
          <motion.button
            className={`flex-1 py-2 rounded-plush font-body font-semibold transition-colors ${
              viewMode === 'messages'
                ? 'bg-accentPrimary text-white'
                : 'text-textMuted'
            }`}
            onClick={() => setViewMode('messages')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Чаты
          </motion.button>
        </div>

        {/* Поиск */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-textMuted" size={20} />
          <input
            type="text"
            placeholder="Поиск..."
            className="w-full pl-12 pr-4 py-3 bg-surfaceSecondary rounded-plush shadow-dugHole border-none outline-none font-body placeholder:text-textMuted"
          />
        </div>

        {/* Контент в зависимости от режима */}
        {viewMode === 'feed' && (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
              />
            ))}
          </div>
        )}

        {viewMode === 'sniff' && (
          <div className="space-y-6">
            {currentSniffIndex < sniffProfiles.length ? (
              <>
                <div className="text-center mb-4">
                  <h2 className="font-heading text-2xl font-bold mb-2">
                    Найти друга для игры
                  </h2>
                  <p className="font-body text-textMuted">
                    Проведите пальцем или используйте кнопки
                  </p>
                </div>
                <SniffCard
                  profile={sniffProfiles[currentSniffIndex]}
                  onLike={handleSniffLike}
                  onPass={handleSniffPass}
                />
              </>
            ) : (
              <Card className="text-center p-8">
                <Heart className="mx-auto mb-4 text-accentPrimary" size={48} />
                <h3 className="font-heading text-xl font-bold mb-2">
                  Вы просмотрели всех!
                </h3>
                <p className="font-body text-textMuted mb-4">
                  Загляните позже, возможно появятся новые профили
                </p>
                <Button onClick={() => {
                  setCurrentSniffIndex(0)
                  setSniffProfiles(MOCK_SNIFF_PROFILES)
                }}>
                  Обновить
                </Button>
              </Card>
            )}
          </div>
        )}

        {viewMode === 'messages' && (
          <Card className="text-center p-12">
            <MessageCircle className="mx-auto mb-4 text-accentPrimary" size={64} />
            <h3 className="font-heading text-xl font-bold mb-2">
              Чаты скоро появятся
            </h3>
            <p className="font-body text-textMuted">
              Функция находится в разработке
            </p>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
