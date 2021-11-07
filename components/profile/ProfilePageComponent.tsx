import { useRouter } from 'next/router';
import React from 'react';
import { User } from '../../models';
import { EditIcon } from '../icons';

interface ProfilePageComponentProps {
  user: User;
}

export default function ProfilePageComponent({
  user,
}: ProfilePageComponentProps) {
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="flex flex-row p-4 space-x-3">
        <div>
          <img
            src={user?.image}
            alt={user?.dni}
            className="w-20 rounded-full object-contain h-auto"
          />
        </div>
        <div>
          <div className="flex flex-row">
            <h2 className="mt-3">
              {user?.firstName} {user?.lastName}
            </h2>
            <button type="button" className="ml-auto mt-3 h-auto">
              <EditIcon
                className="w-4"
                onClick={() => {
                  console.log('clicked');
                  router.push('/profile/edit');
                }}
              />
            </button>
          </div>
          <h2 className="font-thin text-sm">{user?.email}</h2>
        </div>
      </div>
    </div>
  );
}
