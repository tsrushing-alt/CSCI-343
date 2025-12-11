import { useNavigation } from "@react-navigation/native";
import { Pressable, View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors/colors";

export default function PlanItem(props) {
  const navigation = useNavigation();

  function selectedPlanHandler() {
    navigation.navigate("TrainingPlan", {
      planId: props.id
    });
  }


  const daysDisplay = Array.isArray(props.weeks?.[0]?.days) ? props.weeks[0].days.length : 0;
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
    backgroundColor: Colors.accent800,
    padding: 12,
    borderRadius: 8,
    marginTop:12
  },
  text: {
    color: Colors.primary300,
    fontSize: 18,
    fontFamily: "robotoRegular"
  }
});
