import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, FAB, ActivityIndicator, Button } from 'react-native-paper';
import { useRouter, useFocusEffect } from 'expo-router';
import { supabase, addDose, getDosesForDate } from '../services/supabase';

function getTodayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

const MedicineReminder = () => {
  const router = useRouter();
  const [medicines, setMedicines] = useState<any[]>([]);
  const [doses, setDoses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchMedicinesAndDoses = async () => {
    setLoading(true);
    setError('');
    try {
      const { data: meds, error: medErr } = await supabase.from('medicines').select('*').order('created_at', { ascending: false });
      if (medErr) throw medErr;
      setMedicines(meds || []);
      const { data: doseData, error: doseErr } = await getDosesForDate(getTodayISO());
      if (doseErr) throw doseErr;
      setDoses(doseData || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch medicines.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMedicinesAndDoses();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchMedicinesAndDoses();
  };

  const markDose = async (medicine_id: string, time: string, status: string) => {
    await addDose({ medicine_id, date: getTodayISO(), time, status });
    fetchMedicinesAndDoses();
  };

  function getDoseStatus(medicine_id: string, time: string) {
    const dose = doses.find((d: any) => d.medicine_id === medicine_id && d.time === time);
    return dose ? dose.status : null;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Medicine Reminders</Text>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 32 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : medicines.length === 0 ? (
        <Text style={styles.emptyText}>No medicines added yet.</Text>
      ) : (
        <FlatList
          data={medicines}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <View style={styles.medicineCard}>
              <Text style={styles.medicineName}>{item.name}</Text>
              <Text style={styles.medicineDosage}>{item.dosage}</Text>
              <Text style={styles.medicineTime}>Start: {item.start_date}</Text>
              {item.end_date && <Text style={styles.medicineTime}>End: {item.end_date}</Text>}
              <Text style={styles.sectionLabel}>Today's Doses:</Text>
              {Array.isArray(item.reminder_times) && item.reminder_times.length > 0 ? (
                item.reminder_times.map((time: string, idx: number) => {
                  const status = getDoseStatus(item.id, time);
                  return (
                    <View key={idx} style={styles.doseRow}>
                      <Text style={styles.doseTime}>{time}</Text>
                      {status === 'taken' ? (
                        <Text style={styles.taken}>✅ Taken</Text>
                      ) : status === 'skipped' ? (
                        <Text style={styles.skipped}>❌ Skipped</Text>
                      ) : (
                        <>
                          <Button mode="contained" compact style={styles.doseBtn} onPress={() => markDose(item.id, time, 'taken')}>Taken</Button>
                          <Button mode="outlined" compact style={styles.doseBtn} onPress={() => markDose(item.id, time, 'skipped')}>Skip</Button>
                        </>
                      )}
                    </View>
                  );
                })
              ) : (
                <Text style={styles.doseTime}>No times set</Text>
              )}
            </View>
          )}
        />
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        label="Add Medicine"
        onPress={() => router.push('/AddMedicine')}
      />
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
    fontSize: 16,
  },
  medicineCard: {
    backgroundColor: '#f4f8fb',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  medicineName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1976D2',
  },
  medicineDosage: {
    fontSize: 15,
    color: '#333',
    marginTop: 2,
  },
  medicineTime: {
    fontSize: 14,
    color: '#388E3C',
    marginTop: 4,
  },
  sectionLabel: {
    fontWeight: 'bold',
    marginTop: 12,
    color: '#1976D2',
  },
  doseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 2,
  },
  doseTime: {
    fontSize: 15,
    marginRight: 10,
    color: '#333',
  },
  doseBtn: {
    marginRight: 6,
    height: 32,
    justifyContent: 'center',
  },
  taken: {
    color: '#388E3C',
    fontWeight: 'bold',
    fontSize: 15,
  },
  skipped: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 15,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    backgroundColor: '#1976D2',
  },
});

export default MedicineReminder; 