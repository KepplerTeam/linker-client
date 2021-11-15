import { useMutation, useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { UPDATE_TRANSACTION, UPDATE_USER } from '../../graphql/mutations';
import { GET_USER } from '../../graphql/queries';
import useNotify from '../../hooks/useNotify';
import { useUser } from '../../hooks/useUser';
import { Transaction, User } from '../../models';

interface RecargasDetailsProps {
  transaction: Transaction;
}
export default function RecargasDetails({ transaction }: RecargasDetailsProps) {
  const [currentBalance] = React.useState(transaction?.clientId?.balance);
  const [newBalance] = React.useState(transaction?.amount + currentBalance);
  const [updateUser] = useMutation(UPDATE_USER);
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION);
  const [user] = useUser();
  const notify = useNotify();
  const router = useRouter();
  const { data, loading } = useQuery<{ user: User }>(GET_USER, {
    variables: { filter: { _id: transaction.clientId._id } },
    fetchPolicy: 'network-only',
  });
  const onApprove = async () => {
    try {
      const { data: updateData } = await updateUser({
        variables: {
          filter: {
            _id: transaction.clientId._id,
          },
          record: {
            balance: transaction?.clientId.balance + transaction?.amount,
          },
        },
      });
      if (updateData?.updateUser) {
        const { data: updateTransactionData } = await updateTransaction({
          variables: {
            filter: { _id: transaction._id },
            record: { status: 1 },
          },
        });
        if (updateTransactionData?.updateTransaction) {
          notify('Recarga aprobada exitosamente!', 'success');
          await router.push('/profile');
        } else {
          notify('Error', 'error');
        }
      } else {
        notify('Error 2', 'error');
      }
    } catch (err) {
      notify(err.message, 'err', err);
    }
  };

  const onReject = async () => {
    try {
      const { data: updateData } = await updateTransaction({
        variables: {
          filter: { _id: transaction?._id },
          record: { status: 2 },
        },
      });
      if (updateData.updateTransaction) {
        notify('La recarga ha sido rechazada', 'success');
        await router.push('/profile');
      } else {
        notify('Ha ocurrido un error', 'error');
      }
    } catch (err) {
      notify(err.message, 'error', err);
    }
  };
  return (
    <div className="p-4">
      {user?.role !== 0 ? (
        <div>
          <h2>No tiene permisos para acceder a esta pagina</h2>
        </div>
      ) : (
        <>
          <div>
            <h2>Cliente: {transaction?.clientId?.username}</h2>
            <h2>Monto a recargar: {transaction?.amount}</h2>
            <h2>monto actual: {transaction.clientId.balance}</h2>
            <h2>Comprobante de Transaccion</h2>
            <img
              src={transaction?.transactionId}
              alt="imagen del comprobante"
            />
          </div>
          <div className="flex flex-row space-x-3 mt-6">
            <motion.button
              className="bg-primary-100 rounded-full px-2 py-1 w-full text-white font-bold"
              onClick={() => onApprove()}
            >
              Aprobar
            </motion.button>
            <motion.button
              className="bg-primary-100 rounded-full px-2 py-1 w-full text-white font-bold"
              onClick={() => onReject()}
            >
              Rechazar
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}
