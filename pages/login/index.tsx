import { useRouter } from 'next/router';
import React from 'react';
import LoginForm from '../../components/authentication/LoginForm';
import { useUser } from '../../hooks/useUser';

export default function LoginPage() {
  const [user] = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.push('/feed');
    }
  }, [user]);
  return (
    <div>
      <div>
        <LoginForm />
      </div>
    </div>
  );
}
