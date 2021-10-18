import React from 'react';

export default function Search() {
	return(
		<div className="w-full mt-3 p-6">
        	<h4 className="text-lg font-light pb-2">Bienvenido, “username”</h4>
        	<h1 className="text-3xl font-bold">¿Qué desea comprar hoy?</h1>
        	<input className="input-text" type="text" name="search" id="search" placeholder="Buscar Productos"/>
    	</div>
	);
}