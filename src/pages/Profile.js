import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

const Profile = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate('/');
    }

  return (
    <>
        <div>Welcome {auth.email}</div>
        <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Profile;