'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react'
import { useState } from 'react'

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    breed: string
  }
  content: string
  image?: string
  likes: number
  comments: number
  isLiked: boolean
  timestamp: string
}

interface PostCardProps {
  post: Post
  onLike: (postId: string) => void
  onComment: (postId: string) => void
  onShare: (postId: string) => void
}

export function PostCard({
  post,
  onLike,
  onComment,
  onShare,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likesCount, setLikesCount] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
    onLike(post.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        {/* Заголовок поста */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accentPrimary rounded-full flex items-center justify-center">
              <span className="font-heading font-bold text-white text-lg">
                {post.author.name[0]}
              </span>
            </div>
            <div>
              <h3 className="font-heading font-bold">{post.author.name}</h3>
              <p className="font-body text-textMuted text-sm">{post.author.breed}</p>
            </div>
          </div>
          <button className="text-textMuted hover:text-textMain">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Текст поста */}
        <p className="font-body text-textMain mb-4">{post.content}</p>

        {/* Изображение */}
        {post.image && (
          <div className="w-full h-64 bg-surfaceSecondary rounded-plush mb-4 flex items-center justify-center overflow-hidden">
            <div className="text-6xl">📷</div>
          </div>
        )}

        {/* Время публикации */}
        <p className="font-body text-textMuted text-xs mb-4">{post.timestamp}</p>

        {/* Действия */}
        <div className="flex items-center gap-4 pt-4 border-t border-surfaceSecondary">
          <motion.button
            className={`flex items-center gap-2 ${
              isLiked ? 'text-accentPrimary' : 'text-textMuted'
            }`}
            onClick={handleLike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
            </motion.div>
            <span className="font-body font-semibold">{likesCount}</span>
          </motion.button>

          <motion.button
            className="flex items-center gap-2 text-textMuted"
            onClick={() => onComment(post.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle size={24} />
            <span className="font-body font-semibold">{post.comments}</span>
          </motion.button>

          <motion.button
            className="flex items-center gap-2 text-textMuted ml-auto"
            onClick={() => onShare(post.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 size={24} />
          </motion.button>
        </div>
      </Card>
    </motion.div>
  )
}

