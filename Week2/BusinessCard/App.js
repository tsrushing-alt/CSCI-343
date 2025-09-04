import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image, Linking } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar style="dark"/>
      <SafeAreaView style = {styles.root}>
        <View style = {styles.imageContainer}>
          <Image 
            style = {styles.image}
            source = {require("./assets/images/my_picture.jpg")}
          />
        </View>
        <View style = {styles.textContainer}>
          <Text 
          style = {styles.name}> Tyler Rushing</Text>
          <Text style = {styles.text}
          onPress = { () => 
            {Linking.openURL("https://github.com/tsrushing-alt/CSCI-343");
            }}
            > https://github.com/tsrushing-alt/CSCI-343</Text>
          <Text 
            style = {styles.text}
            onPress = { () => {
              Linking.openURL("tel:8434247692");
              }}
              > Phone: 843-424-7692</Text>
          <Text style = {styles.text}
          onPress = { () => {Linking.openURL("mailto: drutsrid@gmail.com")}}> Email: drutsrid@gmail.com</Text>
        </View>

      </SafeAreaView>


    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0c0303e1"
  },
  imageContainer: {
    height: 300,
    marginTop: 100,
    width: "100%",
    justifyContent: "center",
    marginBottom: 100

  },
  image: {
    height: 400,
    width: "100%",
    resizeMode: "stretch",
    borderColor: "black",
    borderWidth: 5
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  name: {
    fontSize: 55,
    fontWeight: "bold",
    color: "white",
    marginBottom: 70
  },
  text: {
    color: "white",
    fontSize: 20,
    fontStyle: "italic",
    marginBottom: 15
  }


});
