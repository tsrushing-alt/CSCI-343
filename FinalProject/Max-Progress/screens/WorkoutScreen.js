import { useState, useContext, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { PlanContext } from "../store/context/PlanContext";
import Colors from "../constants/colors/colors";

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

  useEffect(() => {
    setSubmitted(
      day.muscleGroups.every(group =>
        group.exercises.every(ex => ex.workoutSets?.length > 0)
      )
    );
  }, [day]);

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
    for (let exId in exerciseSets) {
      for (let set of exerciseSets[exId]) {
        if (!set.weight || !set.reps) {
          Alert.alert("Incomplete Data", "Please fill all weight and reps fields before submitting.");
          return;
        }
      }
    }

    Alert.alert(
      "Confirm Submission",
      "Once submitted, you won't be able to edit this workout. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Submit",
          style: "destructive",
          onPress: () => {
            const updatedDay = { 
              ...day, 
              completed: true,
              muscleGroups: day.muscleGroups.map(g => ({
                ...g,
                exercises: g.exercises.map(ex => ({
                  ...ex,
                  workoutSets: exerciseSets[ex.id],
                })),
              })),
            };

            submitDay(weekIndex, dayIndex, updatedDay);
            setSubmitted(true);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={day.muscleGroups}
        keyExtractor={(g) => g.name}
        ListHeaderComponent={() => (
          <Text style={styles.title}>
            Week {weekIndex + 1} - Day {day.dayIndex + 1}
          </Text>
        )}
        renderItem={({ item: group }) => (
          <View style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{group.name}</Text>
            {group.exercises.map((ex) => (
              <View key={ex.id} style={styles.exerciseContainer}>
                <Text style={styles.exerciseTitle}>{ex.name}</Text>
                {exerciseSets[ex.id].map((set, idx) => (
                  <View key={idx} style={styles.setContainer}>
                    <Text style={styles.setLabel}>Set {idx + 1}: </Text>
                    <TextInput
                      style={styles.input}
                      placeholderTextColor={Colors.primary200}
                      placeholder="Weight"
                      value={set.weight}
                      editable={!submitted}
                      onChangeText={(text) => updateSet(ex.id, idx, "weight", text)}
                    />
                    <TextInput
                      style={styles.input}
                      placeholderTextColor={Colors.primary200}
                      placeholder="Reps"
                      value={set.reps}
                      editable={!submitted}
                      onChangeText={(text) => updateSet(ex.id, idx, "reps", text)}
                    />
                  </View>
                ))}

                {!submitted && (
                  <View style={{ paddingTop: 20 }}>
                    <Pressable
                      style={styles.setButton}
                      onPress={() => addSet(ex.id)}
                    >
                      <Text style={{ color: Colors.primary300, fontSize: 18, fontFamily: "robotoRegular", textAlign: "center" }}>
                        Add Set
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
      />

      {!submitted && (
        <View style={styles.submitButtonContainer}>
          <Pressable
            style={styles.submitButton}
            onPress={submitWorkout}
          >
            <Text style={{ color: Colors.primary300, fontSize: 20, fontFamily: "robotoSemiBold", textAlign: "center" }}>
              Submit Workout
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary500
  },
  title: { 
    fontSize: 28, 
    fontFamily: "cinzelSemiBold",
    marginBottom: 20,
    color: Colors.accent200 
  },
  groupContainer: { 
    marginBottom: 20 
  },
  groupTitle: { 
    fontSize: 24, 
    fontFamily: "robotoSemiBold",
    marginBottom: 10,
    color: Colors.accent200 
  },
  exerciseContainer: { 
    marginBottom: 15, 
    paddingLeft: 10 
  },
  exerciseTitle: { 
    fontSize: 22, 
    fontFamily: "robotoRegular", 
    marginBottom: 5,
    color: Colors.accent500 
  },
  setContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    margin: 10
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary300,
    padding: 5,
    marginHorizontal: 5,
    width: 80,
    borderRadius: 4,
    color: Colors.primary300,
    fontSize: 18,
    fontFamily: "robotoRegular"
  },
  list: {
    backgroundColor: Colors.primary500
  },
  setLabel: {
    color: Colors.primary300,
    fontFamily: "robotoRegular",
    fontSize: 20
  },
  contentContainer: {
    padding: 20
  },
  submitButtonContainer: {
    paddingBottom: 40,
    paddingTop: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  setButton: {
    backgroundColor: Colors.accent500,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  submitButton: {
    backgroundColor: Colors.accent500,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8
  }
});





