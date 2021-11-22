import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../components/common/Footer';
import { Input } from '../../components/inputs';
import Nav from '../../components/Navbar/Nav';
import StarsRating from '../../components/review/StarsRating';
import { GET_BILL } from '../../graphql/queries';
import { Bill } from '../../models';

export default function ReviewPage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  const [reviewComment, setReviewComment] = React.useState('');

  const { data: orderData, loading: loadingOrderData } = useQuery<{
    bill: Bill;
  }>(GET_BILL, {
    variables: { filter: { _id: router.query._id } },
    fetchPolicy: 'network-only',
  });
  return (
    <div>
      <Nav open={open} setOpen={setOpen} />
      {loadingOrderData ? (
        <div>
          <h2>loading...</h2>
        </div>
      ) : (
        <div className="p-4 min-h-screen">
          {orderData.bill.products.map((product) => (
            <div className="">
              <h2>{product.name}</h2>
              <motion.button
                whileHover={{
                  scale: 1.005,
                  boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
                }}
                value=""
                type="button"
                className=" h-11 bg-primary-100 text-white rounded-2xl px-4 py-2"
                onClick={() => router.push(`/product/review/${product._id}`)}
              >
                <span>Rate Product</span>
              </motion.button>
            </div>
          ))}
          <div>
            <div className="flex mt-6">
              <h2 className="mr-3">Que Opinas del Vendedor?</h2>
              <div className="mt-1">
                <StarsRating
                  rating={rating}
                  setRating={setRating}
                  hover={hover}
                  setHover={setHover}
                />
              </div>
            </div>
            <div className="mt-6">
              <h2>Comentario</h2>
              <Input
                type="comment"
                id="comment"
                name="comment"
                placeholder=""
                className="w-3/4 h-8 my-1 text-sm "
                value={reviewComment}
                setValue={setReviewComment}
                label=""
              />
            </div>
            <motion.button
              whileHover={{
                scale: 1.005,
                boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
              }}
              value=""
              type="button"
              className="w-full h-11 bg-primary-100 text-white rounded-2xl px-4 py-2 my-12"
            >
              <span>Guardar Review</span>
            </motion.button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
