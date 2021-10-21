//enviroment
const DEV_ENDPOINT = 'http://localhost:5555/graphql';
const PROD_ENDPOINT = 'https://dev-linker-client.vercel.app/';

export const ENDPOINT =
  process.env.NODE_ENV === 'development' ? DEV_ENDPOINT : PROD_ENDPOINT;
