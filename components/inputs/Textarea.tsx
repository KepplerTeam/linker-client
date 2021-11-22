/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export interface TextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
  setValue;
}
function _Textarea({
  label,
  className = '',
  name,
  setValue,
  ...rest
}: TextareaProps) {
  return (
    <label className="block w-full" htmlFor={name}>
      <span className="text-primary-500 font-semibold">{label}</span>
      <textarea
        className={`mt-1 block w-full text-neutral-800 border-0 border-b h-52 ${className}`}
        name={name}
        onChange={(e) => {
          // e.preventDefault();
          setValue(e.target.value);
        }}
        {...rest}
      />
    </label>
  );
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => <_Textarea ref={ref} {...props} />
);
