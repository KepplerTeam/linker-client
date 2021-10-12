import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';
import { User } from '../models/index';

export default function Home() {
  const { data, loading } = useQuery<{
    users: User[];
  }>(GET_USERS, {
    fetchPolicy: 'network-only',
  });
  return (
    <div>
      {(loading && <div className="">Hello World</div>) ||
        data?.users.map((user) => (
          <h1>
            username: {user.username} id: {user._id}
          </h1>
        ))}
    </div>
  );
}
