import notesCollection from '@/notesCollection/notesCollection';
import { nanoid } from 'nanoid';
import SingleWholeBeat from '@/components/RhythmDisplay/SingleWholeBeat';

export function notesFilteredByTags(tagsSelected) {
  console.log("before notes", notesCollection)
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
export function newMeasureWithOneNoteChange(measureToDisplay, notesSelection) {
  const randomElement = getRandomElementFromMeasure(measureToDisplay)
  const randomElementPrevNote = randomElement.props.note
  const newRandomNote = getNewRandomNoteFromSelection(randomElementPrevNote, notesSelection)
  const newMeasureToDisplay = measureToDisplay.map(element => {
    if (element.props.id === randomElement.props.id) {
      return (
        <SingleWholeBeat key={nanoid()} note={newRandomNote} id={randomElement.props.id}/>
      )
    } else {
      return element
    }
  })
  return newMeasureToDisplay
}

