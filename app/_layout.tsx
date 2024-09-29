import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await SecureStore.getItemAsync('userToken');
      const inAuthGroup = segments[0] === '(auth)';

      if (!userToken && !inAuthGroup) {
        router.replace('/login');
      } else if (userToken && inAuthGroup) {
        router.replace('/(tabs)');
      }
    };

    checkAuth();
  }, [segments]);
}

export default function RootLayout() {
  useProtectedRoute();

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}