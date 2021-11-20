import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { GET_TRANSACTIONS } from '../../graphql/queries';
import { useUser } from '../../hooks/useUser';
import { Transaction } from '../../models';
import RecargasPreview from '../recargas/RecargasPreview';

export default function AdminData() {
  // Busca todas las solicitudes de recarga de wallet que sigan pendientes. (solo para el admin)
  const { data: transactionsData, loading: loadingTransactionsData } =
    useQuery<{ transactions: Transaction[] }>(GET_TRANSACTIONS, {
      variables: { filter: { status: 0 }, sort: '_ID_ASC' },
      fetchPolicy: 'network-only',
    });
  return (
    <div>
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
    </div>
  );
}
