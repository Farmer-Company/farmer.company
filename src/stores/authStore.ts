import { create } from 'zustand';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/src/lib/firebase';
import { userService } from '@/src/lib/os-services';
import { AppUser } from '@/src/lib/os-types';

interface AuthState {
  user: User | null;
  profile: AppUser | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: AppUser | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  loading: true,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  initialize: () => {
    return onAuthStateChanged(auth, async (u) => {
      set({ user: u });
      if (u) {
        const p = await userService.get(u.uid);
        set({ profile: p || null });
      } else {
        set({ profile: null });
      }
      set({ loading: false });
    });
  }
}));
