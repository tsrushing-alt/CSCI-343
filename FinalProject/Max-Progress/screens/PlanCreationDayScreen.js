import { useContext } from "react";
import { View, Text, Button, FlatList, StyleSheet, Pressable } from "react-native";
import { PlanContext } from "../store/context/PlanContext";
import DayItem from "../components/DayItem";
import Colors from "../constants/colors/colors";

export default function PlanCreationDayScreen({ navigation }) {
  const { currentPlan, saveCurrentPlan } = useContext(PlanContext);
  if (!currentPlan) return null;

  const days = currentPlan.weeks.flatMap((week, wIndex) =>
    week.days.map(d => ({ ...d, weekIndex: wIndex }))
  );


  return (
    <View style={styles.container}>
      <Text style={styles.optionsText}>Select Day to Enter Exercises</Text>

      <FlatList
        data={Array.from({ length: currentPlan.numDays }, (_, i) => i)} // [0,1,...,n-1]
        keyExtractor={item => item.toString()}
        renderItem={({ item: dayIndex }) => (
          <DayItem
            label={`Day ${dayIndex + 1}`}
            onPress={() => navigation.navigate("ExerciseSelection", { dayIndex })}
          />
        )}
      />

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            saveCurrentPlan?.();
            navigation.popToTop();
          }}
        >
          <Text style={styles.buttonText}>Finish</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 20,
    backgroundColor: Colors.primary500, },
  optionsText: { fontSize: 18, 
    fontFamily: "cinzelMedium",
    fontSize: 22,
    marginBottom: 10,
    color: Colors.accent200 },
  list: { marginBottom: 20 },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: Colors.accent500,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  buttonText: {
    color: Colors.primary300,
    fontSize: 18,
    fontFamily: "robotoSemiBold",
    textAlign: "center"
  }
});

