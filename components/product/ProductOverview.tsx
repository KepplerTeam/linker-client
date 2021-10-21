import React from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Product } from '../../models';
import TitleBar from '../common/TitleBar';
import ReviewCard from '../review/ReviewCard';
import { UPDATE_SHOPPING_CART } from '../../graphql/mutations';

interface ProductOverviewProps {
  product: Product;
  hasEdit?: boolean;
  hasShoppingCart?: boolean;
  title?: string;
  isUpdate?: boolean;
}

export default function ProductOverview({
  product,
  hasEdit = false,
  hasShoppingCart = false,
  title = '',
  isUpdate = false,
}: ProductOverviewProps) {
  const [active, setActive] = React.useState(0);
  const router = useRouter();

  const [updateShoppingCart] = useMutation(UPDATE_SHOPPING_CART);

  const onSubmit = async (e) => {
    try {
      e.persist();
      e.preventDefault();

      const { data: dataUpdate } = await updateShoppingCart({
        variables: {
          filter: { _id: '6170ab2a74344308a8a7f57e' },
          record: {
            products: [product._id],
          },
        },
      });
      if (dataUpdate?.updateShoppingCart) {
        console.log('Producto anadido al shopping cart exitosamente');
        await router.push(`/shopping-cart`);
      }
    } catch (err) {
      // notify(err.message, 'error', err);
      console.log('no se pudo agregar');
      console.log(err);
    } finally {
      console.log('done');
    }
  };

  return (
    <div className="w-full min-h-screen">
      <TitleBar
        hasShoppingCart={hasShoppingCart}
        hasEdit={hasEdit}
        title={title}
        _id={product._id}
      />
      <div className="p-6">
        <div>
          <h2 className="mb-1 font-semibold text-primary-100">
            USD{product.price}
          </h2>
          <h2 className="text-2xl font-bold">{product.name}</h2>
        </div>
        <div>
          <div className="flex flex-row justify-around overflow-x-scroll scrollbar-hide space-x-5 my-4">
            <motion.button
              whileHover={{
                scale: 1.005,
                boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
              }}
              value=""
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActive(0);
              }}
            >
              <span
                className={`${
                  active === 0 ? 'border-b-2 border-primary-100' : ''
                }`}
              >
                Overview
              </span>
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.005,
                boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
              }}
              value=""
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActive(1);
              }}
            >
              <span
                className={`${
                  active === 1 ? 'border-b-2 border-primary-100' : ''
                }`}
              >
                Specification
              </span>
            </motion.button>
          </div>
        </div>
        {active === 0 ? (
          <div className="">
            <div className="w-full pb-12 flex flex-row overflow-scroll scrollbar-hide rounded-xl bg-gray-100 space-x-7">
              {product.images.map((image) => (
                <img
                  src={image}
                  alt={product.name}
                  className="w-full object-contain"
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="py-2">
              <h2 className="text-xl font-bold my-2">Description</h2>
              <h2>{product.description}</h2>
            </div>
            <div className="py-2">
              <h2 className="text-xl font-bold my-2">
                Presentacion del producto
              </h2>
              <h2>
                {product.units === 0
                  ? 'El producto listado se vende por Unidades'
                  : ''}
              </h2>
              <h2>
                {product.units === 1
                  ? 'El producto listado se vende por Kilogramos'
                  : ''}
              </h2>
              <h2>
                {product.units === 2
                  ? 'El producto listado se vende por Litros'
                  : ''}
              </h2>
            </div>
            <div className="py-2">
              <h2 className="text-xl font-bold my-2">Serial</h2>
              <h2>{product.serial}</h2>
            </div>
          </div>
        )}
        <div>
          {!isUpdate ? (
            <motion.button
              whileHover={{
                scale: 1.005,
                boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
              }}
              value=""
              type="button"
              className="w-full h-11 bg-primary-100 text-white rounded-2xl px-4 py-2 my-12"
              onClick={onSubmit}
            >
              <span>Add To Cart</span>
            </motion.button>
          ) : null}
          <div>
            <h2 className="my-3">Review(#)</h2>
          </div>
          <div className="pt-4">
            <ReviewCard
              name="Madelina"
              rating={3}
              comment="  
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, recusandae?
              "
            />
          </div>
          <div className="pt-4">
            <ReviewCard
              name="Javier"
              rating={4}
              comment="  
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, recusandae?
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
