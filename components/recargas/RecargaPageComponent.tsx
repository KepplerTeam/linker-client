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
      notify(err.message, 'error', err);
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <div>
        <h2 className="font-bold text-lg">Formulario de Recarga de Wallet</h2>
        <RecargaUserForm
          amount={amount}
          setAmount={setAmount}
          documents={documents}
          setDocuments={setDocuments}
        />
      </div>
      <div className="mt-4">
        <motion.button
          className="bg-primary-100 rounded-full px-3 py-2 w-full text-white font-bold"
          onClick={(e) => onSubmit(e)}
        >
          Solicitar
        </motion.button>
      </div>
    </div>
  );
}