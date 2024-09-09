import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext';

export const RutaPrivadaAdmin = ({ element }) => {


  const { isLoggedIn, rol, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
  }

  useEffect(() => {
    // Verificar si el usuario está autenticado y es un administrador
    console.log(rol)
    if (!isLoggedIn && !rol === 1) {
      // Si no, redirigir al inicio o a otra página
      // Puedes ajustar la ruta según tus necesidades
      handleLogout();
      navigate('/Login');
      console.log("Paso aqui");
      
    }
  }, [isLoggedIn, rol]);

  // Si el usuario está autenticado y es un administrador, mostrar el componente
  return isLoggedIn && rol ===1 ? element : <Navigate to="/" />;
};

export const RutaPrivadaAsesora = ({ element }) => {


  const { isLoggedIn, rol, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
  }

  useEffect(() => {

    console.log(rol);
    // Verificar si el usuario está autenticado y es un administrador
    if (!isLoggedIn && !rol === 2) {
      // Si no, redirigir al inicio o a otra página
      // Puedes ajustar la ruta según tus necesidades
      handleLogout();
      navigate('/Login');
      
    }
  }, [isLoggedIn, rol]);

  // Si el usuario está autenticado y es un administrador, mostrar el componente
  return isLoggedIn && rol === 2 ? element : <Navigate to="/" />;
};

export const RutaPrivadaAsociado = ({ element }) => {


  const { isLoggedIn, rol, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
  }

  useEffect(() => {
    // Verificar si el usuario está autenticado y es un administrador
    if (!isLoggedIn && !rol === 3) {
      // Si no, redirigir al inicio o a otra página
      // Puedes ajustar la ruta según tus necesidades
      handleLogout();
      navigate('/Login');
      
    }
  }, [isLoggedIn, rol]);

  // Si el usuario está autenticado y es un administrador, mostrar el componente
  return isLoggedIn && rol === 3 ? element : <Navigate to="/" />;
};

export const RutaPrivadaLoged = ({ element }) => {

  const { isLoggedIn, rol, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  }
  useEffect(() => {
    if (!isLoggedIn) {
      handleLogout();
      navigate('/');
    }
  }, [isLoggedIn]);

  return isLoggedIn && rol ? element : <Navigate to="/" />;
};

export const RutaPrivadaLogin = ({ element }) => {


  const { isLoggedIn, rol, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
  }

  useEffect(() => {
    // Verificar si el usuario está autenticado y es un administrador
    if (!isLoggedIn && !rol === 1 && !rol === 2 && !rol === 3) {
      // Si no, redirigir al inicio o a otra página
      // Puedes ajustar la ruta según tus necesidades
      handleLogout();
      navigate('/404');
      
    }
  }, [isLoggedIn, rol]);

  // Si el usuario está autenticado y es un administrador, mostrar el componente
  return isLoggedIn && rol ? element : <Navigate to="/" />;
};
