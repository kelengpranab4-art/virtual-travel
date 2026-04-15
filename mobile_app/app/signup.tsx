import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { ActionButton } from '../components/ui/ActionButton';
import { API_URL } from '../constants/Config';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (res.ok) {
        Alert.alert('Success', 'Account created!');
        router.replace('/');
      } else {
        const error = await res.json();
        Alert.alert('Signup failed', error.error || 'Unknown error');
      }
    } catch (e) {
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#94A3B8"
        value={name}
        onChangeText={setName}
      />
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
      
      <ActionButton label="Sign Up" onPress={handleSignup} style={styles.button} />

      <ActionButton 
        label="Back to Login" 
        onPress={() => router.back()} 
        variant="secondary"
        style={styles.link}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'center', padding: 24 },
  title: { fontSize: 36, fontWeight: '900', color: '#F8FAFC', marginBottom: 40 },
  input: { backgroundColor: '#1E293B', color: '#FFF', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#334155' },
  button: { marginTop: 10 },
  link: { marginTop: 24 },
});
