import React from 'react';
import CartProduct from '../components/shoppingCart/CartProduct';
import TitleBar from '../components/common/TitleBar';
import { useUser } from '../hooks/useUser';

export default function ShoppingCartPage() {
  const [user] = useUser();

  const totalPrice = user?.shoppingCart?.products?.reduce(
    (sum, { price }) => sum + price,
    0
  );

  return (
    <>
      <div>
        <TitleBar title="Carrito" />
        <div className="mb-24">
          {user?.shoppingCart?.products.map((e, idx) => (
            <CartProduct product={e} key={idx} />
          ))}
        </div>
        <div className="fixed bottom-0 w-full flex-col">
          <div className="flex flex-row px-8 items-center justify-between">
            <h6 className="text-gray-500 mr">
              Productos: {user?.shoppingCart?.products.length}
            </h6>
            <h4 className="text-lg font-bold">
              Precio: ${Math.round(totalPrice * 100) / 100}
            </h4>
          </div>
          <div className="px-16 my-6">
            <button
              className="bg-primary-100 py-3 px-4 rounded-full text-white mx-auto w-full"
              type="button"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
