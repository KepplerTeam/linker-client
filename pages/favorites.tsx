import React from 'react';
import CartProduct from '../components/shoppingCart/CartProduct';
import TitleBar from '../components/common/TitleBar';
import { useUser } from '../hooks/useUser';

export default function FavoritesPage() {
  const [user] = useUser();

  return (
    <>
      <div>
        <TitleBar title="Favoritos" />
        <div className="mb-24">
          {user?.favorites?.products.map((e, idx) => (
            <CartProduct product={e} key={idx} />
          ))}
        </div>
        <div className="fixed bottom-0 w-full flex-col">
          <div className="flex flex-row px-8 items-center justify-between">
            <h6 className="text-gray-500 mr">
              Productos: {user?.favorites?.products.length}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}
