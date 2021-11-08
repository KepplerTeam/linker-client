import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../../components/common/Footer';
import Create from '../../../components/manageProducts/Create';
import Nav from '../../../components/Navbar/Nav';
import { GET_PRODUCT } from '../../../graphql/queries';
import { Product } from '../../../models';

export default function UpdateProductPage() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { data, loading } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { filter: { _id: router.query._id } },
    fetchPolicy: 'network-only',
  });
  return (
    <>
      {loading ? (
        <div>
          <h2>Loading...</h2>
        </div>
      ) : (
        <div>
          <Nav open={open} setOpen={setOpen} />
          <Create isUpdate product={data.product} />
          <Footer />
        </div>
      )}
    </>
  );
}
