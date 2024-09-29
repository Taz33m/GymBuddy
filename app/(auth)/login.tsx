import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const userToken = await SecureStore.getItemAsync('userToken');
    if (userToken) {
      router.replace('/(tabs)');
    }
  };

  const handleLogin = async () => {
    try {
      const storedUser = await SecureStore.getItemAsync('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
          // Login successful
          await SecureStore.setItemAsync('userToken', 'dummy-auth-token');
          router.replace('/(tabs)');
        } else {
          Alert.alert('Error', 'Invalid email or password');
        }
      } else {
        Alert.alert('Error', 'User not found');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Link href="/register" asChild>
        <TouchableOpacity>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 15,
    color: '#007AFF',
  },
});