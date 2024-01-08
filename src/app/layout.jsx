import { MetronomeProvider } from '@/contexts/MetronomeContext';
import { Josefin_Sans } from 'next/font/google';
import './globals.css';

const josefin = Josefin_Sans({ subsets: ['latin'] })


export const metadata = {
  title: 'Random Rhythm',
  description: 'A rhythm randomizer to practice reading and playing rhythms',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <MetronomeProvider>
          <body className={josefin.className}>
          <h1 className="mt-10 text-center text-7xl text-slate-800">RandomRhythm</h1>
          {children}
          </body>
      </MetronomeProvider>
    </html>
  )
}
