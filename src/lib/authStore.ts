import { create } from 'zustand';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { userService } from './os-services';
import { AppUser } from './os-types';

interface AuthStore {
 user: User | null;
 profile: AppUser | null;
 loading: boolean;
}

export const useAuth = create<AuthStore>(() => ({
 user: null,
 profile: null,
 loading: true,
}));

if (typeof window !== 'undefined') {
 onAuthStateChanged(auth, async (u) => {
 useAuth.setState({ user: u });
 if (u) {
 const p = await userService.get(u.uid);
 useAuth.setState({ profile: p });
 } else {
 useAuth.setState({ profile: null });
 }
 useAuth.setState({ loading: false });
 });
}
