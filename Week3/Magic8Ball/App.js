import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Modal, Pressable, Button } from 'react-native';
import React, {useState} from 'react'


export default function App() {

  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [userInput, setUserInput] = useState("");
  const responses = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
  ];

  var randomText;

  function startInputHandler(){
    setModalIsVisible(true);
  }

  function endInputHandler(){
    setUserInput("");
    setModalIsVisible(false);
  }

  function selectRandomText(responses){
    return responses[Math.floor(Math.random() * responses.length)];
  }

  let resultText

  if (userInput !== ""){

    randomText = selectRandomText(responses);
    resultText = <Text style = {styles.resultText}>{randomText}</Text>
  }


  return (
    <>
      <StatusBar style = 'auto'/>
      <SafeAreaView style = {styles.root}>
        <View style={styles.titleContainer}>
          <Text style = {styles.title}>Magic 8 Ball</Text>
        </View>

        <View style = {styles.contentContainer}>
          <View style = {styles.inputContainer}>
              <Text style={styles.inputLabel}>Enter Your Question:</Text>
              <TextInput
              style = {styles.textInput}
              placeholder = "Enter A Question Here"
              onChangeText = {setUserInput}
              value = {userInput}
              keyboardType = "default"
              />
          </View>
          <View style = {styles.buttonContainer}>
            <Pressable
            android_ripples={{color: "grey"}}
            onPress={startInputHandler}
            style = {({pressed}) => pressed && styles.pressedButton}
            >
              <View style = {styles.button}>
                <Text style={styles.buttonText}>Press to Submit</Text>
              </View>

            </Pressable>
          </View>
        </View>


        <Modal visible = {modalIsVisible} animationType = "slide">
          <SafeAreaView style = {styles.modalRoot}>
            <View style = {styles.inputLabelContainer}>
              <Text style = {styles.inputLabel}>Your Question:</Text>
            </View>

            <View style = {styles.questionTextContainer}>
              <Text style = {styles.questionText}>{userInput}</Text>
            </View>

            <View style = {styles.responseLabelContainer}>
              <Text style = {styles.responseLabel}>The Ball Says:</Text>
            </View>

            <View style = {styles.responseContainer}>
              <Text style = {styles.responseText}>{resultText}</Text>
            </View>

            <View style = {styles.returnContainer}>
              <Button title = "Enter Another Question" color = "black" onPress = {endInputHandler}/>
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
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center"
  },

  titleContainer: {
    height: 100,
    backgroundColor: "black",
    width: "90%",
    justifyContent: "center",
    margin: 20,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "white",
    marginTop: 65

  },

  title: {
    fontSize: 40,
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  },

  contentContainer: {
    flex: 1,
    marginTop: 250,
    width: "90%"
  },

  inputContainer: {
    height: 150,
    justifyContent: "center",
  },

  textInput: {
    borderWidth: 3,
    borderColor: "#9e147cff",
    backgroundColor: "black",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: "white",
    height: 50
  },

  inputLabelContainer: {
    
  },

  inputLabel: {
    fontSize: 30,
    color: "black",
    textAlign: "center",
    marginTop: 30,
    fontWeight: "bold"
  },

  questionTextContainer: {
    backgroundColor: "#ce18a0ff",
    width: "90%",
    justifyContent: "center",
    height: 100,
    marginTop: 15,
    borderRadius: 20
  },

  questionText: {
    textAlign: "center",
    fontSize: 25,
    
  },

  responseContainer: {
    height: 200,
    backgroundColor: "#ce18a0ff",
    width: "90%",
    justifyContent: "center",
    borderRadius: 20,
  },

  responseText: {
    fontSize: 25,
    textAlign: "center"
  },

  pressedButton: {
    opacity: 0.5
  },

  buttonContainer: {
    justifyContent: "center",

  },

  button: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 10,
  },

  buttonText: {
    color: "white",
    padding: 8,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  modalRoot: {
    flex: 1,
    backgroundColor: "#15df47ff",
    alignItems: "center"
  },

  responseLabelContainer: {
    height: 100,
    justifyContent: "center",
    height: 70,
    marginTop: 80
  },

  responseLabel: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"

  },

  returnContainer: {
    marginTop: 50,
    width: "50%",
  }
  });
