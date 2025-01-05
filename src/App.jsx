import { useEffect, useState } from "react";
import add from "@/assets/add.svg";
import Toolbar from "@/components/Toolbar";
import NoteModal from "@/components/NoteModal";
import useLocalStorage from "@/hooks/useLocalStorage";
import { motion, AnimatePresence } from "motion/react";
import NotesWrapper from "./components/NotesWrapper";

function App() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [filterMode, setFilterMode] = useState("All");
  const [filterQuery, setFilterQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    "darkMode",
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    setNotes((prevNotes) => prevNotes.filter((note) => !note.deleteID));
  }, [setNotes]);

  const handleNoteModalClose = (noteText) => {
    setIsAddingNote(false);
    if (noteText) {
      setNotes((prevNotes) => [
        ...prevNotes,
        { id: Date.now(), text: noteText, complete: false },
      ]);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <main className="mx-auto max-w-4xl p-4 relative min-h-[90%]">
      <AnimatePresence>
        {isAddingNote && <NoteModal handleClose={handleNoteModalClose} />}
      </AnimatePresence>
      <div></div>
      <Toolbar
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
        filterMode={filterMode}
        setFilterMode={setFilterMode}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <section className="md:px-[75px]">
        <NotesWrapper
          notes={notes}
          setNotes={setNotes}
          filterQuery={filterQuery}
          filterMode={filterMode}
        />
      </section>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-4 right-4 text-4xl rounded-full bg-primary aspect-square w-10 text-light grid place-items-center p-3 transition hover:brightness-90 group"
        onClick={() => setIsAddingNote(true)}
      >
        <img
          src={add}
          alt="Add"
          className="group-hover:rotate-90 transition duration-300"
        />
      </motion.button>
    </main>
  );
}

export default App;
