import React from 'react';
import Product from './Product';

export default function ProductFeed() {
	return(
		<div className="flex scroll-x mb-4">
      <Product />
      <Product />
      <Product />
    </div>
	);
}