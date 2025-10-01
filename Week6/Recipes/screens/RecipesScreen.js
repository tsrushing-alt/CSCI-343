
import { FlatList, StyleSheet, Text, View } from 'react-native';
import NavButton from '../components/NavButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Title from "../components/Title";
import Colors from '../constants/colors';
import RecipesItem from '../components/RecipesItem';
import RecipeModal from '../modals/RecipeModal';
import { useState } from 'react';

export default function RecipesScreen(props){

  // Set Safe Area Screen Boundaries
  const insets = useSafeAreaInsets();

  const [modalRecipeTitle, setModalRecipeTitle] = useState("");
  const [modalRecipeText, setModalRecipeText] = useState("");
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function recipeModalHandler(title, text){
    setModalRecipeTitle(title);
    setModalRecipeText(text);
    setModalIsVisible(true);
  }

  function closeRecipeModalHandler(){
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
        <Title>Recipes</Title>
      </View>

      <View style ={styles.listContainer}>
        <FlatList 
        data = {props.recipeItems}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        alwaysBounceVertical={false}
        renderItem={(itemData) => {
          return(
            <RecipesItem
              id = {itemData.item.id}
              title = {itemData.item.title}
              onView={recipeModalHandler.bind(
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

      <RecipeModal
        visible={modalIsVisible}
        title={modalRecipeTitle}
        text={modalRecipeText}
        onClose={closeRecipeModalHandler}
        />

      <View style = {styles.navButtonContainer}>
        <View style = {styles.navButton}>
          <NavButton onNext = {props.onHome}>Return Home</NavButton>
        </View>
        <View style = {styles.navButton}>
          <NavButton onNext = {props.onAdd}>Add New Recipe</NavButton>
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
  },
  listContainer: {
    height: 450,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: Colors.primary500
  }
});