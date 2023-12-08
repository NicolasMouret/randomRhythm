'use client';

import { createContext, useState } from "react";
import { notesFilteredByTags } from "@/utils/utilsFunctions";

const OptionsSelectedContext = createContext();

function OptionsSelectedProvider({ children }) {
  const [tagsSelected, setTagsSelected] = useState(["quarter", "quarterRest","eight", "eightRest" ]);
  const [notesSelection, setNotesSelection ]= useState(notesFilteredByTags(tagsSelected))

  return (
    <OptionsSelectedContext.Provider value={{ tagsSelected, setTagsSelected, notesSelection, setNotesSelection }}>
      {children}
    </OptionsSelectedContext.Provider>
  );
}

export { OptionsSelectedContext, OptionsSelectedProvider};