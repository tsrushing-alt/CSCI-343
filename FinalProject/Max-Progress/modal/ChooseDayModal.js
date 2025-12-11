import React from "react";
import { Modal, View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import DayItem from "../components/DayItem";
import Colors from "../constants/colors/colors";

export default function ChooseDayModal({ visible, onClose, weekDays, onDaySelect }) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Select a Day</Text>

        <FlatList
          data={weekDays}
          keyExtractor={(day) => `day-${day.dayIndex}`}
          renderItem={({ item }) => {
            const exerciseCount = item.muscleGroups.reduce(
              (acc, g) => acc + g.exercises.length,
              0
            );
            return (
              <Pressable
                style={styles.dayButton}
                onPress={() => onDaySelect(item)}
              >
                <Text style={styles.dayButtonText}>
                  Day {item.dayIndex + 1} ({exerciseCount} Exercises)
                </Text>
              </Pressable>
            );
          }}
        />

        <Pressable style={[styles.dayButton, { marginTop: 20 }]} onPress={onClose}>
          <Text style={styles.dayButtonText}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.primary500o8,
  },
  modalTitle: {
    fontSize: 26,
    fontFamily: "cinzelSemiBold",
    marginBottom: 30,
    color: Colors.accent200
  },
  dayButton: {
    backgroundColor: Colors.accent500,
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
    alignItems: "center",
  },
  dayButtonText: {
    color: Colors.primary300,
    fontSize: 22,
    fontFamily: "robotoSemiBold"
  },
});


