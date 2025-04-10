import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './providers/auth.provider.js';
import { Toaster } from 'react-hot-toast';
import NotFound from './components/NotFound/NotFound.jsx';
import Home from './features/Home/Home.jsx';
import Dashboard from './features/Dashboard/Dashboard.jsx';
import Chat from './features/Chat/Chat.jsx';
import Login from './features/Auth/Login.jsx';
import Register from './features/Auth/Register';
import CheckEmail from './features/Auth/CheckEmail';
import VerifyEmail from './features/Auth/VerifyEmail';
import TwoFactor from './features/Auth/TwoFactor';
import EditEntry from 'features/EditEntry/EditEntry.jsx';
import Navbar from 'components/Navbar/Navbar.jsx';

function App() {
  // todo: implement protected routes based on auth state
  return (
    <div className='flex gap-[20px] p-[20px] min-h-[100vh] bg-[#3758F9]'>
      <Toaster />
      <AuthProvider>
        <Navbar />
        <div className='flex p-[10px] justify-center items-center gap-[10px] flex-1 self-stretch rounded-[10px] bg-[var(--background)]'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/edit-entry' element={<EditEntry />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/check-email' element={<CheckEmail />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path='/twoFactor' element={<TwoFactor />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
