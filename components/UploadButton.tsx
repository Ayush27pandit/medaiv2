import React from 'react';
import { Button, ActivityIndicator } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

interface UploadButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
}

const UploadButton: React.FC<UploadButtonProps> = ({ label, onPress, loading }) => (
  <View style={styles.container}>
    <Button mode="contained" onPress={onPress} disabled={loading} style={styles.button}>
      {loading ? <ActivityIndicator animating={true} color="#fff" /> : label}
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  button: { padding: 8 },
});

export default UploadButton; 