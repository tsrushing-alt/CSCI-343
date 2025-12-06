import { useState } from "react";
import { FlatList, Text, View, StyleSheet, TextInput, Button } from "react-native";

export default function WorkoutScreen({ route }) {
  const { day, weekIndex } = route.params;
  if (!day) return <Text>Day not found</Text>;


  const initialSets = {};
  day.muscleGroups.forEach((group) => {
    group.exercises.forEach((ex) => {
      initialSets[ex.id] = [{ weight: "", reps: "" }];
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
                    onChangeText={(text) => updateSet(ex.id, idx, "weight", text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Reps"
                    value={set.reps}
                    onChangeText={(text) => updateSet(ex.id, idx, "reps", text)}
                  />
                </View>
              ))}

              <Button title="Add Set" onPress={() => addSet(ex.id)} />
            </View>
          ))}
        </View>
      )}
      contentContainerStyle={{ padding: 20 }}
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



