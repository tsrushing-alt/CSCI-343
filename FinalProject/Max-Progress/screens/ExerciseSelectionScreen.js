import { useContext, useState } from "react";
import { View, Text, Button, FlatList, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { PlanContext } from "../store/context/PlanContext";
import EXERCISES from "../data/exercises";

const MUSCLE_GROUPS = ["Chest","Back","Biceps","Triceps","Shoulders","Quads","Hamstrings","Glutes","Forearms","Abs"];

export default function ExerciseSelectionScreen({ route }) {
  const { dayIndex } = route.params;
  const { currentPlan, addMuscleGroup, addExercise, saveCurrentPlan } = useContext(PlanContext);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [pickerValues, setPickerValues] = useState({});
  const navigation = useNavigation();

  const day = currentPlan.days.find(d => d.dayIndex === dayIndex);
  if (!day) return <Text>Day not found</Text>;

  const getExercises = (groupName) => {
    const group = day.muscleGroups.find(g => g.name === groupName);
    return group?.exercises || [];
  };

  function addGroupHandler() {
    if (!selectedGroup) return Alert.alert("Select a muscle group");
    if (day.muscleGroups.some(g => g.name === selectedGroup)) return Alert.alert("Group already added");
    addMuscleGroup(dayIndex, selectedGroup);
    setSelectedGroup(null);
  }

  function addExerciseHandler(groupName) {
    const exerciseId = pickerValues[groupName];
    if (!exerciseId) return;

    const exerciseObj = EXERCISES.find(e => e.id === exerciseId);
    const group = day.muscleGroups.find(g => g.name === groupName);
    if (!group) return;

    if (group.exercises.some(ex => ex.id === exerciseId)) {
      Alert.alert("Exercise already added");
      return;
    }

    addExercise(dayIndex, groupName, { id: exerciseObj.id, name: exerciseObj.name });
    setPickerValues(prev => ({ ...prev, [groupName]: null }));
  }

  function renderGroup({ item }) {
    const groupName = item.name;
    const exercises = getExercises(groupName);
    const availableExercises = EXERCISES.filter(e => e.muscleGroup === groupName);

    return (
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>{groupName}</Text>
        {exercises.map((ex, idx) => <Text key={`${groupName}-${ex.id}-${idx}`}>{ex.name}</Text>)}

        <Picker
          selectedValue={pickerValues[groupName] || null}
          onValueChange={val => setPickerValues(prev => ({ ...prev, [groupName]: val }))}
        >
          <Picker.Item label="Select Exercise" value={null} />
          {availableExercises.map(ex => <Picker.Item key={ex.id} label={ex.name} value={ex.id} />)}
        </Picker>

        <Button title="Add Exercise" onPress={() => addExerciseHandler(groupName)} />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Day {dayIndex + 1}</Text>

      <Text style={{ fontWeight: "bold", marginTop: 10 }}>Add Muscle Group:</Text>
      <Picker selectedValue={selectedGroup} onValueChange={val => setSelectedGroup(val)}>
        <Picker.Item label="Select Group" value={null} />
        {MUSCLE_GROUPS.map(g => <Picker.Item key={g} label={g} value={g} />)}
      </Picker>
      <Button title="Add Muscle Group" onPress={addGroupHandler} />

      <FlatList
        data={day.muscleGroups}
        keyExtractor={item => item.name}
        renderItem={renderGroup}
        style={{ marginTop: 20 }}
      />

      <Button title="Submit" onPress={() => { saveCurrentPlan?.(); navigation.goBack(); }} />
    </View>
  );
}

