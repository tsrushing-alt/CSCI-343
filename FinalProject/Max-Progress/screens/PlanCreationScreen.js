import { useState, useContext } from "react";
import { View, Text, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { PlanContext } from "../store/context/PlanContext";

export default function PlanCreationScreen() {
  const [selectedDayValue, setSelectedDayValue] = useState("0");
  const [selectedWeekValue, setSelectedWeekValue] = useState("0");
  const { startNewPlan } = useContext(PlanContext);
  const navigation = useNavigation();

  function onNextPress() {
    if (!selectedDayValue || selectedDayValue === "0" || !selectedWeekValue || selectedWeekValue === "0") {
      Alert.alert("Please select number of days and weeks");
      return;
    }

    const numDays = parseInt(selectedDayValue, 10);
    const numWeeks = parseInt(selectedWeekValue, 10);

    startNewPlan(null, numDays, numWeeks);

    navigation.navigate("PlanCreationDay");
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Number of Days in Training Plan:</Text>
      <Picker selectedValue={selectedDayValue} onValueChange={val => setSelectedDayValue(val)}>
        <Picker.Item label="Select Number of Days" value="0" />
        {[1,2,3,4,5,6,7].map(d => <Picker.Item key={d} label={`${d}`} value={`${d}`} />)}
      </Picker>

      <Text style={{ marginTop: 20 }}>Number of Weeks in Training Plan:</Text>
      <Picker selectedValue={selectedWeekValue} onValueChange={val => setSelectedWeekValue(val)}>
        <Picker.Item label="Select Number of Weeks" value="0" />
        {[3,4,5,6,7,8,9,10,11,12].map(w => <Picker.Item key={w} label={`${w}`} value={`${w}`} />)}
      </Picker>

      <View style={{ marginTop: 20 }}>
        <Button title="Next" onPress={onNextPress} />
      </View>
    </View>
  );
}
