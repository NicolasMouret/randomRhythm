import { useContext } from 'react';
import { MetronomeContext } from '@/contexts/MetronomeContext';

export default function SetMeasuresBtwChanges() {
  const { numberOfBarsBetweenChanges, setNumberOfBarsBetweenChanges } = useContext(MetronomeContext);
  const handleChange = (e) => {
    setNumberOfBarsBetweenChanges(+e.target.value);
  }
  return (
    <div>
      <span className="align-bottom">Number of bars between rhythm change : </span>
      <select
        className="pt-1 pl-2 pr-1"
        name="time-signature"
        id="time-signature"
        value={numberOfBarsBetweenChanges}
        onChange={handleChange}
      >
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </div>
  )
}
