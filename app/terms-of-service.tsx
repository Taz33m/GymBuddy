import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsOfServiceScreen() {
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
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.content}>
          By using our GymApp, you agree to these terms. Please read them carefully.
          {'\n\n'}
          1. Use of the App
          {'\n\n'}
          You must follow any policies made available to you within the app. Don't misuse our app. For example, don't interfere with our app or try to access it using a method other than the interface and the instructions that we provide.
          {'\n\n'}
          2. Privacy
          {'\n\n'}
          Our privacy policy explains how we treat your personal data and protect your privacy when you use our app. By using our app, you agree that we can use such data in accordance with our privacy policy.
          {'\n\n'}
          3. Modifying and Terminating our Services
          {'\n\n'}
          We are constantly changing and improving our app. We may add or remove functionalities or features, and we may suspend or stop the app altogether.
          {'\n\n'}
          4. Our Warranties and Disclaimers
          {'\n\n'}
          We provide our app using a commercially reasonable level of skill and care and we hope that you will enjoy using it. But there are certain things that we don't promise about our app.
          {'\n\n'}
          5. Liability for our Services
          {'\n\n'}
          When permitted by law, GymApp and its suppliers and distributors will not be responsible for lost profits, revenues, or data, financial losses or indirect, special, consequential, exemplary, or punitive damages.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}