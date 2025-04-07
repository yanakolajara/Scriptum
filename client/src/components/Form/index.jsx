import { Cta } from 'components/Cta';
import React from 'react';

export const Form = ({ children, onSubmit, ...rest }) => {
  return (
    <form className='flex flex-col gap-2.5' onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
};

Form.InputText = ({ value, onChange, ...props }) => {
  return (
    <input
      id='title'
      type='text'
      name='title'
      value={value}
      onChange={onChange}
      className='w-full border-1 rounded-md p-1.5'
      {...props}
    />
  );
};

Form.InputTextArea = ({ value, onChange, ...props }) => {
  return (
    <textarea
      id='content'
      type='text'
      name='content'
      rows='10'
      value={value}
      onChange={onChange}
      className='w-full border-1 rounded-md p-1.5 '
      {...props}
    />
  );
};

Form.InputDate = ({ value, onChange, ...props }) => {
  return (
    <input
      id='date'
      type='date'
      name='date'
      value={value}
      onChange={onChange}
      className='w-full border-1 rounded-md p-1.5'
      {...props}
    />
  );
};

Form.InputTime = ({ value, onChange, ...props }) => {
  return (
    <input
      id='time'
      type='time'
      name='time'
      value={value}
      onChange={onChange}
      className='w-full border-1 rounded-md p-1.5'
      {...props}
    />
  );
};

Form.InputDateTime = ({ value, onChange, ...props }) => {
  return (
    <input
      id='datetime'
      type='datetime-local'
      name='datetime'
      value={value}
      onChange={onChange}
      className='w-full border-1 rounded-md p-1.5'
      {...props}
    />
  );
};

Form.InputFile = ({ value, onChange, ...props }) => {
  return (
    <input
      id='file'
      type='file'
      name='file'
      value={value}
      onChange={onChange}
      className='w-full border-1 rounded-md p-1.5'
      {...props}
    />
  );
};

Form.InputCheckbox = ({ value, onChange, ...props }) => {
  return (
    <input
      id='checkbox'
      type='checkbox'
      name='checkbox'
      value={value}
      onChange={onChange}
      className='w-full border-1 rounded-md p-1.5'
      {...props}
    />
  );
};

Form.InputRadio = ({ value, onChange, ...props }) => {
  return (
    <input
      id='radio'
      type='radio'
      name='radio'
      value={value}
      onChange={onChange}
      className='w-full border-1 rounded-md p-1.5'
      {...props}
    />
  );
};

Form.Submit = ({ text, ...props }) => {
  return (
    <Cta id='submit' type='submit' name='submit' text={text} {...props}>
      {text}
    </Cta>
  );
};
