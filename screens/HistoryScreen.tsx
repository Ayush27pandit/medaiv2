import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SectionList } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { supabase } from '../services/supabase';

function groupByDate(doses: any[]) {
  const groups: { [date: string]: any[] } = {};
  doses.forEach(dose => {
    if (!groups[dose.date]) groups[dose.date] = [];
    groups[dose.date].push(dose);
  });
  return Object.entries(groups).map(([date, data]) => ({ title: date, data }));
}

const HistoryScreen = () => {
  const [doses, setDoses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoses = async () => {
      setLoading(true);
      setError('');
      try {
        const { data, error } = await supabase.from('doses').select('*').order('date', { ascending: false });
        if (error) throw error;
        setDoses(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch history.');
      } finally {
        setLoading(false);
      }
    };
    fetchDoses();
  }, []);

  const sections = groupByDate(doses);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Dose History</Text>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 32 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.doseRow}>
              <Text style={styles.doseTime}>{item.time}</Text>
              <Text style={item.status === 'taken' ? styles.taken : styles.skipped}>
                {item.status === 'taken' ? '✅ Taken' : '❌ Skipped'}
              </Text>
            </View>
          )}
        />
      )}
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
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1976D2',
    marginTop: 18,
    marginBottom: 6,
  },
  doseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  doseTime: {
    fontSize: 15,
    marginRight: 10,
    color: '#333',
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
});

export default HistoryScreen; 