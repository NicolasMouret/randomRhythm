import { useContext } from 'react';
import { MetronomeContext } from '@/contexts/MetronomeContext';

export default function SetMeasuresBtwChanges() {
  const { numberOfNotesToChange, setNumberOfNotesToChange, beatsPerMeasure } = useContext(MetronomeContext);
  const handleChange = (e) => {
    setNumberOfNotesToChange(+e.target.value);
  }
  return (
    <div>
      <span className="align-bottom">Number of beats randomized each changed : </span>
      <select
        className="pt-1 pl-2 pr-1"
        name="time-signature"
        id="time-signature"
        value={numberOfNotesToChange}
        onChange={handleChange}
      >
        {Array.from({length: beatsPerMeasure}, (_, i) => i + 1).map((value) => {
          return <option key={value} value={value}>{value}</option>
        })}
      </select>
    </div>
  )
}