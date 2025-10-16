import { Text, View, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import Colors from "../constants/colors";

export default function NavButton(props){
  const {width, height} = useWindowDimensions();

  return (
    <Pressable
    onPress = {props.onPress}
    style = {({pressed}) => pressed && styles.pressedItem}
    >
      <View style= {styles.buttonContainer}>
        <View style = {styles.textContainer}>
          <Text style={[styles.text, {fontSize: width*0.07}]}>{props.children}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 1000,
    maxWidth: "70%",
    marginHorizontal: 8,
    marginVertical: 10,
    borderRadius: 300,
    backgroundColor: Colors.primary500
  },
  pressedItem: {
    opacity: 0.5,
  },
  text: {
    pagging: 8,
    textAlign: 'center',
    fontFamily: 'Hotel',
    color: Colors.accent500
  }
})