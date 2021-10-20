import React from 'react';
import CartTitleBar from '../components/shoppingCart/CartTitleBar';
import CartProduct from '../components/shoppingCart/CartProduct';

export default function ShoppingCart() {
	return(
		<React.Fragment>
			<CartTitleBar />
			<CartProduct />
			<CartProduct />
			<div className="fixed bottom-0 w-full flex-col justify-center">
				<div className="flex flex-row px-8 items-center justify-between" >
					<h6 className="text-gray-500 mr">Total items: 2</h6>
					<h4 className="text-lg font-bold">USD 295</h4>
				</div>
				<button className="flex checkout">Proceed to checkout</button>
			</div>
		</React.Fragment>
	);
}