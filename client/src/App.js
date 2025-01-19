import { Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat/Chat';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './pages/Home/Home';
import './styles/main.scss';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='spacer'>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='*' element={<h1>Not found</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
