import React from 'react';
import FavoriteProduct from '../components/favorites/FavoriteProduct';
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
            <FavoriteProduct product={e} key={idx} />
          ))}
        </div>
        <div className="fixed bottom-0 w-full flex-col">
          <div className="flex flex-row px-8 items-center justify-between">
            <h6 className="text-gray-500 font-semibold mr mb-4">
              Productos: {user?.favorites?.products.length}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}
