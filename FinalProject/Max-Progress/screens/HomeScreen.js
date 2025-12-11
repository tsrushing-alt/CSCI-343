import { View, Button, StyleSheet, Alert, Pressable, Text } from "react-native";
import { useContext } from "react";
import PlanList from "../components/Plans/PlanList";
import { PlanContext } from "../store/context/PlanContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/colors/colors";

export default function HomeScreen({ navigation }) {
  const { plans, clearCurrentPlan } = useContext(PlanContext);


  return (
    <View style={styles.container}>
      <PlanList items={plans} />

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            clearCurrentPlan(); 
            navigation.navigate("PlanCreation");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create New Plan</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 16, 
    backgroundColor: Colors.primary800 },
  buttonContainer: { 
    marginTop: 20,
    marginBottom: 40 },
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
