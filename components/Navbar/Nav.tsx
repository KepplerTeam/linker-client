import React from 'react';

export default function Nav() {
	return(
		<div className="nav p-3">
        	<a className="flex items-center" href="#">
          		<img className="h-7" src="./icons/menu-variant.svg" alt="Menu" />
        	</a>
        	<a className="mx-auto" href="#">
          		<img className="h-8" src="./logo.svg" alt="Linker" />
        	</a>
        	<a className="flex items-center" href="#">
          		<img className="h-7" src="./profile-pic.png" alt="Perfil" />
       		</a>
      	</div>
	);
}