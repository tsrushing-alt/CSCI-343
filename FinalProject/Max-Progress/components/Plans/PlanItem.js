import { useNavigation } from "@react-navigation/native";
import { Pressable, View, Text, StyleSheet } from "react-native";


export default function PlanItem(props){
  const navigation = useNavigation();

  function selectedPlanHandler(){
    navigation.navigate("TrainingPlan", {
      planId: props.id
    });
  }

  return(
    <View>
      <Pressable onPress={selectedPlanHandler} style={styles.pressable}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.title}     Days: {props.days}    Weeks: {props.weeks}</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
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
})