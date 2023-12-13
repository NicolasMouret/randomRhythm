import { Josefin_Sans } from 'next/font/google'
import { MetronomeProvider } from '@/contexts/MetronomeContext';
import './globals.css'

const Josefin = Josefin_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Random Rhythm',
  description: 'A rhythm randomizer to practice reading and playing rhythms',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" href="/music-icon.svg" />
    </head>
      <MetronomeProvider>
          <body className={Josefin.className}>
          <h1 className="mt-10 text-center text-7xl text-slate-800">RandomRhythm</h1>
          {children}
          </body>
      </MetronomeProvider>
    </html>
  )
}
