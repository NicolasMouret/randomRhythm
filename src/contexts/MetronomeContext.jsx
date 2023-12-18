'use client';

import { getCurrentMeasure, 
  notesFilteredByTags, 
  getListOfNotesToChange,
  getNewMeasureWithChanges, 
  createMeasureToDisplay,
  isTimeForRandomChange } from "@/utils/utilsFunctions";
import { createContext, useEffect, useState, useRef } from "react";
import { Envelope, Loop, Synth, Transport } from 'tone';

const MetronomeContext = createContext();

function MetronomeProvider({ children }) {
  const loopfirstIterationRef = useRef(true);
  const isTimeForRandomChangeRef = useRef(false);
  const [tagsSelected, setTagsSelected] = useState([
    "quarter", 
    "quarterRest",
    "eight", 
    "eightRest", 
    "sixteen",
    "triplet" ]);
  const [notesSelection, setNotesSelection ]= useState(notesFilteredByTags(tagsSelected))
  const [numberOfBarsBetweenChanges, setNumberOfBarsBetweenChanges] = useState(2);
  const [numberOfNotesToChange, setNumberOfNotesToChange] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [currentMeasure, setCurrentMeasure] = useState(1);
  const [currentBeat, setCurrentBeat] = useState(1);
  const [bouncingElementIndex, setBouncingElementIndex] = useState(null);
  const [measureToDisplay, setMeasureToDisplay] = useState(createMeasureToDisplay(notesSelection, beatsPerMeasure))
  
  const randomNoteChange = () => {
    setMeasureToDisplay((prevMeasure) => {
      const notesToChangeID = getListOfNotesToChange(prevMeasure, numberOfNotesToChange);
      const newMeasure = getNewMeasureWithChanges(prevMeasure, notesSelection, notesToChangeID);
      console.log("notes to change", notesToChangeID);
      return newMeasure;
    });
  }

  const updateCurrentBeat = () => {
    setCurrentBeat(prevBeat => prevBeat + 1);
  }

  const applyBounceEffect = (index) => {
    setBouncingElementIndex(index);
    setTimeout(() => {
      setBouncingElementIndex(null);
    }, 200);
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
        applyBounceEffect(index - 1);
        //Only after the first iteration of the loop
        if (!loopfirstIterationRef.current) {
          updateCurrentBeat();
        }
      } else if (index === beatsPerMeasure ) {
        synth.triggerAttackRelease('C5', '16n', time); 
        applyBounceEffect(index - 1);
        updateCurrentBeat();
        if (isTimeForRandomChangeRef.current) {
          randomNoteChange();
        }
      } else {
        synth.triggerAttackRelease('C5', '16n', time);
        applyBounceEffect(index - 1);
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

  // Get tags changes 
  useEffect(() => {
    setNotesSelection(notesFilteredByTags(tagsSelected))
  }, [tagsSelected])

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
        bouncingElementIndex,
        numberOfNotesToChange,
        setNumberOfNotesToChange,
      }}
    >
      {children}
    </MetronomeContext.Provider>
  );
}

export { MetronomeContext, MetronomeProvider };
