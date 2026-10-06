import { create } from 'zustand';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { userService } from '../lib/os-services';
import { AppUser } from '../lib/os-types';

interface AuthState {
  user: User | null;
  profile: AppUser | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: AppUser | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  loading: true,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
}));

// Initialize auth listener
if (typeof window !== 'undefined') {
  onAuthStateChanged(auth, async (u) => {
    useAuthStore.getState().setUser(u);
    if (u) {
      try {
        const p = await userService.get(u.uid);
        useAuthStore.getState().setProfile(p);
      } catch (error) {
        console.error("Failed to load user profile", error);
        useAuthStore.getState().setProfile(null);
      }
    } else {
      useAuthStore.getState().setProfile(null);
    }
    useAuthStore.getState().setLoading(false);
  });
}
