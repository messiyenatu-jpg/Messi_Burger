import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  const signup = async (userData) => {
    try {
      // Mock signup for development
      const mockUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      };
      // Store in localStorage for persistence
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({ ...mockUser, password: userData.password });
      localStorage.setItem('users', JSON.stringify(users));
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Signup failed' };
    }
  };

  const loginUser = async (credentials) => {
    try {
      // Mock login for development
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
      if (user) {
        login({ id: user.id, name: user.name, email: user.email, phone: user.phone });
        return { success: true };
      }
      return { success: false, message: 'Invalid email or password' };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const getDiscount = () => isLoggedIn ? 0.05 : 0;

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      login,
      logout,
      signup,
      loginUser,
      getDiscount
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};