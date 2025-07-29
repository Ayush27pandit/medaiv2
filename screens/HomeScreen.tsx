import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import UploadButton from '../components/UploadButton';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/icon.png')} style={styles.logo} />
      <Text variant="headlineMedium" style={styles.title}>MedAI</Text>
      <UploadButton label="Medicine Analyzer" onPress={() => router.push('/MedicineUpload')} />
      <UploadButton label="Health Report Analyzer" onPress={() => router.push('/ReportUpload')} />
      <UploadButton label="Medicine Reminder" onPress={() => router.push('/MedicineReminder')} />
      <UploadButton label="Dose History" onPress={() => router.push('/HistoryScreen')} />
      <Text style={styles.disclaimer}>
        Disclaimer: This app provides AI-generated information and is not a substitute for professional medical advice. Always consult a qualified doctor for medical concerns.
      </Text>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    marginBottom: 32,
  },
  disclaimer: {
    marginTop: 32,
    color: '#D32F2F',
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 340,
  },
});

export default HomeScreen; 