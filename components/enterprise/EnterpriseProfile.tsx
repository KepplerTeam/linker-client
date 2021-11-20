import React from 'react';
import { motion } from 'framer-motion';
import router from 'next/router';
import { Tab } from '@headlessui/react';
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
    <div className="w-full h-full">
      <div className="min-h-screen m-8 p-5 rounded-2xl bg-gray-100 shadow-2xl">
        <div>
          <img
            src={enterprise?.banner}
            alt=""
            className="w-full rounded-t-xl"
          />
          <div className="bg-gray-50 rounded-b-xl border-b-2 font-semibold text-center">
            <h2 className="px-10 py-4 text-3xl">{enterprise?.name}</h2>
          </div>
        </div>
        <div className="w-full max-w mt-5 pb-16">
          <Tab.Group>
            <Tab.List className="flex bg-gray-50 justify-center py-3 space-x-16 shadow-inner rounded-xl">
              <Tab
                className={({ selected }) =>
                  selected
                    ? 'bg-primary-100 text-white font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg'
                    : 'hover:bg-gray-100 font-bold px-5 py-3 rounded-xl hover:shadow-lg'
                }
              >
                Información
              </Tab>
              <Tab
                className={({ selected }) =>
                  selected
                    ? 'bg-primary-100 text-white font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg'
                    : 'hover:bg-gray-100 font-bold px-5 py-3 rounded-xl hover:shadow-lg'
                }
              >
                Productos
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="mt-8">
                <div className="my-4 ml-6">
                  <h2 className="font-bold">Balance actual:</h2>
                  <h2>${enterprise?.balance}</h2>
                </div>
                <div className="my-4 ml-6">
                  <h2 className="font-bold">RIF de la Empresa:</h2>
                  <h2>{enterprise?.rif}</h2>
                </div>
                <div className="my-4 ml-6">
                  <h2 className="font-bold">Categoría:</h2>
                  <div>
                    {enterprise?.category === 0 ? (
                      <span className="font-normal">
                        Construccion y metales
                      </span>
                    ) : null}
                    {enterprise?.category === 1 ? (
                      <span className="font-normal">Alimentos</span>
                    ) : null}
                    {enterprise?.category === 2 ? (
                      <span className="font-normal">Campo y Fertilizantes</span>
                    ) : null}
                    {enterprise?.category === 3 ? (
                      <span className="font-normal">
                        Plasticos y reutilizables
                      </span>
                    ) : null}
                    {enterprise?.category === 4 ? (
                      <span className="font-normal">Carton y desechables</span>
                    ) : null}
                    {enterprise?.category === 5 ? (
                      <span className="font-normal">
                        Tecnologia y computacion
                      </span>
                    ) : null}
                  </div>
                </div>
                {user?._id === enterprise?.owner._id ? (
                  <div className="w-full mb-4 text-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/enterprise/update/${enterprise?._id}`);
                      }}
                      className="bg-gray-50 shadow-lg font-medium text-black ring-primary-100 ring-2 hover:ring-0 mt-12 px-8 py-2 rounded-lg hover:text-white hover:bg-primary-100 "
                    >
                      Actualizar
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </Tab.Panel>
              <Tab.Panel className="">
                {user?.role === 2 ? (
                  <div className="w-full mb-4 text-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/create/${enterprise?._id}`);
                      }}
                      className="bg-gray-50 shadow-lg font-semibold text-primary-100 ring-primary-100 ring-2 hover:ring-0 mt-8 px-8 py-2 rounded-lg hover:text-white hover:bg-primary-100 "
                    >
                      Nuevo Producto
                    </button>
                  </div>
                ) : (
                  ''
                )}
                <ProductCard products={enterprise?.products} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        {active === 0 ? (
          <div className=""></div>
        ) : (
          <>
            <ProductCard products={enterprise?.products} />
          </>
        )}
      </div>
    </div>
  );
}
