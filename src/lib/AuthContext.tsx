import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '@/src/stores/authStore';
import { User } from 'firebase/auth';
import { AppUser } from './os-types';

interface AuthContextType {
 user: User | null;
 profile: AppUser | null;
 loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const { user, profile, loading, initialize } = useAuthStore();

 useEffect(() => {
   const unsubscribe = initialize();
   return unsubscribe;
 }, [initialize]);

 return (
 <AuthContext.Provider value={{ user, profile, loading }}>
 {children}
 </AuthContext.Provider>
 );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
 const context = useContext(AuthContext);
 if (context === undefined) throw new Error('useAuth must be used within AuthProvider');
 return context;
};
