import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Muscles',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="body-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="calories"
        options={{
          title: 'Calories',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="weights"
        options={{
          title: 'Weight',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scale-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="strength"
        options={{
          title: 'Strength',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}