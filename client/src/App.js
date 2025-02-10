import { Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat/Chat';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './pages/Home/Home';
import './styles/main.scss';
import './App.scss';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { getAllUsers } from './api/api';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className='App'>
      <Navbar />
      <div className='spacer'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<h1>Not found</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
