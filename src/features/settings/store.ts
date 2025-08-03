import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

interface SettingsState {
  theme: Theme;
  toggleTheme: () => Promise<void>;
  load: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: 'light',
  async toggleTheme() {
    const next: Theme = get().theme === 'light' ? 'dark' : 'light';
    set({ theme: next });
    await AsyncStorage.setItem('theme', next);
  },
  async load() {
    const stored = await AsyncStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      set({ theme: stored });
    }
  }
}));

