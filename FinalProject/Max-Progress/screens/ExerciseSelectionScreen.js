import { useContext, useState } from "react";
import { View, Text, Button, FlatList, Alert, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { PlanContext } from "../store/context/PlanContext";
import EXERCISES from "../data/exercises";
import Colors from "../constants/colors/colors";

const MUSCLE_GROUPS = ["Chest","Back","Biceps","Triceps","Shoulders","Quads","Hamstrings","Glutes","Forearms","Abs"];

export default function ExerciseSelectionScreen({ route }) {
  const { dayIndex } = route.params;
  const { currentPlan, addMuscleGroup, addExercise, saveCurrentPlan } = useContext(PlanContext);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [pickerValues, setPickerValues] = useState({});
  const navigation = useNavigation();

  const day = currentPlan.weeks[0].days[dayIndex]; // pick week 0 as template
  if (!day) return <Text>Day not found</Text>;

  const getExercises = (groupName) => {
    const group = day.muscleGroups.find(g => g.name === groupName);
    return group?.exercises || [];
  };

  function addGroupHandler() {
    if (!selectedGroup) return Alert.alert("Select a muscle group");
    if (day.muscleGroups.some(g => g.name === selectedGroup)) return Alert.alert("Group already added");

    // Create a unique id for the group
    const groupId = `${selectedGroup}-${Date.now()}`;
    addMuscleGroup(dayIndex, { id: groupId, name: selectedGroup }); // pass object now
    setSelectedGroup(null);
  }


  // Add exercise
  function addExerciseHandler(groupName) {
    const exerciseId = pickerValues[groupName];
    if (!exerciseId) return;

    const exerciseObj = EXERCISES.find(e => e.id === exerciseId);

    addExercise(dayIndex, groupName, { id: exerciseObj.id, name: exerciseObj.name }); // updates all weeks
    setPickerValues(prev => ({ ...prev, [groupName]: null }));
  }

  function renderGroup({ item }) {
    const groupName = item.name;
    const exercises = getExercises(groupName);
    const availableExercises = EXERCISES.filter(e => e.muscleGroup === groupName);

    return (
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.groupText}>{groupName}</Text>
          {exercises.map((ex, idx) => (
            <Text style = {styles.exerciseText} key={ex.id}>{ex.name}</Text>
          ))}

        <Picker
          style={{ color: Colors.accent800, fontSize: 18 }}
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
    <View style={styles.container}>
      <View style= {styles.titleContainer}>
        <Text style={ styles.title}>Day {dayIndex + 1}</Text>
      </View>

      <Text style={styles.addGroupLabel}>Add Muscle Group:</Text>
      <Picker style={{ color: Colors.accent800, fontSize: 18 }} selectedValue={selectedGroup} onValueChange={val => setSelectedGroup(val)}>
        <Picker.Item label="Select Group" value={null} />
        {MUSCLE_GROUPS.map(g => <Picker.Item key={g} label={g} value={g} />)}
      </Picker>
      <Button title="Add Muscle Group" onPress={addGroupHandler} />

      <FlatList
        data={day.muscleGroups}
        keyExtractor={item => item.id}
        renderItem={renderGroup}
        style={{ marginTop: 20 }}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            saveCurrentPlan?.();
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary500,
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 40
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
  exerciseText: {
    color: Colors.accent200,
    fontSize: 16,
    marginLeft: 14,
    marginTop: 10,
    fontFamily: "robotoRegular"
  },
  titleContainer: {
    marginBottom: 20
  },
  title: {
    color: Colors.accent200,
    fontSize: 28,
    fontFamily: "cinzelSemiBold"
  },
  groupText: {
    fontFamily: "robotoSemiBold",
    fontSize: 24,
    color: Colors.accent200
  },
  addGroupLabel: {
    color: Colors.accent200,
    fontFamily: "robotoSemiBold",
    fontSize: 24
  }
})

