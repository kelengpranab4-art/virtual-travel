import { View, Text, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ActionButton } from '../../components/ui/ActionButton';
import { Tag } from '../../components/ui/Tag';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function VirtualExperienceScreen() {
  const { id, title, desc, destin, rating, season, image } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Media */}
        <Animated.View entering={FadeIn.duration(600)} style={styles.mediaContainer}>
          {image ? (
            <Image source={{ uri: image as string }} style={styles.image} />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="map-outline" size={60} color="#3B82F6" />
              <Text style={styles.placeholderText}>No Media Preview</Text>
            </View>
          )}
          <View style={styles.backButtonContainer}>
            <ActionButton 
              label="" 
              onPress={() => router.back()} 
              variant="secondary" 
              style={styles.backButton}
              textStyle={{ width: 0 }} // Hide label as we use icon
            />
            <View style={styles.backIcon}>
               <Ionicons name="chevron-back" size={24} color="#FFF" />
            </View>
          </View>
        </Animated.View>

        <View style={styles.content}>
          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <View style={styles.headerRow}>
              <View style={styles.locationTag}>
                <Ionicons name="location" size={16} color="#3B82F6" />
                <Text style={styles.dest}>{destin}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{rating}</Text>
              </View>
            </View>
            
            <Text style={styles.title}>{title}</Text>
            
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="calendar-outline" size={18} color="#94A3B8" />
                <Text style={styles.infoText}>Best in {season}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={18} color="#94A3B8" />
                <Text style={styles.infoText}>45 min tour</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.description}>{desc}</Text>
            
            <View style={styles.tagsContainer}>
              <Tag label="Virtual Tour" backgroundColor="#1E293B" />
              <Tag label="360°" backgroundColor="#1E293B" />
              <Tag label="AI Guide" backgroundColor="#1E293B" />
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(600).springify()} style={styles.section}>
            <Text style={styles.sectionTitle}>Experience Gallery</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gallery}>
              {[1, 2, 3].map((item) => (
                <View key={item} style={styles.galleryThumb}>
                   <Ionicons name="videocam-outline" size={24} color="#475569" />
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <ActionButton 
          label="Start Virtual Discovery" 
          onPress={() => router.push({ pathname: `/prediction/${id}`, params: { id, title } })} 
          style={styles.fullButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scrollView: { flex: 1 },
  mediaContainer: { height: 400, width: '100%', position: 'relative' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  placeholderImage: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E293B' },
  placeholderText: { color: '#475569', fontWeight: 'bold', fontSize: 18, marginTop: 12 },
  backButtonContainer: { position: 'absolute', top: 60, left: 24, width: 44, height: 44 },
  backButton: { width: 44, height: 44, paddingHorizontal: 0, borderRadius: 22, backgroundColor: 'rgba(15, 23, 42, 0.5)' },
  backIcon: { position: 'absolute', top: 10, left: 8, pointerEvents: 'none' },
  content: { padding: 24, paddingBottom: 120 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  locationTag: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dest: { color: '#3B82F6', fontWeight: '700', fontSize: 16, textTransform: 'uppercase' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#1E293B', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  rating: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  title: { fontSize: 36, fontWeight: '900', color: '#F8FAFC', marginBottom: 16, letterSpacing: -0.5 },
  infoRow: { flexDirection: 'row', gap: 20, marginBottom: 32 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoText: { color: '#94A3B8', fontSize: 14, fontWeight: '500' },
  section: { marginBottom: 32 },
  sectionTitle: { color: '#F8FAFC', fontSize: 20, fontWeight: '700', marginBottom: 16 },
  description: { color: '#94A3B8', fontSize: 16, lineHeight: 26, marginBottom: 20 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  gallery: { gap: 12 },
  galleryThumb: { width: 140, height: 100, backgroundColor: '#1E293B', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    padding: 24, 
    paddingBottom: 40, 
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)'
  },
  fullButton: { width: '100%' }
});
