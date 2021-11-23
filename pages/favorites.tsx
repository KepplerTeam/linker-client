import React from 'react';
import FavoriteProduct from '../components/favorites/FavoriteProduct';
import TitleBar from '../components/common/TitleBar';
import { useUser } from '../hooks/useUser';
import Nav from '../components/Navbar/Nav';

export default function FavoritesPage() {
  const [user] = useUser();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="w-screen h-screen p-0 bg-gray-200">
        <div>
          <Nav open={open} setOpen={setOpen} />
          <div className="bg-gray-100 flex justify-center">
            <h2 className=" font-semibold text-2xl p-4">Favoritos</h2>
          </div>
          <div className="border-t-2 shadow-inner p-6">
            {user?.favorites?.products.map((e, idx) => (
              <FavoriteProduct product={e} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
