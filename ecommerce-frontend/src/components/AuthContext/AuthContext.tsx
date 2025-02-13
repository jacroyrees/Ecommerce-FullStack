import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (userId: string) => void;
  logout: () => void;
  userId: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedState = localStorage.getItem('isLoggedIn');
    return savedState ? JSON.parse(savedState) : false;
  });
  const [userId, setUserId] = useState<string | null>(() => {
    return localStorage.getItem('userId');
  });

  const login = (userId: string) => {
    setIsLoggedIn(true);
    setUserId(userId);
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    localStorage.setItem('userId', userId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    localStorage.removeItem('userId');
  };

  useEffect(() => {
    const savedState = localStorage.getItem('isLoggedIn');
    const savedUserId = localStorage.getItem('userId');
    if (savedState) {
      setIsLoggedIn(JSON.parse(savedState));
    }
    if (savedUserId) {
      setUserId(savedUserId);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};