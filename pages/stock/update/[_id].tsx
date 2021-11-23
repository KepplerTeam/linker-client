import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../../components/common/Footer';
import Create from '../../../components/manageProducts/Create';
import { GET_PRODUCT } from '../../../graphql/queries';
import { Product } from '../../../models';
import Nav from '../../../components/Navbar/Nav';
import Loading from '../../../components/common/Loading';

export default function EditProductPage() {
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
          <Create isUpdate product={data.product} />
          <Footer />
        </div>
      )}
      {/* <h2>hi</h2> */}
    </>
  );
}
