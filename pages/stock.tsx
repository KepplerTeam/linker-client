import React from 'react';
import TitleBar from '../components/common/TitleBar';
import CardHome from '../components/home/CardHome';
import Footer from '../components/common/Footer';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { Product } from '../models';

export default function Stock() {
	const { data, loading } = useQuery<{
    products: Product[];
  	}>(GET_PRODUCTS, {
    variables: {filter:{ enterprise:"616f7e542f597f6abcaaa177" }},
    fetchPolicy: 'network-only',
  	});

	return (
		<React.Fragment>
			{(loading && (
				<div className="h-screen w-full justify-center my-auto">
			  		<h2>Loading...</h2>
				</div>
		  	)) || (
				<React.Fragment>
					<TitleBar />
					<h1 className="text-3xl font-bold p-6">Mis Productos</h1>
					<CardHome products={data.products}/>
					<Footer />
				</React.Fragment>
		  	)}
		</React.Fragment>
  );
}
