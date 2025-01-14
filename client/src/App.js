import { Route, Routes } from 'react-router-dom';
import Chat from './components/chat/Chat';
import Navbar from './components/navbar/Navbar';
import Home from './components/Home/Home';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='*' element={<h1>Not found</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
