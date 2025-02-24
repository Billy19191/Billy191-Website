import React from 'react'
// import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import ApolloClientProvider from './(provider)/ApolloProvider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

// export const metadata: Metadata = {
//   title: 'Billy191',
//   description: 'Track my crypto balance',
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  )
}
