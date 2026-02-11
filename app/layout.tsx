import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { OrganizationSchema } from '@/components/OrganizationSchema'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'DISSUN - Fuel. Fire. Power.',
  description: 'Premium health products and artisanal coffee. Fuel your body, fire your soul, and power your life with DISSUN.',
  keywords: ['health products', 'premium coffee', 'artisanal coffee', 'supplements', 'wellness', 'dissun', 'fuel fire power'],
  authors: [{ name: 'DISSUN' }],
  creator: 'DISSUN',
  publisher: 'DISSUN',
  openGraph: {
    title: 'DISSUN - Fuel. Fire. Power.',
    description: 'Discover premium health products and artisanal coffee at DISSUN. Fuel your potential.',
    url: 'https://dissun.com',
    siteName: 'DISSUN',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DISSUN - Health & Coffee',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DISSUN - Fuel. Fire. Power.',
    description: 'Discover premium health products and artisanal coffee at DISSUN.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <OrganizationSchema />
        <Providers>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}