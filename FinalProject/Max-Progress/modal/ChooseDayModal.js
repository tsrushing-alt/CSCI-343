import React from "react";
import { Modal, View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import DayItem from "../components/DayItem";

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
                  Day {item.dayIndex + 1} ({exerciseCount} exercises)
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
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dayButton: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
  },
  dayButtonText: {
    color: "white",
    fontSize: 16,
  },
});


