import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context/index.js';
import { privateRoutes, publicRoutes } from '../router/index.js';
import Loader from './Loader/Loader.jsx';

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);
  console.log('isAuth', isAuth);

  if (isLoading) {
    return <Loader />
  }

  return (
    isAuth
      ?
      <Routes>
        {privateRoutes.map((route, index) =>
          <Route key={route.path} path={route.path} element={<route.element />} exact={route.exact}></Route>
        )}
        <Route path='*' element={<Navigate to="/posts" replace />}></Route>
      </Routes>
      :
      <Routes>
        {publicRoutes.map((route, index) =>
          <Route key={route.path} path={route.path} element={<route.element />} exact={route.exact}></Route>
        )}
        <Route path='*' element={<Navigate to="/login" replace />}></Route>
      </Routes>
  );
};

export default AppRouter;