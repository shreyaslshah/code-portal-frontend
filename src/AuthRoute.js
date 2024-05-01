import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from './context/auth';

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthRoute;