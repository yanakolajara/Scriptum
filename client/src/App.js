import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './providers/auth.provider';
import Navbar from '@/components/Navbar/Navbar.jsx';
import NotFound from '@/pages/NotFound/NotFound.jsx';
import Home from '@/pages/Home/Home.jsx';
import Dashboard from '@/pages/Dashboard/Dashboard.jsx';
import Chat from '@/pages/Chat/Chat.jsx';
import Login from '@/pages/Auth/Login.jsx';
import Register from '@/pages/Auth/Register';
import CheckEmail from '@/pages/Auth/CheckEmail';
import VerifyEmail from '@/pages/Auth/VerifyEmail';
import TwoFactor from '@/pages/Auth/TwoFactor';
import EditEntry from '@/pages/EditEntry/EditEntry.jsx';
import './App.scss';

function App() {
  return (
    <AuthProvider>
      <div className='app'>
        <Toaster />
        <Navbar />
        <div className='main-container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/check-email' element={<CheckEmail />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path='/twoFactor' element={<TwoFactor />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/edit-entry' element={<EditEntry />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
