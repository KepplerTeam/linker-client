import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { Transaction } from '../../models';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import MinusCircleIcon from '../icons/MinusCircleIcon';
import XCircleIcon from '../icons/XCircleIcon';

interface RecargasPreviewProps {
  transaction?: Transaction;
  dontShow?: boolean;
}

export default function RecargasPreview({
  transaction,
  dontShow = false,
}: RecargasPreviewProps) {
  const router = useRouter();
  dayjs.extend(localizedFormat);
  return (
    <>
      <div className="bg-gray-50 shadow-lg hover:shadow-2xl rounded-xl w-auto h-auto pb-1 mb-7 mx-3">
        <div className="p-4">
          <h2 className="ml-3 mb-2 font-extrabold text-lg">
            {transaction?.clientId?.username}
          </h2>
          <div className="flex flex-row justify-between">
            <h4 className="ml-3 font-semibold">
              Monto:{' '}
              <span className="ml-0.5 text-primary-100 font-medium">
                ${transaction.amount}
              </span>
            </h4>
          </div>
          <div className="flex flex-row justify-between">
            <h4 className="ml-3 font-semibold">
              Fecha:{' '}
              <span className="ml-0.5 font-medium">
                {dayjs(transaction?.createdAt).format('ll')}
              </span>
            </h4>

            {transaction?.status === 0 ? (
              <MinusCircleIcon className="w-6 mr-3 text-black" />
            ) : null}
            {transaction?.status === 1 ? (
              <CheckCircleIcon className="w-6 mr-3 text-primary-100" />
            ) : null}
            {transaction?.status === 2 ? (
              <XCircleIcon className="w-6 mr-3 text-red-600" />
            ) : null}
          </div>
          {!dontShow ? (
            <div className="flex justify-center">
              <motion.button
                className="bg-primary-100 hover:bg-primary-600 rounded-lg text-white font-bold mt-5 py-2 px-8 shadow-md"
                onClick={() => router.push(`/transaction/${transaction?._id}`)}
              >
                Ver detalles
              </motion.button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
