import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import ProductOverview from '../../../components/product/ProductOverview';
import { GET_PRODUCT } from '../../../graphql/queries';
import { useUser } from '../../../hooks/useUser';
import { Product } from '../../../models';
import Nav from '../../../components/Navbar/Nav';
import Loading from '../../../components/common/Loading';
import Footer from '../../../components/common/Footer';

export default function ReviewProductPage() {
  const router = useRouter();
  const [user] = useUser();
  const [rating, setRating] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const { data, loading } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { filter: { _id: router.query._id } },
    fetchPolicy: 'network-only',
  });
  return (
    <div>
      {loading ? (
        <div className="w-screen h-full p-0 bg-gray-200">
          <Nav open={open} setOpen={setOpen} />
          <Loading />
          <Footer />
        </div>
      ) : (
        <div>
          <Nav open={open} setOpen={setOpen} />
          <ProductOverview product={data.product} isReview />
          <Footer />
        </div>
      )}
    </div>
  );
}
