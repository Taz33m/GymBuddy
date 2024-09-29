import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function StrengthScreen() {
  const [strengthEntries, setStrengthEntries] = useState({});
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadStrengthEntries();
  }, []);

  const loadStrengthEntries = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('strengthEntries');
      if (savedEntries) {
        setStrengthEntries(JSON.parse(savedEntries));
      }
    } catch (error) {
      console.error('Error loading strength entries:', error);
    }
  };

  const saveStrengthEntries = async (entries) => {
    try {
      await AsyncStorage.setItem('strengthEntries', JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving strength entries:', error);
    }
  };

  const handleStrengthSubmit = () => {
    if (exercise && weight && reps) {
      const weightNum = parseFloat(weight);
      const repsNum = parseInt(reps);
      const oneRepMax = weightNum * (1 + repsNum / 30); // Epley formula
      const newEntry = {
        date: date.toISOString(),
        weight: weightNum,
        reps: repsNum,
        oneRepMax: oneRepMax.toFixed(2)
      };
      const updatedEntries = {
        ...strengthEntries,
        [exercise]: [...(strengthEntries[exercise] || []), newEntry]
      };
      setStrengthEntries(updatedEntries);
      saveStrengthEntries(updatedEntries);
      setExercise('');
      setWeight('');
      setReps('');
      setDate(new Date());
    }
  };

  const deleteStrengthEntry = (exerciseName, index) => {
    const updatedExerciseEntries = strengthEntries[exerciseName].filter((_, i) => i !== index);
    const updatedEntries = {
      ...strengthEntries,
      [exerciseName]: updatedExerciseEntries
    };
    if (updatedExerciseEntries.length === 0) {
      delete updatedEntries[exerciseName];
    }
    setStrengthEntries(updatedEntries);
    saveStrengthEntries(updatedEntries);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    content: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#000',
    },
    input: {
      backgroundColor: '#f0f0f0',
      padding: 8,
      marginBottom: 8,
      borderRadius: 4,
      color: '#000',
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 12,
      borderRadius: 4,
      alignItems: 'center',
      marginBottom: 16,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    exerciseTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 8,
      color: '#000',
    },
    entryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    entryText: {
      color: '#666',
      flex: 1,
    },
    deleteButton: {
      padding: 8,
    },
    dateButton: {
      backgroundColor: '#f0f0f0',
      padding: 8,
      borderRadius: 4,
      marginBottom: 8,
    },
    dateButtonText: {
      fontSize: 16,
      color: '#000',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Strength Tracker</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateButtonText}>
            {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Exercise"
          placeholderTextColor="#666"
          value={exercise}
          onChangeText={setExercise}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (lbs)"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Reps"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={reps}
          onChangeText={setReps}
        />
        <TouchableOpacity style={styles.button} onPress={handleStrengthSubmit}>
          <Text style={styles.buttonText}>Log Strength</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Strength History</Text>
        {Object.entries(strengthEntries).map(([exercise, entries]) => (
          <View key={exercise}>
            <Text style={styles.exerciseTitle}>{exercise}</Text>
            {entries.map((entry, index) => (
              <View key={index} style={styles.entryItem}>
                <Text style={styles.entryText}>
                  {new Date(entry.date).toLocaleDateString()}: {entry.weight} lbs x {entry.reps} reps (1RM: {entry.oneRepMax} lbs)
                </Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteStrengthEntry(exercise, index)}
                >
                  <Ionicons name="close-circle-outline" size={24} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}