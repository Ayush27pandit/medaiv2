import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../services/supabase';

const AddMedicine = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [reminderTimes, setReminderTimes] = useState<Date[]>([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = useState<number | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const addReminderTime = () => {
    setReminderTimes([...reminderTimes, new Date()]);
    setCurrentTimeIndex(reminderTimes.length);
    setShowTimePicker(true);
  };

  const onTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate && currentTimeIndex !== null) {
      const newTimes = [...reminderTimes];
      newTimes[currentTimeIndex] = selectedDate;
      setReminderTimes(newTimes);
    }
    setCurrentTimeIndex(null);
  };

  const removeReminderTime = (index: number) => {
    setReminderTimes(reminderTimes.filter((_, i) => i !== index));
  };

  const onSave = async () => {
    if (!name.trim() || !dosage.trim() || reminderTimes.length === 0) {
      Alert.alert('Missing Fields', 'Please fill all fields and add at least one reminder time.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('medicines').insert([
        {
          name,
          dosage,
          reminder_times: reminderTimes.map(t => t.toTimeString().slice(0,5)),
          start_date: startDate.toISOString().slice(0,10),
          end_date: endDate ? endDate.toISOString().slice(0,10) : null,
        }
      ]);
      if (error) throw error;
      router.back();
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to save medicine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Add Medicine</Text>
      <TextInput
        label="Medicine Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Dosage"
        value={dosage}
        onChangeText={setDosage}
        style={styles.input}
        mode="outlined"
      />
      <Text style={styles.sectionLabel}>Reminder Times</Text>
      {reminderTimes.map((time, idx) => (
        <View key={idx} style={styles.reminderRow}>
          <Text style={styles.reminderTime}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          <Button onPress={() => removeReminderTime(idx)} mode="text" compact>Remove</Button>
        </View>
      ))}
      <Button mode="outlined" onPress={addReminderTime} style={styles.addTimeBtn}>Add Reminder Time</Button>
      {showTimePicker && (
        <DateTimePicker
          value={reminderTimes[currentTimeIndex ?? 0] || new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}
      <Text style={styles.sectionLabel}>Start Date</Text>
      <Button mode="outlined" onPress={() => setShowStartDatePicker(true)} style={styles.dateBtn}>
        {startDate.toLocaleDateString()}
      </Button>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(_, date) => {
            setShowStartDatePicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}
      <Text style={styles.sectionLabel}>End Date (optional)</Text>
      <Button mode="outlined" onPress={() => setShowEndDatePicker(true)} style={styles.dateBtn}>
        {endDate ? endDate.toLocaleDateString() : 'None'}
      </Button>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={(_, date) => {
            setShowEndDatePicker(false);
            setEndDate(date || null);
          }}
        />
      )}
      <Button mode="contained" onPress={onSave} style={styles.saveBtn} loading={loading} disabled={loading}>
        Save Medicine
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1976D2',
  },
  input: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#1976D2',
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reminderTime: {
    fontSize: 16,
    marginRight: 12,
  },
  addTimeBtn: {
    marginBottom: 8,
  },
  dateBtn: {
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  saveBtn: {
    marginTop: 24,
    backgroundColor: '#1976D2',
  },
});

export default AddMedicine; 