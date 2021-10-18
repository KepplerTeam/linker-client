import React from 'react';

export default function FeaturedProduct() {
	return(
		<React.Fragment>
          <div className="card flex flex-col items-start w-56 min-w-max mr-4">
            <img className="h-48" src="./TMA-2-Modular-Headphone.png" alt="" />
            <h2 className="text-lg text-left font-normal mb-auto">TMA-2 HD Wireless</h2>
            <h3 className="text-lg text-left font-bold mb-auto">USD 350</h3>
          </div>
          <div className="card flex flex-col items-start w-56 min-w-max mr-4">
            <img className="h-48" src="./CO2-Cable.png" alt="" />
            <h2 className="text-lg text-left font-normal mb-auto">CO2 Cable</h2>
            <h3 className="text-lg text-left font-bold mb-auto">USD 150</h3>
          </div>
        </React.Fragment>
	);
}