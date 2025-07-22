import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import UploadButton from '../components/UploadButton';
import { analyzeMedicineImage } from '../services/api';

const MedicineUpload = () => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera roll permissions are required.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera permissions are required.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    try {
      // Convert image to base64
      const base64 = await FileSystem.readAsStringAsync(image, { encoding: FileSystem.EncodingType.Base64 });
      // Call API
      const result = await analyzeMedicineImage(base64);
      // Pass result to results screen (via router.push with params or state)
      router.push({ pathname: '/MedicineResults', params: { result: JSON.stringify(result) } });
    } catch (err) {
      Alert.alert('Error', 'Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Medicine Analyzer</Text>
      <View style={styles.buttonRow}>
        <Button mode="outlined" onPress={pickImage} style={styles.button}>Pick from Gallery</Button>
        <Button mode="outlined" onPress={takePhoto} style={styles.button}>Take Photo</Button>
      </View>
      {image && (
        <Image source={{ uri: image }} style={styles.preview} resizeMode="contain" />
      )}
      <UploadButton label="Upload & Analyze" onPress={handleUpload} loading={loading} />
      <Button onPress={() => router.back()} style={styles.backBtn}>Back</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    marginHorizontal: 4,
  },
  preview: {
    width: 220,
    height: 220,
    marginVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  backBtn: {
    marginTop: 16,
  },
});

export default MedicineUpload; 