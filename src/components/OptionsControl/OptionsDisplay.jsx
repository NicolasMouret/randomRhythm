import { MetronomeContext } from '@/contexts/MetronomeContext'
import {notesCollection} from "@/notesCollection/notesCollection"
import Image from 'next/image'
import { useContext } from 'react'
import SetMeasuresBtwChanges from "./SetMeasuresBtwChanges"
import SetNbrOfNotesChanged from "./SetNbrOfNotesChanged"

const NoteCheckbox = (note) => {
  const { notesSelection, setNotesSelection } = useContext(MetronomeContext);
  const handleChange = (e) => {
    if (e.target.checked) {
      setNotesSelection([...notesSelection, note])
    } //if note is the only one selected, don't remove it
    else if (notesSelection.length > 1) {
      setNotesSelection(notesSelection.filter(selectedNote => selectedNote !== note))
    }
  }  
  return (
    <label key={note.id} className="flex flex-col items-center">
      <input 
        type="checkbox" 
        className="hidden peer" 
        name={note.name} 
        value={note.name} 
        id={note.name}
        onChange={handleChange}
        checked={notesSelection.includes(note)}
      />
      <Image 
        className={`cursor-pointer opacity-40 p-1 bg-slate-200 peer-checked:opacity-100 peer-checked:rounded-lg`} 
        src={note.imagePath} 
        alt={note.name} 
        width={45} 
        height={40} 
        style={{ 
          minHeight: "45px",
          maxHeight: "40px",
        }}
        draggable="false"
      />
    </label>
  )
}

export default function OptionsDisplay() {
  return (
    <div className="flex flex-col items-center border-2 border-slate-400 rounded-lg 
     justify-center gap-4 w-[90vw] md:w-[800px] p-4 mb-4">
      <div className="flex items-center gap-4">
        <SetMeasuresBtwChanges />
        <SetNbrOfNotesChanged />
      </div>
      <p className="text-xl">Selection of beats to use :</p>
      <div className="flex flex-wrap gap-6 select-none">
      {notesCollection.map(note => (NoteCheckbox(note)))}
      </div>
    </div>
  )
}
