import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { GET_ENTERPRISES, GET_USER } from '../../graphql/queries';
import { Enterprise, User } from '../../models';
import EnterpriseCard from '../enterprise/EnterpriseCard';
import { EditIcon } from '../icons';
import CashIcon from '../icons/CashIcon';
import OrdersResume from './OrdersResume';

interface ProfilePageComponentProps {
  user: User;
}

export default function ProfilePageComponent({
  user,
}: ProfilePageComponentProps) {
  const { data, loading } = useQuery<{ enterprises: Enterprise[] }>(
    GET_ENTERPRISES,
    {
      variables: { filter: { owner: user?._id } },
      fetchPolicy: 'network-only',
    }
  );
  const router = useRouter();

  const summaryPrueba = [
    {
      owner: user?._id,
      product: [
        {
          _id: 1,
          name: 'Producto 1',
          serial: '123',
          description: 'lorem ipsum',
          price: 13.99,
        },
        {
          _id: 2,
          name: 'Producto 2',
          serial: '1234',
          description: 'lorem1 ipsum',
          price: 3.99,
        },
        {
          _id: 3,
          name: 'Producto 3',
          serial: '12345',
          description: 'lorem2 ipsum',
          price: 22.99,
        },
      ],
      totalPrice: 13.99 + 3.99 + 22.99,
      _id: 1,
    },
    {
      owner: user?._id,
      product: [
        {
          _id: 1,
          name: 'Producto 1',
          serial: '123',
          description: 'lorem ipsum',
          price: 13.99,
        },
        {
          _id: 2,
          name: 'Producto 2',
          serial: '1234',
          description: 'lorem1 ipsum',
          price: 3.99,
        },
        {
          _id: 3,
          name: 'Producto 3',
          serial: '12345',
          description: 'lorem2 ipsum',
          price: 22.99,
        },
      ],
      totalPrice: 13.99 + 3.99 + 22.99,
      _id: 2,
    },
    {
      owner: user?._id,
      product: [
        {
          _id: 1,
          name: 'Producto 1',
          serial: '123',
          description: 'lorem ipsum',
          price: 13.99,
        },
        {
          _id: 2,
          name: 'Producto 2',
          serial: '1234',
          description: 'lorem1 ipsum',
          price: 3.99,
        },
        {
          _id: 3,
          name: 'Producto 3',
          serial: '12345',
          description: 'lorem2 ipsum',
          price: 22.99,
        },
      ],
      totalPrice: 13.99 + 3.99 + 22.99,
      _id: 3,
    },
  ];

  return (
    <>
      <div className="w-full min-h-screen">
        <h2 className="text-lg font-bold p-4">Mi Perfil</h2>
        <div className="flex flex-row px-4 pb-4  space-x-3">
          <div>
            <img
              src={user?.image}
              alt={user?.dni}
              className="w-20 rounded-full object-contain h-auto"
            />
          </div>
          <div>
            <div className="flex flex-row">
              <h2 className="mt-3">
                {user?.firstName} {user?.lastName}
              </h2>
              <button type="button" className="ml-auto mt-3 h-auto">
                <EditIcon
                  className="w-4"
                  onClick={() => {
                    console.log('clicked');
                    router.push('/profile/edit');
                  }}
                />
              </button>
            </div>
            <h2 className="font-thin text-sm">{user?.email}</h2>
          </div>
        </div>
        <div className="border-b-2  pb-4 flex flex-row border rounded-xl">
          <div className="px-2 py-4 mt-2">
            <h2 className="font-bold text-2xl text-primary-100">USD 400</h2>
          </div>
          <div className="px-5 ml-auto mt-6 flex flex-row">
            <div className="bg-primary-100 rounded-lg text-white flex flex-row">
              <div className="mt-3 ml-3">
                <CashIcon className="w-5" />
              </div>
              <motion.button
                className="px-3 py-1 text-white font-bold"
                onClick={() => router.push('/recargar')}
              >
                <span>Recargar Wallet</span>
              </motion.button>
            </div>
          </div>
        </div>
        {user?.role === 1 ? (
          <div>
            <h2 className="p-4 font-bold text-lg">Mis Compras</h2>
            <div className="flex scroll-x scrollbar-hide">
              {summaryPrueba.map((bill, idx) => (
                <div className="w-full" key={idx}>
                  <OrdersResume prueba={bill} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {user?.role === 2 ? (
          <>
            {loading ? (
              <div>
                <h2>loading...</h2>
              </div>
            ) : (
              <>
                <div className="p-4">
                  <div>
                    <h2 className="font-bold text-lg">Resumen de Ventas</h2>
                  </div>
                  <div className="mt-56">
                    <div className="flex flex-row justify-between mb-4">
                      <div>
                        <h2 className="font-bold text-lg">Mis Empresas</h2>
                      </div>
                      <div>
                        <motion.button
                          className="bg-primary-100 rounded-lg px-3 py-1 w-full text-white font-bold"
                          onClick={() => router.push('/enterprise/register')}
                        >
                          Nueva Empresa
                        </motion.button>
                      </div>
                    </div>
                    <div>
                      <h2>
                        {data?.enterprises?.map((enterprise) => (
                          <div key={enterprise?._id}>
                            <EnterpriseCard enterprise={enterprise} />
                          </div>
                        ))}
                      </h2>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : null}
        {user?.role === 0 ? (
          <div className="p-4">
            <div>
              <h2 className="font-bold bg text-lg">Solicitudes de Recarga</h2>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
