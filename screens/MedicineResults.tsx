// import React from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import { Text, Button } from 'react-native-paper';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import ResultCard from '../components/ResultCard';

// const MedicineResults = () => {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   let result: any = null;
//   try {
//     result = params.result ? JSON.parse(params.result as string) : null;
//   } catch {
//     result = null;
//   }

//   // Debug output
//   console.log('params:', params);
//   console.log('result:', result);

//   // Try to extract the AI's message content
//   let content = '';
//   if (result && result.choices && result.choices[0]?.message?.content) {
//     content = result.choices[0].message.content;
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text variant="headlineMedium" style={styles.title}>Medicine Analysis Results</Text>
//       {content ? (
//         <ResultCard title="AI Analysis" content={content} />
//       ) : (
//         <Text>No analysis result found.</Text>
//       )}
      
     
//       <Button onPress={() => router.back()} style={styles.backBtn}>Back</Button>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     marginBottom: 24,
//   },
//   backBtn: {
//     marginTop: 16,
//   },
// });

// export default MedicineResults; 

// app/medicine-results.tsx

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ResultCard from '../components/ResultCard';

const MedicineResults = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  let result: any = null;
  let parsedJson: any = null;
  let content = '';

  try {
    result = params.result ? JSON.parse(params.result as string) : null;
    content = result?.choices?.[0]?.message?.content || '';
    if (content) {
      parsedJson = JSON.parse(content);
    }
  } catch (err) {
    console.error('JSON parse error:', err);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Medicine Analysis Results</Text>

      {parsedJson ? (
        <>
          <ResultCard title="Name" content={parsedJson.name} />
          <ResultCard title="Usage" content={parsedJson.usage} />
          <ResultCard title="Dosage (Children)" content={parsedJson.dosage?.children} />
          <ResultCard title="Dosage (Adults)" content={parsedJson.dosage?.adults} />
          <ResultCard title="Side Effects" content={parsedJson.sideEffects} />
          <ResultCard title="Precautions" content={parsedJson.precautions} />
          <ResultCard title="Alternatives" content={parsedJson.alternatives?.join(', ')} />
          <ResultCard title="Buy Links" content={parsedJson.buyLinks?.join('\n')} />
        </>
      ) : content ? (
        <ResultCard title="Raw AI Output" content={content} />
      ) : (
        <Text>No analysis result found.</Text>
      )}

      <Button onPress={() => router.back()} style={styles.backBtn}>Back</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  backBtn: {
    marginTop: 16,
  },
});

export default MedicineResults;
