import { FlatList, Text, View, StyleSheet } from "react-native";

export default function WorkoutScreen({ route }) {
  const { day, weekIndex } = route.params;
  if (!day) return <Text>Day not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Week {weekIndex + 1} - Day {day.dayIndex + 1}</Text>

      <FlatList
        data={day.muscleGroups || []}
        keyExtractor={(g, idx) => g?.name || idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{item?.name || "Unnamed Group"}</Text>
            {item?.exercises?.map((ex, idx) => (
              <Text key={ex?.id || idx} style={styles.exerciseText}>{ex?.name || "Unnamed Exercise"}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  groupContainer: { marginVertical: 10 },
  groupTitle: { fontWeight: "bold", fontSize: 18 },
  exerciseText: { marginLeft: 10, fontSize: 16 },
});

