import { useState, useContext } from "react";
import { View, Text, Button, Alert, TextInput, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { PlanContext } from "../store/context/PlanContext";
import Colors from "../constants/colors/colors";

export default function PlanCreationScreen() {
  const [title, setTitle] = useState("");
  const [selectedDayValue, setSelectedDayValue] = useState("0");
  const [selectedWeekValue, setSelectedWeekValue] = useState("0");
  const { startNewPlan } = useContext(PlanContext);
  const navigation = useNavigation();



  function onNextPress() {
    if (!selectedDayValue || selectedDayValue === "0" || !selectedWeekValue || selectedWeekValue === "0") {
      Alert.alert("Please select number of days and weeks");
      return;
    }

    if (!title.trim()) {
      Alert.alert("Please enter a title for your plan");
      return;
    }

    const numDays = parseInt(selectedDayValue, 10);
    const numWeeks = parseInt(selectedWeekValue, 10);

    startNewPlan(title.trim(), numDays, numWeeks); // Pass title
    navigation.navigate("PlanCreationDay");
  }


  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.labelText}>Plan Title:</Text>
        <TextInput
          placeholder="Enter Plan Title"
          placeholderTextColor={Colors.accent500}
          value={title}
          onChangeText={setTitle}
          style={styles.textInput}
        />

        <Text style={styles.labelText}>Number of Days in Training Plan:</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedDayValue}
          onValueChange={(val) => setSelectedDayValue(val)}
        >
          <Picker.Item label="Select Number of Days" value="0" />
          {[1, 2, 3, 4, 5, 6, 7].map((d) => (
            <Picker.Item key={d} label={`${d}`} value={`${d}`} />
          ))}
        </Picker>

        <Text style={styles.labelText}>Number of Weeks in Training Plan:</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedWeekValue}
          onValueChange={(val) => setSelectedWeekValue(val)}
        >
          <Picker.Item label="Select Number of Weeks" value="0" />
          {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((w) => (
            <Picker.Item key={w} label={`${w}`} value={`${w}`} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={onNextPress}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary500,
    flex: 1,
    justifyContent: "space-between"
  },
  contentContainer: {
    flex: 1
  },
  labelText: {
    color: Colors.accent200,
    fontSize: 21,
    marginBottom: 10,
    marginTop: 25,
    fontFamily: "cinzelMedium"
  },
  buttonContainer: {
    marginBottom: 40,
    paddingHorizontal: 18
  },
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
  },
  picker: {
    color: Colors.accent500,
  },
  textInput: {
    backgroundColor: Colors.primary800,
    color: Colors.accent500,
    borderWidth: 1,
    borderColor: Colors.primary200,
    padding: 10,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 20,
    fontFamily: "robotoLight"
  }

})
