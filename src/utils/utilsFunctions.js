import notesCollection from '@/notesCollection/notesCollection';
import { nanoid } from 'nanoid';
import SingleWholeBeat from '@/components/RhythmDisplay/SingleWholeBeat';

export function notesFilteredByTags(tagsSelected) {
  const notesFilteredByTags = notesCollection.filter(note => {
    return note.tag.every(tag => tagsSelected.includes(tag));
  });
  return notesFilteredByTags
}

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

// create a new measurToDisplay with one element changed
export function newMeasureWithOneNoteChange(measureToDisplay, notesSelection, setMeasureToDisplay) {
  const randomElement = getRandomElementFromMeasure(measureToDisplay);
  const randomElementPrevNote = randomElement.props.note;
  const newRandomNote = getNewRandomNoteFromSelection(randomElementPrevNote, notesSelection);

  // Use the functional form of setMeasureToDisplay to ensure the latest state
  setMeasureToDisplay(prevMeasure => {
    return prevMeasure.map(element => {
      if (element.props.id === randomElement.props.id) {
        return <SingleWholeBeat key={nanoid()} note={newRandomNote} id={randomElement.props.id} />;
      } else {
        return element;
      }
    });
  });
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
