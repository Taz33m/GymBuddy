import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

const muscleData = {
  neck: {
    name: "Neck",
    description: "The neck muscles support the head and allow for its movement.",
    function: "Enables head rotation, flexion, and extension.",
    gif: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Neck-Stretch-muscle-worked.png",
    exercises: [
      { name: "Neck Rotation Stretch", equipment: "Bodyweight", target: "Neck", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/07/Rotating-Neck-Stretch.gif" },
      { name: "Neck Flexion Stretch", equipment: "Bodyweight", target: "Neck", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/07/Neck-Flexion-Stretch.png" },
      { name: "Weighted Lying Neck Extension", equipment: "Light Weight", target: "Neck", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/08/Weighted-Lying-Neck-Extension.gif" },
      { name: "Diagnol Neck Stretch", equipment: "Bodyweight", target: "Neck", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/07/Diagonal-Neck-Stretch.png" },
      { name: "Side Neck Stretch", equipment: "Bodyweight", target: "Neck", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Side-Neck-Stretch.gif" }
    ]
  },
  trapezius: {
    name: "Trapezius",
    description: "The trapezius muscles span the upper back and neck, connecting the spine to the shoulder blades.",
    function: "Responsible for scapular elevation, retraction, and rotation, and assists in neck movements.",
    gif: "https://fitnessprogramer.com/wp-content/uploads/2022/07/Overhead-Shrug-Muscles-Worked--300x300.png",
    exercises: [
      { name: "Overhead Shrug", equipment: "Barbell", target: "Trapezius", gif: "https://fitnessprogramer.com/wp-content/uploads/2022/07/overhead-shrug.gif" },
      { name: "Gittleson Shrug", equipment: "Dumbbells", target: "Trapezius, Neck", gif: "https://fitnessprogramer.com/wp-content/uploads/2022/01/Dumbbell-Seated-Gittleson-Shrug.gif" },
      { name: "45 Degree Incline Row", equipment: "Dumbbells", target: "Trapezius, Shoulders", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/45-Degree-Incline-Row.gif" },
      { name: "Dumbell Shrug", equipment: "Dumbbells", target: "Trapezius", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/04/Dumbbell-Shrug.gif" },
      { name: "Cable Shrug", equipment: "Cable Machine", target: "Trapezius", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/04/Cable-Shrug.gif" }
    ]
  },
  shoulders: {
    name: "Shoulders",
    description: "The shoulder muscles enable arm movement in various directions.",
    function: "Allows for arm rotation and abduction.",
    gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/shoulder-press-muscle-worked-300x300.png",
    exercises: [
      { name: "One Arm Medicine Ball Slam", equipment: "Exercise Ball", target: "Abs, Chest, Full Body, Shoulders", gif: "https://fitnessprogramer.com/wp-content/uploads/2024/06/One-Arm-Medicine-Ball-Slam.gif" },
      { name: "Seated Barbell Shoulder Press", equipment: "Barbell", target: "Shoulders", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shoulder-Press.gif" },
      { name: "Medicine Ball Overhead Throw", equipment: "Exercise Ball", target: "Chest, Shoulders, Triceps", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/09/Medicine-Ball-Overhead-Throw.gif" },
      { name: "Dumbbell Push Press", equipment: "Dumbbells", target: "Full Body, Shoulders", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/10/Dumbbell-Push-Press.gif" },
      { name: "Standing Dumbbell Shoulder Press", equipment: "Dumbbells", target: "Shoulders", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif" }
    ]
  },
  chest: {
    name: "Chest",
    description: "The chest muscles are responsible for movements of the arm across the body.",
    function: "Involved in pushing movements and arm adduction.",
    gif: "https://fitnessprogramer.com/wp-content/uploads/2023/08/Medicine-Ball-Chest-Pass-muscles-worked-300x300.png",
    exercises: [
      { name: "One Arm Medicine Ball Slam", equipment: "Exercise Ball", target: "Abs, Chest, Full Body, Shoulders", gif: "https://fitnessprogramer.com/wp-content/uploads/2024/06/One-Arm-Medicine-Ball-Slam.gif" },
      { name: "Medicine Ball Overhead Throw", equipment: "Exercise Ball", target: "Chest, Shoulders, Triceps", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/09/Medicine-Ball-Overhead-Throw.gif" },
      { name: "Standing Medicine Ball Chest Pass", equipment: "Exercise Ball", target: "Chest", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/08/Standing-Medicine-Ball-Chest-Pass.gif" },
      { name: "Incline Chest Fly Machine", equipment: "Machine", target: "Chest", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/06/Incline-Chest-Fly-Machine.gif" },
      { name: "Bench Press", equipment: "Barbell, Bench", target: "Chest", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif" }
    ]
  },
  back: {
    name: "Back / Wing",
    description: "The back muscles, primarily the latissimus dorsi, cover the mid to lower back and sides.",
    function: "Responsible for shoulder adduction, extension, and internal rotation, aiding in pulling movements.",
    gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/SEATED-ROW-MACHINE-muscle-worked-300x300.png",
    exercises: [
      { name: "Lever Front Pulldown", equipment: "Machine", target: "Back / Wing", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Front-Pulldown.gif" },
      { name: "Pull-Up", equipment: "Pull-Up Bar", target: "Back / Wing", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif" },
      { name: "Cable Rear Pulldown", equipment: "Cable Machine", target: "Back / Wing", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/08/Cable-Rear-Pulldown.gif" },
      { name: "Lat Pulldown", equipment: "Cable Machine", target: "Back / Wing", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif" },
      { name: "Seated Cable Row", equipment: "Cable Machine", target: "Back / Wing", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif" }
    ]
  },
  biceps: {
    name: "Biceps",
    description: "The biceps muscles are located on the front of the upper arm.",
    function: "Responsible for elbow flexion and forearm supination.",
    gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/biceps-anatomy-300x300.png",
    exercises: [
      { name: "Seated Zottman Curl", equipment: "Dumbells, Bench", target: "Biceps, Forearm", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/10/Seated-Zottman-Curl.gif" },
      { name: "Standing Barbell Concentration Curl", equipment: "Barbell", target: "Biceps", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/10/Standing-Barbell-Concentration-Curl.gif" },
      { name: "Waiter Curl", equipment: "Dumbbells", target: "Biceps", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/09/waiter-curl.gif" },
      { name: "Double Arm Dumbbell Curl", equipment: "Dumbbells", target: "Biceps", gif: "https://fitnessprogramer.com/wp-content/uploads/2022/04/Double-Arm-Dumbbell-Curl.gif" },
      { name: "Dumbbell Curl", equipment: "Dumbbells", target: "Biceps", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif" }
    ]
  },
  triceps: {
    name: "Triceps",
    description: "The triceps muscles are located on the back of the upper arm.",
    function: "Responsible for elbow extension and arm stabilization.",
    gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/triceps-muscle-worked-1-300x300.png",
    exercises: [
      { name: "Medicine Ball Overhead Throw", equipment: "Exercise Ball", target: "Chest, Shoulders, Triceps", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/09/Medicine-Ball-Overhead-Throw.gif" },
      { name: "One Arm Triceps Pushdown", equipment: "Cable Machine", target: "Triceps", gif: "https://fitnessprogramer.com/wp-content/uploads/2022/11/One-arm-triceps-pushdown.gif" },
      { name: "Dumbbell Kickback", equipment: "Dumbbells, Bench", target: "Triceps", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Kickback.gif" },
      { name: "One Arm Reverse Pushdown", equipment: "Cable Machine", target: "Triceps", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/One-Arm-Reverse-Push-Down.gif" },
      { name: "Push-down", equipment: "Cable Machine", target: "Triceps", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif" }
    ]
  },
  forearm: {
    name: "Forearm",
    description: "The forearm muscles are located between the elbow and wrist.",
    function: "Enable wrist flexion, extension, and hand grip movements.",
    gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/reverse-curl-muscle-worked-300x300.png",
    exercises: [
      { name: "Seated Zottman Curl", equipment: "Dumbbells, Bench", target: "Biceps, Forearm", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/10/Seated-Zottman-Curl.gif" },
      { name: "Dumbbell Seated Neutral Wrist Curl", equipment: "Dumbbells, Bench", target: "Forearm", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Seated-Neutral-Wrist-Curl.gif" },
      { name: "Dumbbell Wrist Curl", equipment: "Dumbbells, Bench", target: "Forearm", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Dumbbell-Wrist-Curl.gif" },
      { name: "Barbell Reverse Wrist Curl", equipment: "Barbell, Bench", target: "Forearm", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Barbell-Reverse-Wrist-Curl.gif" },
      { name: "Wrist Circles Stretch", equipment: "Bodyweight", target: "Forearm", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Wrist-Circles-Stretch.gif" }
    ]
  },
  abs: {
    name: "Abs",
    description: "The abdominal muscles form the core and cover the front of the torso.",
    function: "Facilitate trunk flexion, rotation, and stabilization.",
    gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Crunch-muscle-worked-300x300.png",
    exercises: [
      { name: "One Arm Medicine Ball Slam", equipment: "Exercise Ball", target: "Abs, Chest, Full Body, Shoulders", gif: "https://fitnessprogramer.com/wp-content/uploads/2024/06/One-Arm-Medicine-Ball-Slam.gif" },
      { name: "Dragon Flag", equipment: "Bench", target: "Abs", gif: "https://fitnessprogramer.com/wp-content/uploads/2022/07/Leg-Raise-Dragon-Flag.gif" },
      { name: "Cross Crunch", equipment: "Bodyweight", target: "Abs", gif: "https://fitnessprogramer.com/wp-content/uploads/2022/07/Cross-Crunch.gif" },
      { name: "Standing Cable Crunch", equipment: "Cable Machine", target: "Abs", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/09/Standing-Cable-Crunch.gif" },
      { name: "Seated Bench Leg Pull-in", equipment: "Bench", target: "Abs", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Bench-Leg-Pull-in.gif" },
      {name: "Crunches", equipment: "Bodyweight", target: "Abs", gif: "https://fitnessprogramer.com/wp-content/uploads/2015/11/Crunch.gif" },
      { name: "Oblique Floor Crunches", equipment: "Bodyweight", target: "Abs", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Oblique-Floor-Crunches.gif" },
      { name: "Dead Bug", equipment: "Bodyweight", target: "Abs", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Dead-Bug.gif" },
      { name: "Decline Sit-up", equipment: "Bench", target: "Abs", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Decline-Sit-up.gif" },
      { name: "Weighted Crunch", equipment: "Bench, Plate", target: "Abs", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Weighted-Crunch.gif" },
      { name: "Seated Side Crunch", equipment: "Bodyweight", target: "Abs, Legs", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Seated-Side-Crunches.gif" },
      { name: "Incline Leg Hip Raise", equipment: "Bodyweight, Bench", target: "Abs", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Incline-Leg-Hip-Raise.gif" },
      { name: "Tuck Crunch", equipment: "Bodyweight", target: "Abs", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Tuck-Crunch.gif" }
    ]
  },
  leg: {
    name: "Leg",
    description: "The leg muscles include the quadriceps, hamstrings, calves, and glutes.",
    function: "Enable movements like walking, running, jumping, and support balance and stability.",
    gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/leg-curl-muscle-worked-300x300.png",
    exercises: [
      { name: "Dumbbell Goblet Squat", equipment: "Dumbbells", target: "Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/01/Dumbbell-Goblet-Squat.gif" },
      { name: "5 Dot Drills", equipment: "Bodyweight", target: "Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/12/5-Dot-drills-agility-exercise.gif" },
      { name: "High Knee Lunge on Bosu Ball", equipment: "Exercise Ball", target: "Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/09/High-Knee-Lunge-on-Bosu-Ball.gif" },
      { name: "Standing Leg Circles", equipment: "Bodyweight", target: "Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/10/Standing-Leg-Circles.gif" },
      { name: "Static Lunge", equipment: "Dumbbells", target: "Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/10/Static-Lunge.gif" },
      { name: "Dumbbell Walking Lunge", equipment: "Dumbbells", target: "Full Body, Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/09/dumbbell-lunges.gif" },
      { name: "Dumbbell Good Morning", equipment: "Dumbbells", target: "Erector Spinae, Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/10/Dumbbell-Good-Morning.gif" },
      { name: "Dumbbell Squat", equipment: "Dumbbells", target: "Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/09/Dumbbell-Squat.gif" },
      { name: "Power Lunge", equipment: "Bodyweight", target: "Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/09/power-lunge.gif" },
      { name: "Dumbbell Deadlift", equipment: "Dumbbells", target: "Erector Spinae, Full Body, Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/09/dumbbell-deadlifts.gif" },
      { name: "Bodyweight Lunge", equipment: "Bodyweight", target: "Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/07/bodyweight-lunges.gif" },
      { name: "Squat", equipment: "Barbell", target: "Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif" },
      { name: "Leg Press", equipment: "Machine", target: "Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif" },
      { name: "Seated Leg Curl", equipment: "Machine", target: "Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif" },
      { name: "Leg Extension", equipment: "Machine", target: "Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif" },
      { name: "Barbell Hack Squats", equipment: "Barbell", target: "Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hack-Squat.gif" }
    ]
  },
  calf: {
    name: "Calf",
    description: "The calf muscles are located at the back of the lower leg.",
    function: "Responsible for plantar flexion, enabling movements like walking, running, and jumping.",
    gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/calf-muscle-worked-300x300.png",
    exercises: [
      { name: "Calf Raise", equipment: "Dumbbells", target: "Calf", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Calf-Raise.gif" },
      { name: "Barbell Seated Calf Raise", equipment: "Barbell", target: "Calf", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/09/Barbell-Seated-Calf-Raise.gif" },
      { name: "Leg Press Calf Raise", equipment: "Machine", target: "Calf", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Leg-Press-Calf-Raise.gif" },
      { name: "Hack Squat Calf Raise", equipment: "Machine", target: "Calf", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Hack-Squat-Calf-Raise.gif" },
      { name: "Lever Seated Calf Raise", equipment: "Machine", target: "Calf", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Lever-Seated-Calf-Raise.gif" },
      { name: "Hack Machine One-Leg Calf Raise", equipment: "Machine", target: "Calf", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/09/Hack-Machine-One-Leg-Calf-Raise.gif" },
      { name: "Donkey Calf Raise", equipment: "Bench", target: "Calf", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/09/Donkey-Calf-Raise.gif" },
      { name: "Squat Hold Calf Raise", equipment: "Bodyweight", target: "Calf", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/12/Squat-Hold-Calf-Raise.gif" },
      { name: "Standing Hamstring Stretch", equipment: "Bodyweight", target: "Calf, Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Standing-Hamstring-Stretch.gif" },
      { name: "Standing Dorsiflexion", equipment: "Bodyweight", target: "Calf", gif: "https://fitnessprogramer.com/wp-content/uploads/2022/02/Standing-Dorsiflexion.gif" }
    ]
  },
  hip: {
    name: "Hip",
    description: "The hip muscles include the glutes, hip flexors, and adductors surrounding the hip joint.",
    function: "Enable hip flexion, extension, abduction, and rotation, supporting lower body movement and stability.",
    gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/muscle-worked-in-the-hip-adduction-machine-300x300.png",
    exercises: [
      { name: "Power Lunge", equipment: "Bodyweight", target: "Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/09/power-lunge.gif" },
      { name: "Dumbbell Deadlift", equipment: "Dumbbells", target: "Erector Spinae, Full Body, Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/09/dumbbell-deadlifts.gif" },
      { name: "Bodyweight Lunge", equipment: "Bodyweight", target: "Hip, Leg", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/07/bodyweight-lunges.gif" },
      { name: "Barbell Glute Bridge Two Legs on Bench", equipment: "Barbell, Bench", target: "Hip", gif: "https://fitnessprogramer.com/wp-content/uploads/2023/03/Barbell-Glute-Bridge-Two-Legs-on-Bench.gif" },
      { name: "Lever Standing Rear Kick", equipment: "Machine", target: "Hip", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/09/Lever-Standing-Rear-Kick.gif" },
      { name: "Glute Kickback Machine", equipment: "Machine", target: "Hip", gif: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Glute-Kickback-Machine.gif" }
    ]
  }
};

export default function MusclesScreen() {
  const [selectedMuscle, setSelectedMuscle] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    content: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#000',
    },
    muscleContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    muscleButton: {
      width: '48%',
      backgroundColor: '#f0f0f0',
      padding: 12,
      marginBottom: 12,
      borderRadius: 8,
    },
    muscleButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center',
    },
    muscleInfo: {
      marginTop: 24,
    },
    muscleInfoTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#000',
    },
    muscleInfoText: {
      fontSize: 16,
      marginBottom: 16,
      color: '#000',
    },
    muscleImage: {
      width: width - 32,
      height: width - 32,
      resizeMode: 'contain',
      marginBottom: 16,
    },
    exerciseItem: {
      marginBottom: 24,
    },
    exerciseName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 8,
    },
    exerciseDetail: {
      fontSize: 16,
      color: '#666',
      marginBottom: 8,
    },
    gif: {
      width: 360,
      height: 360,
      alignSelf: 'center',
      borderRadius: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Muscle Groups</Text>
        <View style={styles.muscleContainer}>
          {Object.entries(muscleData).map(([id, muscle]) => (
            <TouchableOpacity
              key={id}
              style={styles.muscleButton}
              onPress={() => setSelectedMuscle(muscle)}
            >
              <Text style={styles.muscleButtonText}>{muscle.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedMuscle && (
          <View style={styles.muscleInfo}>
            <Text style={styles.muscleInfoTitle}>{selectedMuscle.name}</Text>
            <Image
              source={{ uri: selectedMuscle.gif }}
              style={styles.muscleImage}
              contentFit="contain"
            />
            <Text style={styles.muscleInfoText}>{selectedMuscle.description}</Text>
            <Text style={styles.muscleInfoText}>Function: {selectedMuscle.function}</Text>
            <Text style={styles.sectionTitle}>Exercises:</Text>
            {selectedMuscle.exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetail}>Equipment: {exercise.equipment}</Text>
                <Text style={styles.exerciseDetail}>Target: {exercise.target}</Text>
                <Image
                  source={{ uri: exercise.gif }}
                  style={styles.gif}
                  contentFit="cover"
                  transition={1000}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}