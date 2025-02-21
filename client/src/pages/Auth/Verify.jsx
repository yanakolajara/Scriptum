import { useEffect, useState } from 'react';
import { verify } from '../../api/user.api';
import { useNavigate } from 'react-router-dom';

// Validates if the entered char is valid
const isValidChar = (char) => {
  const validChars = '0123456789';
  return validChars.includes(char);
};

// Validates if code has been fully entered
const isCodeComplete = (code) => code.length === 6;

// Gets data from local storage
const getDataFromLS = (key) => {
  return window.localStorage.getItem(key);
};

export default function Verify() {
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
      alert('Invalid code');
      return;
    }
    alert('Code verified');
    navigate('/');
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
      </form>
    </div>
  );
}
