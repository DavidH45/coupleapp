import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../services';
import { useAuthStore } from '../features/auth/store';

export const ConversationStarterScreen = () => {
  const user = useAuthStore((s) => s.user);
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadPrompt = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const ref = doc(db, 'prompts', today);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setPrompt(snap.data().text);
      } else {
        setPrompt('Share a memorable moment from this week.');
      }
    };
    loadPrompt();
  }, []);

  const handleSubmit = async () => {
    if (!user || !answer) return;
    const today = new Date().toISOString().slice(0, 10);
    await addDoc(collection(db, 'answers'), {
      promptDate: today,
      uid: user.uid,
      answer,
      createdAt: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>
      {submitted ? (
        <Text>Your answer has been submitted!</Text>
      ) : (
        <>
          <TextInput
            placeholder="Your answer"
            style={styles.input}
            value={answer}
            onChangeText={setAnswer}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  prompt: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
});

export default ConversationStarterScreen;

