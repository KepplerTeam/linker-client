import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import React from 'react';

export default function CategorySelector() {
  const [active, setActive] = React.useState(false);

  //   function changeSelected() {}

  //   const { data, loading, error } = useQuery<{
  //     categories: Category[];
  //   }>(GET_CATEGORIES, {
  //     fetchPolicy: 'network-only',
  //   });

  return (
    <div className="flex flex-row justify-between overflow-x-scroll scrollbar-hide space-x-5 mt-4">
      <motion.button
        whileHover={{
          scale: 1.005,
          boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
        }}
        value=""
        type="button"
        // onClick={}
      >
        <span className="bg-gray-200 hover:bg-primary-100 rounded-full w-auto px-3 h-auto">
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
        // onClick={}
      >
        <span className="bg-gray-200 hover:bg-primary-100 rounded-full w-auto px-3 h-auto">
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
        // onClick={}
      >
        <span className="bg-gray-200 hover:bg-primary-100 rounded-full w-auto px-3 h-auto">
          Tecnologia
        </span>
      </motion.button>
      <motion.button
        whileHover={{
          scale: 1.005,
          boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
        }}
        value=""
        type="button"
        // onClick={}
      >
        <span className="bg-gray-200 hover:bg-primary-100 rounded-full w-auto px-3 h-auto">
          Educacion
        </span>
      </motion.button>

      <motion.button
        whileHover={{
          scale: 1.005,
          boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
        }}
        value=""
        type="button"
        // onClick={}
      >
        <span className="bg-gray-200 hover:bg-primary-100 rounded-full w-auto px-3 h-auto">
          Plasticos
        </span>
      </motion.button>

      {/* {data.categories.map((category) => (
        <span className="bg-gray-50 hover:bg-primary-100">{category.name}</span>
      ))} */}
    </div>
  );
}
