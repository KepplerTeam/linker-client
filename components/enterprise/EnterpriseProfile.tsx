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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function EnterpriseProfile({
  user,
  enterprise,
}: EnterpriseProfileProps) {
  const [active, setActive] = React.useState(0);
  const [categories] = React.useState({
    Información: [
      {
        id: 1,
        title: 'RIF de la empresa: ',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Productos: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
  });
  return (
    <div className="min-h-screen p-4">
      <div>
        <img
          src={enterprise?.banner}
          alt=""
          className="w-full object-contain"
        />
        <div className="mt-2 text-3xl text-center">
          <h2>{enterprise?.name}</h2>
        </div>
        <div className="flex flex-row justify-around overflow-x-scroll scrollbar-hide space-x-5 py-2 my-4">
          <motion.button
            whileHover={{
              scale: 1.005,
              boxShadow: '00px 0px 4px rgb(0, 0, 0, 0.2)',
            }}
            value=""
            className="font-semibold p-2 rounded-md"
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
      <div className="w-full max-w-md px-2 py-16 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
            <Tab className="w-full py-2.5 text-lg leading-5 font-medium focus:text-primary-100 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60">
              Información
            </Tab>
            <Tab className="w-full py-2.5 text-lg leading-5 font-medium text-blue-700 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60">
              Productos
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                'bg-white rounded-xl p-3',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}
            >
              <ul>
                <li className="relative p-3 rounded-md hover:bg-coolGray-100">
                  <h3 className="text-sm font-medium leading-5">Title</h3>
                  <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
                    <li />
                    <li>&middot;</li>
                    <li> comments</li>
                    <li>&middot;</li>
                    <li>shares</li>
                  </ul>
                </li>
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      {active === 0 ? (
        <div className="">
          <div className="my-4">
            <h2 className="font-bold">Balance actual</h2>
            <h2>${enterprise?.balance}</h2>
          </div>
          <div className="my-4">
            <h2 className="font-bold">Rif de la Empresa</h2>
            <h2>{enterprise?.rif}</h2>
          </div>
          <div className="my-4">
            <h2 className="font-bold">
              Categoria:{' '}
              {enterprise?.category === 0 ? (
                <span className="font-normal">Construccion y metales</span>
              ) : null}
              {enterprise?.category === 1 ? (
                <span className="font-normal">Alimentos</span>
              ) : null}
              {enterprise?.category === 2 ? (
                <span className="font-normal">Campo y Fertilizantes</span>
              ) : null}
              {enterprise?.category === 3 ? (
                <span className="font-normal">Plasticos y reutilizables</span>
              ) : null}
              {enterprise?.category === 4 ? (
                <span className="font-normal">Carton y desechables</span>
              ) : null}
              {enterprise?.category === 5 ? (
                <span className="font-normal">Tecnologia y computacion</span>
              ) : null}
            </h2>
          </div>
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
        </div>
      ) : (
        <>
          <ProductCard products={enterprise?.products} />
          {user?.role === 2 ? (
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
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
}
