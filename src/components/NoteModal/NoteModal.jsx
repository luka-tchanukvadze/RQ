import { useState } from 'react'
import { motion } from 'motion/react'
import ReactDOM from 'react-dom'

const NoteModal = ({ handleClose, title, defaultNote }) => {
  const [note, setNote] = useState(defaultNote ?? '')

  return ReactDOM.createPortal(
    <motion.main
      initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      animate={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      transition={{ duration: 0.2 }}
      className='fixed top-0 left-0 w-full h-full grid place-items-center'
      onClick={() => handleClose()}
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: -100, opacity: 0 }}
        className='bg-light dark:bg-dark border border-light rounded-lg px-3 md:px-5 py-3'
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className='text-center mb-3'>{title ?? 'NEW NOTE'}</h1>
        <input
          type='text'
          className='w-full rounded-sm outline outline-1 outline-primary dark:outline-light bg-transparent px-2 py-0.5 sm:min-w-72 text-sm'
          placeholder='Input your note...'
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className='mt-20 flex justify-between'>
          <button
            className='rounded-md outline outline-1 outline-primary px-3 py-0.5 text-primary transition hover:brightness-90'
            onClick={() => handleClose()}
          >
            CANCEL
          </button>
          <button
            className='rounded-md px-3 py-0.5 text-light bg-primary transition hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={!note}
            onClick={() => handleClose(note)}
          >
            APPLY
          </button>
        </div>
      </motion.div>
    </motion.main>,
    document.body
  )
}

export default NoteModal
