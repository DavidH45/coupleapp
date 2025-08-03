import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStreak } from '../hooks/useStreak';

export const StreaksScreen = () => {
  const { streak } = useStreak();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Streak</Text>
      <Text style={styles.count}>{streak} days</Text>
      {streak >= 7 && <Text style={styles.milestone}>🎉 7-day milestone reached!</Text>}
      {streak >= 30 && <Text style={styles.milestone}>🏅 30-day milestone reached!</Text>}
      {streak >= 100 && <Text style={styles.milestone}>🌟 100-day milestone reached!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  count: {
    fontSize: 32,
    marginBottom: 16,
  },
  milestone: {
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default StreaksScreen;

