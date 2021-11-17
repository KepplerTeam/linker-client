import { useRouter } from 'next/router';
import React from 'react';
import NProgress from 'nprogress';
import { useMutation } from '@apollo/client';
import { useUser } from '../../hooks/useUser';
import useNotify from '../../hooks/useNotify';
import { SIGN_OUT } from '../../graphql/mutations';

export default function UserDropdown() {
  const notify = useNotify();
  const router = useRouter();
  const [user, setUser] = useUser();
  const [signOut] = useMutation(SIGN_OUT);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  /**
   * handleSignOut
   * @abstract Este metodo cierra la sesion, borra el token de las cookies y el user del contexto se elimina.
   * @param e
   */
  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      setDisabled(true);
      NProgress.start();
      const { data } = await signOut({});
      if (data?.signOut?.success) {
        notify('Se ha cerrado sesión con éxito', 'success');
        setUser(null);
        setUserMenuOpen(false);
        await router.push('/login');
      } else {
        notify(data?.changePassword?.err ?? 'Ha ocurrido un error.', 'error');
      }
    } catch (err) {
      notify(err.message, 'error', err);
    } finally {
      setDisabled(false);
      NProgress.done();
    }
  };
  return (
    <div className="">
      <button
        type="button"
        className={`w-full md:p-2 flex flex-row focus:outline-none focus:shadow-none justify-center ${
          userMenuOpen ? 'rounded-t-md bg-gray-100' : ''
        }`}
        onClick={(e) => {
          e.preventDefault();
          setUserMenuOpen(!userMenuOpen);
        }}
      >
        <p className="uppercase font-bold">{user?.firstName}</p>
      </button>
      {userMenuOpen ? (
        <div className="bg-gray-200 md:absolute md:mr-14 text-sm rounded-b-md border-t-2 border-gray-200">
          <button
            type="button"
            className="p-2 w-full font-semibold focus:outline-none focus:shadow-none hover:bg-gray-3200 hover:text-primary-blue-500"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/`);
              setUserMenuOpen(false);
            }}
          >
            MI PERFIL
          </button>
          <button
            type="button"
            className="p-2 w-full font-semibold focus:outline-none focus:shadow-none hover:bg-gray-200 hover:text-primary-blue-500"
            onClick={handleSignOut}
          >
            CERRAR SESIÓN
          </button>
        </div>
      ) : null}
    </div>
  );
}
