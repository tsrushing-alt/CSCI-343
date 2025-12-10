import { useState, useContext, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { PlanContext } from "../store/context/PlanContext";

export default function WorkoutScreen({ route }) {
  const { currentPlan, submitDay } = useContext(PlanContext);
  const { dayIndex, weekIndex } = route.params;

  const day = currentPlan?.weeks?.[weekIndex]?.days?.[dayIndex];
  if (!day) return <Text>Day not found</Text>;


  const [submitted, setSubmitted] = useState(
    day?.muscleGroups?.every(group =>
      group.exercises.every(ex => ex.workoutSets?.length > 0)
    )
  );



  // Sync submitted state if day changes (optional, useful if reopening screen)
  useEffect(() => {
    setSubmitted(
      day.muscleGroups.every(group =>
        group.exercises.every(ex => ex.workoutSets?.length > 0)
      )
    );
  }, [day]);

  // Debug currentPlan whenever it changes
  useEffect(() => {
    //console.log("=== DEBUG: currentPlan changed ===");
    //console.log(JSON.stringify(currentPlan, null, 2));
  }, [currentPlan]);

  // Initialize exercise sets either from saved data or empty
  const initialSets = {};
  day.muscleGroups.forEach((group) => {
    group.exercises.forEach((ex) => {
      initialSets[ex.id] = ex.workoutSets ? [...ex.workoutSets] : [{ weight: "", reps: "" }];
    });
  });

  const [exerciseSets, setExerciseSets] = useState(initialSets);

  const addSet = (exerciseId) => {
    setExerciseSets((prev) => ({
      ...prev,
      [exerciseId]: [...prev[exerciseId], { weight: "", reps: "" }],
    }));
  };

  const updateSet = (exerciseId, index, field, value) => {
    setExerciseSets((prev) => {
      const updated = [...prev[exerciseId]];
      updated[index][field] = value;
      return { ...prev, [exerciseId]: updated };
    });
  };

  const submitWorkout = () => {
    // Validate all fields
    for (let exId in exerciseSets) {
      for (let set of exerciseSets[exId]) {
        if (!set.weight || !set.reps) {
          Alert.alert("Incomplete Data", "Please fill all weight and reps fields before submitting.");
          return;
        }
      }
    }

    // Confirm submission
    Alert.alert(
      "Confirm Submission",
      "Once submitted, you won't be able to edit this workout. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Submit",
          style: "destructive",
          onPress: () => {
            // Build updated day object
            const updatedDay = { 
              ...day, 
              completed: true, // mark completed
              muscleGroups: day.muscleGroups.map(g => ({
                ...g,
                exercises: g.exercises.map(ex => ({
                  ...ex,
                  workoutSets: exerciseSets[ex.id],
                })),
              })),
            };

            // Call submitDay from context
            submitDay(weekIndex, dayIndex, updatedDay);

            // Mark UI as submitted
            setSubmitted(true);
          },
        },
      ]
    );
  };

  return (
    <FlatList
      data={day.muscleGroups}
      keyExtractor={(g) => g.name}
      ListHeaderComponent={() => (
        <Text style={styles.title}>Week {weekIndex + 1} - Day {day.dayIndex + 1}</Text>
      )}
      renderItem={({ item: group }) => (
        <View style={styles.groupContainer}>
          <Text style={styles.groupTitle}>{group.name}</Text>
          {group.exercises.map((ex) => (
            <View key={ex.id} style={styles.exerciseContainer}>
              <Text style={styles.exerciseTitle}>{ex.name}</Text>

              {exerciseSets[ex.id].map((set, idx) => (
                <View key={idx} style={styles.setContainer}>
                  <Text>Set {idx + 1}:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Weight"
                    value={set.weight}
                    editable={!submitted}
                    onChangeText={(text) => updateSet(ex.id, idx, "weight", text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Reps"
                    value={set.reps}
                    editable={!submitted}
                    onChangeText={(text) => updateSet(ex.id, idx, "reps", text)}
                  />
                </View>
              ))}

              {!submitted && <Button title="Add Set" onPress={() => addSet(ex.id)} />}
            </View>
          ))}
        </View>
      )}
      contentContainerStyle={{ padding: 20 }}
      ListFooterComponent={
        !submitted && <Button title="Submit Workout" onPress={submitWorkout} />
      }
    />
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  groupContainer: { marginBottom: 20 },
  groupTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  exerciseContainer: { marginBottom: 15, paddingLeft: 10 },
  exerciseTitle: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  setContainer: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginHorizontal: 5,
    width: 60,
    borderRadius: 4,
  },
});




