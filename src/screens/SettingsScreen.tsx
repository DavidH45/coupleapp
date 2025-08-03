import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSettingsStore } from '../features/settings/store';

export const SettingsScreen = () => {
  const { theme, toggleTheme, load } = useSettingsStore();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current theme: {theme}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
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
  text: {
    fontSize: 18,
    marginBottom: 12,
  },
});

export default SettingsScreen;

