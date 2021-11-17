import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { SIGN_OUT } from '../../graphql/mutations';
import { CURRENT_USER } from '../../graphql/queries';
import useNotify from '../../hooks/useNotify';
import { useUser } from '../../hooks/useUser';
import { User } from '../../models';
import SidebarMenu from '../common/SidebarMenu';
import UserDropdown from '../common/UserDropdown';

interface NavProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Nav({ open = false, setOpen }: NavProps) {
  const [user, setUser] = useUser();
  const [signOut] = useMutation(SIGN_OUT);
  const router = useRouter();
  const notify = useNotify();
  const [active, setActive] = React.useState(false);
  const { data, loading } = useQuery<{ currentUser: User }>(CURRENT_USER, {
    fetchPolicy: 'network-only',
  });

  React.useEffect(() => {
    if (!loading && data) {
      setUser(data.currentUser);
    }
  }, [loading, data]);

  const handleClick = () => {
    setActive(!active);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="nav p-3">
      {/* <button
        type="button"
        className="flex items-center"
        onClick={() => handleOpen()}
      >
        <img className="h-7" src="./icons/menu-variant.svg" alt="Menu" />
      </button> */}
      <SidebarMenu open={open} setOpen={setOpen} />
      <a className="mx-auto" href="/feed">
        <img className="h-8" src="/logo.svg" alt="Linker" />
      </a>

      <button
        type="button"
        className="flex items-center px-1"
        onClick={() => router.push('/profile')}
      >
        <img className="h-7" src={user?.image} alt="perfil" />
      </button>
    </div>
  );
}
