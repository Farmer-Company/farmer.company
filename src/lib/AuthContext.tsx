import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { User } from 'firebase/auth';
import { AppUser } from './os-types';

interface AuthContextType {
 user: User | null;
 profile: AppUser | null;
 loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const { user, profile, loading } = useAuthStore();

 return (
 <AuthContext.Provider value={{ user, profile, loading }}>
 {children}
 </AuthContext.Provider>
 );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
 const context = useContext(AuthContext);
 const store = useAuthStore();
 if (context === undefined) {
   // Fallback to direct store usage if not wrapped in provider (though it should be)
   return store;
 }
 return context;
};
