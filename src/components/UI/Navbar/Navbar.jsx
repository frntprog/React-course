import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/index.js';
import MyButton from '../button/MyButton.jsx';

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }

  return (
    <div>
      <div className='navbar'>
        <MyButton onClick={logout}>
          Logout
        </MyButton>
        <div className="navbar__links">
          <Link to="about">About</Link>
          <Link to="posts">Posts</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;