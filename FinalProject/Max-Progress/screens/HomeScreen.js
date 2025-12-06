import { View, Button, StyleSheet, Alert } from "react-native";
import { useContext } from "react";
import PlanList from "../components/Plans/PlanList";
import { PlanContext } from "../store/context/PlanContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const { plans, setPlans, clearCurrentPlan } = useContext(PlanContext);

  const clearPlans = async () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete all exercise plans?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("plans");
              setPlans([]); // clear saved plans
              clearCurrentPlan(); // clear in-memory plan too
            } catch (e) {
              console.error("Error clearing plans:", e);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <PlanList items={plans} />

      <View style={styles.buttonContainer}>
        <Button
          title="Create New Plan"
          onPress={() => {
            clearCurrentPlan(); // make sure currentPlan is reset
            navigation.navigate("PlanCreation");
          }}
        />

        <View style={{ marginTop: 10 }}>
          <Button
            title="Clear All Plans"
            color="red"
            onPress={clearPlans}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Button
            title="Plan Debug"
            onPress={() => {
              clearCurrentPlan(); // optional: clear before debugging
              navigation.navigate("PlanDebug");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "white" },
  buttonContainer: { marginTop: 20 },
});
