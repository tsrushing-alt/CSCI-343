import { useContext } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { PlanContext } from "../store/context/PlanContext";
import DayItem from "../components/DayItem";
import Colors from "../constants/colors/colors";

export default function PlanCreationDayScreen({ navigation }) {
  const { currentPlan, saveCurrentPlan } = useContext(PlanContext);
  if (!currentPlan) return null;

  function renderDayItem({ item }) {
    return (
      <DayItem
        label={`Day ${item.dayIndex + 1}`}
        onPress={() => navigation.navigate("ExerciseSelection", { dayIndex: item.dayIndex })}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.optionsText}>Select Day to Enter Exercises</Text>

      <FlatList
        data={currentPlan.days}
        keyExtractor={item => item.dayIndex.toString()}
        renderItem={renderDayItem}
        style={styles.list}
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

