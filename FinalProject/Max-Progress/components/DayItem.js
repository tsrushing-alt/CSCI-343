import { View, Text, Pressable, StyleSheet } from "react-native";

export default function DayItem({ label, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.pressable}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{label}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 4 },
  pressable: { borderRadius: 8 },
  textContainer: { backgroundColor: "black", padding: 10 },
  text: { color: "white" }
});


