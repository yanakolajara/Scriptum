import React from 'react';
import './Cta.scss';

export const Cta = ({ text, children, onClick, className, ...props }) => {
  return (
    <button className={`cta ${className}`} onClick={onClick} {...props}>
      {children || text || 'CTA'}
    </button>
  );
};
