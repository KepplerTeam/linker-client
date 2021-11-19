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
    variables: { filter: {} },
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
            <div className="p-4">
              <div>
                <h2 className="font-bold text-lg">Resumen de Ventas</h2>
                <div>
                  {billsData?.bills?.map((bill) => (
                    <div key={bill?._id}>
                      <OrdersResume bill={bill} />
                    </div>
                  ))}
                </div>
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
    </div>
  );
}