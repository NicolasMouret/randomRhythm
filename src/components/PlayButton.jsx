import { useContext } from "react";
import { MetronomeContext } from "@/contexts/MetronomeContext";

export default function PlayButton() {
  const { handleOnOff, isPlaying } = useContext(MetronomeContext);

  return (
    <button 
      type="submit" 
      onClick={handleOnOff} 
      className="playBtn">
      {isPlaying ? "Stop" : "Start"}
    </button>
  );
}