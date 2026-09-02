import { create } from 'zustand';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { userService } from './os-services';
import { AppUser } from './os-types';

interface AuthState {
  user: User | null;
  profile: AppUser | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: AppUser | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  profile: null,
  loading: true,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
}));

// Initialize Firebase Auth listener
if (typeof window !== 'undefined') {
  onAuthStateChanged(auth, async (u) => {
    useAuth.getState().setUser(u);
    if (u) {
      try {
        const p = await userService.get(u.uid);
        useAuth.getState().setProfile(p);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        useAuth.getState().setProfile(null);
      }
    } else {
      useAuth.getState().setProfile(null);
    }
    useAuth.getState().setLoading(false);
  });
}
