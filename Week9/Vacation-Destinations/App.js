import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from 'react';
import Colors from './constants/colors';
import HomeScreen from './screens/HomeScreen';
import DestinationsOverviewScreen from './screens/DestinationsOverviewScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Keep splash screen visible while fonts load
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = Font.useFonts({
    Destination: require("./assets/fonts/TheDestination.ttf") // you’ll rename the actual font file yourself
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={styles.screenOptions}
        >
          <Stack.Screen 
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "Vacation Destinations"
            }}
          />
          <Stack.Screen 
            name="DestinationsOverview"
            component={DestinationsOverviewScreen}
            options={{
              title: "Explore Destinations"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  screenOptions: {
    headerStyle: { backgroundColor: Colors.primary500 },
    headerTintColor: Colors.primary300,
    headerTitleStyle: { fontFamily: "Destination", fontSize: 36 },
    contentStyle: { backgroundColor: Colors.primary800 }
  }
});
