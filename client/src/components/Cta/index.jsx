import React from 'react';

export const Cta = ({ text, children, onClick, className, ...props }) => {
  const defaut = 'border-1 rounded-md p-1.5 hover:bg-gray-200 cursor-pointer';
  return (
    <button className={`${defaut} ${className}`} onClick={onClick} {...props}>
      {children || text || 'CTA'}
    </button>
  );
};
