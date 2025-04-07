import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/global.css';
import { cn } from '@/lib/utils'
import { MoviesProvider } from './context/MoviesContext'
import dotenv from 'dotenv'
import NavFix from '@/components/NavFix'
import '../lib/fontawesome'; // Importação do fontawesome

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
          {children}
        </MoviesProvider>
      </body>
    </html>
  )
}
