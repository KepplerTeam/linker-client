import { useQuery } from '@apollo/client';
import Nav from '../components/Navbar/Nav';
import Search from '../components/home/Search';
import CardHome from '../components/home/CardHome';
import Footer from '../components/common/Footer';
import { GET_PRODUCTS } from '../graphql/queries';
import { Product } from '../models';

export default function Home() {
  return (
    <div className="w-screen h-full p-0">
      <div>
        <Nav />
        <Search />
        <CardHome />
        <Footer />
      </div>
    </div>
  );
}
