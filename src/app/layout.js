import './globals.css'
import AppWrapper from '@/components/app-components/AppWrapper'

export const metadata = {
  title: 'Jadar - Beyond hospitality',
  description: 'JADAR is the dedicated facility and property management arm with a clear mission: to redefine how spaces serve people.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`relative w-screen min-h-screen overflow-x-hidden bg-bg text-text scroll-smooth antialiased`}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
