'use client';
import MetronomeControl from '@/components/MetronomeControl/MetronomeControl';
import RythmDisplay from '@/components/RhythmDisplay/RythmDisplay';
import { MetronomeContext } from "@/contexts/MetronomeContext";
import {
  createMeasureToDisplay,
} from '@/utils/utilsFunctions';
import { useContext, useEffect, useState } from 'react'; 

export default function Home() {
  const {beatsPerMeasure, 
    currentMeasure, 
    measureToDisplay, 
    setMeasureToDisplay, 
    notesSelection,
    randomNoteChange} = useContext(MetronomeContext)

  useEffect(() => {
    setMeasureToDisplay(createMeasureToDisplay(notesSelection, beatsPerMeasure))
  }, [notesSelection, beatsPerMeasure])

  return (
      <main className="flex flex-col items-center justify-center gap-16 mt-12">
        <MetronomeControl /> 
        <RythmDisplay notesSelection={notesSelection} measureToDisplay={measureToDisplay}/>
      </main>
  )
}
