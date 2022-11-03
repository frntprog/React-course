import React, { useContext } from 'react';
import MyButton from '../components/UI/button/MyButton.jsx';
import MyInput from '../components/UI/input/MyInput.jsx';
import { AuthContext } from '../context/index.js';

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const login = event => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  }

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder='Enter your login' />
        <MyInput type="password" placeholder='Enter your password' />
        <MyButton>Enter</MyButton>
      </form>
    </div>
  );
};

export default Login;