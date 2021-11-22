import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { GET_BILLS, GET_ENTERPRISES } from '../../graphql/queries';
import { useUser } from '../../hooks/useUser';
import { Bill, Enterprise } from '../../models';
import EnterpriseCard from '../enterprise/EnterpriseCard';
import OrdersResume from './OrdersResume';

export default function ProviderData() {
  const [user] = useUser();
  const router = useRouter();
  // Busca todas las empresas que pertenezcan al usuario (solo para empresarios)
  const { data, loading } = useQuery<{ enterprises: Enterprise[] }>(
    GET_ENTERPRISES,
    {
      variables: { filter: { owner: user?._id } },
      fetchPolicy: 'network-only',
    }
  );
  const { data: billsData, loading: loadingBillsData } = useQuery<{
    bills: Bill[];
  }>(GET_BILLS, {
    variables: { filter: { enterpriseOwner: user?._id } },
    fetchPolicy: 'network-only',
  });
  return (
    <div>
      <>
        {loading || loadingBillsData ? (
          <div>
            <h2>loading...</h2>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center px-6 pb-4 pt-8 border-t-2 shadow-inner">
              <h2 className="font-bold text-lg mb-8">Resumen de Ventas</h2>
              <div
                id="parent-scroll"
                className="flex whitespace-nowrap overflow-auto ml-4 items-center"
              >
                {billsData?.bills?.map((bill) => (
                  <div key={bill?._id}>
                    <OrdersResume bill={bill} isSeller />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 px-6 pb-4 pt-8  border-t-2 shadow-inner">
              <div className="flex flex-row justify-between mb-4">
                <div>
                  <h2 className="font-bold text-lg">Mis Empresas</h2>
                </div>
                <div>
                  <motion.button
                    className="bg-primary-100 hover:bg-primary-600 shadow-md rounded-lg px-3 py-1 w-full text-white font-bold"
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
          </>
        )}
      </>
    </div>
  );
}
