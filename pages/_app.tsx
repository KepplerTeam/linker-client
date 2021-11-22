import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import '../styles/main.css';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { useApollo } from '../hooks/useApollo';
import { UserContextProvider } from '../context';
import ToastContextProvider from '../context/ToastContext';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  React.useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      NProgress.start();
    });

    Router.events.on('routeChangeComplete', () => {
      NProgress.done();
    });

    Router.events.on('routeChangeError', () => {
      NProgress.done();
    });
<<<<<<< HEAD
  //localStorage.setItem('token', '');
=======
    // localStorage.setItem('token', '');
>>>>>>> 64ae4cce95cc5a76434aed7d44600ee9b300a700
  }, []);
  return (
    <ApolloProvider client={apolloClient}>
      <>
        <Head>
          <title>Linker</title>
        </Head>
        <UserContextProvider>
          <ToastContextProvider>
            <Component {...pageProps} />
          </ToastContextProvider>
        </UserContextProvider>
      </>
    </ApolloProvider>
  );
}

export default MyApp;
