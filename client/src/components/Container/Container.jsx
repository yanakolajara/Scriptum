import React from 'react';
import './Container.scss';

export default function Container({ children }) {
  return (
    <div
      // class='w-60  text-slate-600 border border-slate-300 grid grid-col-2 justify-center p-4 gap-4 rounded-lg shadow-md max-h-[200px]'
      className='container'
    >
      {children}
    </div>
  );
}

Container.divider = () => {
  return <div className='container__divider' />;
};

Container.content = ({ children }) => {
  return <div className='container__content'>{children}</div>;
};
