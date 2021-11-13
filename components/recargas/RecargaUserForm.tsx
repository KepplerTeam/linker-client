import React from 'react';
import { DocumentModel } from '../../models';
import DocumentForm from '../document/DocumentForm';
import { Input } from '../inputs';

interface RecargaUserFormProps {
  ammount: number;
  setAmmount: React.Dispatch<React.SetStateAction<number>>;
  documents: DocumentModel[];
  setDocuments: React.Dispatch<React.SetStateAction<DocumentModel[]>>;
}

export default function RecargaUserForm({
  ammount,
  setAmmount,
  documents,
  setDocuments,
}: RecargaUserFormProps) {
  return (
    <div className="p-4">
      <div className="my-2">
        <Input
          type="number"
          id="ammount"
          name="ammount"
          placeholder=""
          className="w-3/4 h-8 mt-4 text-sm "
          value={ammount}
          setValue={setAmmount}
          label="Monto a recargar"
        />
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Comprobante de transferencia</h2>
        <DocumentForm
          documents={documents}
          updateURLs={setDocuments}
          fileType="img"
        />
      </div>
    </div>
  );
}
