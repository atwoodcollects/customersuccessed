import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'CustomerSuccessed - From customer obsessed to successed.',
  description: 'Your AI copilot for customer success. Paste an email thread, get instant account insights and next steps.',
  metadataBase: new URL('https://customersuccessed.com'),
  openGraph: {
    title: 'CustomerSuccessed',
    description: 'From customer obsessed to successed. Your AI copilot for customer success.',
    url: 'https://customersuccessed.com',
    siteName: 'CustomerSuccessed',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CustomerSuccessed',
    description: 'From customer obsessed to successed. Your AI copilot for customer success.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
