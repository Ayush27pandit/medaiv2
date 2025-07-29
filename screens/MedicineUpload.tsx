import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text, Button, Card, ActivityIndicator, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import UploadButton from '../components/UploadButton';
import { analyzeMedicineText } from '../services/api';
import { extractTextFromImage } from '../services/ocr';

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

  const clearImage = () => setImage(null);

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    try {
      console.log('Image URI:', image);
      // OCR step
      const extractedText = await extractTextFromImage(image);
      console.log('Extracted text:', extractedText);
      if (!extractedText || extractedText.trim().length === 0) {
        Alert.alert('Error', 'Could not extract text from the image. Please try a clearer photo.');
        setLoading(false);
        return;
      }
      // Send extracted text directly to AI for analysis
      const result = await analyzeMedicineText(extractedText);
      console.log('AI result:', result);
      router.push({ pathname: '/MedicineResults', params: { result: JSON.stringify(result), image } });
    } catch (err) {
      console.error('OCR/Upload error:', err);
      Alert.alert('Error', 'Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Medicine Analyzer</Text>
      <Text style={styles.helperText}>
        For best results, use a clear, well-lit, high-resolution photo of the medicine. Avoid shadows and blurriness.
      </Text>
      <View style={styles.buttonRow}>
        <Button mode="contained" onPress={pickImage} style={styles.button}>Pick from Gallery</Button>
        <Button mode="contained" onPress={takePhoto} style={styles.button}>Take Photo</Button>
      </View>
      {image && (
        <Card style={styles.previewCard}>
          <Card.Cover source={{ uri: image }} style={styles.preview} resizeMode="contain" />
          <IconButton icon="close" size={20} style={styles.clearBtn} onPress={clearImage} />
        </Card>
      )}
      {loading && <ActivityIndicator style={{ marginVertical: 12 }} />}
      <UploadButton label="Upload & Analyze" onPress={handleUpload} loading={loading} disabled={!image || loading} />
      <Button onPress={() => router.back()} style={styles.backBtn} mode="text">Back</Button>
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
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  helperText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    maxWidth: 320,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    marginHorizontal: 4,
    borderRadius: 8,
  },
  previewCard: {
    width: 220,
    height: 220,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    position: 'relative',
  },
  preview: {
    width: 220,
    height: 220,
    borderRadius: 16,
    backgroundColor: '#f4f4f4',
  },
  clearBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#fff',
    zIndex: 2,
  },
  backBtn: {
    marginTop: 18,
    alignSelf: 'center',
  },
});

export default MedicineUpload; 