import { Footer } from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import '@/styles/globals.scss'
import "@fancyapps/ui/dist/fancybox/fancybox.css"
import { getMessages } from 'next-intl/server'
import Head from 'next/head'
import Providers from './providers'

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <Head>
        <title>My Next.js App</title>
      </Head>
      <body>
        <Providers messages={messages} locale={locale}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}