import React from 'react';
import { BackIcon, CheckIcon, EditIcon, TrashIcon } from '../icons';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';

interface TitleBarProps {
  hasEdit?: boolean;
  hasCheckMark?: boolean;
  hasShoppingCart?: boolean;
  hasTrashIcon?: boolean;
  title?: string;
}

export default function TitleBar({
  hasEdit = false,
  hasCheckMark = false,
  hasShoppingCart = false,
  hasTrashIcon = false,
  title = '',
}: TitleBarProps) {
  return (
    <div className="w-full h-auto flex flex-row justify-evenly mt-4 px-2 border-b-2 pb-2">
      <div className="w-1/3">
        <BackIcon className="w-6 h-6" />
      </div>
      <div className="w-1/3">
        <h2 className="text-center text-lg font-bold">{title}</h2>
      </div>
      <div className="w-1/3">
        <div>{hasEdit ? <EditIcon className="w-6 h-6 ml-auto" /> : null}</div>
        <div>
          {hasCheckMark ? <CheckIcon className="w-6 h-6 ml-auto" /> : null}
        </div>
        <div>
          {hasShoppingCart ? (
            <ShoppingCartIcon className="w-6 h-6 ml-auto" />
          ) : null}
        </div>
        <div>
          {hasTrashIcon ? <TrashIcon className="w-6 h-6 ml-auto" /> : null}
        </div>
      </div>
    </div>
  );
}
