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
      <div className="bg-gray-100 rounded-xl w-full h-32">
        <div className="p-4">
          <h2 className="font-bold text-lg">
            {transaction?.clientId?.username}
          </h2>
          <div className="flex flex-row justify-between">
            <h2>
              Monto solicitado:{' '}
              <span className="text-primary-100 font-bold">
                ${transaction.amount}
              </span>
            </h2>
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
          <h2>
            Fecha de solicitud: {dayjs(transaction?.createdAt).format('ll')}
          </h2>
          {!dontShow ? (
            <motion.button
              className="bg-primary-100 rounded-full w-full text-white font-bold mt-3 py-px"
              onClick={() => router.push(`/transaction/${transaction?._id}`)}
            >
              Ver detalles
            </motion.button>
          ) : null}
        </div>
      </div>
    </>
  );
}
