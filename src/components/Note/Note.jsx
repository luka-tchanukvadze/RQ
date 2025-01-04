import { useState } from "react";
import NoteModal from "../NoteModal";
import tick from "@/assets/tick.svg";
import { AnimatePresence, motion } from "motion/react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Trash from "./Trash";
import Edit from "./Edit";

const Note = ({
  noteData,
  updateNote,
  toggleComplete,
  undoDelete,
  deleteNote,
  index,
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false);

  const handleNoteModalClose = (noteText) => {
    setIsEditingNote(false);
    if (noteText) {
      updateNote(noteText);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ height: 0, padding: 0, opacity: 0 }}
      transition={{ delay: (index !== null ? 0.3 : 0) + (index ?? 0) * 0.1 }}
      className="flex py-4 border-b border-primary note items-center gap-2"
    >
      <AnimatePresence>
        {isEditingNote && (
          <NoteModal
            title="Edit Note"
            handleClose={handleNoteModalClose}
            defaultNote={noteData.text}
          />
        )}
      </AnimatePresence>
      {noteData.deleteID ? (
        <button
          className="bg-primary flex items-center undo p-2 gap-2 rounded-md"
          onClick={undoDelete}
        >
          <div>
            <CountdownCircleTimer
              isPlaying
              size={20}
              strokeWidth={2}
              duration={3}
              colors="#FFF"
              trailColor="#0000"
            >
              {({ remainingTime }) => (
                <div className="text-[0.55rem]">{remainingTime}</div>
              )}
            </CountdownCircleTimer>
          </div>
          <div className="mr-2">UNDO</div>
        </button>
      ) : (
        <>
          <input
            type="checkbox"
            className="hidden"
            id={noteData.id}
            checked={noteData.complete}
            onChange={toggleComplete}
          />
          <div
            className={`w-5 h-5 aspect-square rounded-sm outline outline-1 outline-primary cursor-pointer grid place-items-center select-none transition ${
              noteData.complete ? "bg-primary" : ""
            }`}
            onClick={toggleComplete}
          >
            <AnimatePresence>
              {noteData.complete && (
                <motion.div
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 10 }}
                >
                  <img src={tick} alt="Tick" className="-mt-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <label
            htmlFor={noteData.id}
            className={`flex-1 ${
              noteData.complete ? "line-through opacity-60" : ""
            }`}
          >
            {noteData.text}
          </label>
          <button
            onClick={() => setIsEditingNote(true)}
            className="mr-1 text-ligt hover:text-primary transition"
          >
            <Edit />
          </button>
          <button
            onClick={deleteNote}
            className="text-ligh hover:text-red-500 transition"
          >
            <Trash />
          </button>
        </>
      )}
    </motion.div>
  );
};

export default Note;
