import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TagProps {
  label: string;
  color?: string;
  backgroundColor?: string;
}

export function Tag({ label, color = '#FFFFFF', backgroundColor = 'rgba(0,0,0,0.4)' }: TagProps) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
