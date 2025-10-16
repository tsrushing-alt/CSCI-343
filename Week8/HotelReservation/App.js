import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from 'react';
import Colors from './constants/colors';
import HomeScreen from './screens/HomeScreen';



//Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = Font.useFonts({
    Hotel: require("./assets/fonts/TheHotelio.ttf")
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  if (!loaded){
    return null;
  }

  let screen = (
    <HomeScreen />
  )

  return (
    <>
      <StatusBar style = 'light'/>
      <SafeAreaProvider style = {styles.container}>{screen}</SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accent300
  },
});
