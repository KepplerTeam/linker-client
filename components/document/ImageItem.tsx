import React from 'react';
import axios from 'axios';
import nProgress from 'nprogress';
import { useMutation } from '@apollo/client';
import { useDrag, useDrop } from 'react-dnd';
import { SIGN_S3 } from '../../graphql/mutations';

import { DocumentModel } from '../../models';

import useNotify from '../../hooks/useNotify';
import { CloseIcon, PageIcon, CopyIcon } from '../icons';

const types = ['Image', 'application/pdf'];

interface ImageProps {
  file: File;
  src: string;
  id: string;
  name: string;
  index?: number;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  moveImage?: (dragIndex: number, hoverIndex: number) => void;
  updateURLs?: React.Dispatch<React.SetStateAction<DocumentModel[]>>;
  updateSrc?: (id: string, src: string, name: string, file: File) => void;
  route?: string;
  down?: boolean;
  fileType?: string;
}

function Image({
  file,
  src,
  id,
  onDelete,
  index,
  name,
  moveImage,
  updateURLs,
  updateSrc,
  down,
  route,
  fileType,
}: ImageProps) {
  const notify = useNotify();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [signS3] = useMutation(SIGN_S3);
  const type = fileType === 'img' ? types[0] : types[1];
  React.useEffect(() => {
    const upload = async () => {
      try {
        setUploading(true);
        nProgress.start();
        console.log(file.type);
        if (
          file?.type !== 'image/jpg' &&
          file?.type !== 'image/jpeg' &&
          file?.type !== 'image/png' &&
          file?.type !== 'application/pdf'
        ) {
          setError(true);
          return notify('El formato de este archivo no es válido', 'error');
        }
        if (
          file?.type !== 'image/jpg' &&
          file?.type !== 'image/jpeg' &&
          file?.type !== 'image/png' &&
          fileType === 'img'
        ) {
          setError(true);
          return notify('El formato de esta imagen no es válido', 'error');
        }
        if (file?.type !== 'application/pdf' && fileType === 'pdf') {
          setError(true);
          return notify(
            'El formato de este archivo no es válido. Solo se aceptan archivos en formato PDF',
            'error'
          );
        }
        const { data } = await signS3({
          variables: {
            data: {
              filename: file?.name,
              filetype: file.type,
            },
          },
        });
        const options = {
          headers: {
            'Content-Type': file?.type,
            'x-amz-acl': 'public-read',
          },
        };
        const response = await axios.put(
          data?.signS3?.signedRequest,
          file,
          options
        );
        if (response) {
          updateURLs((urls) => {
            const i = urls?.findIndex((_url) => _url?.id === id);
            if (i === -1) {
              return [...urls, { src: data?.signS3?.url, name, id }];
            }
            return urls;
          });
          updateSrc(id, data?.signS3?.url, name, file);
          notify('Archivo agregado exitosamente', 'success');
        } else {
          console.log('response error: ', response);
          notify(`Error cargando el archivo ${name}`, 'error');
          setError(true);
        }
      } catch (err) {
        console.log('catch: ', err);
        notify(`Error cargando el archivo ${name}`, 'error');
        setError(true);
      } finally {
        setUploading(false);
        nProgress.done();
      }
    };
    upload();
  }, []);
  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = (item as any).index as number;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveImage(dragIndex, hoverIndex);
      (item as any).index = hoverIndex;
    },
  });
  /* const [{ isDragging }, drag] = useDrag({
    type,
    item: () => ({ type, id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref)); */
  return error ? null : (
    <div
      className={`bg-gray-100 overflow-hidden shadow-md break-words my-1 flex flex-row w-full h-14 items-center rounded py-2 ${
        uploading ? 'opacity-25' : 'opacity-100'
      } ${down ? 'items-center justify-center' : 'items-start justify-start'}`}
      ref={ref}
    >
      <div className="w-10/12 text-sm overflow-hidden flex flex-row ml-4 items-center">
        {fileType === 'pdf' ? (
          <PageIcon className="w-5 h-5 mr-3" />
        ) : (
          <img src={encodeURI(src)} className="h-8" alt="" />
        )}
        <div className="mx-2 overflow-hidden">
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-primary-blue-400 cursor-text truncate">
            {encodeURI(src)}
          </p>
        </div>
      </div>
      <div className="w-1/12">
        <button
          type="button"
          className="flex justify-center items-center"
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(encodeURI(src));
            notify('Se ha copiado el link a su portapapeles', 'success');
          }}
        >
          <CopyIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="w-1/12">
        <button
          type="button"
          className="flex justify-center items-center"
          onClick={onDelete}
          data-id={id}
          data-index={index}
        >
          <CloseIcon className="w-3 h-3 text-neutral-300" />
        </button>
      </div>
    </div>
  );
}

export default Image;
