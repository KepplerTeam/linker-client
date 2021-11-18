import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import {
  GET_BILLS,
  GET_ENTERPRISES,
  GET_TRANSACTIONS,
} from '../../graphql/queries';
import { Bill, Enterprise, Transaction, User } from '../../models';
import EnterpriseCard from '../enterprise/EnterpriseCard';
import { EditIcon } from '../icons';
import CashIcon from '../icons/CashIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import ChevronUpIcon from '../icons/ChevronUpIcon';
import RecargasPreview from '../recargas/RecargasPreview';
import OrdersResume from './OrdersResume';

interface ProfilePageComponentProps {
  user: User;
}

export default function ProfilePageComponent({
  user,
}: ProfilePageComponentProps) {
  const router = useRouter();
  const [showRecord, setShowRecord] = React.useState(false);
  // Busca todas las empresas que pertenezcan al usuario (solo para empresarios)
  const { data, loading } = useQuery<{ enterprises: Enterprise[] }>(
    GET_ENTERPRISES,
    {
      variables: { filter: { owner: user?._id } },
      fetchPolicy: 'network-only',
    }
  );

  const { data: billsData, loading: billsLoading } = useQuery<{
    bills: Bill[];
  }>(GET_BILLS, {
    variables: { filter: { client: user?._id }, sort: '_ID_DESC' },
    fetchPolicy: 'network-only',
  });
  // Busca todas las solicitudes de recarga de wallet que sigan pendientes. (solo para el admin)
  const { data: transactionsData, loading: loadingTransactionsData } =
    useQuery<{ transactions: Transaction[] }>(GET_TRANSACTIONS, {
      variables: { filter: { status: 0 }, sort: '_ID_ASC' },
      fetchPolicy: 'network-only',
    });
  // Busca las solicitudes de recarga realizadas por el usuario loggeado (solo para emprendedores)
  const { data: allTransactionsData, loading: loadingAllTransactionsData } =
    useQuery<{ transactions: Transaction[] }>(GET_TRANSACTIONS, {
      variables: { filter: { clientId: user?._id }, sort: '_ID_DESC' },
      fetchPolicy: 'network-only',
    });

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
            <h2 className="font-black text-xl text-black">
              USD {Math.round(user?.balance * 100) / 100}
            </h2>
          </div>
          <div className="flex flex-row py-3 px-4 items-center bg-primary-100 hover:bg-primary-600 shadow-md rounded-lg">
            <div className="">
              <CashIcon className="w-5 text-white mr-2" />
            </div>
            <motion.button
              className="text-white font-bold"
              onClick={() => router.push('/recargar')}
            >
              <span>Recargar billetera</span>
            </motion.button>
          </div>
        </div>
        {user?.role === 1 ? (
          <>
            {loadingAllTransactionsData ? (
              <div>
                <h2>Loading...</h2>
              </div>
            ) : (
              <>
                <div className="mt-4">
                  <motion.button
                    className="px-3 py-1 text-primary-100"
                    onClick={() => setShowRecord(!showRecord)}
                  >
                    {showRecord ? (
                      <div className="flex flex-row space-x-2">
                        <h2>Ocultar historial de recargas</h2>
                        <ChevronUpIcon className="w-4" />
                      </div>
                    ) : (
                      <div className="flex flex-row space-x-2">
                        <h2>Mostrar historial de recargas</h2>
                        <ChevronDownIcon className="w-4" />
                      </div>
                    )}
                  </motion.button>
                  {showRecord ? (
                    <>
                      {allTransactionsData?.transactions.map((transaction) => (
                        <RecargasPreview
                          key={transaction?._id}
                          transaction={transaction}
                          dontShow
                        />
                      ))}
                    </>
                  ) : null}
                </div>
              </>
            )}
          </>
        ) : null}

        {user?.role === 1 ? (
          <div>
            {billsLoading ? (
              <div>
                <h2>loading...</h2>
              </div>
            ) : (
              <div>
                <div>
                  <h2 className="p-4 font-bold text-lg">Mis Compras</h2>
                  <div className="flex scroll-x scrollbar-hide">
                    {billsData?.bills?.map((bill, idx) => (
                      <div className="w-full" key={idx}>
                        <OrdersResume bill={bill} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
        {user?.role === 2 ? (
          <>
            {loading ? (
              <div>
                <h2>loading...</h2>
              </div>
            ) : (
              <>
                <div className="p-4">
                  <div>
                    <h2 className="font-bold text-lg">Resumen de Ventas</h2>
                  </div>
                  <div className="mt-56">
                    <div className="flex flex-row justify-between mb-4">
                      <div>
                        <h2 className="font-bold text-lg">Mis Empresas</h2>
                      </div>
                      <div>
                        <motion.button
                          className="bg-primary-100 rounded-lg px-3 py-1 w-full text-white font-bold"
                          onClick={() => router.push('/enterprise/register')}
                        >
                          Nueva Empresa
                        </motion.button>
                      </div>
                    </div>
                    <div>
                      <h2>
                        {data?.enterprises?.map((enterprise) => (
                          <div key={enterprise?._id}>
                            <EnterpriseCard enterprise={enterprise} />
                          </div>
                        ))}
                      </h2>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : null}
        {user?.role === 0 ? (
          <>
            <div className="pt-6 pb-4 px-6 border-t-2 shadow-inner">
              <div>
                <h2 className="font-bold text-lg">Solicitudes de Recarga</h2>
              </div>
            </div>

            {loadingTransactionsData ? (
              <div>
                <h2>loading...</h2>
              </div>
            ) : (
              <div className="p-4">
                {transactionsData.transactions.map((transaction) => (
                  <RecargasPreview
                    key={transaction?._id}
                    transaction={transaction}
                  />
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>
    </>
  );
}
