import React, { useCallback } from 'react';
import update from 'immutability-helper';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import { v4 as uuid } from 'uuid';
import useNotify from '../../hooks/useNotify';
import { DocumentModel } from '../../models';
import DropZone from './DropZone';
import DocumentList from './DocumentList';

interface DocumentFormProps {
  documents: Array<DocumentModel>;
  updateURLs: React.Dispatch<React.SetStateAction<DocumentModel[]>>;
  fileType?: string;
}

function DocumentForm({ updateURLs, documents, fileType }: DocumentFormProps) {
  const notify = useNotify();
  const [docs, setDocs] = React.useState<Array<DocumentModel>>(
    documents?.map((doc) => ({
      id: uuid(),
      src: doc?.src,
      name: doc?.name ?? 'N/A',
      file: doc?.file,
    })) ?? []
  );

  const getBackend = () => {
    if (process.browser && 'ontouchstart' in window) {
      return TouchBackend;
    }
    return HTML5Backend;
  };

  const onDrop = useCallback((acceptedFiles: File[]): void => {
    acceptedFiles
      .map((file: File) => {
        if (file.size > 50000000) {
          notify('El archivo excede el límite de 50MB', 'warning');
          return null;
        }
        const reader = new FileReader();
        reader.onload = function onLoadFile(e) {
          setDocs((prevState) => [
            ...prevState,
            {
              id: uuid(),
              src: e.target.result,
              name: file?.name ?? uuid(),
              file,
            },
          ]);
        };
        reader.readAsDataURL(file);
        return file;
      })
      .filter((x) => !!x) as File[];
  }, []);

  const updateDocs = React.useCallback(setDocs, [setDocs]);

  const moveDoc = React.useCallback(
    (dragIndex, hoverIndex) => {
      const draggedImage = docs[dragIndex];
      setDocs(
        update(docs, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, draggedImage],
          ],
        })
      );
      updateURLs((urls) =>
        update(urls, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, urls[dragIndex]],
          ],
        })
      );
    },
    [docs, setDocs, updateURLs]
  );

  return (
    <DndProvider backend={getBackend()}>
      <section className="w-full flex flex-col flex-wrap">
        <DropZone onDrop={onDrop} fileType={fileType} />
        <DocumentList
          docs={docs}
          updateDocs={updateDocs}
          moveDoc={moveDoc}
          updateURLs={updateURLs}
          fileType={fileType}
        />
      </section>
    </DndProvider>
  );
}

export default DocumentForm;
