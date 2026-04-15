import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarInitials}>JD</Text>
      </View>
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john@example.com</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Experiences VR'd</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Reviews Left</Text>
        </View>
      </View>

      <Pressable style={styles.logoutButton} onPress={() => router.replace('/login')}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 24, alignItems: 'center' },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#6C5CE7', alignItems: 'center', justifyContent: 'center', marginTop: 40, marginBottom: 20 },
  avatarInitials: { fontSize: 36, color: '#fff', fontWeight: 'bold' },
  name: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  email: { fontSize: 16, color: '#a0a0a0', marginBottom: 40 },
  statsContainer: { flexDirection: 'row', gap: 20 },
  statBox: { backgroundColor: '#1e1e1e', padding: 20, borderRadius: 16, alignItems: 'center', flex: 1, borderWidth: 1, borderColor: '#333' },
  statNumber: { fontSize: 32, fontWeight: 'bold', color: '#00D2D3', marginBottom: 8 },
  statLabel: { color: '#a0a0a0', fontSize: 14, textAlign: 'center' },
  logoutButton: { marginTop: 'auto', backgroundColor: '#e74c3c', padding: 16, borderRadius: 12, width: '100%', alignItems: 'center', marginBottom: 20 },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
