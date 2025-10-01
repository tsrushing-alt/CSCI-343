import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState} from 'react';
import BaseScreen from './screens/BaseScreen';
import MenuScreen from './screens/MenuScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import Colors from "./constants/colors";


export default function App() {
  const [fontsLoaded] = useFonts({
    "GlametrixLight": require('./assets/fonts/GlametrixLight.otf'),
    "GlametrixBold": require('./assets/fonts/GlametrixBold.otf')
  })
  const [currentScreen, setCurrentScreen] = useState("base");

  function menuScreenHandler(){
    setCurrentScreen("menu");
  }

  function baseScreenHandler(){
    setCurrentScreen("base");
  }

  let screen = <BaseScreen onNext={menuScreenHandler}/>;

  if (currentScreen == "menu"){
    screen = <MenuScreen onNext={baseScreenHandler}/>;
  }

  return (
    <>
    <StatusBar style='light' />
    <SafeAreaProvider style = {styles.container}>{screen}</SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accent500,
    alignItems: 'center',
    justifyContent: 'center',
  },
});