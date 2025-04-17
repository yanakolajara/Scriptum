import Button from 'components/Button/Button';
import { Cta } from 'components/Cta';
import React from 'react';
import { Link } from 'react-router-dom';

export const Form = ({ children, onSubmit, ...rest }) => {
  return (
    <form className='flex flex-col gap-2.5' onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
};

Form.Title = ({ children, text, ...props }) => {
  return (
    <h2 className='text-2xl font-bold' {...props}>
      {text || children}
    </h2>
  );
};

Form.InputText = ({ value, onChange, label, name, ...props }) => {
  return (
    <label>
      {label || name}
      <input
        type='text'
        name={name}
        value={value}
        onChange={onChange}
        className='w-full border-1 rounded-md p-1.5'
        {...props}
      />
    </label>
  );
};

Form.InputTextArea = ({ value, onChange, label, name, ...props }) => {
  return (
    <label>
      {label || name}
      <textarea
        type='text'
        name={name}
        rows='10'
        value={value}
        onChange={onChange}
        className='w-full border-1 rounded-md p-1.5 '
        {...props}
      />
    </label>
  );
};

Form.Email = ({ value, onChange, label, name, ...props }) => {
  return (
    <label>
      {label || name}
      <input
        type='email'
        value={value}
        onChange={onChange}
        className='w-full border-1 rounded-md p-1.5'
        {...props}
      />
    </label>
  );
};

Form.InputDate = ({ value, onChange, label, name, ...props }) => {
  return (
    <label>
      {label || name}
      <input
        type='date'
        value={value}
        onChange={onChange}
        className='w-full border-1 rounded-md p-1.5'
        {...props}
      />
    </label>
  );
};

Form.InputTime = ({ value, onChange, label, name, ...props }) => {
  return (
    <label>
      {label || name}
      <input
        type='time'
        value={value}
        onChange={onChange}
        className='w-full border-1 rounded-md p-1.5'
        {...props}
      />
    </label>
  );
};

Form.InputDateTime = ({ value, onChange, label, name, ...props }) => {
  return (
    <label>
      {label || name}
      <input
        type='datetime-local'
        value={value}
        onChange={onChange}
        className='w-full border-1 rounded-md p-1.5'
        {...props}
      />
    </label>
  );
};

Form.InputFile = ({ value, onChange, label, name, ...props }) => {
  return (
    <label>
      {label || name}
      <input
        type='file'
        value={value}
        onChange={onChange}
        className='w-full border-1 rounded-md p-1.5'
        {...props}
      />
    </label>
  );
};

Form.InputCheckbox = ({ value, onChange, label, name, ...props }) => {
  return (
    <label>
      {label || name}
      <input
        type='checkbox'
        value={value}
        onChange={onChange}
        className='w-full border-1 rounded-md p-1.5'
        {...props}
      />
    </label>
  );
};

Form.InputRadio = ({ value, onChange, ...props }) => {
  return (
    <input
      type='radio'
      value={value}
      onChange={onChange}
      className='w-full border-1 rounded-md p-1.5'
      {...props}
    />
  );
};

Form.Submit = ({ text, ...props }) => {
  return (
    <Cta id='submit' type='submit' text={text} {...props}>
      {text}
    </Cta>
  );
};

Form.Link = ({ children, text, to, ...props }) => {
  return (
    <Link to={to} {...props}>
      {children || text}
    </Link>
  );
};
