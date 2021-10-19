import React from 'react';
import { motion } from 'framer-motion';
import { validateString } from 'avilatek-utils';
import { useMutation } from '@apollo/client';
import router from 'next/router';
import { DocumentModel } from '../../models';
import TitleBar from '../common/TitleBar';
import { Input } from '../inputs/Input';
import CreateProductForm from './CreateProductForm';
import useNotify from '../../hooks/useNotify';
import { CREATE_PRODUCT } from '../../graphql/mutations';

interface CreateProps {
  isUpdate?: boolean;
  // product?: Product;
}

const unitsList = [
  { id: 0, name: 'Unidades', unavailable: false },
  { id: 1, name: 'Kilogramos', unavailable: false },
  { id: 2, name: 'Litros', unavailable: false },
];

export default function Create({ isUpdate = false }: CreateProps) {
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState<number>();
  const [description, setDescription] = React.useState('');
  const [stock, setStock] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [images, setImages] = React.useState<DocumentModel[]>([]);
  const [disabled, setDisabled] = React.useState(false);
  const [serial, setSerial] = React.useState('');
  const [units, setUnits] = React.useState(unitsList[0]);

  const [createProduct] = useMutation(CREATE_PRODUCT);

  const notify = useNotify();

  const onSubmit = async (e) => {
    try {
      e.persist();
      e.preventDefault();
      setDisabled(true);

      if (!validateString(name)) {
        return notify(
          'Por favor introduzca el nombre del producto.',
          'warning'
        );
      }
      if (!validateString(description)) {
        return notify(
          'Por favor introduzca la descripcion del producto.',
          'warning'
        );
      }
      const { data: dataCreate } = await createProduct({
        variables: {
          data: {
            name,
            description,
            serial,
            category,
            price,
            quantity: stock,
            units,
            images: images.length !== 0 ? images?.map((conf) => conf.src) : '',
          },
        },
      });

      if (dataCreate?.createProduct) {
        notify('El producto se ha creado exitosamente!', 'success');
        // Aca deberia mandar a preview de articulo o a perful de todos sus productos
        await router.push('/');
      } else {
        notify('Ha ocurrido un error al crear el producto', 'error');
      }
    } catch (err) {
      notify(err.message, 'error', err);
    } finally {
      setDisabled(false);
    }
  };

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
        <CreateProductForm
          name={name}
          setName={setName}
          category={category}
          setCategory={setCategory}
          description={description}
          setDescription={setDescription}
          stock={stock}
          setStock={setStock}
          price={price}
          setPrice={setPrice}
          images={images}
          setImages={setImages}
          serial={serial}
          setSerial={setSerial}
          units={units}
          setUnits={setUnits}
          unitsList={unitsList}
        />
      </div>
      <div className="text-center my-8">
        <motion.button
          whileHover={{
            scale: 1.005,
            boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
          }}
          value=""
          type="button"
          className="w-3/4 rounded-xl h-auto px-3 py-2 bg-primary-100 text-white mb-5"
          disabled={disabled}
          onClick={onSubmit}
        >
          {!isUpdate ? 'Crear Producto' : 'Actualizar Producto'}
        </motion.button>
      </div>
    </div>
  );
}
