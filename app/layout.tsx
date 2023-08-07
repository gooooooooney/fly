import { Providers } from '@/components/providers'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/navbar/header'
import { Sidebar } from '@/components/layout/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'fly ',
  description: 'Your personal noted app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <section className='flex h-screen'>
            <Sidebar />
            <section className='flex flex-col w-full'>
              <Header />
              <main className='w-full relative max-h-full'>
                {children}
              </main>
            </section>
          </section>
        </Providers>
      </body>
    </html>
  )
}
