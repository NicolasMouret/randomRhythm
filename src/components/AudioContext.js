'use client';
import { useEffect } from 'react';
import { Synth, Envelope, Loop, Transport } from 'tone'

if (typeof window !== 'undefined') {
  const synth = new Synth({
    oscillator: {
      type: 'triangle',
    },
    envelope: {
      attack: 0.01,
      decay: 0.05,
      sustain: 0.0,
      release: 1,
    },
  }).toDestination()
  
  const envelope = new Envelope()
  
  envelope.set(0.0001, 5, 0.01, 0.001, 0.1, 0)
  
  const loop = new Loop((time) => {
    Transport.setLoopPoints(0, '1m')
    Transport.loop = true
    const index = Number(Transport.position.split(':')[1]) + 1
    // console.log('Beat:', index)
    if (index === 1) {
      synth.triggerAttackRelease('C6', '16n', time)
    } else {
      synth.triggerAttackRelease('C5', '16n', time)
    }
  }, '4n')


const toggleOnOff = (isPlaying) => {
  if (!isPlaying) {
    Transport.stop()
    loop.start(0)
    Transport.start()
  } else {
    Transport.stop()
  }
}

const setTransportBPM = (bpm) => {
  Transport.bpm.value = bpm
}

const setTransportTimeSig = (timeSignature) => {
  Transport.timeSignature = timeSignature
}
}

export { toggleOnOff, setTransportBPM, setTransportTimeSig };