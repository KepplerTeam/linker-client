import React from 'react';

export default function Search() {
	return(
		<React.Fragment>
			<div className="card flex items-center justify-between w-96 min-w-max mr-4">
				<div className="flex flex-col items-start h-full">
				<h2 className="text-2xl font-bold mb-auto">TMA-2 <br />Modular <br />Headphone</h2>
				<a href="#" className="nav-link">
					Shop Now
					<img className="ml-2 h-5" src="./icons/arrow-right.png" alt=">" />
				</a>
				</div>
				<img className="h-48" src="./TMA-2-Modular-Headphone.png" alt="" />
			</div>

			<div className="card flex items-center justify-between w-96 min-w-max mr-4">
				<div className="flex flex-col items-start h-full">
				<h2 className="text-2xl font-bold mb-auto">CO2 <br />Cable</h2>
				<a href="#" className="nav-link">
					Shop Now
					<img className="ml-2 h-5" src="./icons/arrow-right.png" alt=">" />
				</a>
				</div>
				<img className="h-48" src="./CO2-Cable.png" alt="" />
			</div>
		</React.Fragment>
	);
}