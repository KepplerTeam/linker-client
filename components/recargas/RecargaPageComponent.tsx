import { motion } from 'framer-motion';
import React from 'react';
import useNotify from '../../hooks/useNotify';
import { useUser } from '../../hooks/useUser';
import { DocumentModel } from '../../models';
import RecargaUserForm from './RecargaUserForm';

export default function RecargaPageComponent() {
  const [user] = useUser();
  const notify = useNotify();
  const [_id] = React.useState(user?._id);
  const [ammount, setAmmount] = React.useState(0);
  const [documents, setDocuments] = React.useState<DocumentModel[]>([]);

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      e.persist();
      if (ammount > 0 && documents.length > 0) {
        notify('Solicitud de recarga exitosa!', 'success');
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
          ammount={ammount}
          setAmmount={setAmmount}
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
