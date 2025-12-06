import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from "@expo/vector-icons";

import Colors from './constants/colors/colors';
import { PlanProvider } from './store/context/PlanContext';

// Screens
import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';
import PlanCreationScreen from './screens/PlanCreationScreen';
import PlanCreationDayScreen from './screens/PlanCreationDayScreen';
import ExerciseSelectionScreen from './screens/ExerciseSelectionScreen';
import TrainingPlanScreen from './screens/TrainingPlanScreen';
import WorkoutScreen from './screens/WorkoutScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function TrainingPlansStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PlanCreation" component={PlanCreationScreen} />
      <Stack.Screen name="PlanCreationDay" component={PlanCreationDayScreen} />
      <Stack.Screen name="ExerciseSelection" component={ExerciseSelectionScreen} />
      <Stack.Screen name="TrainingPlan" component={TrainingPlanScreen} />
      <Stack.Screen name="Workout" component={WorkoutScreen} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="TrainingPlans"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontFamily: "nolluqa",
          fontSize: 40,
          color: Colors.accent800
        },
        sceneContainerStyle: { backgroundColor: Colors.primary300 },
        drawerContentStyle: { backgroundColor: Colors.primary500 },
        drawerInactiveTintColor: Colors.primary300,
        drawerActiveTintColor: Colors.accent500,
        drawerActiveBackgroundColor: Colors.primary800
      }}
    >
      <Drawer.Screen
        name="TrainingPlans"
        component={TrainingPlansStack}
        options={{
          title: "Training Plans",
          drawerLabel: "Training Plans",
          drawerIcon: ({ color, size }) => (
            <Entypo name="list" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          drawerLabel: "Settings",
          drawerIcon: ({ color, size }) => (
            <Entypo name="cog" color={color} size={size} />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [loaded] = Font.useFonts({
    playfair: require("./assets/fonts/Playfair.ttf"),
    playfairBold: require("./assets/fonts/PlayfairBold.ttf"),
    playfairBoldItalic: require("./assets/fonts/PlayfairBoldItalic.ttf"),
    nolluqa: require("./assets/fonts/NolluqaRegular.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <PlanProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="DrawerScreen"
          screenOptions={{
            headerTintColor: Colors.primary300,
            headerStyle: { backgroundColor: Colors.primary500 },
            contentStyle: { backgroundColor: "black" }
          }}
        >
          <Stack.Screen
            name="DrawerScreen"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
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
