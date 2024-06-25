import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Recuperar la información de la sesión desde localStorage al cargar la página
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('rol');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
  
    if (storedUser & storedRole & storedIsLoggedIn) {
      setUser(JSON.parse(storedUser));
      setRol(JSON.parse(storedRole));
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    } else {
      console.error('Alguno de los valores recuperados del localStorage está indefinido.');
    }
  }, []);

  const login = (userData) => {
    setUser(userData.user)
    setRol(userData.user.rol);
    setIsLoggedIn(true);

    
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('rol', JSON.stringify(userData.user.rol));
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
  };

  const logout = () => {
    setUser(null);
    setRol(null);
    setIsLoggedIn(false);

    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ user, rol, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};