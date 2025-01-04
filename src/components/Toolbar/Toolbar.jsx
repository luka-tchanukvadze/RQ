import sunLogo from '@/assets/sun.svg'
import moonLogo from '@/assets/moon.svg'
import glassLogo from '@/assets/glass.svg'
import { motion, AnimatePresence } from 'motion/react'
import Dropdown from '../Dropdown'

const Toolbar = ({
  filterMode,
  setFilterMode,
  filterQuery,
  setFilterQuery,
  isDarkMode,
  setIsDarkMode,
}) => {
  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className='font-medium text-center mb-3 text-2xl'>TODO LIST</h1>
      <div className='flex flex-wrap md:flex-nowrap gap-4'>
        <motion.div
          layout='size'
          className='relative flex-1 dark:text-light rounded-md bg-transparent outline outline-1 outline-primary px-3 min-w-fit md:min-w-1'
        >
          <input
            className='w-full h-full outline-none bg-transparent dark:text-light py-2 md:py-0'
            type='text'
            placeholder='Search note...'
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
          <img
            src={glassLogo}
            className='absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none'
            alt='Magnifying Glass logo'
          />
        </motion.div>
        <Dropdown
          activeOption={filterMode}
          handleChange={setFilterMode}
          options={['All', 'Complete', 'Incomplete']}
        />
        <button
          className='rounded-md bg-primary p-1.5 hover:brightness-90 transition relative grid place-items-center w-9'
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          <AnimatePresence mode='wait'>
            <div className='absolute'>
              {isDarkMode && (
                <motion.img
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  src={sunLogo}
                  className='logo1'
                  alt='Sun logo'
                />
              )}
              {!isDarkMode && (
                <motion.img
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  src={moonLogo}
                  className='logo1'
                  alt='Sun logo'
                />
              )}
            </div>
          </AnimatePresence>
        </button>
      </div>
    </motion.section>
  )
}

export default Toolbar
