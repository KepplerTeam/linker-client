import React from 'react';
import FeaturedProduct from './FeaturedProduct';

export default function FeaturedProductFeed() {
	return(
		<div className="flex scroll-x mb-4">
          <FeaturedProduct />
		  <FeaturedProduct />
		  <FeaturedProduct />
        </div>
	);
}