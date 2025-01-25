import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    if (user !== null) {
      setLoading(false);
    }
  }, [user]);


  if (loading) {
    return <div>Loading...</div>;  
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
