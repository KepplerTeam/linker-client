import React from 'react';
import ProductFeed from './ProductFeed';
import FeaturedProductFeed from './FeaturedProductFeed';

export default function CardHome() {
	return(
		<div className="card-home">
			<div className="nav scroll-x mb-4 pr-4">
			<button className="nav-item active">Construcci&oacute;n</button>
			<button className="nav-item">Comida</button>
			<button className="nav-item">Pl&aacute;stico</button>
			<button className="nav-item mr-0">Cart&oacute;n</button>
			</div>

			<ProductFeed />
        
			<div className="flex justify-between mt-8 mb-2 pr-4">
			<h3 className="text-lg font-normal pb-2">Productos Destacados</h3>
			<a className="font-light text-gray-600 pb-2" href="#">Ver Todos</a>
			</div>

			<FeaturedProductFeed />

      	</div>
	);
}