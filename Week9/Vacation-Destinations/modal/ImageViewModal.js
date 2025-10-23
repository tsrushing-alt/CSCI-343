import { Modal, View, Image, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/colors";

export default function ImageViewModal({ isVisible, imageUrl, description, onClose }) {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.description}>{description}</Text>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "#ccc" }}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: Colors.primary300,
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.primary800,
    marginBottom: 20,
    fontFamily: "Destination",
  },
  button: {
    backgroundColor: Colors.primary500,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
