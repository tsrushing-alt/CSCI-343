import { useNavigation } from "@react-navigation/native";
import { Pressable, View, Text, StyleSheet } from "react-native";

export default function PlanItem(props) {
  const navigation = useNavigation();

  function selectedPlanHandler() {
    navigation.navigate("TrainingPlan", {
      planId: props.id
    });
  }

  // Safely handle days and weeks rendering
  const daysDisplay = Array.isArray(props.days) ? props.days.length : props.days;
  const weeksDisplay = Array.isArray(props.weeks) ? props.weeks.length : props.weeks;

  return (
    <View style={styles.container}>
      <Pressable onPress={selectedPlanHandler} style={styles.pressable}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {props.title} | Days: {daysDisplay} | Weeks: {weeksDisplay}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  pressable: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  textContainer: {
    backgroundColor: "black",
    padding: 10
  },
  text: {
    color: "white"
  }
});
