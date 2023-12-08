import { useContext } from "react";
import { MetronomeContext } from "@/contexts/MetronomeContext";

export default function SetTimeSignature() {
  const { handleSetTimeSig, beatsPerMeasure } = useContext(MetronomeContext);

  return (
    <div>
      <span>Time signature : </span>
      <select
        className="pt-1 pl-2 pr-1"
        name="time-signature"
        id="time-signature"
        value={beatsPerMeasure}
        onChange={handleSetTimeSig}
      >
        <option value="3">3/4</option>
        <option value="4">4/4</option>
        <option value="5">5/4</option>
      </select>
    </div>
  );
}