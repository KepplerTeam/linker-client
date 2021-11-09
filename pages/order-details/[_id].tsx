import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../components/common/Footer';
import Nav from '../../components/Navbar/Nav';
import OrderDetails from '../../components/orderDetails/OrderDetails';
import { GET_BILL } from '../../graphql/queries';
import { Bill } from '../../models';

export default function OrderDetailsPage() {
  const router = useRouter();
  const { data: orderData, loading: loadingOrderData } = useQuery<{
    bill: Bill;
  }>(GET_BILL, {
    variables: { filter: { _id: router.query._id } },
    fetchPolicy: 'network-only',
  });
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      {!loadingOrderData && orderData ? (
        <>
          <Nav open={open} setOpen={setOpen} />
          <OrderDetails bill={orderData.bill} />
          <Footer />
        </>
      ) : (
        <div>
          <h2>loading...</h2>
        </div>
      )}
    </div>
    // <div>
    //   <Nav open={open} setOpen={setOpen} />
    //   <OrderDetails bill={orderData?.bill} />
    //   <Footer />
    // </div>
  );
}
