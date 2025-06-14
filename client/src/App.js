import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NotFound from '@/features/NotFound/NotFound.jsx';
import Home from '@/features/Home/Home.jsx';
import Dashboard from '@/features/Dashboard/Dashboard.jsx';
import Chat from '@/features/Chat/Chat.jsx';
import Login from '@/features/Auth/Login.jsx';
import Register from '@/features/Auth/Register';
import CheckEmail from '@/features/Auth/CheckEmail';
import VerifyEmail from '@/features/Auth/VerifyEmail';
import TwoFactor from '@/features/Auth/TwoFactor';
import EditEntry from '@/features/EditEntry/EditEntry.jsx';
import Navbar from '@/features/Navbar/Navbar.jsx';
import './App.scss';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
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

          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path='/chat' element={<Chat />} />
          <Route path='/edit-entry' element={<EditEntry />} />

          <Route path='/test' element={<div>test</div>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
