import { useContext } from "react";
import { MetronomeContext } from "@/contexts/MetronomeContext";

export default function SetBpm() {
  const { handleSetBPM, bpm } = useContext(MetronomeContext);

  return (
    <div className="flex flex-col items-center w-[90%]">
      <label htmlFor="bpm">BPM : {bpm}</label>
      <input
        className="w-full"
        type="range"
        id="bpm"
        name="bpm"
        min="50"
        max="200"
        value={bpm}
        onChange={handleSetBPM}
      />
    </div>
  );
}