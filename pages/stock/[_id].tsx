import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../components/common/Footer';
import Nav from '../../components/Navbar/Nav';
import ProductOverview from '../../components/product/ProductOverview';
import { GET_PRODUCT } from '../../graphql/queries';
import { Product } from '../../models';

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
        <div className="h-screen w-full justify-center my-auto">
          <h2>Loading...</h2>
        </div>
      )) || (
        <div>
          <Nav open={open} setOpen={setOpen} />
          <ProductOverview
            product={data.product}
            hasEdit
            title="Editar"
            isUpdate
          />
          <Footer />
        </div>
      )}
    </>
  );
}
