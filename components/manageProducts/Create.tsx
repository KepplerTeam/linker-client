import React from 'react';
import { motion } from 'framer-motion';
import { DocumentModel } from '../../models';
import CategorySelector from '../common/CategorySelector';
import TitleBar from '../common/TitleBar';
import DocumentForm from '../document/DocumentForm';
import { Input } from '../inputs/Input';

interface CreateProps {
  isUpdate?: boolean;
  // product?: Product;
}

export default function Create({ isUpdate = false }: CreateProps) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [stock, setStock] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [images, setImages] = React.useState<DocumentModel[]>([]);

  return (
    <div>
      <div>
        {!isUpdate ? (
          <TitleBar title="Crear" />
        ) : (
          <TitleBar title="Actualizar" hasCheckMark />
        )}
      </div>

      <div className="px-4 mt-8">
        <div>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder=""
            className="w-3/4 h-8 my-1 text-sm "
            value={name}
            setValue={setName}
            label="Nombre del Producto"
          />
        </div>
        <div className="mt-8">
          <h2 className="font-bold">Categoria</h2>
          <CategorySelector />
        </div>
        <div className="mt-8">
          <Input
            type="text"
            id="description"
            name="description"
            placeholder=""
            className="w-3/4 h-8 my-1 text-sm "
            value={description}
            setValue={setDescription}
            label="Descripcion"
          />
        </div>
        <div className="mt-8">
          <Input
            type="text"
            id="stock"
            name="stock"
            placeholder=""
            className="w-3/4 h-8 my-1 text-sm "
            value={stock}
            setValue={setStock}
            label="En Stock"
          />
        </div>
        <div className="mt-8">
          <Input
            type="text"
            id="price"
            name="price"
            placeholder=""
            className="w-3/4 h-8 my-1 text-sm "
            value={price}
            setValue={setPrice}
            label="Precio"
          />
        </div>
        <div className="mt-8">
          <h2 className="mb-1 font-bold">Imagenes del Producto</h2>
          <DocumentForm
            updateURLs={setImages}
            documents={images}
            fileType="img"
          />
        </div>
      </div>
      <div className="text-center mt-8">
        <motion.button
          whileHover={{
            scale: 1.005,
            boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
          }}
          value=""
          type="button"
          className="w-3/4 rounded-xl h-auto px-3 py-2 bg-primary-100 text-white"
          // onClick={}
        >
          {!isUpdate ? 'Crear Producto' : 'Actualizar Producto'}
        </motion.button>
      </div>
    </div>
  );
}
