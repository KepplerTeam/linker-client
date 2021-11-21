import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import ProductOverview from '../../../components/product/ProductOverview';
import { GET_PRODUCT } from '../../../graphql/queries';
import { useUser } from '../../../hooks/useUser';
import { Product } from '../../../models';

export default function ReviewProductPage() {
  const router = useRouter();
  const [user] = useUser();
  const [rating, setRating] = React.useState(null);
  const [hover, setHover] = React.useState(null);

  const { data, loading } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { filter: { _id: router.query._id } },
    fetchPolicy: 'network-only',
  });
  return (
    <div>
      {loading ? (
        <div>
          <h2>loading...</h2>
        </div>
      ) : (
        <div>
          <ProductOverview product={data.product} isReview />
        </div>
      )}
    </div>
  );
}
