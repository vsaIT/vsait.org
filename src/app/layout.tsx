import type { Metadata } from 'next'
import '@/globals.css'
import '@/tailwind.css'
import { ReactNode, Suspense } from 'react'
import LoadingIndicator from '@/components/LoadingIndicator'
import Head from 'next/head'
import { mapPageTitle } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'

export const metadata: Metadata = {
  title: 'VSAIT',
  description: 'Vietnamese Student Association in Trondheim',
  icons: {
    shortcut: '/favicon.ico',
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
    const currPath = usePathname()
  return (
    <html lang="no">
        <Head>
            <title>{!!currPath ? mapPageTitle(currPath) : "Invalid url"}</title>
        </Head>     
        <body>
        <Suspense fallback={<LoadingIndicator/>}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
