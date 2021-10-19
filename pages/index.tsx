import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';
import { User } from '../models/index';

import Nav from '../components/Navbar/Nav';
import Search from '../components/home/Search';
import CardHome from '../components/home/CardHome';
import Footer from '../components/common/Footer';

export default function Home() {
  return (
    <div className="w-screen h-full p-0">
      <Nav />
      <Search />
      <CardHome />
      <Footer />
    </div>
  );
}
