import React from 'react';
import { nanoid } from 'nanoid';
import { DocumentModel } from '../../models';
import Image from './ImageItem';

interface DocumentListProps {
  docs: Array<DocumentModel>;
  updateDocs: React.Dispatch<React.SetStateAction<any[]>>;
  updateURLs: React.Dispatch<React.SetStateAction<DocumentModel[]>>;
  moveDoc?: (dragIndex: number, hoverIndex: number) => void;
  fileType?: string;
}

function DocumentList({
  docs = [],
  updateDocs,
  updateURLs,
  moveDoc,
  fileType,
}: DocumentListProps) {
  const updateSrc = React.useCallback(
    (id: string, src: string, name: string, file: File) => {
      updateDocs((_docs) => {
        const copyOfDocs = _docs.slice();
        const idx = copyOfDocs.findIndex((img) => img.id === id);
        copyOfDocs[idx] = { id, src, name, file };
        return copyOfDocs;
      });
    },
    [updateDocs]
  );
  const onDelete = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      const { id, index } = e.currentTarget.dataset;
      updateDocs((__docs) => __docs.slice().filter((doc) => doc.id !== id));
      updateURLs((urls) => urls?.slice().filter((url) => url !== urls[index]));
    },
    [updateDocs, updateURLs]
  );
  return (
    <section className="file-list flex flex-col justify-center mt-5 max-h-48 overflow-y-scroll">
      {docs.map((doc, idx) => (
        <Image
          file={doc?.file}
          src={typeof doc?.src === 'string' ? doc?.src : String(doc?.src)}
          name={doc?.name ?? nanoid()}
          index={idx}
          key={doc.id}
          id={doc.id}
          onDelete={onDelete}
          moveImage={moveDoc}
          updateSrc={updateSrc}
          updateURLs={updateURLs}
          route="route"
          fileType={fileType}
        />
      ))}
    </section>
  );
}

export default DocumentList;
