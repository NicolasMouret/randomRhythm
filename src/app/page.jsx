'use client';
import MetronomeControl from '@/components/MetronomeControl/MetronomeControl';
import OptionsButton from '@/components/OptionsControl/OptionsButton';
import RythmDisplay from '@/components/RhythmDisplay/RythmDisplay';
import OptionsDisplay from '@/components/OptionsControl/OptionsDisplay';
import { MetronomeContext } from "@/contexts/MetronomeContext";
import {
  createMeasureToDisplay,
} from '@/utils/utilsFunctions';
import { useContext, useEffect, useState } from 'react'; 

export default function Home() {
  const {beatsPerMeasure,  
    measureToDisplay, 
    setMeasureToDisplay, 
    notesSelection} = useContext(MetronomeContext)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  useEffect(() => {
    setMeasureToDisplay(createMeasureToDisplay(notesSelection, beatsPerMeasure))
  }, [notesSelection, beatsPerMeasure])

  return (
      <main className="flex flex-col items-center justify-center gap-6 mt-8">
        <div className="flex flex-col items-center gap-2 2xl:mb-12">
          <MetronomeControl isOptionsOpen={isOptionsOpen} /> 
          <OptionsButton isOptionsOpen={isOptionsOpen} setIsOptionsOpen={setIsOptionsOpen} />
        </div>
        {isOptionsOpen ? 
          <OptionsDisplay /> :
          <RythmDisplay notesSelection={notesSelection} measureToDisplay={measureToDisplay}/>}
      </main>
  )
}
