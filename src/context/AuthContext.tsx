import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider, testConnection } from '../firebase';

interface AuthContextType {
  user: { email: string; displayName?: string } | null;
  isAdmin: boolean;
  isLoading: boolean;
  loginWithCredentials: (id: string, pw: string) => boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isLoading: true,
  loginWithCredentials: () => false,
  signInWithGoogle: async () => {},
  logout: async () => {},
  authError: null,
});

export const ADMIN_CREDENTIALS = {
  id: 'admin',
  password: '0926',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; displayName?: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    testConnection();

    // Check session storage for admin login
    const savedAdminAuth = sessionStorage.getItem('power_on_admin_session');
    if (savedAdminAuth === 'authenticated') {
      setIsAdmin(true);
      setUser({ email: 'admin@suwonrehab.or.kr', displayName: '관리자 (admin)' });
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({ email: currentUser.email || 'user', displayName: currentUser.displayName || undefined });
        if (currentUser.email && currentUser.email.toLowerCase() === 'hwi@suwonrehab.or.kr') {
          setIsAdmin(true);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithCredentials = (id: string, pw: string): boolean => {
    if (id.trim().toLowerCase() === ADMIN_CREDENTIALS.id && pw === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true);
      setUser({ email: 'admin@suwonrehab.or.kr', displayName: '최고관리자 (admin)' });
      sessionStorage.setItem('power_on_admin_session', 'authenticated');
      setAuthError(null);
      return true;
    } else {
      setAuthError('아이디 또는 비밀번호가 일치하지 않습니다.');
      return false;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setAuthError(null);
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user.email?.toLowerCase() === 'hwi@suwonrehab.or.kr') {
        setIsAdmin(true);
        sessionStorage.setItem('power_on_admin_session', 'authenticated');
      }
    } catch (error: any) {
      console.error('Google Sign In error:', error);
      setAuthError(error.message || '로그인 중 오류가 발생했습니다.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    sessionStorage.removeItem('power_on_admin_session');
    setUser(null);
    setIsAdmin(false);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoading,
        loginWithCredentials,
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
