import { motion } from 'framer-motion';
import React from 'react';

interface CategorySelectorProps {
  category?: number;
  setCategory?: React.Dispatch<React.SetStateAction<number>>;
}

export default function CategorySelector({
  category = null,
  setCategory,
}: CategorySelectorProps) {
  return (
    <div className="flex flex-row justify-between overflow-x-scroll scrollbar-hide space-x-5 my-4 h-8">
      <motion.button
        whileHover={{
          scale: 1.005,
          boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
        }}
        value=""
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setCategory(0);
        }}
      >
        <span
          className={`bg-gray-100 hover:bg-primary-100 rounded-full w-auto px-3 py-1 h-auto ${
            category === 0 ? 'bg-primary-100 text-white' : ''
          }`}
        >
          Construccion
        </span>
      </motion.button>
      <motion.button
        whileHover={{
          scale: 1.005,
          boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
        }}
        value=""
        type="button"
        onClick={(e) => setCategory(1)}
      >
        <span
          className={`bg-gray-100 hover:bg-primary-100 rounded-full w-auto px-3 py-1 h-auto ${
            category === 1 ? 'bg-primary-100 text-white' : ''
          }`}
        >
          Alimentos
        </span>
      </motion.button>
      <motion.button
        whileHover={{
          scale: 1.005,
          boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
        }}
        value=""
        type="button"
        onClick={(e) => setCategory(2)}
      >
        <span
          className={`bg-gray-100 hover:bg-primary-100 rounded-full w-auto px-3 py-1 h-auto ${
            category === 2 ? 'bg-primary-100 text-white' : ''
          }`}
        >
          Campo
        </span>
      </motion.button>
      <motion.button
        whileHover={{
          scale: 1.005,
          boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
        }}
        value=""
        type="button"
        onClick={(e) => setCategory(3)}
      >
        <span
          className={`bg-gray-100 hover:bg-primary-100 rounded-full w-auto px-3 py-1 h-auto ${
            category === 3 ? 'bg-primary-100 text-white' : ''
          }`}
        >
          Plásticos
        </span>
      </motion.button>

      <motion.button
        whileHover={{
          scale: 1.005,
          boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
        }}
        value=""
        type="button"
        onClick={(e) => setCategory(4)}
      >
        <span
          className={`bg-gray-100 hover:bg-primary-100 rounded-full w-auto px-3 py-1 h-auto ${
            category === 4 ? 'bg-primary-100 text-white' : ''
          }`}
        >
          Cartón
        </span>
      </motion.button>
      <motion.button
        whileHover={{
          scale: 1.005,
          boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
        }}
        value=""
        type="button"
        onClick={(e) => setCategory(5)}
      >
        <span
          className={`bg-gray-100 hover:bg-primary-100 rounded-full w-auto px-3 py-1 h-auto ${
            category === 5 ? 'bg-primary-100 text-white' : ''
          }`}
        >
          Tecnología
        </span>
      </motion.button>
    </div>
  );
}
