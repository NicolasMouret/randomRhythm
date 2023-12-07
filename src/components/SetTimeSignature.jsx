import { useContext } from "react";
import { MetronomeContext } from "@/contexts/MetronomeContext";

export default function SetTimeSignature() {
  const { handleSetTimeSig, beatsPerMeasure } = useContext(MetronomeContext);

  return (
    <div className="time-sig-container">
      <span>Time signature: </span>
      <select
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