import React from 'react';
import { Product } from '../../models';
import { TrashIcon } from '../icons';

interface CartProductProps {
  product?: Product;
  cart: any;
  setCart;
  addToCart;
}

export default function CartProduct({
  product,
  cart,
  setCart,
  addToCart,
}: CartProductProps) {
  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((producto) => producto !== productToRemove));
  };

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="card flex flex-row px-8 items-center justify-center w-full">
      <img
        className="h-32 w-auto p-4 bg-gray-100 rounded-3xl"
        src={product?.images[0]}
        alt={product?.name}
      />
      <div className="py-5 pl-5 flex flex-col items-start h-full w-full">
        <h4 className="text-l font-light mb-auto">{product?.name}</h4>
        <h5 className="text-sm font-bold mb-3">USD{product?.price}</h5>
        <div className="flex flex-row items-center justify-between w-full">
          {/* <div className="flex mr-auto">
            <button className="cart w-7 mr-2" type="button">
              {' '}
              -{' '}
            </button>
            <p>1</p>
            <button
              className="cart w-7 ml-2"
              type="button"
              onClick={() => addToCart(product)}
            >
              {' '}
              +{' '}
            </button>
          </div> */}
          <button type="button" className="ml-auto">
            <TrashIcon
              className="w-5 h-5 opacity-50"
              onClick={() => removeFromCart(product)}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
