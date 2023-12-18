import { IoOptionsOutline } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function OptionsButton({isOptionsOpen, setIsOptionsOpen}) {
  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }
  return (
    <button 
    type="button" 
    aria-label="Open Options" 
    className="flex items-center gap-2 text-lg"
    onClick={toggleOptions}>
      <IoOptionsOutline className="text-3xl cursor-pointer text-slate-600" />
      {isOptionsOpen ? <span>Close Options</span> : <span>Show Options</span>}
      {isOptionsOpen ? 
      <FaChevronUp className="text-2xl cursor-pointer text-slate-600" /> : 
      <FaChevronDown className="text-2xl cursor-pointer text-slate-600" />}
    </button>
  )
}
