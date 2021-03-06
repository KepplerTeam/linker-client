import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import RecargasDetails from '../../components/recargas/RecargasDetails';
import { GET_TRANSACTION } from '../../graphql/queries';
import { Transaction } from '../../models';
import Loading from '../../components/common/Loading';
import Nav from '../../components/Navbar/Nav';

export default function TransactionDetailsPage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
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
        <div className="w-screen h-full p-0 bg-gray-200">
          <Loading />
        </div>
      ) : (
        <div className="h-screen w-full bg-gray-200">
          <Nav open={open} setOpen={setOpen} />
          <div className="">
            <RecargasDetails transaction={data.transaction} />
          </div>
        </div>
      )}
    </>
  );
}
