import { create } from 'zustand';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { userService } from './os-services';
import { AppUser } from './os-types';

interface AuthState {
  user: User | null;
  profile: AppUser | null;
  loading: boolean;
}

export const useAuth = create<AuthState>(() => ({
  user: null,
  profile: null,
  loading: true,
}));

// Initialize auth listener
if (typeof window !== 'undefined') {
  onAuthStateChanged(auth, async (u) => {
    if (u) {
      useAuth.setState({ user: u, loading: true });
      try {
        const p = await userService.get(u.uid);
        useAuth.setState({ profile: p, loading: false });
      } catch (error) {
        useAuth.setState({ profile: null, loading: false });
      }
    } else {
      useAuth.setState({ user: null, profile: null, loading: false });
    }
  });
}
