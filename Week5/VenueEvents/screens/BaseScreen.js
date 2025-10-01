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
        <Title>House of Blues</Title>
      </View>

      <View style = {styles.imageContainer}>
        <Image style = {styles.image} source={require("../assets/images/venue.jpg")}/>
      </View>

      <View style = {styles.infoContainer}>
        <Text
        style = {styles.infoText}
        onPress={() => Linking.openURL("tel: 8432723000")}
        >843-272-3000</Text>

        <Text
        style = {styles.infoText}
        onPress = {() => Linking.openURL("https://maps.app.goo.gl/G57gNbYQ2wqyRubk7")}>
          4640 Hwy 17 S{"\n"}North Myrtle Beach, SC 29582
        </Text>

        <Text
        style = {styles.infoText}
        onPress = {() => Linking.openURL("https://myrtlebeach.houseofblues.com/")}>
          www.houseofblues.com
        </Text>
      </View>

      <View style = {styles.buttonContainer}>
        <Button title='View Events' onPress={props.onNext} color = "#6b006bff"/>
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
    fontFamily: 'squealer',
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


