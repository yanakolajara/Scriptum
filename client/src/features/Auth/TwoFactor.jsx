import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isCodeComplete } from './utils/validators.utils';
import { useAuthContext } from 'providers/auth.provider';
import { validateNumber } from 'utils/validations';

export default function TwoFactor() {
  //todo: Move state functions to custom hooks

  const { resendCode, verify } = useAuthContext();
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    // validates if character is a string with a number
    if (validateNumber(value.slice(-1))) {
      setCode(value);
    }
  };

  const handleVerify = async () => {
    const email = localStorage.getItem('user');
    const res = await verify({ email, code })
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
    const email = localStorage.getItem('user');
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
