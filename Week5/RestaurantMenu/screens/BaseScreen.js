import { StyleSheet, Text, View, Image, Linking, Button} from 'react-native';
import {useSafeAreaInsets } from 'react-native-safe-area-context';
import Title from "../components/Title";
import Colors from '../constants/colors';

export default function BaseScreen(props) {
  //Setting safe area screen boundaries
  const insets = useSafeAreaInsets();

  return (
    <View style = {[
      styles.rootContainer,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }
    ]}>

      <View style = {styles.titleContainer}>
        <Title>Chili's</Title>
      </View>

      <View style = {styles.imageContainer}>
        <Image style = {styles.image} source={require("../assets/images/venue.jpg")}/>
      </View>

      <View style = {styles.infoContainer}>
        <Text
        style = {styles.infoText}
        onPress={() => Linking.openURL("tel: 8439030607")}
        >843-903-0607</Text>

        <Text
        style = {styles.infoText}
        onPress = {() => Linking.openURL("https://maps.app.goo.gl/Fk3seMhekzhgTx4z5")}>
          100 Orchard Dr{"\n"} Myrtle Beach, SC 29579
        </Text>

        <Text
        style = {styles.infoText}
        onPress = {() => Linking.openURL("https://www.chilis.com/")}>
          www.chilis.com
        </Text>
      </View>

      <View style = {styles.buttonContainer}>
        <Button title='View Menu' onPress={props.onNext} color = "#6b006bff"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },

  titleContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  imageContainer: {
    flex: 4,

  },
  image: {
    resizeMode: "cover",
    height: '100%',
    width: 380
  },
  infoContainer: {
    flex: 3,
    justifyContent: 'center'
  },
  infoText: {
    fontSize: 30,
    textAlign: 'center',
    padding: 7,
    fontFamily: 'GlametrixLight',
    color: Colors.primary500
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 40,
    width: 150,

  }
});