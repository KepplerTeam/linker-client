import React from 'react';
import { DocumentModel } from '../../models';
import DocumentForm from '../document/DocumentForm';
import { Input } from '../inputs';

interface RecargaUserFormProps {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  documents: DocumentModel[];
  setDocuments: React.Dispatch<React.SetStateAction<DocumentModel[]>>;
}

export default function RecargaUserForm({
  amount,
  setAmount,
  documents,
  setDocuments,
}: RecargaUserFormProps) {
  return (
    <div className="p-10">
      <div className="my-2">
        <Input
          type="number"
          id="ammount"
          name="ammount"
          placeholder=""
          className="w-3/4 h-8 mt-4 text-sm "
          value={amount}
          setValue={setAmount}
          label="Monto a recargar:"
        />
      </div>
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4">Comprobante de transferencia:</h2>
        <DocumentForm
          documents={documents}
          updateURLs={setDocuments}
          fileType="img"
        />
      </div>
    </div>
  );
}
