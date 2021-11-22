/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { StarIcon } from '../icons';

interface ReviewsPageComponentProps {
  rating;
  setRating;
  hover;
  setHover;
}

export default function StarsRating({
  rating,
  setRating,
  hover,
  setHover,
}: ReviewsPageComponentProps) {
  return (
    <div className="">
      <div>
        <div className="flex">
          {[...Array(5)].map((star, idx) => {
            const ratingValue = idx + 1;
            return (
              <div key={idx}>
                <label>
                  <input
                    type="radio"
                    name="rating"
                    className="hidden"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <StarIcon
                    className={`w-5 cursor-pointer fill-current ${
                      ratingValue <= (hover || rating)
                        ? 'text-yellow-300'
                        : 'text-gray-200'
                    }`}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
