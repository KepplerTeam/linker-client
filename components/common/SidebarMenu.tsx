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
        setUser(null);
        router.push('/feed');
        setActive(false);
      } else {
        notify(
          dataSignOut?.changePassword?.err ?? 'Ha ocurrido un error.',
          'error'
        );
      }
    } catch (err) {
      notify(err.message, 'error', err);
    }
  };

  return (
    <>
      {open ? (
        <div className="bg-gray-100 z-50 absolute w-3/4 h-full">
          <div>
            <button type="button" onClick={() => setOpen(false)}>
              <CloseIcon className="w-4 ml-1 mt-1 text-primary-100" />
            </button>
            <div className="flex flex-col py-2 px-1 text-lg">
              {user?.role === 1 ? (
                <div className="flex flex-col">
                  <button
                    type="button"
                    className="text-left"
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
                    className="text-left mt-4"
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
                    className="text-left"
                    onClick={() => router.push('/profile')}
                  >
                    <div className="flex flex-row space-x-1">
                      <TruckIcon className="w-6" />
                      <span>Mis Empresas</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className="text-left mt-4"
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
                    className="text-left mt-4"
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
                  className="text-left mt-4"
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
                  className="text-left mt-4"
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
          <Menu className="w-6 text-primary-100" />
        </button>
      )}
    </>
  );
}
