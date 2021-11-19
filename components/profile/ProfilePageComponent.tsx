import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import {
  GET_BILLS,
  GET_ENTERPRISES,
  GET_TRANSACTIONS,
} from '../../graphql/queries';
import { Enterprise, Transaction, User } from '../../models';
import EnterpriseCard from '../enterprise/EnterpriseCard';
import { EditIcon } from '../icons';
import CashIcon from '../icons/CashIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import ChevronUpIcon from '../icons/ChevronUpIcon';
import RecargasPreview from '../recargas/RecargasPreview';
import AdminData from './AdminData';
import EntrepreneurData from './EntrepreneurData';
import OrdersResume from './OrdersResume';
import ProviderData from './ProviderData';

interface ProfilePageComponentProps {
  user: User;
}

export default function ProfilePageComponent({
  user,
}: ProfilePageComponentProps) {
  const router = useRouter();

  return (
    <>
      <div className="w-full min-h-screen">
        <h2 className="text-lg font-bold p-4">Mi Perfil</h2>
        <div className="flex flex-row px-4 pb-4  space-x-3">
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
        <div className="border-b-2  pb-4 flex flex-row border rounded-xl">
          <div className="px-2 py-4 mt-4">
            <h2 className="font-bold text-xl text-primary-100">
              USD {Math.round(user?.balance * 100) / 100}
            </h2>
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
                  <span>Recargar Wallet</span>
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
