import React from 'react';
import { TrashIcon } from '../icons';

export default function CartProduct() {
	return(
		<div className="card flex flex-row px-8 items-center justify-center w-full">
				<img className="h-32 w-auto p-4 bg-gray-100 rounded-3xl" src="./TMA-2-Modular-Headphone.png" alt="" />
				<div className="py-5 pl-5 flex flex-col items-start h-full w-full">
					<h4 className="text-l font-light mb-auto">TMA-2 Comfort Wireless</h4>
					<h5 className="text-sm font-bold mb-3">USD 270</h5>
					<div className="flex flex-row items-center justify-between w-full">
						<div className="flex mr-auto">
							<button type="button" className="cart w-7 mr-2"> - </button>
							<p>1</p>
							<button type="button" className="cart w-7 ml-2"> + </button>
						</div>
						<a className="">
						<TrashIcon className="w-5 h-5 opacity-50"/>
						</a>
					</div>
				</div>
			</div>
	);
}