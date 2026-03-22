import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type UserRole = 'it-admin' | 'hr' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo accounts for UI testing (no backend needed)
const DEMO_USERS: Record<string, User & { password: string }> = {
  'admin@hrportal.com': { id: '1', name: 'Vikram Mehta', email: 'admin@hrportal.com', role: 'it-admin', password: 'admin123' },
  'hr@hrportal.com': { id: '2', name: 'Priya Sharma', email: 'hr@hrportal.com', role: 'hr', password: 'hr123' },
  'employee@hrportal.com': { id: '3', name: 'Rahul Verma', email: 'employee@hrportal.com', role: 'employee', password: 'emp123' },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('hr_user');
    const token = localStorage.getItem('hr_token');
    if (saved && token) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Try backend API first
    try {
      const { default: authService } = await import('@/services/authService');
      const res = await authService.login({ email, password });
      const { token, user: userData } = res.data;
      localStorage.setItem('hr_token', token);
      localStorage.setItem('hr_user', JSON.stringify(userData));
      setUser(userData as User);
      return;
    } catch {
      // Backend unavailable — fall through to demo mode
    }

    // Demo mode fallback
    const found = DEMO_USERS[email];
    if (!found || found.password !== password) throw new Error('Invalid credentials');
    const { password: _, ...userData } = found;
    localStorage.setItem('hr_token', 'demo-token');
    localStorage.setItem('hr_user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('hr_user');
    localStorage.removeItem('hr_token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
