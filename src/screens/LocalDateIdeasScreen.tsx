import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services';

interface Idea {
  id: string;
  title: string;
  description: string;
}

export const LocalDateIdeasScreen = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }
      await Location.getCurrentPositionAsync({});

      const snap = await getDocs(collection(db, 'dateIdeas'));
      const data = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      setIdeas(data);
    })();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {ideas.map((idea) => (
        <View key={idea.id} style={styles.card}>
          <Text style={styles.title}>{idea.title}</Text>
          <Text>{idea.description}</Text>
        </View>
      ))}
      {ideas.length === 0 && <Text>No ideas nearby.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
  },
});

export default LocalDateIdeasScreen;

