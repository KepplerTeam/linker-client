import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../components/common/Footer';
import Nav from '../../components/Navbar/Nav';
import ProductOverview from '../../components/product/ProductOverview';
import { GET_PRODUCT } from '../../graphql/queries';
import { Product } from '../../models';
import Loading from '../../components/common/Loading';

export default function StockProductDetailsPage() {
  const router = useRouter();
  const { data, loading } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { filter: { _id: router.query._id } },
    fetchPolicy: 'network-only',
  });
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {(loading && (
        <div className="w-screen h-full p-0 bg-gray-200">
          <Nav open={open} setOpen={setOpen} />
          <Loading />
          <Footer />
        </div>
      )) || (
        <div>
          <Nav open={open} setOpen={setOpen} />
          <ProductOverview product={data.product} />
          <Footer />
        </div>
      )}
    </>
  );
}
