import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const STORAGE_KEY = 'candle-streak';

interface StreakData {
  count: number;
  last: string | null;
}

// Simple hook to maintain a daily streak using AsyncStorage.
export const useStreak = () => {
  const [streak, setStreak] = useState<number>(0);
  const [lastDate, setLastDate] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: StreakData = JSON.parse(stored);
        setStreak(data.count);
        setLastDate(data.last);
      }
    })();
  }, []);

  const checkIn = async () => {
    const today = dayjs().format('YYYY-MM-DD');
    if (lastDate === today) return; // already checked in today

    let newCount = 1;
    if (lastDate && dayjs(lastDate).add(1, 'day').format('YYYY-MM-DD') === today) {
      newCount = streak + 1;
    }

    setStreak(newCount);
    setLastDate(today);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ count: newCount, last: today }));
  };

  return { streak, checkIn };
};

