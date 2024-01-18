import { Inter } from 'next/font/google'
import { AuthContextProvider } from '@/context/AuthContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Janedle',
  description: 'Like wordle but for all things John Aidan',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <div className='bg-gray-800 min-h-screen transition-all carousel-fade '>{children}</div>
        </AuthContextProvider>
      </body>
    </html>
  )
}
