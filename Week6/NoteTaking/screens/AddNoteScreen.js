import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import NavButton from "../components/NavButton";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Title from "../components/Title";
import Colors from '../constants/colors';
import { useState } from 'react';


export default function AddNoteScreen(props){
  // Set Safe Area Screen Boundaries
  const insets = useSafeAreaInsets();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");

  function addNoteHandler(){
    props.onAdd(noteTitle, noteText);
    props.onCancel();
    
  }

  return (
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
      <View style = {styles.titleContainer}>
        <Title>Add Note</Title>
      </View>

      <View style={styles.scrollContainer}>
        <ScrollView>
          <View style={styles.noteTitleContainer}>
            <TextInput 
              onChangeText={setNoteTitle}
              placeholder="Enter Note Title Here"
              style={styles.noteTitle}
            />
            
          </View>
          <View style={styles.noteTextContainer}>
            <TextInput 
              onChangeText={setNoteText}
              placeholder="Enter Note Text Here"
              textAlignVertical='top'
              multiline={true}
              numberOfLines={20}
              style={styles.noteText}
            />
          </View>
        
          <View style = {styles.navButtonContainer}>
            <View style = {styles.navButton}>
              <NavButton onNext = {addNoteHandler}>Submit</NavButton>
            </View>
            <View style = {styles.navButton}>
              <NavButton onNext = {props.onCancel}>Cancel</NavButton>
            </View>
          </View>
        </ScrollView>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 50
  },
  scrollContainer: {
    flex: 5
  },
  noteTitleContainer: {
    borderWidth: 3,
    backgroundColor: Colors.primary300
  },
  noteTitle: {
    color: Colors.accent800,
    fontWeight: 'bold',
    fontSize: 30
  },
  noteTextContainer: {
    marginVertical: 5,
    borderWidth: 3,
    backgroundColor: Colors.primary300,
    alignItems: 'flex-start'
  },
  noteText: {
    color: Colors.primary800
  },
  navButtonContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navButton: {
    marginHorizontal: 10
  }
});