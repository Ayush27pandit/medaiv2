import React from 'react';
import { StyleSheet, ScrollView, View, Image, Alert } from 'react-native';
import { Text, Button, Card, IconButton } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Markdown from 'react-native-markdown-display';
import * as Clipboard from 'expo-clipboard';

const MedicineResults = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  let result: any = null;
  let content = '';
  let image = '';

  try {
    result = params.result ? JSON.parse(params.result as string) : null;
    content = result?.choices?.[0]?.message?.content || '';
    image = typeof params.image === 'string' ? params.image : '';
    console.log('AI Medicine Result:', content);
  } catch (err) {
    content = 'No analysis result found.';
    image = '';
  }

  const handleCopy = () => {
    Clipboard.setStringAsync(content);
    Alert.alert('Copied', 'AI result copied to clipboard!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Medicine Analysis Results</Text>
      {image ? (
        <Card style={styles.imageCard}>
          <Card.Cover source={{ uri: image }} style={styles.imagePreview} resizeMode="contain" />
        </Card>
      ) : null}
      <Card style={styles.resultCard}>
        <Card.Content>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>AI Result</Text>
            <IconButton icon="content-copy" size={20} onPress={handleCopy} />
          </View>
          <Markdown style={markdownStyles}>{content && content.trim().length > 0 ? content : 'No analysis result found. Please try a clearer image.'}</Markdown>
        </Card.Content>
      </Card>
      <Button mode="outlined" style={styles.tryAgainBtn} onPress={() => router.back()}>Try Again</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
  },
  imageCard: {
    width: 220,
    height: 220,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  imagePreview: {
    width: 220,
    height: 220,
    borderRadius: 16,
    backgroundColor: '#f4f4f4',
  },
  resultCard: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    color: '#1976D2',
  },
  tryAgainBtn: {
    marginTop: 12,
    alignSelf: 'center',
  },
});

const markdownStyles = {
  body: { fontSize: 16 },
  heading1: { color: '#1976D2', fontSize: 22, marginBottom: 8 },
  heading2: { color: '#1976D2', fontSize: 18, marginBottom: 6 },
  code_block: { backgroundColor: '#f0f0f0', borderRadius: 6, padding: 8 },
  bullet_list: { marginLeft: 16 },
  ordered_list: { marginLeft: 16 },
};

export default MedicineResults;
