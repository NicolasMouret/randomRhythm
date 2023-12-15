import SetMeasuresBtwChanges from "./SetMeasuresBtwChanges"
import SetNbrOfNotesChanged from "./SetNbrOfNotesChanged"

export default function OptionsControl() {
  return (
    <div className="flex flex-col items-center gap-5 h-[20%] w-[90vw] sm:w-[430px] border-2 border-slate-400 rounded-lg p-4">
      <SetMeasuresBtwChanges />
      <SetNbrOfNotesChanged />
    </div>
  )
}
