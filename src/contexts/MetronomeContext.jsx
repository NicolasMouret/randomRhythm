'use client';

import { createContext, useState, useEffect } from "react";
import { Synth, Envelope, Loop, Transport } from 'tone';

const MetronomeContext = createContext();

function MetronomeProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [currentMeasure, setCurrentMeasure] = useState(1);
  const [currentBeat, setCurrentBeat] = useState(1);

  useEffect(() => {
    // Create synth and envelope
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
    }).toDestination();

    const envelope = new Envelope();

    envelope.set(0.0001, 5, 0.01, 0.001, 0.1, 0);

    // Create loop outside of the useEffect
    const loop = new Loop((time) => {
      const index = Number(Transport.position.split(':')[1]) + 1;
      if (index === 1) {
        synth.triggerAttackRelease('C6', '16n', time);
        setCurrentBeat(prevBeat => prevBeat + 1);
        console.log("current beat", currentBeat)
      } else {
        synth.triggerAttackRelease('C5', '16n', time);
        setCurrentBeat(prevBeat => prevBeat + 1);
        console.log("current beat", currentBeat)
      }
    }, '4n');

    // Set initial loop properties
    Transport.setLoopPoints(0, '1m');
    Transport.loop = true;

    // Start loop if isPlaying is true
    if (isPlaying) {
      Transport.stop();
      setCurrentBeat(1);
      loop.start(0);
      Transport.start();
    } else {
      Transport.stop();
      setCurrentBeat(1);
    }

    // Clear loop when the component is unmounted
    return () => loop.dispose();
  }, [isPlaying]);

  useEffect(() => {
    // Set Transport BPM when bpm changes
    Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    // Set Transport time signature when beatsPerMeasure changes
    Transport.timeSignature = beatsPerMeasure;
  }, [beatsPerMeasure]);

  const handleSetBPM = (e) => {
    setBpm(+e.target.value);
  };

  const handleSetTimeSig = (e) => {
    setBeatsPerMeasure(+e.target.value);
  };

  const handleOnOff = (e) => {
    e.preventDefault();
    setIsPlaying(!isPlaying);
  };

  return (
    <MetronomeContext.Provider
      value={{
        handleOnOff,
        handleSetBPM,
        handleSetTimeSig,
        isPlaying,
        bpm,
        beatsPerMeasure,
        currentMeasure,
      }}
    >
      {children}
    </MetronomeContext.Provider>
  );
}

export { MetronomeContext, MetronomeProvider };
