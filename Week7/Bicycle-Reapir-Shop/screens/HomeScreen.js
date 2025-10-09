import { ImageBackground, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import Colors from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Title from "../components/Title";
import NavButton from "../components/NavButton";
import { RadioGroup } from "react-native-radio-buttons-group";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen(props){
  //Set safe area screen boundaries
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient 
    colors = {[Colors.accent500, Colors.primary800]}
    style = {styles.container}
    >
      <ImageBackground
      source = {require("../assets/images/bike_background.jpg")}
      resizeMode = "cover"
      style = {styles.container}
      imageStyle = {styles.backgroundImage} >

    <View
    
    style = {[
      styles.container,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }
    ]}
    >

      <View style = {styles.titleContainer}>
        <Title>Bicycle Repair</Title>
      </View>

      <ScrollView style= {styles.scrollContainer}>
        {/*Repair Time option*/}
        <View style={styles.radioContainer}>
          <Text style={styles.radioHeader}>Repair Time: </Text>
          <RadioGroup
          radioButtons={props.timeRadioButtons}
          onPress={props.onSetTimeId}
          selectedId = {props.timeId}
          layout='row'
          containerStyle={styles.radioGroup}
          labelStyle={styles.radioGroupLabel}
          />
        </View>

        <View style = {styles.rowContainer}>
          {/*Service Options */}
          <View style = {styles.checkBoxContainer}>
            <Text style={styles.checkBoxHeader}>Service Options: </Text>
            <View style={styles.checkBoxSubContainer}>
              {
                props.services.map((item) => {
                  return(
                    <BouncyCheckbox
                    key={item.id}
                    text={item.name}
                    onPress={props.onSetServices.bind(this, item.id)}
                    textStyle={styles.checkBoxLabel}
                    innerIconStyle = {styles.checkBoxInnerStyle}
                    iconStyle= {styles.checkBoxIconStyle}
                    fillColor={Colors.primary500}
                    style={styles.checkBox}
                    />
                  );
                })
              }
            </View>
          </View>

        </View>

        {/*Lower Section*/}
        <View style = {styles.rowContainer}>
          {/*Add on Options */}
          <View style={styles.addOnsContainer}>
            <View style={styles.addOnsSubContainer}>
              <Text style ={styles.adOnsLabel}>News Letter Sign Up</Text>
              <Switch 
              onValueChange={props.onSetNewsLetterSignUp}
              value={props.newsLetterSignUp}
              thumbColor={
                props.newsLetterSignUp ? Colors.primary500 : Colors.primary800
              }
              trackColor={{false: "#767577", true:"#81b0ff"}}
              />
            </View>
          </View>
          <View style={styles.addOnsContainer}>
            <View style={styles.addOnsSubContainer}>
              <Text style ={styles.adOnsLabel}>Rental Membership</Text>
              <Switch 
              onValueChange={props.onSetRentalMembership}
              value={props.rentalMembership}
              thumbColor={
                props.rentalMembership ? Colors.primary500 : Colors.primary800
              }
              trackColor={{false: "#767577", true:"#81b0ff"}}
              />
            </View>
            
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <NavButton onNext={props.onNext}>Submit Order</NavButton>
        </View>
      </ScrollView>

    </View>
    </ImageBackground>
    </LinearGradient>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  },
  backgroundImage: {
    opacity: 0.2
  },
  titleContainer: {
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.primary500,
    paddingHorizontal: 10
  },
  scrollContainer: {
    flex: 1,
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'center'

  },
  radioHeader: {
    fontSize: 30,
    color: Colors.primary500,
    fontFamily: "Note"
  },
  radioGroup: {
    paddingBottom: 20,

  },
  radioGroupLabel: {
    fontSize: 15,
    color: Colors.primary500,
    fontFamily: 'Note'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
    paddingHorizontal: 24
  },
  checkBoxContainer: {
    width: "48%"
  },
  checkBoxHeader: {
    fontSize: 20,
    color: Colors.primary500,
    fontFamily: "Note",
  },
  checkBoxSubContainer: {
    padding: 2,
    width: "100%"

  },
  checkBox: {
    padding: 2,
    width: "100%"
  },
  checkBoxLabel: {
    textDecorationLine: 'none',
    color: Colors.primary500,
    fontFamily: "Note"
    
  },
  checkBoxInnerStyle: {
    borderRadius: 0,
    borderColor: Colors.primary500
  },
  checkBoxIconStyle: {
    borderRadius: 0
  },
  cheeseContainer: {
    width: '50%',
    alignItems: 'flex-start',
  },
  adOnsContainer: {
    justifyContent: "space-between"
  },
  addOnsSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  adOnsLabel: {
    color: Colors.primary500,
    fontSize: 20,
    fontFamily: "Note"
  },
  buttonContainer: {
    alignItems:'center'
  }


})