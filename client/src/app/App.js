import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthRedirect } from '@/features/auth/components/AuthRedirect';
import Navbar from '@/shared/components/navbar/components/Navbar.jsx';
import ProtectedRoute from '@/shared/components/ProtectedRoute/ProtectedRoute';
import NotFound from '@/features/error/pages/NotFound.jsx';
import Welcome from '@/features/home/pages/Welcome.jsx';
import Home from '@/features/home/pages/Home.jsx';
import Login from '@/features/auth/pages/Login.jsx';
import EditEntry from '@/features/home/pages/EditEntry.jsx';
import Chat from '@/features/chat/pages/Chat';
import Register from '@/features/auth/pages/Register';
import CheckEmail from '@/features/auth/pages/CheckEmail';
import VerifyEmail from '@/features/auth/pages/VerifyEmail';
import TwoFactor from '@/features/auth/pages/TwoFactor';
import './App.scss';

function App() {
  return (
    <div className='app'>
      <Toaster />
      <Navbar />
      <div className='main-container'>
        <Routes>
          <Route path='/' element={<AuthRedirect />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/check-email' element={<CheckEmail />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          <Route path='/twoFactor' element={<TwoFactor />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/edit-entry' element={<EditEntry />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
