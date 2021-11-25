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
  const [updateUser] = useMutation(UPDATE_USER);
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION);
  const [user] = useUser();
  const notify = useNotify();
  const router = useRouter();

  /** onApprove
   * @abstract el administrador aprueba la solicitud de recarga, cambia el estado de la orden y aumenta el balance del usuario que realizo la solicitud
   */
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
          notify('Error', 'danger');
        }
      } else {
        notify('Error 2', 'danger');
      }
    } catch (err) {
      notify(err.message, 'err', err);
    }
  };

  /** onReject
   * @abstract el administrador rechaza la solicitud de recarga debido a alguna incongruencia en los datos de la solicitud o la transaccion no pudo ser comprobada
   */
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
        notify('Ha ocurrido un error', 'danger');
      }
    } catch (err) {
      notify(err.message, 'danger', err);
    }
  };
  return (
    <div className="">
      {user?.role !== 0 ? (
        <div>
          <h2>No tiene permisos para acceder a esta pagina</h2>
        </div>
      ) : (
        <>
          <div className="p-5 text-lg rounded-xl bg-gray-50 shadow-md hover:shadow-xl m-8">
            <div className="flex flex-row my-4">
              <h2 className="font-semibold">Cliente:&nbsp;</h2>
              <h2>{transaction?.clientId?.username}</h2>
            </div>
            <div className="flex flex-row my-4">
              <h2 className="font-semibold">Monto a recargar:&nbsp;</h2>
              <h2>{transaction?.amount}</h2>
            </div>
            <div className="flex flex-row my-4">
              <h2 className="font-semibold">Monto actual:&nbsp;</h2>
              <h2>{transaction.clientId.balance}</h2>
            </div>
            <div className="flex flex-col my-4">
              <h2 className="font-semibold">
                Comprobante de Transacción:&nbsp;
              </h2>
              <div className="flex justify-center">
                <img
                  className="h-32 w-32 m-6"
                  src={transaction?.transactionId}
                  alt="imagen del comprobante"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-200 flex flex-row justify-center fixed bottom-28 w-full space-x-3">
            <button
              type="button"
              className="mt-8 px-10 py-3 bg-primary-100 hover:bg-primary-600 text-white font-bold shadow-lg rounded-lg"
              onClick={() => onApprove()}
            >
              Aprobar
            </button>
            <button
              type="button"
              className="mt-8 px-10 py-3 bg-red-400 hover:bg-red-600 text-white font-bold shadow-lg rounded-lg"
              onClick={() => onReject()}
            >
              Rechazar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
