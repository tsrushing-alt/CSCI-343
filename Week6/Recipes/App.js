import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useFonts } from "expo-font";
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from './constants/colors';
import HomeScreen from './screens/HomeScreen';
import RecipesScreen from './screens/RecipesScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    noteFont: require("./assets/fonts/Note.ttf"),
    paperNote: require("./assets/fonts/Papernotes.ttf"),
    paperNoteSketch: require("./assets/fonts/Papernotes Sketch.ttf"),
    paperNoteBold: require("./assets/fonts/Papernotes Bold.ttf"),
  });

  const [currentScreen, setCurrentScreen] = useState("");
  const [currentID, setCurrentID] = useState(4);
  const [recipeItems, setRecipeItems] = useState([
    {
      id: 1,
      title: "Scrambled Eggs",
      text: "1. Crack eggs, whisk\n2. Melt butter\n3. Add eggs, stir\n4. Add salt\n5. Serve"
    },
    {
      id: 2,
      title: "Dawg Food",
      text: "1. Add sweet potatoes, brussel sprouts, corn, peas, green beans, carrots, ground beef to backing pan\n2. Bake until potatoes tender\n3. Top with walnuts and dried cranberries"
    },
    {
      id: 3,
      title: "Grilled Cheese Sandwich",
      text: "1. Put cheese in bread\n2. MAYO outside of bread\n3. Cook both sides until golden brown"
    }
  ])

  function homeScreenHandler(){
    setCurrentScreen("");

  }

  function recipesScreenHandler(){
    setCurrentScreen("recipes");
  }

  function addRecipeScreenHandler(){
    setCurrentScreen("add");
  }

  function addRecipeHandler(enteredRecipeTitle, enteredRecipeText){
    setRecipeItems((recipeItems) => [
      ...recipeItems,
      {id: currentID, title: enteredRecipeTitle, text: enteredRecipeText}
    ]);
    setCurrentID(currentID + 1);
    recipesScreenHandler();
  }

  function deleteRecipeHandler(id){
    setRecipeItems((recipeItems) => {
      return recipeItems.filter((item) => item.id !== id);
    })
  }

  let screen = <HomeScreen onNext={recipesScreenHandler}/>

  if (currentScreen === "recipes"){
    screen = (
    <RecipesScreen
    onHome={homeScreenHandler}
    onAdd={addRecipeScreenHandler}
    onDelete={deleteRecipeHandler}
    recipeItems={recipeItems}
    />
    );
  }

  if (currentScreen === "add"){
    screen = (
    <AddRecipeScreen
    onCancel={recipesScreenHandler}
    onAdd={addRecipeHandler}
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
