import './globals.scss'

import { MainLayout } from '@/components/layout/main-layout'

export const metadata = {
  title: 'PhotoNote',
  description: '...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}
