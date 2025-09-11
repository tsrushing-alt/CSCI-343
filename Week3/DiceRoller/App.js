import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Pressable, Modal, TextInput } from 'react-native';
import React, {useState} from 'react';



export default function App() {
  // Set max and min dice values
  const maxVal = 6;
  const minVal = 1;
  // Create state management variables
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [userGuess, setUserGuess] = useState("");
  const [userWager, setUserWager] = useState("");
  const [diceSum, setDiceSum] = useState(2);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startDiceRollHandler(){
    setModalIsVisible(true);
    setUserGuess("");
    setUserWager("");
  }

  function endDiceRollHandler(){
    setModalIsVisible(false);
  }

  function onDiceRoll(){
    const rndNum1 = Math.floor(Math.random() * (maxVal - minVal)) + minVal;
    const rndNum2 = Math.floor(Math.random() * (maxVal - minVal)) + minVal;
    setDice1(rndNum1);
    setDice2(rndNum2);

    let result = rndNum1 + rndNum2;
    setDiceSum(result);

    endDiceRollHandler();
  }



  
  let resultText = (
    <Text style = {styles.resultText}>Roll the Dice and Make a Wager</Text>
  );

  const userGuessNum = parseInt(userGuess);
  const diceSumNum = parseInt(diceSum);

  if (userGuess !== "" && userGuessNum === diceSumNum){
    resultText = <Text style = {styles.resultText}>You Won ${(userWager * 5).toFixed(2)}</Text>
  }
  if (userGuess !== "" && userGuessNum !== diceSumNum){
    resultText = <Text style = {styles.resultText}>You Lost ${(userWager * 1).toFixed(2)}</Text>
  }

  return (
    <>
      <StatusBar style = 'auto'/>
      <SafeAreaView style = {styles.root}>
        <View style = {styles.titleContainer}>
          <Text style={styles.title}>Dice Roller</Text>
        </View>

        <View style={styles.rollButtonContainer}>
          <Pressable
            android_ripple={{ color: "#210644"}}
            onPress={startDiceRollHandler}
            style = {({pressed}) => pressed && styles.pressedButton}
          >
            <View style={styles.rollButton}>
              <Text style={styles.rollButtonText}>Roll Dice</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.diceContainer}>
          <View style={styles.dice}>
            <Text style={styles.diceNumber}>{dice1}</Text>
          </View>
          <View style={styles.dice}>
            <Text style={styles.diceNumber}>{dice2}</Text>
          </View>
        </View>

        <View style={styles.resultContainer}>
          <Text style = {styles.resultText}>The resulting dice roll is {diceSum}</Text>
        </View>

        <View style = {styles.resultContainer}>
          <Text style = {styles.resultText}>{resultText}</Text>
        </View>

        <Modal visible = {modalIsVisible} animationType = "slide">
          <SafeAreaView style = {styles.modalRoot}>
            <Text style = {styles.inputLabel}>Guess the Roll Value:</Text>
            <TextInput 
            style = {styles.textInput}
            placeholder = "Enter A Guess Between 2 and 12"
            onChangeText = {setUserGuess}
            value = {userGuess}
            keyboardType = "number-pad"/>

            <Text style = {styles.inputLabel}>What's Your Wager:</Text>
            <TextInput 
            style = {styles.textInput}
            placeholder = "Enter Your Wager Here:"
            onChangeText = {setUserWager}
            value = {userWager}
            keyboardType = "number-pad"/>

            <View style = {styles.buttonContainer}>
              <View style = {styles.button}>
                <Button title = "Roll Dice" color="#6e0743ff" onPress={onDiceRoll}/>
              </View>
              <View style = {styles.button}>
                <Button title = "Cancel" color = "black" onPress = {endDiceRollHandler}/>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f73bf7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleContainer: {
    flex: 1,
    backgroundColor: "black",
    width: "90%",
    justifyContent: "center",
    margin: 20,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "white",
    marginTop: 55
  },

  title: {
    fontSize: 40,
    color: "white",
    textAlign: "center"
  },

  rollButtonContainer: {
    flex: 1,
    justifyContent: "center"
  },

  rollButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10
  },

  rollButtonText: {
    color: "black",
    padding: 8,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold"
  },

  pressedButton: {
    opacity: 0.5
  },
  
  diceContainer: {
    flex: 3,
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",

  },

  dice: {
    borderWidth: 6,
    margin: 20,
    width: "40%",
    paddingVertical: 30,
    backgroundColor: "white"
  },

  diceNumber: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center"
  },

  resultContainer: {
    flex: 1,

  },

  resultText: {
    fontSize: 25,
    color: "white",
    textAlign: "center"
  },

  modalRoot: {
    flex: 1,
    backgroundColor: "#6e286bff",
    alignItems: "center"
  },

  inputLabel: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    marginTop: 20
  },

  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "black",
    borderRadius: 6,
    width: "90%",
    padding: 12,
    marginBottom: 30
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: 16
  },

  button: {
    width: "30%",
    marginHorizontal: 8
  }
});
