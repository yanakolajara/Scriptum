import { Cta } from '@/components/Cta/Cta';
import './Form.scss';

export const Form = ({ children, onSubmit, ...rest }) => {
  return (
    <form className='form' onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
};

Form.Input = ({ type, value, onChange, label, ...props }) => {
  return (
    <label>
      {label}
      <input
        className={`form__input form__input-${type}`}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    </label>
  );
};

Form.InputTextArea = ({ type, value, onChange, label, ...props }) => {
  return (
    <label style={{ display: 'flex', flexDirection: 'column' }}>
      {label}
      <textarea
        className={`form_input form__input-${type}`}
        value={value}
        onChange={onChange}
        rows='4'
        cols='50'
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

Form.Submit = ({ text, ...props }) => {
  return (
    <Cta id='submit' type='submit' text={text} {...props}>
      {text}
    </Cta>
  );
};
