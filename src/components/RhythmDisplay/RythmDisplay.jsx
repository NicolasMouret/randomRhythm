'use client';
import { MetronomeContext } from '@/contexts/MetronomeContext';
import { useContext } from 'react';

export default function RythmDisplay({measureToDisplay}) {
  const {bouncingElementIndex} = useContext(MetronomeContext)
  return (
    <div className="flex items-center sm:flex-row sm:items-start justify-center gap-6 w-[90vw] mt-8 md:mt-12">
      {measureToDisplay.map((element, index) => {
        return (
          <div key={index} 
          className={`${bouncingElementIndex === index ? 'animate-bounce' : ""} 
          w-16 h-16 md:w-36 md:h-32 lg:w-[230px] lg:h-[250px] xl:w-[260px] xl:h-[280px]`}>
            {element}
          </div>
        )
      })}
    </div>
  )
}
