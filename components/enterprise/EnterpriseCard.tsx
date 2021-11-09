import { useRouter } from 'next/router';
import React from 'react';
import { Enterprise } from '../../models';

interface EnterpriseCardProps {
  enterprise: Enterprise;
}

export default function EnterpriseCard({ enterprise }: EnterpriseCardProps) {
  const router = useRouter();
  return (
    <div className="w-full my-8">
      <button
        type="button"
        className="text-left"
        onClick={() => router.push(`/enterprise/${enterprise?._id}`)}
      >
        <img
          src={enterprise?.banner}
          alt={enterprise?.name}
          className="object-contain opacity-60 rounded-md"
        />
        <div className="w-full">
          <h2 className="text-lg font-bold">{enterprise?.name}</h2>
        </div>
      </button>
    </div>
  );
}
