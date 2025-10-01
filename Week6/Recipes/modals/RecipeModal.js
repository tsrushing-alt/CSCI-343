import { StatusBar } from 'expo-status-bar';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import NavButton from "../components/NavButton";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Title from "../components/Title";
import Colors from '../constants/colors';


export default function RecipeModal(props){
  // Set Safe Area Screen Boundaries
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={props.visible} animationType='slide'>
      <View
      style = {[
        styles.rootContainer,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingRight: insets.right,
          paddingLeft: insets.left
        }
      ]}
      >

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.text}</Text>
        </View>


        <View style = {styles.navButtonContainer}>
          <NavButton onNext = {props.onClose}>Return to Recipes</NavButton>
        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.primary800,
    alignItems: 'center'
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',

  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    fontFamily: 'paperNoteSketch',
    color: Colors.primary300
  },
  textContainer: {
    flex: 5,
    width: '90%',
    borderWidth: 5,
    borderColor: Colors.primary500,
    padding: 10,
    borderRadius: 10
  },
  text: {
    color: Colors.primary300,
    fontSize: 25,
    fontFamily: 'paperNote'
  },
  navButtonContainer: {
    marginTop: 10,
    flex: 1
  }
})