import type { Metadata } from 'next'
import { Nunito, Quicksand } from 'next/font/google'
import './globals.css'
import { NavigationBar } from '@/components/navigation/NavigationBar'

const nunito = Nunito({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const quicksand = Quicksand({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dogymorbios World - Мир собак',
  description: 'Комплексная цифровая экосистема для владельцев собак с уникальным игровым интерфейсом',
  manifest: '/manifest.json',
  themeColor: '#FF9F89',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${nunito.variable} ${quicksand.variable}`}>
      <body className="font-body bg-background text-textMain antialiased">
        <main className="min-h-screen pb-20">
          {children}
        </main>
        <NavigationBar />
      </body>
    </html>
  )
}

