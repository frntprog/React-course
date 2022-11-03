import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter.jsx';
import Navbar from './components/UI/Navbar/Navbar.jsx';
import './styles/App.css';
import { AuthContext } from './context/index.js';
import { useEffect, useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading,
    }}>
      <BrowserRouter>
        <Navbar></Navbar>
        <AppRouter></AppRouter>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;

