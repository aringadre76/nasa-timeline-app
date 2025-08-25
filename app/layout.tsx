import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Galaxy from '@/components/Galaxy'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'This Day in Space - NASA Timeline App',
  description: 'Explore historical NASA images from any date in space history',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen">
          <div className="fixed inset-0 z-0">
            <Galaxy
              mouseRepulsion={true}
              mouseInteraction={true}
              density={2.0}
              glowIntensity={1.0}
              saturation={1.0}
              hueShift={240}
              repulsionStrength={8}
              twinkleIntensity={0.6}
              rotationSpeed={0.2}
              speed={1.5}
              starSpeed={0.8}
            />
          </div>
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
