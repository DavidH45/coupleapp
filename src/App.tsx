import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import ConversationStarterScreen from './screens/ConversationStarterScreen';
import PhotoPromptScreen from './screens/PhotoPromptScreen';
import ThumbKissScreen from './screens/ThumbKissScreen';
import LocalDateIdeasScreen from './screens/LocalDateIdeasScreen';
import GamesScreen from './screens/GamesScreen';
import SettingsScreen from './screens/SettingsScreen';
import StreaksScreen from './screens/StreaksScreen';

import { useAuthStore } from './features/auth/store';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  ConversationStarter: undefined;
  PhotoPrompt: undefined;
  ThumbKiss: undefined;
  LocalDateIdeas: undefined;
  Games: undefined;
  Settings: undefined;
  Streaks: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const user = useAuthStore((s) => s.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ConversationStarter" component={ConversationStarterScreen} />
            <Stack.Screen name="PhotoPrompt" component={PhotoPromptScreen} />
            <Stack.Screen name="ThumbKiss" component={ThumbKissScreen} />
            <Stack.Screen name="LocalDateIdeas" component={LocalDateIdeasScreen} />
            <Stack.Screen name="Games" component={GamesScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Streaks" component={StreaksScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

