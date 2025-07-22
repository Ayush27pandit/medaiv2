import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

const ReportResults = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Report Analysis Results</Text>
      <Button onPress={() => router.back()}>Back</Button>
      {/* TODO: Display report analysis results here */}
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
    marginBottom: 32,
  },
});

export default ReportResults; 