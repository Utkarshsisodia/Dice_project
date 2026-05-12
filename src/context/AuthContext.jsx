import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Automatically attach the token to all future Axios requests
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // When the app first loads, check if they are already logged in via cookie
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get a fresh token from the cookie
        const refreshRes = await api.post('/auth/refresh-token');
        const freshToken = refreshRes.data.data.accessToken;
        setToken(freshToken);

        // We temporarily set it manually here just to fetch the user data safely
        api.defaults.headers.common['Authorization'] = `Bearer ${freshToken}`;

        // Now grab the user profile/balance
        const userRes = await api.get('/auth/me');
        setUser(userRes.data.data);
      } catch (err) {
        // No valid cookie, user is a guest
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setToken(res.data.data.accessToken);
    setUser(res.data.data.user);
  };

  const register = async (username, email, password) => {
    const res = await api.post('/auth/register', { username, email, password });
    setToken(res.data.data.accessToken);
    setUser(res.data.data.user);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    setToken(null);
  };

  // Helper to instantly update the UI balance after a bet
  const updateBalance = (newBalance) => {
    setUser((prev) => (prev ? { ...prev, balance: newBalance } : null));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateBalance }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);