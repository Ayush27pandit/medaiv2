import React, { useState } from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { Text, Button } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import UploadButton from '../components/UploadButton';

const ReportUpload = () => {
  const router = useRouter();
  const [pdf, setPdf] = useState<{ uri: string; name: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const pickPDF = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.type === 'success') {
      setPdf({ uri: result.uri, name: result.name });
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    // TODO: Upload PDF to API and get results
    setTimeout(() => {
      setLoading(false);
      router.push('/ReportResults');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Health Report Analyzer</Text>
      <Button mode="outlined" onPress={pickPDF} style={styles.button}>Pick PDF Report</Button>
      {pdf && (
        <RNText style={styles.fileName}>Selected: {pdf.name}</RNText>
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
  button: {
    marginBottom: 16,
  },
  fileName: {
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  backBtn: {
    marginTop: 16,
  },
});

export default ReportUpload; 