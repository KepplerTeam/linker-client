import React from 'react';
import { motion } from 'framer-motion';
import { validateString } from 'avilatek-utils';
import { useMutation, useQuery } from '@apollo/client';
import router from 'next/router';
import { DocumentModel, Enterprise } from '../../models';
import TitleBar from '../common/TitleBar';
import CreateProductForm from './CreateProductForm';
import useNotify from '../../hooks/useNotify';
import { CREATE_PRODUCT } from '../../graphql/mutations';

interface CreateProps {
  isUpdate?: boolean;
  // product?: Product;
}

export default function Create({ isUpdate = false }: CreateProps) {
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState<number>();
  const [description, setDescription] = React.useState('');
  const [stock, setStock] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [images, setImages] = React.useState<DocumentModel[]>([]);
  const [disabled, setDisabled] = React.useState(false);
  const [serial, setSerial] = React.useState('');
  const [units, setUnits] = React.useState('');

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
            createProductInfo: {
              name,
              description,
              serial,
              category,
              price: Number(price),
              quantity: Number(stock),
              units: Number(units),
              enterprise: '616638244a03ed67ceab6c37',
            },
            createProductImages:
              images.length !== 0 ? images?.map((conf) => conf.src) : '',
          },
        },
      });

      if (dataCreate?.createProduct) {
        // notify('El producto se ha creado exitosamente!', 'success');
        console.log('se ha creado exitosamente');
        // Aca deberia mandar a preview de articulo o a perful de todos sus productos
        await router.push('/');
      } else {
        // notify('Ha ocurrido un error al crear el producto', 'error');
        console.log('error al crear el producto');
      }
    } catch (err) {
      // notify(err.message, 'error', err);
      console.log(err);
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
