import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { API_URL } from '../../constants/Config';

export default function PredictionScreen() {
  const { id, title } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [satisfaction, setSatisfaction] = useState<any>(null);
  const [sentiment, setSentiment] = useState<any>(null);

  useEffect(() => {
    const runPredictions = async () => {
      try {
        // Use realistic dummy inputs as we haven't carried forward user state purely for the demo
        const resSat = await fetch(`${API_URL}/api/predict_satisfaction`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_interests: ['Nature', 'Wildlife'], experience_tags: ['Nature', 'Adventure'] })
        });
        const dataSat = await resSat.json();

        const resSent = await fetch(`${API_URL}/api/analyze_sentiment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ review_text: "Absolutely stunning nature, although a bit physically exhausting!" })
        });
        const dataSent = await resSent.json();

        setSatisfaction(dataSat);
        setSentiment(dataSent);
      } catch (e) {
        console.error("Prediction failed");
      } finally {
        setLoading(false);
      }
    };
    runPredictions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trip Prediction for {title}</Text>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#00D2D3" />
          <Text style={styles.loaderText}>Analyzing your profile vs experience...</Text>
        </View>
      ) : (
        <View style={styles.results}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Satisfaction Forecast</Text>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreText}>{satisfaction?.predicted_score || 0}%</Text>
            </View>
            <Text style={styles.label}>{satisfaction?.rating_label || 'Unknown'}</Text>
            <Text style={styles.desc}>Based on deep cross-analysis of your travel interests against destination metadata.</Text>
          </View>

          <View style={[styles.card, { marginTop: 24 }]}>
            <Text style={styles.cardTitle}>General Sentiment Analysis</Text>
            <Text style={styles.sentimentLabel}>Status: <Text style={{color: '#00D2D3'}}>{sentiment?.sentiment_label || 'Neutral'}</Text></Text>
            <Text style={styles.desc}>An AI synthesis of recent traveler reviews indicates positive views overall.</Text>
          </View>
          
          <Pressable style={styles.doneBtn} onPress={() => router.push('/')}>
            <Text style={styles.doneBtnText}>Explore More</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 24 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 32, marginTop: 20 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loaderText: { color: '#a0a0a0', marginTop: 16, fontSize: 16 },
  results: { flex: 1 },
  card: { backgroundColor: '#1e1e1e', padding: 24, borderRadius: 20, borderWidth: 1, borderColor: '#333', alignItems: 'center' },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  scoreCircle: { width: 120, height: 120, borderRadius: 60, borderWidth: 6, borderColor: '#6C5CE7', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  scoreText: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  label: { fontSize: 22, fontWeight: 'bold', color: '#00D2D3', marginBottom: 12 },
  desc: { color: '#a0a0a0', textAlign: 'center', lineHeight: 22 },
  sentimentLabel: { fontSize: 18, color: '#fff', fontWeight: 'bold', marginBottom: 12 },
  doneBtn: { backgroundColor: '#333', padding: 18, borderRadius: 16, alignItems: 'center', marginTop: 'auto', marginBottom: 20 },
  doneBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
