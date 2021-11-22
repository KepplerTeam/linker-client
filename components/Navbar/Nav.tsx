import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { GET_CURRENT_USER_MOBILE } from '../../graphql/mutations';
import { CURRENT_USER } from '../../graphql/queries';
import { User } from '../../models';
import SidebarMenu from '../common/SidebarMenu';

interface NavProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Nav({ open = false, setOpen }: NavProps) {
  // const [user, setUser] = useUser();
  const router = useRouter();
  const [active, setActive] = React.useState(false);
  const { data, loading } = useQuery<{ currentUser: User }>(CURRENT_USER, {
    fetchPolicy: 'network-only',
  });

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
    };
    getUserMobile();

    if (!loading && data) {
      if (data?.currentUser) {
        setUser(data?.currentUser);
      }
    }
  }, [loading, data]);

  const handleClick = () => {
    setActive(!active);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="nav p-3 bg-gray-600 shadow-lg sticky">
      {/* <button
        type="button"
        className="flex items-center"
        onClick={() => handleOpen()}
      >
        <img className="h-7" src="./icons/menu-variant.svg" alt="Menu" />
      </button> */}
      <SidebarMenu open={open} setOpen={setOpen} />
      <button
        type="button"
        className="mx-auto"
        onClick={(e) => {
          e.preventDefault();
          router.push('/feed');
        }}
      >
        <img className="h-8" src="/logo-white.svg" alt="Linker" />
      </button>

      <button
        type="button"
        className="flex items-center px-1"
        onClick={(e) => {
          e.preventDefault();
          router.push('/profile');
        }}
      >
        <img className="h-7" src={user?.image} alt="perfil" />
      </button>
    </div>
  );
}
