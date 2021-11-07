import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { CURRENT_USER } from '../graphql/queries';
import { User } from '../models';

export type TUserContext = {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = React.createContext<TUserContext>({});

interface UserContextProviderProps {
  children: React.ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const router = useRouter();
  const { data, loading, error } = useQuery<{
    currentUser: User;
  }>(CURRENT_USER);

  const [user, setUser] = React.useState<User>();
  React.useEffect(() => {
    if (!loading && data) {
      setUser(data?.currentUser ?? null);
    }
    if (!loading && !data) {
      if (router.pathname === '/reset-password/[token]') {
        return;
      }
      if (router.pathname === '/confirm-user/[_id]') {
        return;
      }
      router.push('/login');
    }
    if (!loading && !data?.currentUser) {
      router.push('/login');
    }
  }, [data, loading, error]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? null : children}
    </UserContext.Provider>
  );
}
