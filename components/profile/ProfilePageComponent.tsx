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
            <div className="flex flex-row items-center">
              <h2 className="mt-3">
                {user?.firstName} {user?.lastName}
              </h2>
              <button
                type="button"
                className="ml-3 mt-3 h-auto p-1 rounded-full hover:bg-gray-50 hover:shadow-lg"
              >
                <EditIcon
                  className="w-5"
                  onClick={() => {
                    router.push('/profile/edit');
                  }}
                />
              </button>
            </div>
            <h2 className="font-thin text-sm">{user?.email}</h2>
          </div>
        </div>
        {user?.role === 0 ? null : (
          <div className="flex flex-row items-center justify-between mx-6 mb-12 bottom-1 p-5 rounded-xl bg-gray-50 shadow-lg hover:shadow-2xl">
            <div className="px-2">
              {user?.role === 1 ? (
                <div className="flex flex-col items-center font-black text-xl text-black">
                  <h2>USD</h2>
                  <h2>{Math.round(user?.balance * 100) / 100}</h2>
                </div>
              ) : null}
              {user?.role === 2 ? (
                <div className="flex flex-col items-center font-black text-xl text-black">
                  <h2>USD</h2>
                  <h2>{Math.round(providerBalance * 100) / 100}</h2>
                </div>
              ) : null}
            </div>
            {user?.role === 1 ? (
              <div className="px-5 flex flex-row">
                <button
                  onClick={() => router.push('/recargar')}
                  type="button"
                  className="font-bold px-4 py-2 bg-primary-100 hover:bg-primary-600 shadow-md hover:shadow-xl rounded-lg text-white flex flex-row items-center"
                >
                  <div className="">
                    <CashIcon className="w-5" />
                  </div>
                  <span>Recargar Billetera</span>
                </button>
              </div>
            ) : null}
            {user?.role === 2 ? (
              <div className="px-5 flex flex-row">
                <button
                  onClick={() => router.push('/profile')}
                  type="button"
                  className="font-bold px-4 py-2 bg-primary-100 hover:bg-primary-600 shadow-md hover:shadow-xl rounded-lg text-white flex flex-row items-center"
                >
                  <div className="">
                    <CashIcon className="w-5" />
                  </div>
                  <span>Solicitar Retiro</span>
                </button>
              </div>
            ) : null}
          </div>
        )}
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
