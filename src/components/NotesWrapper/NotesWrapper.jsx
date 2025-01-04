import { motion, AnimatePresence } from "motion/react";
import detective from "@/assets/detective.svg";
import { useEffect, useMemo, useRef } from "react";
import Note from "@/components/Note";
import { DELETE_DELAY } from "@/constants";

const NotesWrapper = ({ notes, setNotes, filterMode, filterQuery }) => {
  const shouldAnimate = useRef(true);

  useEffect(() => {
    shouldAnimate.current = false;
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (filterMode === "Complete" && !note.complete) return false;
      if (filterMode === "Incomplete" && note.complete) return false;
      if (filterQuery && !note.text.includes(filterQuery)) return false;

      return true;
    });
  }, [notes, filterMode, filterQuery]);

  return (
    <main>
      {filteredNotes.length > 0 ? (
        <AnimatePresence>
          {filteredNotes.map((note, i) => (
            <Note
              index={shouldAnimate.current ? i : null}
              key={note.id}
              noteData={note}
              undoDelete={() => {
                setNotes((prevNotes) =>
                  prevNotes.map((prevNote) =>
                    prevNote.id === note.id
                      ? { ...prevNote, deleteID: null }
                      : prevNote
                  )
                );
              }}
              deleteNote={() => {
                const deleteID = Date.now();
                setNotes((prevNotes) =>
                  prevNotes.map((prevNote) =>
                    prevNote.id === note.id
                      ? { ...prevNote, deleteID }
                      : prevNote
                  )
                );

                setTimeout(() => {
                  setNotes((prevNotes) =>
                    prevNotes.filter(
                      (prevNote) => prevNote.deleteID !== deleteID
                    )
                  );
                }, DELETE_DELAY);
              }}
              toggleComplete={() => {
                setNotes((prevNotes) =>
                  prevNotes.map((prevNote) =>
                    prevNote.id === note.id
                      ? { ...prevNote, complete: !prevNote.complete }
                      : prevNote
                  )
                );
              }}
              updateNote={(text) => {
                setNotes((prevNotes) =>
                  prevNotes.map((prevNote) =>
                    prevNote.id === note.id ? { ...prevNote, text } : prevNote
                  )
                );
              }}
            />
          ))}
        </AnimatePresence>
      ) : (
        <motion.div initial={{ y: 30 }} animate={{ y: 0 }} className="mt-10">
          <img src={detective} className="mx-auto" alt="Detective" />
          <h1 className="text-center mt-3">Empty...</h1>
        </motion.div>
      )}
    </main>
  );
};

export default NotesWrapper;
