import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider, testConnection } from '../firebase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isLoading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
  authError: null,
});

export const ADMIN_EMAIL_WHITELIST = ['hwi@suwonrehab.or.kr'];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Run connection test
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // Check if admin email or admin doc exists
          const isWhiteListed = currentUser.email && ADMIN_EMAIL_WHITELIST.includes(currentUser.email.toLowerCase());
          
          if (isWhiteListed) {
            setIsAdmin(true);
          } else {
            // Check Firestore admins collection
            const adminDocRef = doc(db, 'admins', currentUser.uid);
            const adminDocSnap = await getDoc(adminDocRef);
            if (adminDocSnap.exists()) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          }
        } catch (err) {
          console.warn('Admin check warning:', err);
          // If check fails due to offline or rule, fallback to whitelist check
          const isWhiteListed = currentUser.email && ADMIN_EMAIL_WHITELIST.includes(currentUser.email.toLowerCase());
          setIsAdmin(!!isWhiteListed);
        }
      } else {
        setIsAdmin(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setAuthError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Google Sign In error:', error);
      setAuthError(error.message || '로그인 중 오류가 발생했습니다.');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoading,
        signInWithGoogle,
        logout,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
