import React from 'react';

export const Cta = ({ text, onClick, ...props }) => {
  return (
    <button
      className='border-1 rounded-md p-1.5 hover:bg-gray-200 cursor-pointer'
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};
