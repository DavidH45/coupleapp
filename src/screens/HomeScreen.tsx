import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStreak } from '../hooks/useStreak';
import { useAuthStore } from '../features/auth/store';
import { RootStackParamList } from '../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { streak, checkIn } = useStreak();
  const { signOutUser } = useAuthStore();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Back</Text>
      <Text style={styles.streak}>Current streak: {streak} days</Text>
      <Button title="Daily Check-In" onPress={checkIn} />
      <View style={styles.buttons}>
        <Button title="Conversation Starter" onPress={() => navigation.navigate('ConversationStarter')} />
        <Button title="Photo Prompt" onPress={() => navigation.navigate('PhotoPrompt')} />
        <Button title="Thumb Kiss" onPress={() => navigation.navigate('ThumbKiss')} />
        <Button title="Date Ideas" onPress={() => navigation.navigate('LocalDateIdeas')} />
        <Button title="Games" onPress={() => navigation.navigate('Games')} />
        <Button title="Streaks" onPress={() => navigation.navigate('Streaks')} />
        <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
      <Button title="Sign Out" color="red" onPress={signOutUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  streak: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  buttons: {
    marginVertical: 20,
    gap: 8,
  },
});

export default HomeScreen;

