import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import arrow from "@/assets/arrow.svg";

const Dropdown = ({ options, activeOption, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        layout
        className="rounded-md bg-primary px-4 py-1.5 hover:brightness-90 transition text-light gap-4 text-start flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{activeOption}</div>
        <motion.div animate={{ rotate: isOpen ? "180deg" : 0 }}>
          <img src={arrow} alt="Arrow" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute rounded-md overflow-clip top-full flex flex-col border border-primary z-50"
          >
            {options.map((option) => (
              <motion.button
                key={option}
                onClick={(e) => {
                  handleChange(option);
                  setIsOpen(false);
                  e.stopPropagation();
                }}
                className="block w-full px-2 py-1.5 text-primary bg-light outline outline-primary outline-1 hover:bg-[#dbd9f9] transition text-start"
              >
                {option}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
