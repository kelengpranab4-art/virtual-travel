import React from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { Tag } from './Tag';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface Experience {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  rating: number;
  categories: string[];
}

interface ExperienceCardProps {
  experience: Experience;
  onPress: (id: string) => void;
  index?: number;
}

export function ExperienceCard({ experience, onPress, index = 0 }: ExperienceCardProps) {
  const pressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(pressed.value ? 0.96 : 1, { mass: 0.5, damping: 10, stiffness: 100 }) }
      ],
    };
  });

  return (
    <AnimatedPressable
      onPressIn={() => (pressed.value = true)}
      onPressOut={() => (pressed.value = false)}
      onPress={() => onPress(experience.id)}
      entering={FadeInDown.delay(index * 100).springify()}
      style={[styles.container, animatedStyle]}
    >
      <ImageBackground
        source={{ uri: experience.imageUrl }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          {/* Top Row: Rating Badge */}
          <View style={styles.topRow}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{experience.rating.toFixed(1)}</Text>
            </View>
          </View>

          {/* Bottom Row: Info & Tags */}
          <View style={styles.bottomInfo}>
            <Text style={styles.title}>{experience.title}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={16} color="#FFF" />
              <Text style={styles.location}>{experience.location}</Text>
            </View>
            
            <View style={styles.tagsContainer}>
              {experience.categories.map((cat, i) => (
                <Tag key={i} label={cat} />
              ))}
            </View>
          </View>
        </View>
      </ImageBackground>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 320,
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    borderRadius: 24,
  },
  overlay: {
    flex: 1,
    borderRadius: 24,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.35)', // Dark gradient effect
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 14,
  },
  bottomInfo: {
    gap: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  location: {
    fontSize: 16,
    color: '#F0F0F0',
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
});
