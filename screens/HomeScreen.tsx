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
});

export default HomeScreen; 