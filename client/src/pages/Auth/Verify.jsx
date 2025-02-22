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

export default function Verify() {
  //TODO: Move state functions to custom hooks
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { value } = e.target;
    if (isValidChar(value.slice(-1))) {
      setCode(value);
    }
  };

  const handleVerify = async () => {
    const email = getDataFromLS('user');
    const response = await verify({ email, code });
    if (response.status !== 200) {
      alert(response.response.data.message || 'Invalid code');
      await resendCode(email);
      setCode('');
      return;
    }
    alert('Code verified');
    navigate('/');
  };

  const handleResend = async (e) => {
    e.preventDefault();
    const email = getDataFromLS('user');
    await resendCode(email);
    alert('Code resent');
  };

  useEffect(() => {
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
