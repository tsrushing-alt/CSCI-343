import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PlanContext } from "../store/context/PlanContext";
import ChooseDayModal from "../modal/ChooseDayModal";

export default function TrainingPlanScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { planId } = route.params;
  const { plans, setCurrentPlanAndPersist } = useContext(PlanContext);

  const plan = plans.find(p => p.id === planId);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  if (!plan) return <Text>Plan not found</Text>;

  // Use first week as template for days
  const templateWeekDays = plan.weeks?.[0]?.days || [];

  //console.log("=== TrainingPlanScreen templateWeekDays ===");
  //console.log(JSON.stringify(templateWeekDays, null, 2));

  const weekNumbers = Array.from({ length: plan.numWeeks }, (_, i) => i);

  const openWeekModal = (weekIdx) => {
    setSelectedWeekIndex(weekIdx);
    setModalVisible(true);
  };

  const handleDaySelect = (day) => {
    setCurrentPlanAndPersist(plan); // Set the plan as current
    setModalVisible(false);
    navigation.navigate("Workout", {
      dayIndex: day.dayIndex,
      weekIndex: selectedWeekIndex,
    });
  };

  return (
    <View style={styles.container}>
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
        weekDays={templateWeekDays} // use first week's days
        onDaySelect={handleDaySelect}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 20 },
  weekButton: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  weekButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});


