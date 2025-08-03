import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const prompts = [
  'Who is more likely to plan a surprise?',
  'Who spends more time on their phone?',
  'Who is more adventurous?',
];

export const GamesScreen = () => {
  const [index, setIndex] = useState(0);
  const current = prompts[index];

  const answer = () => {
    setIndex((i) => (i + 1) % prompts.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{current}</Text>
      <View style={styles.buttons}>
        <Button title="You" onPress={answer} />
        <Button title="Partner" onPress={answer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  prompt: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  buttons: { flexDirection: 'row', justifyContent: 'space-around' },
});

export default GamesScreen;

