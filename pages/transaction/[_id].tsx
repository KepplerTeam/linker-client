import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import RecargasDetails from '../../components/recargas/RecargasDetails';
import { GET_TRANSACTION } from '../../graphql/queries';
import { Transaction } from '../../models';

export default function TransactionDetailsPage() {
  const router = useRouter();
  const { data, loading } = useQuery<{ transaction: Transaction }>(
    GET_TRANSACTION,
    {
      variables: { filter: { _id: router.query._id } },
      fetchPolicy: 'network-only',
    }
  );
  return (
    <>
      {loading ? (
        <div>
          <h2>loading...</h2>
        </div>
      ) : (
        <div>
          <RecargasDetails transaction={data.transaction} />
        </div>
      )}
    </>
  );
}
