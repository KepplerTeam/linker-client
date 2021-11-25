import { useMutation } from '@apollo/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { CREATE_TRANSACTION } from '../../graphql/mutations';
import useNotify from '../../hooks/useNotify';
import { useUser } from '../../hooks/useUser';
import { DocumentModel } from '../../models';
import RecargaUserForm from './RecargaUserForm';

export default function RecargaPageComponent() {
  const [user] = useUser();
  const notify = useNotify();
  const router = useRouter();
  const [createTransaction] = useMutation(CREATE_TRANSACTION);
  const [amount, setAmount] = React.useState(0);
  const [documents, setDocuments] = React.useState<DocumentModel[]>([]);

  /**
   * @abstract envia el formulario de solicitud recarga de wallet que sera aprobado o rechazado por el administrador
   * @param e
   */
  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      e.persist();
      if (amount > 0 && documents.length > 0) {
        const { data: dataCreate } = await createTransaction({
          variables: {
            record: {
              clientId: user?._id,
              amount: Number(amount),
              transactionId: documents[0].src,
            },
          },
        });
        if (dataCreate?.createTransaction) {
          notify('Solicitud de recarga exitosa!', 'success');
          router.push('/profile');
        }
      } else {
        notify('Datos incompletos, verifique la informacion', 'warning');
      }
    } catch (err) {
      notify(err.message, 'danger', err);
    }
  };

  return (
    <div className="py-4 min-h-screen">
      <div>
        <h2 className="px-4 pt-2 font-bold text-xl">Recarga la Billetera</h2>
        <div className="border-t-2 mt-5 shadow-inner">
          <RecargaUserForm
            amount={amount}
            setAmount={setAmount}
            documents={documents}
            setDocuments={setDocuments}
          />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="mt-8 px-10 py-3 bg-primary-100 hover:bg-primary-600 text-white font-bold shadow-lg rounded-lg"
          onClick={(e) => onSubmit(e)}
        >
          Solicitar
        </button>
      </div>
    </div>
  );
}
