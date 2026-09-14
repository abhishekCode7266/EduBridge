"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  hasPaid: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string, role: 'student' | 'teacher', hasPaid: boolean) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check local storage for existing session on mount
    const storedUser = localStorage.getItem('edubridge_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check against "database" (localStorage)
    const usersDb = JSON.parse(localStorage.getItem('edubridge_db') || '[]');
    const foundUser = usersDb.find((u: any) => u.email === email && u.password === pass);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const sessionUser: User = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      hasPaid: foundUser.hasPaid,
    };

    setUser(sessionUser);
    localStorage.setItem('edubridge_user', JSON.stringify(sessionUser));
    
    router.push(`/${sessionUser.role}`);
  };

  const register = async (name: string, email: string, pass: string, role: 'student' | 'teacher', hasPaid: boolean) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const usersDb = JSON.parse(localStorage.getItem('edubridge_db') || '[]');
    if (usersDb.find((u: any) => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: pass,
      role,
      hasPaid
    };

    usersDb.push(newUser);
    localStorage.setItem('edubridge_db', JSON.stringify(usersDb));

    const sessionUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      hasPaid: newUser.hasPaid,
    };

    setUser(sessionUser);
    localStorage.setItem('edubridge_user', JSON.stringify(sessionUser));
    
    router.push(`/${role}`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edubridge_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
