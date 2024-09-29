import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: async () => {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('user');
            router.replace('/login');
          }
        }
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      color: '#000',
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    settingText: {
      fontSize: 16,
      color: '#333',
    },
    logoutButton: {
      backgroundColor: '#FF3B30',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    logoutButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>Account</Text>
      <Link href="/change-password" asChild>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
      </Link>
      <Link href="/privacy-policy" asChild>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
      </Link>
      <Link href="/terms-of-service" asChild>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Terms of Service</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
      </Link>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}