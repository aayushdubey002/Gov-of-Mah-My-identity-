import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo Accounts
export const DEMO_ACCOUNTS = {
  citizen: {
    email: 'citizen@demo.com',
    password: 'Citizen@123',
    name: 'Rahul Sharma',
    role: 'citizen' as UserRole,
    title: 'Citizen (Rahul Sharma)'
  },
  officer: {
    email: 'officer@demo.com',
    password: 'Officer@123',
    name: 'Rajesh Deshmukh (Desk Officer)',
    role: 'officer' as UserRole,
    title: 'Desk Officer (Rajesh Deshmukh)'
  },
  admin: {
    email: 'admin@demo.com',
    password: 'Admin@123',
    name: 'S. K. Nandanwar (State Enterprise Architect)',
    role: 'admin' as UserRole,
    title: 'System Administrator (Admin)'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to citizen demo user for instant interactive preview
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('gov_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return {
      id: 'usr-citizen-1',
      email: 'citizen@demo.com',
      name: 'Rahul Sharma',
      role: 'citizen',
      citizenId: 'CIT-MH-84920',
      phone: '+91 98231 44556'
    };
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('gov_jwt_token') || 'demo-jwt-token-sih26129';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('gov_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gov_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('gov_jwt_token', token);
    } else {
      localStorage.removeItem('gov_jwt_token');
    }
  }, [token]);

  const login = async (email: string, password = 'demo'): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || 'Login failed' };
    } catch (err: any) {
      // Fallback for demo
      const found = Object.values(DEMO_ACCOUNTS).find((d) => d.email.toLowerCase() === email.toLowerCase());
      if (found) {
        setUser({
          id: `usr-${found.role}-1`,
          email: found.email,
          name: found.name,
          role: found.role
        });
        setToken('demo-token');
        return { success: true, message: 'Logged in in demo mode' };
      }
      return { success: false, message: err.message || 'Connection error' };
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole = 'citizen') => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || 'Registration failed' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Connection error' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gov_user');
    localStorage.removeItem('gov_jwt_token');
  };

  const switchRole = async (targetRole: UserRole) => {
    const demo = DEMO_ACCOUNTS[targetRole];
    if (demo) {
      // 1. Instant synchronous local state update (0ms latency)
      const instantUser: User = {
        id: `usr-${demo.role}-1`,
        email: demo.email,
        name: demo.name,
        role: demo.role,
        phone: demo.role === 'citizen' ? '+91 98231 44556' : '+91 98231 99880',
        citizenId: demo.role === 'citizen' ? 'CIT-MH-84920' : undefined,
        designation: demo.role === 'officer' ? 'Desk Officer Grade-I' : demo.role === 'admin' ? 'State Enterprise Architect' : undefined,
        department: demo.role === 'officer' ? 'Higher & Technical Education' : demo.role === 'admin' ? 'MahaIT / DIT Interop' : undefined
      };
      setUser(instantUser);
      setToken(`demo-token-${demo.role}`);
      localStorage.setItem('gov_user', JSON.stringify(instantUser));
      localStorage.setItem('gov_jwt_token', `demo-token-${demo.role}`);

      // 2. Async background sync to server without blocking UI
      try {
        fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: demo.email, password: demo.password })
        }).then(res => res.json()).then(data => {
          if (data.success && data.user) {
            setUser(data.user);
            setToken(data.token);
          }
        }).catch(() => {});
      } catch (e) {
        // ignore background error
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
