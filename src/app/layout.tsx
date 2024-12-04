import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import NavFix from '@/components/NavFix'
import { MoviesProvider } from './context/MoviesContext'
import dotenv from 'dotenv'

dotenv.config()

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FilmeSpace',
  description: 'Um site para amantes de filmes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'dark min-h-screen')}>
        <MoviesProvider>
          <NavFix />
          {children}
        </MoviesProvider>
      </body>
    </html>
  )
}
