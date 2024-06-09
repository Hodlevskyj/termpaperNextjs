import React, { ChangeEvent, MouseEvent } from 'react';

interface InputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
  label?: string;
}

const Inputs = ({ value, onChange, onClick, disabled, type = "text", label }: InputProps) => {
  return (
    <div className='relative w-full lg:w-[30rem]'>
      <input
        value={value}
        onChange={onChange}
        onClick={onClick} 
        disabled={disabled}
        type={type}
        className='outline-none p-4 border-2 border-neutral-300'
      />
      <label>{label}</label>
    </div>
  );
}

export default Inputs;
