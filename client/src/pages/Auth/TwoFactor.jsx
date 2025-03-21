import { useEffect, useState } from 'react';
import { resendCode, verify } from '../../api/user.api';
import { useNavigate } from 'react-router-dom';
import { getDataFromLS } from '../../utils/window.utils';
import { isCodeComplete } from './utils/validators.utils';

// Validates if the entered char is valid
const isValidChar = (char) => {
  const validChars = '0123456789';
  return validChars.includes(char);
};

export default function TwoFactor() {
  //TODO: Move state functions to custom hooks

  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    // validates if character is a string with a number
    if (isValidChar(value.slice(-1))) {
      setCode(value);
    }
  };

  const handleVerify = async () => {
    // Retrieve email from local storage/cookie
    const email = getDataFromLS('user');
    await verify({ email, code })
      .then((res) => {
        alert(res.message);
        navigate('/');
      })
      .catch((err) => {
        alert(err.message);
        resendCode(email);
        setCode('');
      });
  };

  const handleResend = async (e) => {
    e.preventDefault();
    const email = getDataFromLS('user');
    await resendCode(email);
    alert('Code resent');
  };

  useEffect(() => {
    // verifies if code is complete (6 digits)
    if (isCodeComplete(code)) {
      handleVerify();
    }
  }, [code]);
  return (
    <div>
      <h1>Verify</h1>
      <p>Check your inbox</p>
      <form>
        <input
          type='text'
          value={code}
          onChange={handleChange}
          placeholder='Enter code'
          maxLength={6}
          required
          disabled={isCodeComplete(code)}
        />
        <p>
          Din't receive it?{' '}
          <a href='/#' onClick={handleResend}>
            {' '}
            Resend
          </a>
        </p>
      </form>
    </div>
  );
}
