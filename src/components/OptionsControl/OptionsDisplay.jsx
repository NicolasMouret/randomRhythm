import SetMeasuresBtwChanges from "./SetMeasuresBtwChanges"
import SetNbrOfNotesChanged from "./SetNbrOfNotesChanged"

export default function OptionsDisplay() {
  return (
    <div className="flex flex-col items-center border-2 border-slate-400 rounded-lg 
    sm:flex-row sm:items-start justify-center gap-6 w-[90vw]">
      <SetMeasuresBtwChanges />
      <SetNbrOfNotesChanged />
    </div>
  )
}
