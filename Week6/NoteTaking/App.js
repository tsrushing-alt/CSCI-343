import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from './constants/colors';
import HomeScreen from './screens/HomeScreen';
import NotesScreen from './screens/NotesScreen';
import AddNoteScreen from './screens/AddNoteScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    noteFont: require("./assets/fonts/Note.ttf"),
    paperNote: require("./assets/fonts/Papernotes.ttf"),
    paperNoteSketch: require("./assets/fonts/Papernotes Sketch.ttf"),
    paperNoteBold: require("./assets/fonts/Papernotes Bold.ttf"),
  });

  const [currentScreen, setCurrentScreen] = useState("");
  const [currentID, setCurrentID] = useState(4);
  const [currentNotes, setCurrentNotes] = useState([
    {
      id: 1,
      title: "Math Notes",
      text: "a^2 + b^2 = c^2\n2 + 2 = 5"
    },
    {
      id: 2,
      title: "Birthdays",
      text: "Tyler: 03/21/1998\nJames: 12/17/1997"
    },
    {
      id: 3,
      title: "To Do List",
      text: "1. Do Homework\n2. Study for exam"
    }
  ])

  function homeScreenHandler(){
    setCurrentScreen("");

  }

  function notesScreenHandler(){
    setCurrentScreen("notes");
  }

  function addNoteScreenHandler(){
    setCurrentScreen("add");
  }

  function addNoteHandler(enteredNoteTitle, enteredNoteText){
    setCurrentNotes((currentNotes) => [
      ...currentNotes,
      {id: currentID, title: enteredNoteTitle, text: enteredNoteText}
    ]);
    setCurrentID(currentID + 1);
    notesScreenHandler();
  }

  function deleteNoteHandler(id){
    setCurrentNotes((currentNotes) => {
      return currentNotes.filter((item) => item.id !== id);
    })
  }

  let screen = <HomeScreen onNext={notesScreenHandler}/>

  if (currentScreen === "notes"){
    screen = (
    <NotesScreen
    onHome={homeScreenHandler}
    onAdd={addNoteScreenHandler}
    onDelete={deleteNoteHandler}
    currentNotes={currentNotes}
    />
    );
  }

  if (currentScreen === "add"){
    screen = (
    <AddNoteScreen
    onCancel={notesScreenHandler}
    onAdd={addNoteHandler}
    />
    );
  }



  return (
    <>
      <StatusBar style='auto'/>
      <SafeAreaProvider style = {styles.container}>{screen}</SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary800,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
