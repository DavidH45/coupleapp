import create from 'zustand';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../services';

interface AuthState {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  // Keep store in sync with Firebase auth state
  onAuthStateChanged(auth, (user) => set({ user }));

  return {
    user: null,
    async signIn(email, password) {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      set({ user: cred.user });
    },
    async signOutUser() {
      await signOut(auth);
      set({ user: null });
    }
  };
});

