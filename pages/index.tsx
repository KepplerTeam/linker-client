import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';
import { User } from '../models/index';

import Nav from '../components/Navbar/Nav';
import Search from '../components/home/Search';
import CardHome from '../components/home/CardHome';
import Footer from '../components/common/Footer';

export default function Home() {
  // const { data, loading } = useQuery<{
  //   users: User[];
  // }>(GET_USERS, {
  //   fetchPolicy: 'network-only',
  // });
  // return (
  //   <div>
  //     {(loading && <div className="">Hello World</div>) ||
  //       data?.users.map((user) => (
  //         <h1>
  //           username: {user.username} id: {user._id}
  //         </h1>
  //       ))}
  //   </div>
  // );

  return (
    <div className="w-screen h-full p-0">
      <Nav />
      <Search />
      <CardHome />
      <Footer />
    </div>
  );
}
