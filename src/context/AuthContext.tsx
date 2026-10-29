import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types/wardrobe';

interface AuthContextType {
  user: UserProfile;
  login: (email: string, name?: string) => void;
  logout: () => void;
  upgradeToPro: () => void;
  downgradePlan: () => void;
  updateAccountSettings: (updated: Partial<UserProfile>) => void;
}

const GUEST_USER: UserProfile = {
  name: '',
  email: '',
  avatarUrl: '',
  isLoggedIn: false,
  isPro: false,
  connectedGmail: false,
  connectedCalendar: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mydailyfit_user_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user session', e);
      }
    }
    return GUEST_USER;
  });

  useEffect(() => {
    localStorage.setItem('mydailyfit_user_session', JSON.stringify(user));
  }, [user]);

  const login = (email: string, name?: string) => {
    setUser((prev) => ({
      ...prev,
      email,
      name: name || email.split('@')[0],
      isLoggedIn: true,
    }));
  };

  const logout = () => {
    setUser(GUEST_USER);
  };

  const upgradeToPro = () => {
    setUser((prev) => ({ ...prev, isPro: true }));
  };

  const downgradePlan = () => {
    setUser((prev) => ({ ...prev, isPro: false }));
  };

  const updateAccountSettings = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, upgradeToPro, downgradePlan, updateAccountSettings }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};