import React from 'react';
import { motion } from 'framer-motion';
import { validateString } from 'avilatek-utils';
import { useMutation, useQuery } from '@apollo/client';
import router from 'next/router';
import { DocumentModel, Enterprise, Product, User } from '../../models';
import TitleBar from '../common/TitleBar';
import CreateProductForm from './CreateProductForm';
import useNotify from '../../hooks/useNotify';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '../../graphql/mutations';

interface CreateProps {
  isUpdate?: boolean;
  product?: Product;
  enterpriseId?: string | string[];
  user?: User;
}

export default function Create({
  isUpdate = false,
  product,
  enterpriseId,
  user,
}: CreateProps) {
  const [name, setName] = React.useState(product?.name || '');
  const [category, setCategory] = React.useState<number>(
    product?.category || null
  );
  const [description, setDescription] = React.useState(
    product?.description || ''
  );
  const [stock, setStock] = React.useState(product?.quantity || null);
  const [price, setPrice] = React.useState(product?.price || 0);
  const [images, setImages] = React.useState<DocumentModel[]>([]);
  const [currentImage] = React.useState(product?.images[0] || '');
  const [disabled, setDisabled] = React.useState(false);
  const [serial, setSerial] = React.useState(product?.serial || '');
  const [units, setUnits] = React.useState(product?.units || '');

  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

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
      if (!isUpdate) {
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
                enterprise: enterpriseId,
              },
              createProductImages:
                images.length !== 0 ? images?.map((conf) => conf.src) : '',
            },
          },
        });
        if (dataCreate?.createProduct) {
          notify('El producto se ha creado exitosamente!', 'success');
          console.log('se ha creado exitosamente');
          // Aca deberia mandar a preview de articulo o a perful de todos sus productos
          await router.push('/feed');
        } else {
          notify('Ha ocurrido un error al crear el producto', 'error');
          console.log('error al crear el producto');
        }
      } else {
        const { data: dataUpdate } = await updateProduct({
          variables: {
            filter: { _id: product._id },
            record: {
              name,
              description,
              category,
              quantity: Number(stock),
              units: Number(units),
              serial,
              price: Number(price),
              images:
                images.length === 0
                  ? currentImage
                  : images?.map((conf) => conf.src),
            },
          },
        });
        if (dataUpdate?.updateProduct) {
          notify('Actualizado exitosamente', 'success');
          await router.push(`/stock/${product._id}`);
        }
      }
    } catch (err) {
      notify(err.message, 'error', err);
      console.log(err);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div>
      <div>
        {/* {!isUpdate ? (
          <TitleBar title="Crear" />
        ) : (
          <TitleBar title="Actualizar" hasCheckMark />
        )} */}
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
