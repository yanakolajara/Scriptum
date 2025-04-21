import React from 'react';
import './Cta.scss';

// todo: change file name
export const Cta = ({ text, children, onClick, className, ...props }) => {
  return (
    <button className={`cta ${className}`} onClick={onClick} {...props}>
      {children || text || 'CTA'}
    </button>
  );
};
