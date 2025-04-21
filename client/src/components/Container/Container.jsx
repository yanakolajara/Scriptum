import React from 'react';
import './Container.scss';

export default function Container({ children, className }) {
  return <div className={`container ${className}`}>{children}</div>;
}

Container.divider = () => {
  return <div className='container__divider' />;
};

Container.content = ({ children }) => {
  return <div className='container__content'>{children}</div>;
};
