import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Colors from './constants/colors/colors';
import { PlanProvider } from './store/context/PlanContext';

// Screens
import HomeScreen from './screens/HomeScreen';
import PlanCreationScreen from './screens/PlanCreationScreen';
import PlanCreationDayScreen from './screens/PlanCreationDayScreen';
import ExerciseSelectionScreen from './screens/ExerciseSelectionScreen';
import TrainingPlanScreen from './screens/TrainingPlanScreen';
import WorkoutScreen from './screens/WorkoutScreen';
// import SettingsScreen from './screens/SettingsScreen'; // Not using for now

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = Font.useFonts({
    robotoRegular: require("./assets/fonts/RobotoSlab-Regular.ttf"),
    robotoLight: require("./assets/fonts/RobotoSlab-Light.ttf"),
    robotoSemiBold: require("./assets/fonts/RobotoSlab-SemiBold.ttf"),
    cinzelRegular: require("./assets/fonts/Cinzel-Regular.ttf"),
    cinzelMedium: require("./assets/fonts/Cinzel-Medium.ttf"),
    cinzelSemiBold: require("./assets/fonts/Cinzel-SemiBold.ttf")


  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <PlanProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: "cinzelMedium",
              fontSize: 40,
              color: Colors.accent200
            },
            contentStyle: { backgroundColor: Colors.primary300 },
          }}
        >
          <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
            options={{ title: "Max Progress" }} 
          />
          <Stack.Screen name="PlanCreation" component={PlanCreationScreen} options={{ headerTitle: "" }}/>
          <Stack.Screen name="PlanCreationDay" component={PlanCreationDayScreen} options={{ headerTitle: "" }}/>
          <Stack.Screen name="ExerciseSelection" component={ExerciseSelectionScreen} options={{ headerTitle: "" }}/>
          <Stack.Screen name="TrainingPlan" component={TrainingPlanScreen} options={{ headerTitle: "" }}/>
          <Stack.Screen name="Workout" component={WorkoutScreen} options={{ headerTitle: "" }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PlanProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

