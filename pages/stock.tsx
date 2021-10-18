import React from 'react';
import TitleBar from '../components/common/TitleBar';
import CardHome from '../components/home/CardHome';
import Footer from '../components/common/Footer';

export default function Stock() {
	return (
		<React.Fragment>
			<TitleBar />
			<h1 className="text-3xl font-bold p-6">Mis Productos</h1>
			<CardHome />
			<Footer />
		</React.Fragment>
  );
}
