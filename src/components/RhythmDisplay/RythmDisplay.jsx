'use client';

export default function RythmDisplay({measureToDisplay}) {
  return (
    <div className="flex justify-center gap-6 w-[90vw]">
      {measureToDisplay}
    </div>
  )
}
