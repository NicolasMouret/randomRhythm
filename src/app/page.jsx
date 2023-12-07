'use client';
import { MetronomeProvider } from '@/contexts/MetronomeContext';
import MetronomeControl from '@/components/MetronomeControl';

export default function Home() {
  return (
    <MetronomeProvider>
      <main className="flex justify-center mt-12">
        <MetronomeControl /> 
      </main>
    </MetronomeProvider>
  )
}
