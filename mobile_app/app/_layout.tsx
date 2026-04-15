import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#121212' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#121212' },
        }}
      >
        <Stack.Screen name="login" options={{ title: 'Log In', headerShown: false }} />
        <Stack.Screen name="signup" options={{ title: 'Sign Up', presentation: 'modal' }} />
        <Stack.Screen name="index" options={{ title: 'Travel Setup', headerShown: true }} />
        <Stack.Screen name="recommendations" options={{ title: 'VR Discovery' }} />
        <Stack.Screen name="profile" options={{ title: 'My Profile', presentation: 'modal' }} />
        <Stack.Screen name="experience/[id]" options={{ title: 'Virtual Tour', headerBackTitle: 'Back' }} />
        <Stack.Screen name="prediction/[id]" options={{ title: 'Trip Forecast', presentation: 'formSheet' }} />
      </Stack>
    </>
  );
}
