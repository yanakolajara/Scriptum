import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './providers/auth.provider.js';
import { Toaster } from 'react-hot-toast';
import NotFound from './components/NotFound/NotFound.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './features/Home/Home.jsx';
import Dashboard from './features/Dashboard/Dashboard.jsx';
import Chat from './features/Chat/Chat.jsx';
import Login from './features/Auth/Login.jsx';
import Register from './features/Auth/Register';
import CheckEmail from './features/Auth/CheckEmail';
import VerifyEmail from './features/Auth/VerifyEmail';
import TwoFactor from './features/Auth/TwoFactor';
import Entry from 'features/Entry/Entry.jsx';

function App() {
  return (
    <div className='grid grid-cols-[25%_auto] min-h-screen p-4 bg-[#fefdf6]'>
      <Toaster />
      <AuthProvider>
        <Navbar />
        <div className='px-[150px] py-[50px]'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/entry' element={<Entry />} />
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
