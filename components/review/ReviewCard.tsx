import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';

interface ReviewCardProps {
  name: string;
  comment: string;
  rating: number;
}

export default function ReviewCard({
  name = '',
  comment = '',
  rating = 0,
}: ReviewCardProps) {
  dayjs.extend(localizedFormat);
  return (
    <div className="w-full h-auto">
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <img
            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
            alt={name}
            className="w-3/4"
          />
        </div>
        <div className="col-span-3">
          <div className="flex flex-row justify-between">
            <div>
              <h2>{name}</h2>
              <h2>Rating: {Math.round(rating * 100) / 100}</h2>
            </div>
          </div>
          <h2>{comment}</h2>
        </div>
      </div>
    </div>
  );
}
