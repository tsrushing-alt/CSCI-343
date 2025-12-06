import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PlanContext } from "../store/context/PlanContext";
import ChooseDayModal from "../modal/ChooseDayModal";

export default function TrainingPlanScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { planId } = route.params;
  const { plans } = useContext(PlanContext);

  const plan = plans.find((p) => p.id === planId);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWeekDays, setSelectedWeekDays] = useState([]);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  if (!plan) return <Text>Plan not found</Text>;

  // Split days into weeks
  const daysPerWeek = Math.ceil(plan.days.length / plan.numWeeks);
  const weeks = Array.from({ length: plan.numWeeks }, (_, weekIdx) =>
    plan.days.slice(weekIdx * daysPerWeek, (weekIdx + 1) * daysPerWeek)
  );

  const openWeekModal = (weekDays, weekIdx) => {
    setSelectedWeekDays(weekDays);
    setSelectedWeekIndex(weekIdx);
    setModalVisible(true);
  };

  const handleDaySelect = (day) => {
    setModalVisible(false);
    navigation.navigate("Workout", { day, weekIndex: selectedWeekIndex });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{plan.title}</Text>
      <Text style={styles.subtitle}>{plan.numWeeks} Weeks</Text>

      {weeks.map((weekDays, idx) => (
        <Pressable
          key={idx}
          style={styles.weekButton}
          onPress={() => openWeekModal(weekDays, idx)}
        >
          <Text style={styles.weekButtonText}>Week {idx + 1}</Text>
        </Pressable>
      ))}

      <ChooseDayModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        weekDays={selectedWeekDays}
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


