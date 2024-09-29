import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function CaloriesScreen() {
  const [calories, setCalories] = useState('');
  const [calorieEntries, setCalorieEntries] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadCalorieEntries();
  }, []);

  const loadCalorieEntries = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('calorieEntries');
      if (savedEntries) {
        const parsedEntries = JSON.parse(savedEntries);
        const sortedEntries = parsedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
        setCalorieEntries(sortedEntries);
      }
    } catch (error) {
      console.error('Error loading calorie entries:', error);
    }
  };

  const saveCalorieEntry = async () => {
    if (calories) {
      const newEntry = { calories: parseInt(calories), date: date.toISOString() };
      const updatedEntries = [...calorieEntries, newEntry].sort((a, b) => new Date(b.date) - new Date(a.date));
      try {
        await AsyncStorage.setItem('calorieEntries', JSON.stringify(updatedEntries));
        setCalorieEntries(updatedEntries);
        setCalories('');
        setDate(new Date());
      } catch (error) {
        console.error('Error saving calorie entry:', error);
      }
    }
  };

  const deleteCalorieEntry = async (index) => {
    const updatedEntries = calorieEntries.filter((_, i) => i !== index);
    try {
      await AsyncStorage.setItem('calorieEntries', JSON.stringify(updatedEntries));
      setCalorieEntries(updatedEntries);
    } catch (error) {
      console.error('Error deleting calorie entry:', error);
    }
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
    input: {
      backgroundColor: '#f0f0f0',
      padding: 12,
      borderRadius: 8,
      fontSize: 16,
      marginBottom: 16,
      color: '#000',
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    entryList: {
      marginTop: 24,
    },
    entryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    entryText: {
      fontSize: 16,
      color: '#000',
    },
    deleteButton: {
      padding: 8,
    },
    chartTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 16,
      color: '#000',
    },
    dateButton: {
      backgroundColor: '#f0f0f0',
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
    },
    dateButtonText: {
      fontSize: 16,
      color: '#000',
    },
  });

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const chartData = {
    labels: calorieEntries.slice(0, 7).map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [{
      data: calorieEntries.slice(0, 7).map(entry => entry.calories)
    }]
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
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
          placeholder="Enter calories"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={calories}
          onChangeText={setCalories}
        />
        <TouchableOpacity style={styles.button} onPress={saveCalorieEntry}>
          <Text style={styles.buttonText}>Save Calories</Text>
        </TouchableOpacity>

        {calorieEntries.length > 0 && (
          <>
            <Text style={styles.chartTitle}>Calorie Trend (Last 7 Entries)</Text>
            <LineChart
              data={chartData}
              width={width - 32}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </>
        )}

        <View style={styles.entryList}>
          {calorieEntries.map((entry, index) => (
            <View key={index} style={styles.entryItem}>
              <Text style={styles.entryText}>{new Date(entry.date).toLocaleDateString()}: {entry.calories} calories</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteCalorieEntry(index)}
              >
                <Ionicons name="close-circle-outline" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}