import React from 'react';
import { FieldValues, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from "@/components/ui/input";

interface InputProps {
  id: string;
  type?: string;
  disabled?: boolean;
  required: boolean;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<InputProps> = ({
  id,
  type = "text",
  disabled,
  required,
  register,
  errors,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className='w-full mb-6 relative'>
      <Input
        id={id}
        {...register(id, { required })}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value} 
        onChange={onChange} 
        className={`w-full p-4 pt-4 outline-none rounded-md 
        ${errors[id] ? 'border-rose-400' : 'border-slate-300'} 
        ${errors[id] ? 'focus:border-rose-400' : 'focus:border-slate-300'}`}
      />
    </div>
  );
};

export default CustomInput;
