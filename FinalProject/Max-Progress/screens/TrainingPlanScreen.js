import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PlanContext } from "../store/context/PlanContext";
import ChooseDayModal from "../modal/ChooseDayModal";
import Colors from "../constants/colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TrainingPlanScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { planId } = route.params;
  const { plans, setCurrentPlanAndPersist, clearCurrentPlan, setPlans } = useContext(PlanContext);

  const plan = plans.find(p => p.id === planId);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  if (!plan) return <Text>Plan not found</Text>;

  const templateWeekDays = plan.weeks?.[0]?.days || [];
  const weekNumbers = Array.from({ length: plan.numWeeks }, (_, i) => i);

  const openWeekModal = (weekIdx) => {
    setSelectedWeekIndex(weekIdx);
    setModalVisible(true);
  };

  const handleDaySelect = (day) => {
    setCurrentPlanAndPersist(plan);
    setModalVisible(false);
    navigation.navigate("Workout", {
      dayIndex: day.dayIndex,
      weekIndex: selectedWeekIndex,
    });
  };

  const handleDeletePlan = async () => {
    if (!plan) return;

    // Remove plan from AsyncStorage and context
    const updatedPlans = plans.filter(p => p.id !== plan.id);
    await AsyncStorage.setItem("plans", JSON.stringify(updatedPlans));

    // Update context
    setPlans(updatedPlans);
    clearCurrentPlan(); // clears currentPlan

    // Navigate back home
    navigation.navigate("HomeScreen");
  };


  return (
    <View style={styles.container}>

      <View style={styles.scrollContainer}>
        <Text style={styles.title}>{plan.title}</Text>
        <Text style={styles.subtitle}>{plan.numWeeks} Weeks</Text>

        {weekNumbers.map((weekIdx) => (
          <Pressable
            key={weekIdx}
            style={styles.weekButton}
            onPress={() => openWeekModal(weekIdx)}
          >
            <Text style={styles.weekButtonText}>Week {weekIdx + 1}</Text>
          </Pressable>
        ))}

        <ChooseDayModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          weekDays={templateWeekDays}
          onDaySelect={handleDaySelect}
        />
      </View>


      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleDeletePlan}>
          <Text style={styles.buttonText}>Delete Plan</Text>
        </Pressable>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: Colors.primary500
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 40
  },
  title: { 
    fontSize: 28, 
    marginBottom: 10,
    color: Colors.accent200,
    fontFamily: "cinzelSemiBold"
  },
  subtitle: { 
    fontSize: 20,
    marginBottom: 30,
    color: Colors.accent200,
    fontFamily: "robotoRegular"
  },
  weekButton: {
    backgroundColor: Colors.accent500,
    padding: 12,
    borderRadius: 8,
    marginBottom: 18,
    alignItems: "center",
  },
  weekButtonText: { 
    color: Colors.primary300, 
    fontFamily: "robotoSemiBold", 
    fontSize: 22
  },
  buttonContainer: {
    marginBottom: 40,
    marginTop: 40,
    alignItems: "center"
  },
  button: {
    backgroundColor: Colors.accent500,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "80%", 
    alignItems: "center"
  },
  buttonText: {
    color: Colors.primary300,
    fontSize: 18,
    fontFamily: "robotoSemiBold",
    textAlign: "center"
  },
});



