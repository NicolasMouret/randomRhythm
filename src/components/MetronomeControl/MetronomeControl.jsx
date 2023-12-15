import PlayButton from './PlayButton';
import SetBpm from './SetBpm';
import SetTimeSignature from './SetTimeSignature';

export default function MetronomeControl() {
  return (
    <div className="flex flex-col items-center gap-3 h-[20%] w-[90vw] sm:w-[400px] border-2 border-slate-400 rounded-lg p-4">
      <SetBpm />
      <SetTimeSignature />
      <PlayButton />  
    </div>
  )
}