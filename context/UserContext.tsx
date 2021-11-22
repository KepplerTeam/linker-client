import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { CURRENT_USER } from '../graphql/queries';
import { GET_CURRENT_USER_MOBILE } from '../graphql/mutations';
import { User } from '../models';

export type TUserContext = {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = React.createContext<TUserContext>({});

interface UserContextProviderProps {
  children: React.ReactNode;
}

/**
 * @abstract settea el usuario que inicia sesion en el contexto de la aplicacion para poder utilizar la informacion del usuario sin necesidad de rehacer queries ni validaciones referentes al usuario
 */
export function UserContextProvider({ children }: UserContextProviderProps) {
  const router = useRouter();
  const { data, loading, error } = useQuery<{
    currentUser: User;
  }>(CURRENT_USER);

  const [getCurrentUserMobile] = useMutation<{ currentUserMobile: User }>(
    GET_CURRENT_USER_MOBILE
  );

  const [user, setUser] = React.useState<User>();
  React.useEffect(() => {
    const getUserMobile = async () => {
      const userMobile = await getCurrentUserMobile({
        variables: {
          data: {
            getCurrentUserInfo: {
              token: localStorage.getItem('token'),
            },
          },
        },
      });
      setUser(userMobile?.data?.currentUserMobile);
      return;
    };

    if (!loading && data) {
      if (data?.currentUser) {
        setUser(data?.currentUser);
      }
      if (localStorage.getItem('token')) {
        getUserMobile();
      }
    }
    if (!loading && !data) {
      if (router.pathname === '/reset-password/[token]') {
        return;
      }
      router.push('/');
    }
    if (!loading && !data?.currentUser) {
      router.push('/');
    }
  }, [data, loading, error]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? null : children}
    </UserContext.Provider>
  );
}
