import { Button, ImageBackground, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Title from "../components/Title";
import Colors from "../constants/colors";
import NavButton from "../components/NavButton";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import WheelPicker from "react-native-wheely";


export default function HomeScreen(){
  const insets = useSafeAreaInsets();

  //Check In State and Functions
  const [checkIn, setCheckIn] = useState(new Date());
  const [showCheckIn, setShowCheckIn] = useState(false);

  function showCheckInPicker(){
    setShowCheckIn(true);
  }

  function hideCheckInPicker(){
    setShowCheckIn(false);
  }

  function onChangeCheckIn(event, selectedDate){
    const currentDate = selectedDate;
    if (Platform.OS === "android"){
      hideCheckInPicker();
    }
    setCheckIn(currentDate);
  }

  //Check Out State and Functions
  const [checkOut, setCheckOut] = useState(new Date());
  const [showCheckOut, setShowCheckOut] = useState(false);

  function showCheckOutPicker(){
    setShowCheckOut(true);
  }

  function hideCheckOutPicker(){
    setShowCheckOut(false);
  }

  function onChangeCheckOut(event, selectedDate){
    const currentDate = selectedDate;
    if (Platform.OS === "android"){
      hideCheckOutPicker();
    }
    setCheckOut(currentDate);
  }

  //Camper Count State and Functions
  const camperCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [numCampers, setNumCampers] = useState(0);
  const [showNumCampers, setShowNumCampers] = useState(false);

  function showNumCampersPicker(){
    setShowNumCampers(true);
  }

  function hideNumCampersPicker(){
    setShowNumCampers(false);
  }

  function onChangeNumCampers(index){
    setNumCampers(index);
  }

  //Campsite Count State and Functions
  const campsiteCounts = [1, 2, 3, 4, 5];
  const [numCampsites, setNumCampsites] = useState(0);
  const [showNumCampsites, setShowNumCampsites] = useState(false);

  function showNumCampsitesPicker(){
    setShowNumCampsites(true);
  }

  function hideNumCampsitesPicker(){
    setShowNumCampsites(false);
  }

  function onChangeNumCampsites(index){
    setNumCampsites(index);
  }

  //Results State and Functions
  const [results, setResults] = useState("");

  function onReserveHandler(){
    let res = `Check In:\t\t${checkIn.toDateString()}\n`;
    res = res + `Check Out:\t\t${checkOut.toDateString()}\n`;
    res = res + `Number of Campers:\t\t${camperCounts[numCampers]}\n`;
    res = res + `Number of Campsites:\t\t${campsiteCounts[numCampsites]}\n`;
    setResults(res);
    console.log("RESULT TEXT:", res);
  }

  const {width, height} = useWindowDimensions();

  const dateLabelFlex = {
    fontSize: width * 0.1
  };

  const dateTextFlex = {
    fontSize: width * 0.05
  };

  return(
    <ImageBackground 
      source = {require("../assets/images/camp.jpg")}
      resizeMode = "cover"
      style = {styles.rootContainer}
      imageStyle = {styles.backgroundImage}
    >
      <View
        style = {[
          styles.rootContainer,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingRight: insets.right,
            paddingLeft: insets.left
          }
        ]}>

        <ScrollView style={styles.scrollContainer}>
          <View style = {styles.scrollMainContainer}>
            <View style = {styles.titleContainer}>
              <Title>Campground Retreat</Title>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.dateContainer}>
                <Text style={[styles.dateLabel, dateLabelFlex]}>Check In:</Text>
                <Pressable onPress={showCheckInPicker}>
                  <Text style={[styles.dateText, dateTextFlex]}>{checkIn.toDateString()}</Text>
                </Pressable>
              </View>

              <View style={styles.dateContainer}>
                <Text style={[styles.dateLabel, dateLabelFlex]}>Check Out:</Text>
                <Pressable onPress={showCheckOutPicker}>
                  <Text style={[styles.dateText, dateTextFlex]}>{checkOut.toDateString()}</Text>
                </Pressable>
              </View> 
            </View>

            <View>
              {showCheckIn && Platform.OS === "android" &&(
                <DateTimePicker 
                testID = "dateTimePicker1"
                value={checkIn}
                mode={"date"}
                display="spinner"
                onChange={onChangeCheckIn}
                />
              )}

              {showCheckIn && Platform.OS === "ios" && (
                <Modal
                animationType = "slide"
                transparent = {true}
                supportedOrientations={["portrait", "landscape"]}
                >
                  <View style={styles.centeredModalView}>
                    <View style = {styles.modalView}>
                      <DateTimePicker 
                        testID = "dateTimePicker2"
                        value={checkIn}
                        mode={"date"}
                        display="spinner"
                        onChange={onChangeCheckIn}
                        />
                      <Button title="Confirm" onPress={hideCheckInPicker}/>
                    </View>
                  </View>
                </Modal>
              )}

              {showCheckOut && Platform.OS === "android" &&(
                <DateTimePicker 
                testID = "dateTimePicker3"
                value={checkOut}
                mode={"date"}
                display="spinner"
                onChange={onChangeCheckOut}
                />
              )}

              {showCheckOut && Platform.OS === "ios" && (
                <Modal
                animationType = "slide"
                transparent = {true}
                supportedOrientations={["portrait", "landscape"]}
                >
                  <View style={styles.centeredModalView}>
                    <View style = {styles.modalView}>
                      <DateTimePicker 
                        testID = "dateTimePicker4"
                        value={checkOut}
                        mode={"date"}
                        display="spinner"
                        onChange={onChangeCheckOut}
                        />
                      <Button title="Confirm" onPress={hideCheckOutPicker}/>
                    </View>
                  </View>
                </Modal>
              )}
            </View>

            <View style={styles.rowContainer}>
              <Text style={[styles.dateLabel, dateLabelFlex]}>
                Number of Campers:
              </Text>
              <Pressable onPress={showNumCampersPicker}>
                <View style={styles.dateTextContainer}>
                  <Text style={[styles.dateText, dateTextFlex]}>
                    {camperCounts[numCampers]}
                  </Text>
                </View>
              </Pressable>

              <Modal 
              animationType = "slide"
              transparent={true}
              visible={showNumCampers}
              supportedOrientations={["portrait", "landscape"]}
              >
                <View style={styles.centeredModalView}>
                  <View style={styles.modalView}>
                    <Text style={[styles.dateLabel, dateLabelFlex]}>
                      Enter Number of Campers:
                    </Text>
                    <WheelPicker
                    selectedIndex={numCampers}
                    options={camperCounts}
                    onChange={onChangeNumCampers}
                    containerStyle={{width: 200}}
                    />
                    <Button title="Confirm" onPress={hideNumCampersPicker}/>
                  </View>
                </View>
              </Modal>
            </View>

            <View style={styles.rowContainer}>
              <Text style={[styles.dateLabel, dateLabelFlex]}>
                Number of Campsites:
              </Text>
              <Pressable onPress={showNumCampsitesPicker}>
                <View style={styles.dateTextContainer}>
                  <Text style={[styles.dateText, dateTextFlex]}>
                    {campsiteCounts[numCampsites]}
                  </Text>
                </View>
              </Pressable>

              <Modal 
              animationType = "slide"
              transparent={true}
              visible={showNumCampsites}
              supportedOrientations={["portrait", "landscape"]}
              >
                <View style={styles.centeredModalView}>
                  <View style={styles.modalView}>
                    <Text style={[styles.dateLabel, dateLabelFlex]}>
                      Enter Number of Campsites:
                    </Text>
                    <WheelPicker
                    selectedIndex={numCampsites}
                    options={campsiteCounts}
                    onChange={onChangeNumCampsites}
                    containerStyle={{width: 200}}
                    />
                    <Button title="Confirm" onPress={hideNumCampsitesPicker}/>
                  </View>
                </View>
              </Modal>
            </View>

            <View style={styles.buttonContainer}>
              <NavButton onPress={onReserveHandler}>Reserve Now</NavButton>
            </View>

            <View style={styles.resultsContainer}>
              <Text style={[styles.results, dateLabelFlex]}>{results}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center"
  },
  backgroundImage: {
    opacity: 0.2,
  },
  titleContainer: {
    padding: 7,
    marginVertical: 20,
    marginHorizontal: 20,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.primary500,
    backgroundColor: Colors.primary300,
    width: 2000,
    maxWidth: "90%"
  },
  scrollContainer: {
    flex: 1,
    width: 3000,
    maxWidth: "100%"
  },
  scrollMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
    marginBottom: 20
  },
  dateContainer: {
    backgroundColor: Colors.primary300o5,
    padding: 10,
    marginHorizontal: 10
  },
  dateLabel: {
    color: Colors.primary500,
    fontFamily: "Hotel",
    textShadowColor: "black",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2
  },
  dateTextContainer: {
    backgroundColor: Colors.primary300o5,
    padding: 10,
    paddingHorizontal: 30,
    marginHorizontal: 10
  },
  dateText: {
    color: Colors.primary800,
    fontSize: 20,
    fontWeight: "bold"
  },
  centeredModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.primary300,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonContainer: {
    alignItems: "center",
  },
  resultsContainer: {},
  results: {
    textAlign: "center",
    color: Colors.primary500,
    fontFamily: "Hotel",
    textShadowColor: "black",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2
  }
});