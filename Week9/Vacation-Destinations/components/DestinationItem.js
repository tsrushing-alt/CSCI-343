import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ImageViewModal from "../modal/ImageViewModal";
import { useState } from "react";

export default function DestinationItem(props) {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function viewImageHandler() {
    setModalIsVisible(true);
  }

  function closeImageHandler() {
    setModalIsVisible(false);
  }

  // Format year display as AD/BC
  const formattedYear =
    props.foundedYear < 0
      ? `${Math.abs(props.foundedYear)} BC`
      : `${props.foundedYear} AD`;

  return (
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: props.listIndex % 2 === 0 ? "#ccc" : "#fff" },
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        android_ripple={{ color: "#ccc" }}
        onPress={viewImageHandler}
      >
        <View style={styles.rowContainer}>
          <Image style={styles.image} source={{ uri: props.imageUrl }} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{props.name}</Text>
            <View style={styles.innerRowContainer}>
              <Text numberOfLines={1} style={styles.cost}>
                Avg. Cost: ${props.averageCost}
              </Text>
              <Text style={styles.year}>{formattedYear}</Text>
            </View>
            <Text style={styles.rating}>Rating: ⭐ {props.rating} / 5</Text>
          </View>
        </View>
      </Pressable>

      <ImageViewModal
        isVisible={modalIsVisible}
        imageUrl={props.imageUrl}
        onClose={closeImageHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 5,
    paddingTop: 3,
    marginBottom: 3,
    borderRadius: 7,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  rowContainer: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: "25%",
    height: "100%",
    resizeMode: "container",
    borderRadius: 15,
  },
  infoContainer: {
    width: "85%",
    paddingLeft: 20,
  },
  name: {
    width: "85%",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
  },
  cost: {
    maxWidth: "85%",
    fontSize: 14,
  },
  year: {
    fontSize: 14,
    fontWeight: "bold",
  },
  innerRowContainer: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rating: {
    fontSize: 13,
    fontStyle: "italic",
  },
});

