'use client';
import MetronomeControl from '@/components/MetronomeControl/MetronomeControl';
import OptionsControl from '@/components/OptionsControl/OptionsControl';
import RythmDisplay from '@/components/RhythmDisplay/RythmDisplay';
import { MetronomeContext } from "@/contexts/MetronomeContext";
import {
  createMeasureToDisplay,
} from '@/utils/utilsFunctions';
import { useContext, useEffect } from 'react'; 

export default function Home() {
  const {beatsPerMeasure,  
    measureToDisplay, 
    setMeasureToDisplay, 
    notesSelection} = useContext(MetronomeContext)

  useEffect(() => {
    setMeasureToDisplay(createMeasureToDisplay(notesSelection, beatsPerMeasure))
  }, [notesSelection, beatsPerMeasure])

  useEffect(() => {
    console.log("measure to display page", measureToDisplay)
  }
  , [measureToDisplay])

  return (
      <main className="flex flex-col items-center justify-center gap-16 mt-12">
        <div className="flex flex-col items-center gap-6 sm:items-start sm:flex-row sm:mb-12">
          <MetronomeControl /> 
          <OptionsControl />
        </div>
        <RythmDisplay notesSelection={notesSelection} measureToDisplay={measureToDisplay}/>
      </main>
  )
}
