import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Enterprise, User } from '../../models';
import { EditIcon } from '../icons';
import CashIcon from '../icons/CashIcon';
import AdminData from './AdminData';
import EntrepreneurData from './EntrepreneurData';
import ProviderData from './ProviderData';

interface ProfilePageComponentProps {
  user: User;
  enterprise?: Enterprise[];
}

export default function ProfilePageComponent({
  user,
  enterprise = [],
}: ProfilePageComponentProps) {
  const router = useRouter();
  const [providerBalance, setProviderBalance] = React.useState(0);

  React.useEffect(() => {
    if (user?.role === 2) {
      const bal = enterprise.map((p) => p.balance);
      const add = (accumulator, a) => accumulator + a;
      const sum = bal.reduce(add, 0);
      setProviderBalance(sum);
    }
  }, [providerBalance]);

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100">
        <h2 className="text-lg font-black pt-6 pb-4 px-6 border-t-2">
          Mi Perfil
        </h2>
        <div className="flex flex-row px-4 pb-4 space-x-3 mb-4">
          <div>
            <img
              src={user?.image}
              alt={user?.dni}
              className="w-20 rounded-full object-contain h-auto"
            />
          </div>
          <div>
            <div className="flex flex-row">
              <h2 className="mt-3">
                {user?.firstName} {user?.lastName}
              </h2>
              <button type="button" className="ml-auto mt-3 h-auto">
                <EditIcon
                  className="w-4"
                  onClick={() => {
                    router.push('/profile/edit');
                  }}
                />
              </button>
            </div>
            <h2 className="font-thin text-sm">{user?.email}</h2>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mx-6 mb-12 bottom-1 p-5 rounded-xl bg-gray-50 shadow-lg hover:shadow-2xl">
          <div className="px-2">
            {user?.role === 1 ? (
              <h2 className="font-black text-xl text-black">
                USD {Math.round(user?.balance * 100) / 100}
              </h2>
            ) : null}
            {user?.role === 2 ? (
              <div>
                <h2 className="font-black text-xl text-black">
                  USD {Math.round(providerBalance * 100) / 100}
                </h2>{' '}
              </div>
            ) : null}
          </div>
          {user?.role === 1 ? (
            <div className="px-5 ml-auto mt-6 flex flex-row">
              <div className="bg-primary-100 rounded-lg text-white flex flex-row">
                <div className="mt-3 ml-3">
                  <CashIcon className="w-5" />
                </div>
                <motion.button
                  className="px-3 py-1 text-white font-bold"
                  onClick={() => router.push('/recargar')}
                >
                  <span>Recargar Billetera</span>
                </motion.button>
              </div>
            </div>
          ) : null}
          {user?.role === 2 ? (
            <div className="px-5 ml-auto mt-6 flex flex-row">
              <div className="bg-primary-100 rounded-lg text-white flex flex-row">
                <div className="mt-3 ml-3">
                  <CashIcon className="w-5" />
                </div>
                <motion.button
                  className="px-3 py-1 text-white font-bold"
                  onClick={() => router.push('/profile')}
                >
                  <span>Solicitar Retiro</span>
                </motion.button>
              </div>
            </div>
          ) : null}
        </div>
        {/* Entrepreneur */}
        {user?.role === 1 ? <EntrepreneurData /> : null}
        {/* Provider */}
        {user?.role === 2 ? <ProviderData /> : null}
        {/* Admin */}
        {user?.role === 0 ? <AdminData /> : null}
      </div>
    </>
  );
}
