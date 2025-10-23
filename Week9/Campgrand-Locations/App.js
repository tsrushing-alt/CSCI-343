import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from 'react';
import Colors from './constants/colors';
import HomeScreen from './screens/HomeScreen';
import CampgroundsOverviewScreen from './screens/CampgroundsOverviewScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

//Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = Font.useFonts({
    Camp: require("./assets/fonts/Mountain.ttf")
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  if (!loaded){
    return null;
  }



  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='HomeScreen'
          screenOptions={styles.screenOptions}
        >
          <Stack.Screen 
            name = "HomeScreen"
            component={HomeScreen}
            options={{
              title: "Campground Locations"
            }}
          />
          <Stack.Screen 
            name = "CampgroundsOverview"
            component={CampgroundsOverviewScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  screenOptions: {
    headerStyle: {backgroundColor: Colors.primary500},
    headerTintColor: Colors.primary300,
    headerTitleStyle: {fontFamily: "Camp", fontSize: 40},
    contentStyle: {backgroundColor: Colors.primary800}
  }
});