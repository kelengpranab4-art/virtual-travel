import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ExperienceCard } from '../components/ui/ExperienceCard';
import { API_URL } from '../constants/Config';

type ApiExperience = {
  id: string;
  destination_name: string;
  experience_name: string;
  description: string;
  travel_category: string;
  rating: number;
  best_season: string;
  image_url: string;
  tags: string[];
};

export default function RecommendationsScreen() {
  const { tags } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [experiences, setExperiences] = useState<ApiExperience[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const userTags = (tags as string).split(',');
        const response = await fetch(`${API_URL}/api/recommendations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ interests: userTags })
        });
        
        if (response.ok) {
          const data = await response.json();
          setExperiences(data);
        } else {
          // Mock data for demo if backend is not running
          setExperiences([
            {
              id: '1',
              destination_name: 'Kyoto, Japan',
              experience_name: 'Zen Garden Meditation',
              description: 'Experience inner peace in a traditional garden.',
              travel_category: 'Culture',
              rating: 4.8,
              best_season: 'Spring',
              image_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop',
              tags: ['Peaceful', 'Meditation', 'Traditional']
            },
            {
              id: '2',
              destination_name: 'Swiss Alps',
              experience_name: 'Heliskiing Adventure',
              description: 'Thrilling heliskiing in the pristine Swiss Alps.',
              travel_category: 'Adventure',
              rating: 4.9,
              best_season: 'Winter',
              image_url: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=1000&auto=format&fit=crop',
              tags: ['Extreme', 'Snow', 'Mountains']
            }
          ]);
        }
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [tags]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Curating your experiences...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tailored For You</Text>
      
      <FlatList
        data={experiences}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, gap: 0 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ExperienceCard
            index={index}
            experience={{
              id: item.id,
              title: item.experience_name,
              location: item.destination_name,
              imageUrl: item.image_url || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop',
              rating: item.rating,
              categories: [item.travel_category, ...(item.tags?.slice(0, 2) || [])]
            }}
            onPress={(id) => {
              router.push({
                pathname: "/experience/[id]",
                params: { 
                  id: item.id, 
                  title: item.experience_name,
                  destin: item.destination_name,
                  desc: item.description,
                  rating: item.rating,
                  season: item.best_season,
                  image: item.image_url || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'
                }
              })
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#F8FAFC', 
    marginTop: 20, 
    marginBottom: 20, 
    paddingHorizontal: 24 
  },
  loadingContainer: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: '#94A3B8', marginTop: 16, fontSize: 16, fontWeight: '500' },
});

