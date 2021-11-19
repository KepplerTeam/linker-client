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
      <button
        className=""
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setCategory(0);
        }}
      >
        <span
          className={`bg-gray-200 hover:bg-primary-100 hover:text-white  rounded-xl px-4 py-2 w-auto h-auto ${
            category === 0 ? 'bg-primary-100 text-white' : ''
          }`}
        >
          Construcción
        </span>
      </button>
      <button
        className=""
        type="button"
        onClick={(e) => setCategory(1)}
      >
        <span
          className={`bg-gray-200 hover:bg-primary-100 hover:text-white rounded-xl px-4 py-2 w-auto h-auto ${
            category === 1 ? 'bg-primary-100 text-white' : ''
          }`}
        >
          Alimentos
        </span>
      </button>
      <button
        className=""
        type="button"
        onClick={(e) => setCategory(2)}
      >
        <span
          className={`bg-gray-200 hover:bg-primary-100 hover:text-white rounded-xl px-4 py-2 w-auto h-auto ${
            category === 2 ? 'bg-primary-100 text-white' : ''
          }`}
        >
          Campo
        </span>
      </button>
      <button
        className=""
        type="button"
        onClick={(e) => setCategory(3)}
      >
        <span
          className={`bg-gray-200 hover:bg-primary-100 hover:text-white rounded-xl px-4 py-2 w-auto h-auto ${
            category === 3 ? 'bg-primary-100 text-white' : ''
          }`}
        >
          Plásticos
        </span>
      </button>

      <button className="" type="button" onClick={(e) => setCategory(4)}>
        <span
          className={`bg-gray-200 shadow-inner hover:bg-primary-100 hover:text-white rounded-xl px-4 py-2 w-auto h-auto ${
            category === 4 ? 'bg-primary-100 text-white' : ''
          }`}
        >
          Cartón
        </span>
      </button>
      <button
        className=""
        type="button"
        onClick={(e) => setCategory(5)}
      >
        <span
          className={`bg-gray-200 hover:bg-primary-100 hover:text-white rounded-xl px-4 py-2 w-auto h-auto ${
            category === 5 ? 'bg-primary-100 text-white' : ''
          }`}
        >
          Tecnología
        </span>
      </button>
    </div>
  );
}
