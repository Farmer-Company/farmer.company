import React, { useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { userService } from './os-services';
import { AppUser } from './os-types';
import { create } from 'zustand';

interface AuthState {
 user: User | null;
 profile: AppUser | null;
 loading: boolean;
 setUser: (user: User | null) => void;
 setProfile: (profile: AppUser | null) => void;
 setLoading: (loading: boolean) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = create<AuthState>((set) => ({
 user: null,
 profile: null,
 loading: true,
 setUser: (user) => set({ user }),
 setProfile: (profile) => set({ profile }),
 setLoading: (loading) => set({ loading }),
}));

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const setUser = useAuth((state) => state.setUser);
 const setProfile = useAuth((state) => state.setProfile);
 const setLoading = useAuth((state) => state.setLoading);

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
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 return <>{children}</>;
};
