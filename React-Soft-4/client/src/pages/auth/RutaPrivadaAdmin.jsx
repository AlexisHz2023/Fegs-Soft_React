import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext';

const RutaPrivadaAdmin = ({ element }) => {


  const { isLoggedIn, role, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
  }

  useEffect(() => {
    // Verificar si el usuario está autenticado y es un administrador
    if (!isLoggedIn && !role === 1) {
      // Si no, redirigir al inicio o a otra página
      // Puedes ajustar la ruta según tus necesidades
      handleLogout();
      navigate('/');
      
    }
  }, [isLoggedIn, role]);

  // Si el usuario está autenticado y es un administrador, mostrar el componente
  return isLoggedIn && role ? element : <Navigate to="/" />;
};



export default RutaPrivadaAdmin;