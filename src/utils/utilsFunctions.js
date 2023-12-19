import { nanoid } from 'nanoid';
import SingleWholeBeat from '@/components/RhythmDisplay/SingleWholeBeat';

export function getOneRandomNoteFromSelection(notesSelection) {
  const randomNote = notesSelection[Math.floor(Math.random() * notesSelection.length)]
  return randomNote
}

export function getNewRandomNoteFromSelection(prevNote, notesSelection) {
  let newRandomNote = getOneRandomNoteFromSelection(notesSelection)
  while (prevNote === newRandomNote) {
    newRandomNote = getOneRandomNoteFromSelection(notesSelection)
  }
  return newRandomNote
}

export function createMeasureToDisplay(notesSelection, beatsPerMeasure) {
  // SingleWholeBeat component x beatsPerMeasure with a random note from notesCollection
  const randomNotesList = []
  for (let i = 0; i < beatsPerMeasure; i++) {
    randomNotesList.push(getOneRandomNoteFromSelection(notesSelection))
  }
  const measureToDisplay = randomNotesList.map((note, index) => {
    return (
      <SingleWholeBeat key={nanoid()} note={note} id={index}/>
    )
  })
  return measureToDisplay
}

export function getRandomElementFromMeasure(measureToDisplay) {
  const randomElement = measureToDisplay[Math.floor(Math.random() * measureToDisplay.length)]
  return randomElement
}

export function getListOfNotesToChange(measureToDisplay, numberOfNotesToChange) {
  const notesToChangeID = new Set();
  while (notesToChangeID.size < numberOfNotesToChange) {
    let randomElement = getRandomElementFromMeasure(measureToDisplay);
    notesToChangeID.add(randomElement.props.id);
  }
  return Array.from(notesToChangeID);
}

export function getNewMeasureWithChanges(measureToDisplay, notesSelection, notesToChangeID) {
  console.log("measure to display function", measureToDisplay)
  const newMeasure = measureToDisplay.map(element => {
    if (notesToChangeID.includes(element.props.id)) {
      console.log("change note", element.props.id)
      const prevNote = element.props.note;
      const newNote = getNewRandomNoteFromSelection(prevNote, notesSelection);
      return <SingleWholeBeat key={nanoid()} note={newNote} id={element.props.id} />;
    } else {
      return element;
    }
  });
  return newMeasure
}

// get current measure from currentBeat and beatsPerMeasure
export function getCurrentMeasure(currentBeat, beatsPerMeasure) {
  return Math.ceil(currentBeat / beatsPerMeasure);
}

export function randomNoteChange(measureToDisplay, notesSelection, setMeasureToDisplay) {
  setMeasureToDisplay(newMeasureWithOneNoteChange(measureToDisplay, notesSelection))
}

export function isTimeForRandomChange(currentBeat, beatsPerMeasure, numberOfBarsBetweenChanges) {
  return currentBeat % (beatsPerMeasure * numberOfBarsBetweenChanges) === 0
}
