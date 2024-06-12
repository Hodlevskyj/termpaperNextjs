import React from 'react';
import { IconType } from 'react-icons';

interface CategoryCardProps {
  selected?: boolean;
  label: string;
//   icon: IconType; // Ensure IconType is imported from 'react-icons'
  onClick: (value: string) => void;
}

// const CategoryCard = ({ selected, label, icon: Icon, onClick }: CategoryCardProps) => {
const CategoryCard = ({ selected, label, onClick }: CategoryCardProps) => {
  return (
    <div onClick={() => onClick(label)} className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2
     hover:border-slate-500 transition ${selected ? 'border-purple-800' : 'border-slate-200'}`}>
      {/* <Icon size={30} /> */}
      <div className='font-medium'>{label}</div>
    </div>
  );
}

export default CategoryCard;
