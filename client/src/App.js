import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './providers/auth.provider.js';
import Navbar from './components/navbar/Navbar.jsx';
import Home from './features/Home/Home.jsx';
import Dashboard from './features/Dashboard/Dashboard.jsx';
import Chat from './features/Chat/Chat.jsx';
import Login from './features/Auth/Login.jsx';
// import Register from './pages/Auth/Register';
// import CheckEmail from './pages/Auth/CheckEmail';
// import VerifyEmail from './pages/Auth/VerifyEmail';
// import TwoFactor from './pages/Auth/TwoFactor';
import './styles/main.scss';
import './styles/App.scss';
// import AuthProvider from './providers/auth.provider';

function App() {
  // useEffect(() => {}, [user]);
  return (
    <div className='App'>
      <AuthProvider>
        <Navbar />
        <div className='spacer'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/register' element={<Register />} /> */}
            {/* <Route path='/check-email' element={<CheckEmail />} /> */}
            {/* <Route path='/verify-email' element={<VerifyEmail />} /> */}
            {/* <Route path='/twoFactor' element={<TwoFactor />} /> */}
            {/* <Route path='*' element={<h1>Not found</h1>} /> */}
          </Routes>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
