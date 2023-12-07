import PlayButton from '@/components/PlayButton';
import SetBpm from '@/components/SetBpm';
import SetTimeSignature from './SetTimeSignature';

export default function MetronomeControl() {
  return (
    <div className="flex flex-col items-center gap-2 h-[20%] w-[20vw] border-2 p-4">
      <SetBpm />
      <SetTimeSignature />
      <PlayButton />  
    </div>
  )
}