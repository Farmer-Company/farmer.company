import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { userService } from './os-services';
import { AppUser } from './os-types';

interface AuthContextType {
 user: User | null;
 profile: AppUser | null;
 loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [user, setUser] = useState<User | null>(null);
 const [profile, setProfile] = useState<AppUser | null>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 return onAuthStateChanged(auth, async (u) => {
 setUser(u);
 if (u) {
 const p = await userService.get(u.uid);
 setProfile(p);
 } else {
 setProfile(null);
 }
 setLoading(false);
 });
 }, []);

 return (
 <AuthContext.Provider value={{ user, profile, loading }}>
 {children}
 </AuthContext.Provider>
 );
};

export const useAuth = () => {
 const context = useContext(AuthContext);
 if (context === undefined) throw new Error('useAuth must be used within AuthProvider');
 return context;
};
