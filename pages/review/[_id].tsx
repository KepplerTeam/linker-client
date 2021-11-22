import { useMutation, useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../components/common/Footer';
import { Input } from '../../components/inputs';
import Nav from '../../components/Navbar/Nav';
import StarsRating from '../../components/review/StarsRating';
import { SET_REVIEW } from '../../graphql/mutations';
import { GET_BILL } from '../../graphql/queries';
import useNotify from '../../hooks/useNotify';
import { Bill } from '../../models';
import { useUser } from '../../hooks/useUser';

export default function ReviewPage() {
  const router = useRouter();
  const [user] = useUser();
  const [open, setOpen] = React.useState(false);
  const [reviewComment, setReviewComment] = React.useState('');
  const [uniqueProduct, setUniqueProduct] = React.useState([]);

  // const checkDuplicates = async () => {
  //   const { data: orderData, loading: loadingOrderData } = await useQuery<{
  //     bill: Bill;
  //   }>(GET_BILL, {
  //     variables: { filter: { _id: router.query._id } },
  //     fetchPolicy: 'network-only',
  //   });
  //   if(!loadingOrderData) {
  //     const products = orderData?.bill?.products;
  //     const uniqueProductList = []
  //     for(let x = 0; x < products.length; x++) {
  //       if(uniqueProductList.includes(products[x])) {
  //         console.log('producto repetido');
  //       } else {
  //         uniqueProductList.push(products[x])
  //       }
  //     }
  //     setUniqueProduct(uniqueProductList);
  //   }
  // };

  // React.useEffect(() => {
  //   checkDuplicates()
  // }, [])

  const [setReview] = useMutation(SET_REVIEW);

  const notify = useNotify();

  return (
    <div>
      <Nav open={open} setOpen={setOpen} />

        <div className="p-4 min-h-screen">
          {uniqueProduct.map((product) => (
            <div className="">
              <h2>{product.name}</h2>
              <motion.button
                whileHover={{
                  scale: 1.005,
                  boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
                }}
                value=""
                type="button"
                className="h-11  text-white rounded-2xl px-4 py-2text-white bg-primary-100 hover:cursor-pointer"
              >
                <span>Rate Product</span>
              </motion.button>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}
