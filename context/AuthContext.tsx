"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
    // Check if we are using the local dev bypass
    const isDevBypass = typeof window !== 'undefined' ? localStorage.getItem('dev_bypass') === 'true' : false;
    const isTeacherBypass = typeof window !== 'undefined' ? localStorage.getItem('teacher_bypass') === 'true' : false;
    const isDevPaidBypass = typeof window !== 'undefined' ? localStorage.getItem('dev_paid_bypass') === 'true' : false;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (isDevBypass) {
        setUser({
          id: 'dev-admin-123',
          name: 'Dev Student',
          email: 'admin@edubridge.demo',
          role: 'student',
          hasPaid: isDevPaidBypass, // Uses the dev toggle to see free or paid state
        });
        setIsLoading(false);
        return;
      }

      if (isTeacherBypass) {
        setUser({
          id: 'dev-teacher-123',
          name: 'Dev Teacher',
          email: 'teacher@edubridge.demo',
          role: 'teacher',
          hasPaid: true,
        });
        setIsLoading(false);
        return;
      }

      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUser({
              id: firebaseUser.uid,
              name: data.name,
              email: data.email,
              role: data.role,
              hasPaid: data.hasPaid,
            });
          } else {
            // User exists in auth but no profile in firestore
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const docRef = doc(db, 'users', userCredential.user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      router.push(`/${data.role}`);
    } else {
      throw new Error("User profile not found in database.");
    }
  };

  const register = async (name: string, email: string, pass: string, role: 'student' | 'teacher', hasPaid: boolean) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const uid = userCredential.user.uid;
    
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', uid), {
      name,
      email,
      role,
      hasPaid
    });

    router.push(`/${role}`);
  };

  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dev_bypass');
      localStorage.removeItem('teacher_bypass');
    }
    await firebaseSignOut(auth);
    setUser(null);
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
