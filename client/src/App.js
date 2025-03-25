import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Chat from './pages/Chat/Chat';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import './styles/main.scss';
import './App.scss';
import { axiosInstance } from './api/axios';
import CheckEmail from './pages/Auth/CheckEmail';
import VerifyEmail from './pages/Auth/VerifyEmail';
import TwoFactor from './pages/Auth/TwoFactor';
import { useAuth } from './providers/auth.provider';
// import AuthProvider from './providers/auth.provider';

function App() {
  const { user, loading, error } = useAuth();

  // useEffect(() => {}, [user]);
  return (
    <div className='App'>
      {/* <AuthProvider> */}
      <Navbar />
      <div className='spacer'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/check-email' element={<CheckEmail />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/twoFactor' element={<TwoFactor />} />
          <Route path='*' element={<h1>Not found</h1>} />
        </Routes>
      </div>
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
