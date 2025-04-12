import React from 'react';

export const Cta = ({ text, children, onClick, style, ...props }) => {
  const className = `border-1 rounded-md p-1.5 hover:bg-gray-200 cursor-pointer ${style}`;
  return (
    <button className={className} onClick={onClick} {...props}>
      {children || text || 'CTA'}
    </button>
  );
};
