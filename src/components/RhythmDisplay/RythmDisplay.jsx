'use client';
import { useContext } from 'react';
import { MetronomeContext } from '@/contexts/MetronomeContext';

export default function RythmDisplay({measureToDisplay}) {
  const {bouncingElementIndex} = useContext(MetronomeContext)
  return (
    <div className="flex justify-center gap-6 w-[90vw]">
      {measureToDisplay.map((element, index) => {
        return (
          <div key={index} 
          className={`${bouncingElementIndex === index ? 'animate-bounce' : ""} 
          min-h-[250px] max-h-[300px] w-[20%]`}>
            {element}
          </div>
        )
      })}
    </div>
  )
}
