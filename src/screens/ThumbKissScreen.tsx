import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../services';
import { useAuthStore } from '../features/auth/store';

export const ThumbKissScreen = () => {
  const user = useAuthStore((s) => s.user);
  const [message, setMessage] = useState('');

  const sendKiss = async () => {
    if (!user) return;
    const now = Date.now();
    await addDoc(collection(db, 'thumbKisses'), { uid: user.uid, timestamp: now });

    const partnerSnap = await getDocs(
      query(
        collection(db, 'thumbKisses'),
        where('uid', '!=', user.uid),
        orderBy('timestamp', 'desc'),
        limit(1)
      )
    );
    const partner = partnerSnap.docs[0]?.data();
    if (partner && Math.abs(now - partner.timestamp) <= 5000) {
      setMessage('Thumb kiss! 💞');
    } else {
      setMessage('Waiting for partner...');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Tap" onPress={sendKiss} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
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
  message: {
    marginTop: 16,
    fontSize: 18,
  },
});

export default ThumbKissScreen;

