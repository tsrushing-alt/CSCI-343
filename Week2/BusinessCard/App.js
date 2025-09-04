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
            source = {require("./assets/images/business_image.jpg")}
          />
        </View>
        <View style = {styles.textContainer}>
          <Text 
          style = {styles.name}> Player's Choice</Text>
          <Text style = {styles.text}
          onPress = { () => 
            {Linking.openURL("https://www.playerschoicenmb.com/");
            }}
            > https://www.playerschoicenmb.com/</Text>
          <Text 
            style = {styles.text}
            onPress = { () => {
              Linking.openURL("tel:8432720268");
              }}
              > 843-272-0268</Text>
          <Text style = {styles.text}
          onPress = { () => {Linking.openURL("https://maps.app.goo.gl/4PxBMQBtdhxixosD9")}}> Open in Google Maps</Text>
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
    marginTop: 70,
    width: "100%",
    justifyContent: "center"

  },
  image: {
    height: 240,
    width: "100%",
    resizeMode: "contain",
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
