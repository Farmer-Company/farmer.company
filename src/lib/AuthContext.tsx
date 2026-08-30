import { create } from 'zustand';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { userService } from './os-services';
import { AppUser } from './os-types';

interface AuthStore {
  user: User | null;
  profile: AppUser | null;
  loading: boolean;
  setUser: (u: User | null) => void;
  setProfile: (p: AppUser | null) => void;
  setLoading: (l: boolean) => void;
}
export const useAuth = create<AuthStore>((set) => ({
  user: null,
  profile: null,
  loading: true,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
}));

if (typeof window !== 'undefined') {
  onAuthStateChanged(auth, async (u) => {
    useAuth.getState().setUser(u);
    if (u) {
      const p = await userService.get(u.uid);
      useAuth.getState().setProfile(p);
    } else {
      useAuth.getState().setProfile(null);
    }
    useAuth.getState().setLoading(false);
  });
}
