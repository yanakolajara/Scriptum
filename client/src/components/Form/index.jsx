import { Cta } from 'components/Cta';
import React from 'react';

export const Form = ({ children, onSubmit, ...rest }) => {
  return (
    <form className='flex flex-col gap-2.5' onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
};

Form.InputText = ({ value, onChange, label, name, ...props }) => {
  return (
    <label>
      {label || name}
      <input
        type='text'
        name='title'
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
        name='content'
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
        name='email'
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
        name='date'
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
        name='time'
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
        name='datetime'
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
        name='file'
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
        name='checkbox'
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
