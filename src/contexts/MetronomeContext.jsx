'use client';

import { getCurrentMeasure, 
  notesFilteredByTags, 
  newMeasureWithOneNoteChange, 
  createMeasureToDisplay,
  isTimeForRandomChange } from "@/utils/utilsFunctions";
import { createContext, useEffect, useState, useRef } from "react";
import { Envelope, Loop, Synth, Transport } from 'tone';

const MetronomeContext = createContext();

function MetronomeProvider({ children }) {
  const loopfirstIterationRef = useRef(true);
  const isTimeForRandomChangeRef = useRef(false);
  const [tagsSelected, setTagsSelected] = useState(["quarter", "quarterRest","eight", "eightRest" ]);
  const [notesSelection, setNotesSelection ]= useState(notesFilteredByTags(tagsSelected))
  const [numberOfBarsBetweenChanges, setNumberOfBarsBetweenChanges] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [currentMeasure, setCurrentMeasure] = useState(1);
  const [currentBeat, setCurrentBeat] = useState(1);
  const [measureToDisplay, setMeasureToDisplay] = useState(createMeasureToDisplay(notesSelection, beatsPerMeasure))
  
  const randomNoteChange = () => {
    newMeasureWithOneNoteChange(measureToDisplay, notesSelection, setMeasureToDisplay);
  }

  const updateCurrentBeat = () => {
    setCurrentBeat(prevBeat => prevBeat + 1);
  }

  useEffect(() => {
    setMeasureToDisplay(createMeasureToDisplay(notesSelection, beatsPerMeasure))
  }, [notesSelection, beatsPerMeasure])

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

    const loop = new Loop((time) => {
      const index = Number(Transport.position.split(':')[1]) + 1;
      if (index === 1) {
        synth.triggerAttackRelease('C6', '16n', time);
        //Only after the first iteration of the loop
        if (!loopfirstIterationRef.current) {
          updateCurrentBeat();
        }
      } else if (index === beatsPerMeasure ) {
        synth.triggerAttackRelease('C5', '16n', time); 
        updateCurrentBeat();
        if (isTimeForRandomChangeRef.current) {
          randomNoteChange();
        }
      } else {
        synth.triggerAttackRelease('C5', '16n', time);
        updateCurrentBeat();
      }
      loopfirstIterationRef.current = false;      
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
      loopfirstIterationRef.current = true;
      Transport.stop();
      setCurrentBeat(1);
    }

    // Clear loop when the component is unmounted
    return () => loop.dispose();
  }, [isPlaying, beatsPerMeasure]);

  useEffect(() => {
    // Set Transport BPM when bpm changes
    Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    // Set Transport time signature when beatsPerMeasure changes
    Transport.timeSignature = beatsPerMeasure;
  }, [beatsPerMeasure]);

  useEffect(() => {
    // Set current measure when currentBeat changes
    setCurrentMeasure(getCurrentMeasure(currentBeat, beatsPerMeasure));
    isTimeForRandomChangeRef.current = isTimeForRandomChange((currentBeat + 1), beatsPerMeasure, numberOfBarsBetweenChanges);
  }, [currentBeat]);

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
        currentBeat,
        notesSelection,
        setNotesSelection,
        tagsSelected,
        setTagsSelected,
        measureToDisplay,
        setMeasureToDisplay,
        numberOfBarsBetweenChanges,
        setNumberOfBarsBetweenChanges,
        randomNoteChange,
      }}
    >
      {children}
    </MetronomeContext.Provider>
  );
}

export { MetronomeContext, MetronomeProvider };
