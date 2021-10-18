import React from 'react';
import TitleBar from '../components/common/TitleBar';
import CardHome from '../components/home/CardHome';
import Footer from '../components/common/Footer';

export default function Stock() {
	return (
		<React.Fragment>
			<TitleBar />
			<CardHome />
			<Footer />
		</React.Fragment>
  );
}
