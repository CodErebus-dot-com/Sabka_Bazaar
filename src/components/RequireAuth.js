import React from 'react';
import { useAuth } from '../contexts/auth';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();

    if(!auth.isAuth) {
        return (<Navigate to="/signin" state={{ path: location.pathname }}/>);
    }

  return children;
}

export default RequireAuth;