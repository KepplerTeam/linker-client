import React from 'react';
import CartTitleBar from '../components/shoppingCart/CartTitleBar';
import CartProduct from '../components/shoppingCart/CartProduct';
import TitleBar from '../components/common/TitleBar';

export default function ShoppingCart() {
  return (
    <>
      <TitleBar hasTrashIcon title="Carrito" />
      <CartProduct />
      <CartProduct />
      <div className="fixed bottom-0 w-full flex-col justify-center">
        <div className="flex flex-row px-8 items-center justify-between">
          <h6 className="text-gray-500 mr">Total items: 2</h6>
          <h4 className="text-lg font-bold">USD 295</h4>
        </div>
        <button className="flex checkout" type="button">
          Proceed to checkout
        </button>
      </div>
    </>
  );
}
