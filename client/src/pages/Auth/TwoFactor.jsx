import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isCodeComplete } from './utils/validators.utils';
import { useAuthContext } from 'providers/auth.provider';
import { validateNumber } from 'utils/validations';
import './TwoFactor.scss';

export default function TwoFactor() {
  const { resendCode, verify } = useAuthContext();
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
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
    if (isCodeComplete(code)) {
      handleVerify();
    }
  }, [code]);
  return (
    <div className='two-factor'>
      <h1 className='two-factor__title'>Verify</h1>
      <p className='two-factor__subtitle'>Check your inbox</p>
      <form className='two-factor__form'>
        <input
          type='text'
          value={code}
          onChange={handleChange}
          placeholder='Enter code'
          maxLength={6}
          required
          disabled={isCodeComplete(code)}
          className='two-factor__input'
        />
        <p className='two-factor__resend'>
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
