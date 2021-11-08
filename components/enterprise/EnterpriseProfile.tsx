import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import router, { useRouter } from 'next/router';
import React from 'react';
import { GET_ENTERPRISE } from '../../graphql/queries';
import { Enterprise, User } from '../../models';
import ProductCard from '../product/ProductCard';

interface EnterpriseProfileProps {
  user?: User;
  enterprise?: Enterprise;
}

export default function EnterpriseProfile({
  user,
  enterprise,
}: EnterpriseProfileProps) {
  const [active, setActive] = React.useState(0);
  return (
    <div className="min-h-screen p-4">
      {user?._id === enterprise?.owner._id ? (
        <div className="w-full mb-4 text-right">
          <motion.button
            whileHover={{
              scale: 1.005,
              boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
            }}
            value=""
            type="button"
            onClick={(e) => {
              router.push(`/enterprise/update/${enterprise?._id}`);
            }}
          >
            <span className="bg-primary-100 w-full px-3 py-2 rounded-lg text-white">
              Actualizar
            </span>
          </motion.button>
        </div>
      ) : (
        ''
      )}
      <div>
        <img
          src={enterprise?.banner}
          alt=""
          className="w-full object-contain"
        />
        <div className="mt-2 text-3xl text-center">
          <h2>{enterprise?.name}</h2>
        </div>
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
              Informacion
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
              Productos
            </span>
          </motion.button>
        </div>
      </div>
      {active === 0 ? (
        <div className="">
          <div className="my-4">
            <h2 className="font-bold">Rif de la Empresa</h2>
            <h2>{enterprise?.rif}</h2>
          </div>
          <div className="my-4">
            <h2 className="font-bold">
              Categoria:{' '}
              <span className="font-normal">{enterprise?.category}</span>
            </h2>
          </div>
        </div>
      ) : (
        <>
          {enterprise?.products?.map((product, idx) => (
            <div key={idx}>
              {/* {product?.images?.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={product?.name}
                    className="w-full object-contain"
                  />
                </div>
              ))} */}
              <ProductCard products={enterprise?.products} />
            </div>
          ))}
          <div className="">
            <motion.button
              whileHover={{
                scale: 1.005,
                boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
              }}
              value=""
              type="button"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/create/${enterprise?._id}`);
              }}
              className="px-4 w-full py-1 my-2  bg-primary-100 text-white rounded-md"
            >
              Nuevo Producto
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}