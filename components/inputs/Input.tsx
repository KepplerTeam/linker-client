/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  setValue;
}

function _Input({
  label,
  className = '',
  name,
  setValue,
  ...rest
}: InputProps) {
  return (
    <label className="block w-full" htmlFor={name}>
      <span className="text-black text-lg font-semibold">{label}</span>
      <input
        className={`w-full rounded-2xl focus:ring-1 focus:border-primary-100 focus:ring-primary-100 ${className}`}
        name={name}
        onChange={(e) => {
          e.preventDefault();
          setValue(e.target.value);
        }}
        {...rest}
      />
    </label>
  );
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <_Input ref={ref} {...props} />
);
