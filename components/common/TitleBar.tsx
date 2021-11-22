import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { BackIcon, CheckIcon, EditIcon, TrashIcon } from '../icons';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';

interface TitleBarProps {
  hasEdit?: boolean;
  hasCheckMark?: boolean;
  hasShoppingCart?: boolean;
  hasTrashIcon?: boolean;
  title?: string;
  _id?: string;
  cartSize?: number;
}

export default function TitleBar({
  hasEdit = false,
  hasCheckMark = false,
  hasShoppingCart = false,
  hasTrashIcon = false,
  title = '',
  _id = '',
  cartSize = 0,
}: TitleBarProps) {
  const router = useRouter();

  return (
    <div className="w-full h-auto flex flex-row justify-evenly mt-4 px-2 border-b-2 pb-2">
      <div className="w-1/3">
        <motion.button
          type="button"
          onClick={(e) => {
            // e.preventDefault();
            router.push('/feed');
          }}
        >
          <BackIcon className="w-6 h-6" />
        </motion.button>
      </div>
      <div className="w-1/3">
        <h2 className="text-center text-lg font-bold">{title}</h2>
      </div>
      <div className="w-1/3">
        <motion.button
          type="button"
          className=""
          onClick={(e) => {
            // e.preventDefault();
            router.push(`/stock/update/${_id}`);
          }}
        >
          <div>{hasEdit ? <EditIcon className="w-6 h-6 ml-auto" /> : null}</div>
        </motion.button>
        <div>
          {hasCheckMark ? <CheckIcon className="w-6 h-6 ml-auto" /> : null}
        </div>
        <div>
          <motion.button
            type="button"
            className=""
            onClick={(e) => {
              // e.preventDefault();
              router.push(`/shopping-cart`);
            }}
          >
            <div>
              {hasShoppingCart ? (
                <div className="flex">
                  <ShoppingCartIcon className="w-6 h-6 ml-auto" />
                  <span className="text-xs mt-3 ml-1">{cartSize}</span>
                </div>
              ) : null}
            </div>
          </motion.button>
        </div>
        <div>
          {hasTrashIcon ? <TrashIcon className="w-6 h-6 ml-auto" /> : null}
        </div>
      </div>
    </div>
  );
}
