import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import dayjs from 'dayjs';

export const PhotoPromptScreen = () => {
  const [uri, setUri] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      setUri(result.assets[0].uri);
      setTimestamp(dayjs().format('YYYY-MM-DD HH:mm'));
    }
  };

  return (
    <View style={styles.container}>
      {uri ? (
        <>
          <Image source={{ uri }} style={styles.image} />
          <Text style={styles.timestamp}>{timestamp}</Text>
        </>
      ) : (
        <Text>No photo taken yet.</Text>
      )}
      <Button title="Take Photo" onPress={takePhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 12,
  },
  timestamp: {
    marginBottom: 12,
  },
});

export default PhotoPromptScreen;

