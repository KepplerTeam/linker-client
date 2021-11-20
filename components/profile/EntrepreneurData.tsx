import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import React from 'react';
import { GET_BILLS, GET_TRANSACTIONS } from '../../graphql/queries';
import { useUser } from '../../hooks/useUser';
import { Bill, Transaction } from '../../models';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import ChevronUpIcon from '../icons/ChevronUpIcon';
import RecargasPreview from '../recargas/RecargasPreview';
import OrdersResume from './OrdersResume';

export default function EntrepreneurData() {
  const [user] = useUser();
  const [showRecord, setShowRecord] = React.useState(false);
  const { data: billsData, loading: billsLoading } = useQuery<{
    bills: Bill[];
  }>(GET_BILLS, {
    variables: { filter: { client: user?._id }, sort: '_ID_DESC' },
    fetchPolicy: 'network-only',
  });
  // Busca las solicitudes de recarga realizadas por el usuario loggeado (solo para emprendedores)
  const { data: allTransactionsData, loading: loadingAllTransactionsData } =
    useQuery<{ transactions: Transaction[] }>(GET_TRANSACTIONS, {
      variables: { filter: { clientId: user?._id }, sort: '_ID_DESC' },
      fetchPolicy: 'network-only',
    });
  return (
    <div>
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
    </div>
  );
}
