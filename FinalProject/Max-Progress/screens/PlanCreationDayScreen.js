import { useContext } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
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


      <Button title="DEBUG: Show Plan Structure" onPress={() => console.log(currentPlan)} />

      <View style={styles.buttonContainer}>
        <Button title="Finish" onPress={() => { saveCurrentPlan?.(); navigation.popToTop(); }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 20,
    backgroundColor: Colors.primary800, },
  optionsText: { fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 10,
    color: Colors.accent800 },
  list: { marginBottom: 20 },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40
     
  }
});

