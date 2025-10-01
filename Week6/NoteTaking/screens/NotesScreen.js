
import { FlatList, StyleSheet, Text, View } from 'react-native';
import NavButton from '../components/NavButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Title from "../components/Title";
import Colors from '../constants/colors';
import NotesItem from '../components/NotesItem';
import NoteModal from '../modals/NoteModal';
import { useState } from 'react';

export default function NotesScreen(props){

  // Set Safe Area Screen Boundaries
  const insets = useSafeAreaInsets();

  const [modalNoteTitle, setModalNoteTitle] = useState("");
  const [modalNoteText, setModalNoteText] = useState("");
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function noteModalHandler(title, text){
    setModalNoteTitle(title);
    setModalNoteText(text);
    setModalIsVisible(true);
  }

  function closeNoteModalHandler(){
    setModalIsVisible(false);
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
        <Title>Current Thoughts</Title>
      </View>

      <View>
        <FlatList 
        data = {props.currentNotes}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        alwaysBounceVertical={false}
        renderItem={(itemData) => {
          return(
            <NotesItem
              id = {itemData.item.id}
              title = {itemData.item.title}
              onView={noteModalHandler.bind(
                this, 
                itemData.item.title,
                itemData.item.text
              )}
              onDelete={props.onDelete.bind(this, itemData.item.id)}
              />
          );
        }}
        />
      </View>

      <NoteModal
        visible={modalIsVisible}
        title={modalNoteTitle}
        text={modalNoteText}
        onClose={closeNoteModalHandler}
        />

      <View style = {styles.navButtonContainer}>
        <View style = {styles.navButton}>
          <NavButton onNext = {props.onHome}>Return Home</NavButton>
        </View>
        <View style = {styles.navButton}>
          <NavButton onNext = {props.onAdd}>Add New Note</NavButton>
        </View>
      </View>

    </View>

  );

}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: '90%',

  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 20,
  },
  navButtonContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButton: {
    marginHorizontal: 10
  }
});