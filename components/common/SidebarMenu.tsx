import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { SIGN_OUT } from '../../graphql/mutations';
import useNotify from '../../hooks/useNotify';
import { useUser } from '../../hooks/useUser';
import {
  CloseIcon,
  LoginIcon,
  LogOutIcon,
  ShoppingCartIcon,
  StarIcon,
  TagIcon,
  TruckIcon,
} from '../icons';
import Menu from '../icons/Menu';

interface SidebarMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SidebarMenu({
  open = false,
  setOpen,
}: SidebarMenuProps) {
  const router = useRouter();
  const [signOut] = useMutation(SIGN_OUT);
  const notify = useNotify();
  const [active, setActive] = React.useState(false);
  const [user, setUser] = useUser();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      const { data: dataSignOut } = await signOut({});
      if (dataSignOut?.signOut?.success) {
        notify('Se ha cerrado sesión con éxito', 'success');
        localStorage.removeItem('token');
        setUser(null);
<<<<<<< HEAD
=======
        localStorage.removeItem('token');

>>>>>>> e3ef776bae54495c6e52a9891b8b4d445a120515
        setActive(false);
        router.push('/');
      } else {
        localStorage.removeItem('token');
        router.push('/');
      }
    } catch (err) {
      notify(err.message, 'danger', err);
    }
  };

  return (
    <>
      {open ? (
        <div className="bg-gray-500 text-white pl-5 pt-2 z-50 absolute w-48 h-56 rounded-lg">
          <div>
            <button type="button" onClick={() => setOpen(false)}>
              <CloseIcon className="w-4 ml-1 mt-1 text-primary-100" />
            </button>
            <div className="flex flex-col py-2 px-1 text-lg">
              {user?.role === 1 ? (
                <div className="flex flex-col">
                  <button
                    type="button"
                    className="text-left hover:underline "
                    onClick={() => {
                      router.push('/favorites');
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-row space-x-1">
                      <StarIcon className="w-6" />
                      <span>Favoritos</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className="text-left mt-4 hover:underline "
                    onClick={() => {
                      router.push('/shopping-cart');
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-row space-x-1">
                      <ShoppingCartIcon className="w-6" />
                      <span>Mi Carrito</span>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col text-lg">
                  <button
                    type="button"
                    className="text-left hover:underline "
                    onClick={() => router.push('/profile')}
                  >
                    <div className="flex flex-row space-x-1">
                      <TruckIcon className="w-6" />
                      <span>Mis Empresas</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className="text-left mt-4 hover:underline "
                    onClick={() => {
                      router.push('/profile');
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-row space-x-1">
                      <TagIcon className="w-6" />
                      <span>Mis Productos</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className="text-left mt-4 hover:underline "
                    onClick={() => {
                      router.push('/shopping-cart');
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-row space-x-1">
                      <ShoppingCartIcon className="w-6" />
                      <span>Mi Carrito</span>
                    </div>
                  </button>
                </div>
              )}
              {user ? (
                <button
                  className="text-left mt-4 hover:underline "
                  type="button"
                  onClick={(e) => {
                    handleSignOut(e);
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-row space-x-1">
                    <LogOutIcon className="w-6" />
                    <span>Cerrar Sesion</span>
                  </div>
                </button>
              ) : (
                <button
                  className="text-left mt-4 hover:underline "
                  type="button"
                  onClick={() => {
                    router.push('/login');
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-row space-x-1">
                    <LoginIcon className="w-6" />
                    <span>Iniciar Sesion</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)}>
          <Menu className="w-6 text-white" />
        </button>
      )}
    </>
  );
}
