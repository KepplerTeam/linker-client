import React from 'react';
import { TrashIcon, BackIcon } from '../icons';

export default function CartTitleBar() {
  return (
    <div className="nav">
      <a className="flex items-center" href="#">
        <BackIcon className="w-7 h-7" />
      </a>
      <a className="mx-auto" href="#">
        <h2 className="text-lg font-bold h-8">Shopping Cart</h2>
      </a>
      <a className="flex items-center" href="#">
        <TrashIcon className="w-7 h-7" />
      </a>
    </div>
  );
}
