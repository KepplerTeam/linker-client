import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../components/common/Footer';
import Nav from '../../components/Navbar/Nav';
import { GET_BILL } from '../../graphql/queries';
import { Bill } from '../../models';
import { useUser } from '../../hooks/useUser';
import Loading from '../../components/common/Loading';

export default function ReviewPage() {
  const router = useRouter();
  const [user] = useUser();
  const [open, setOpen] = React.useState(false);

  const { data: orderData, loading: loadingOrderData } = useQuery<{
    bill: Bill;
  }>(GET_BILL, {
    variables: { filter: { _id: router.query._id } },
    fetchPolicy: 'network-only',
  });

  return (
    <div>
      <Nav open={open} setOpen={setOpen} />
      {orderData?.bill?.client?._id === user?._id ? (
        <div>
          {loadingOrderData ? (
            <div className="w-screen h-full p-0 bg-gray-200">
              <Loading />
            </div>
          ) : (
            <div>
              <div className="p-4 min-h-screen">
                {orderData.bill.products.map((product) => (
                  <div>
                    <h2>{product.name}</h2>
                    <p>Recibiste el producto ? Cuentanos en la siguiente pagina tu experiencia con el proveedor y el producto! </p>
                    <motion.button
                      whileHover={{
                        scale: 1.005,
                        boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/product/review/${product._id}`);
                      }}
                      type="button"
                      className="h-11  text-white rounded-2xl px-4 py-2text-white bg-primary-100 hover:cursor-pointer"
                    >
                      <span>Vamos</span>
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
      <Footer />
    </div>
  );
}
