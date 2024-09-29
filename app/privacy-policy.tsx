import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyPolicyScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#000',
    },
    content: {
      fontSize: 16,
      color: '#333',
      lineHeight: 24,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.content}>
          This Privacy Policy describes how your personal information is collected, used, and shared when you use our GymApp.
          {'\n\n'}
          1. Information We Collect
          {'\n\n'}
          We collect information you provide directly to us, such as when you create an account, update your profile, or log your workouts.
          {'\n\n'}
          2. How We Use Your Information
          {'\n\n'}
          We use the information we collect to provide, maintain, and improve our services, and to communicate with you.
          {'\n\n'}
          3. Sharing of Information
          {'\n\n'}
          We do not share your personal information with third parties except as described in this privacy policy.
          {'\n\n'}
          4. Data Security
          {'\n\n'}
          We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
          {'\n\n'}
          5. Changes to This Privacy Policy
          {'\n\n'}
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}