'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { FileText, Calendar, Download, Plus } from 'lucide-react'
import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface Document {
  id: string
  type: string
  name: string
  date: string
  vet: string
  file?: string
}

interface DigitalPassportProps {
  documents: Document[]
  onAddDocument: (doc: Document) => void
}

export function DigitalPassport({
  documents,
  onAddDocument,
}: DigitalPassportProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [newDoc, setNewDoc] = useState({
    type: '',
    name: '',
    date: '',
    vet: '',
  })

  const handleAdd = () => {
    onAddDocument({
      id: Date.now().toString(),
      ...newDoc,
    })
    setNewDoc({ type: '', name: '', date: '', vet: '' })
    setShowAddModal(false)
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accentPrimary rounded-plush flex items-center justify-center">
            <FileText className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold">Цифровой паспорт</h3>
            <p className="font-body text-textMuted text-sm">
              Все документы в одном месте
            </p>
          </div>
        </div>
        <motion.button
          className="w-10 h-10 bg-accentPrimary rounded-plush flex items-center justify-center text-white"
          onClick={() => setShowAddModal(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus size={20} />
        </motion.button>
      </div>

      <div className="space-y-3">
        {documents.length === 0 ? (
          <p className="font-body text-textMuted text-center py-4">
            Пока нет документов
          </p>
        ) : (
          documents.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-surfaceSecondary rounded-plush"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-heading font-bold mb-1">{doc.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-textMuted">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{doc.date}</span>
                    </div>
                    <span>{doc.vet}</span>
                  </div>
                </div>
                {doc.file && (
                  <motion.button
                    className="p-2 hover:bg-surfacePrimary rounded-plush"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Download size={20} className="text-accentPrimary" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Добавить документ"
      >
        <div className="space-y-4">
          <Input
            label="Тип документа"
            placeholder="Например: Вакцинация"
            value={newDoc.type}
            onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
          />
          <Input
            label="Название"
            placeholder="Название документа"
            value={newDoc.name}
            onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
          />
          <Input
            label="Дата"
            type="date"
            value={newDoc.date}
            onChange={(e) => setNewDoc({ ...newDoc, date: e.target.value })}
          />
          <Input
            label="Ветеринар"
            placeholder="Имя ветеринара"
            value={newDoc.vet}
            onChange={(e) => setNewDoc({ ...newDoc, vet: e.target.value })}
          />
          <Button className="w-full" onClick={handleAdd}>
            Добавить
          </Button>
        </div>
      </Modal>
    </Card>
  )
}

