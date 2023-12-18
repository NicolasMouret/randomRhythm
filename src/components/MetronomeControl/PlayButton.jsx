import { useContext } from "react";
import { MetronomeContext } from "@/contexts/MetronomeContext";

export default function PlayButton({isOptionsOpen}) {
  const { handleOnOff, isPlaying } = useContext(MetronomeContext);

  return (
    <button 
      type="submit" 
      onClick={handleOnOff} 
      className={`playBtn ${isOptionsOpen ? "disabled:opacity-50 disabled:cursor-not-allowed" : "block"}`}
      disabled={isOptionsOpen}
      >
      {isPlaying ? "Stop" : "Start"}
    </button>
  );
}