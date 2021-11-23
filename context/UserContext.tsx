import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { CURRENT_USER, GET_CURRENT_USER_MOBILE } from '../graphql/queries';
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
  // const { data, loading, error } = useQuery<{ currentUserMobile: User }>(GET_CURRENT_USER_MOBILE, {
  //   variables: {data: {"token": localStorage.getItem("token")}},
  //   fetchPolicy: 'network-only',
  // });

  const [user, setUser] = React.useState<User>();

  const { data, loading } = useQuery<{ currentUser: User }>(CURRENT_USER);

  React.useEffect(() => {
    if (!loading && data.currentUser) {
      setUser(data?.currentUser);
    }
  }, [data, loading]);

  // React.useEffect(() => {
  //   console.log(localStorage.getItem("token"))

  //   if (!loading && data && typeof window !== "undefined") {
  //     if (data?.currentUserMobile) {
  //       setUser(data?.currentUserMobile);
  //     }
  //   }
  //   if (!loading && !data) {
  //     if (router.pathname === '/reset-password/[token]') {
  //       return;
  //     }
  //     router.push('/');
  //   }
  //   // if (!loading && !data?.currentUser) {
  //   //   router.push('/');
  //   // }
  // }, [data, loading, error]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? null : children}
    </UserContext.Provider>
  );
}
