import './globals.css'
import AppWrapper from '@/components/app-components/AppWrapper'
import LoadingScreen from '@/components/app-components/LoadingScreen'

export const metadata = {
  title: 'Jadar - Beyond hospitality',
  description: 'JADAR is the dedicated facility and property management arm with a clear mission: to redefine how spaces serve people.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`relative w-screen min-h-screen overflow-x-hidden! bg-bg text-text uppercase scroll-smooth antialiased`}>
        <LoadingScreen />
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
