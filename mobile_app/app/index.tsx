import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ActionButton } from '../components/ui/ActionButton';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function IndexScreen() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const ALL_TAGS = ['Nature', 'Adventure', 'Culture', 'Food', 'Photography', 'Wildlife', 'Relaxation', 'Cityscapes'];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleContinue = () => {
    if (selectedTags.length > 0) {
      router.push({
        pathname: '/recommendations',
        params: { tags: selectedTags.join(',') },
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.heroSection}>
          <Text style={styles.title}>AI VR Travel</Text>
          <Text style={styles.subtitle}>Curate your perfect virtual discovery.</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.content}>
          <Text style={styles.instruction}>Select your interests required for AI matching</Text>
          <View style={styles.tagsContainer}>
            {ALL_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <Pressable
                  key={tag}
                  style={[styles.tag, isSelected && styles.tagSelected]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>
                    {tag}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>

      <Animated.View entering={FadeInDown.delay(600).springify()} style={styles.footer}>
        <ActionButton 
          label="Generate Experiences" 
          onPress={handleContinue} 
          variant={selectedTags.length > 0 ? 'primary' : 'secondary'}
          style={selectedTags.length === 0 ? { opacity: 0.5 } : {}}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { padding: 24, paddingBottom: 100 },
  heroSection: { marginTop: 40, marginBottom: 40 },
  title: { fontSize: 44, fontWeight: '900', color: '#F8FAFC', letterSpacing: -1.5, marginBottom: 12 },
  subtitle: { fontSize: 20, color: '#94A3B8', lineHeight: 28 },
  content: { flex: 1 },
  instruction: { fontSize: 18, color: '#E2E8F0', fontWeight: '500', marginBottom: 24 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tag: { 
    paddingVertical: 14, 
    paddingHorizontal: 22, 
    borderRadius: 30, 
    backgroundColor: '#1E293B', 
    borderWidth: 1, 
    borderColor: '#334155' 
  },
  tagSelected: { backgroundColor: '#3B82F6', borderColor: '#2563EB' },
  tagText: { color: '#94A3B8', fontSize: 16, fontWeight: '600' },
  tagTextSelected: { color: '#FFFFFF' },
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    padding: 24, 
    paddingBottom: 40, 
    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
  },
});
