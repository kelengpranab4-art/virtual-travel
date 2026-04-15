import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { ActionButton } from '../components/ui/ActionButton';
import { API_URL } from '../constants/Config';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        router.replace('/');
      } else {
        Alert.alert('Login failed', 'Invalid credentials');
      }
    } catch (e) {
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Log in to continue your virtual adventure.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <ActionButton label="Log In" onPress={handleLogin} style={styles.button} />

      <ActionButton 
        label="Create an account" 
        onPress={() => router.push('/signup')} 
        variant="secondary"
        style={styles.link}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', padding: 24 },
  title: { fontSize: 36, fontWeight: '900', color: '#F8FAFC', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#94A3B8', marginBottom: 40 },
  input: {
    backgroundColor: '#1E293B',
    color: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155'
  },
  button: { marginTop: 10 },
  link: { marginTop: 24 },
});
