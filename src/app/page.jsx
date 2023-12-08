'use client';
import MetronomeControl from '@/components/MetronomeControl/MetronomeControl';
import RythmDisplay from '@/components/RhythmDisplay/RythmDisplay';
import { MetronomeContext } from "@/contexts/MetronomeContext";
import { OptionsSelectedContext } from '@/contexts/OptionsSelectedContext';
import {
  newMeasureWithOneNoteChange,
  createMeasureToDisplay,
} from '@/utils/utilsFunctions';
import { useContext, useEffect, useState } from 'react';

export default function Home() {
  const {notesSelection} = useContext(OptionsSelectedContext)
  const {beatsPerMeasure, currentMeasure} = useContext(MetronomeContext)
  const [measureToDisplay, setMeasureToDisplay] = useState(createMeasureToDisplay(notesSelection, beatsPerMeasure))
  
  const handleClick = () => {
    setMeasureToDisplay(newMeasureWithOneNoteChange(measureToDisplay, notesSelection))
  }

  useEffect(() => {
    setMeasureToDisplay(createMeasureToDisplay(notesSelection, beatsPerMeasure))
  }, [notesSelection, beatsPerMeasure])

  return (
      <main className="flex flex-col items-center justify-center gap-16 mt-12">
        <MetronomeControl /> 
        <p className="text-2xl">Current measure: {currentMeasure}</p>
        <button onClick={handleClick} className="playBtn">Change test</button>
        <RythmDisplay notesSelection={notesSelection} measureToDisplay={measureToDisplay}/>
      </main>
  )
}
