import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from 'react';
import Colors from './constants/colors';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsDetailScreen from './screens/NewsDetailScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import USNewsScreen from './screens/USNewsScreen';
import WorldNewsScreen from './screens/WorldNewsScreen';
import TechNewsScreen from './screens/TechNewsScreen';
import {
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

//Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

function DrawerNavigator(){
  return (
    <Drawer.Navigator
      initialRouteName='News'
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        headerTitleStyle: {
          fontFamily: "nolluqa",
          fontSize: 40,
          color: Colors.accent800
        },
        sceneContainerStyle: {backgroundColor: Colors.primary300},
        drawerContentStyle: {backgroundColor: Colors.primary500},
        drawerInactiveTintColor: Colors.primary300,
        drawerActiveTintColor: Colors.accent500,
        drawerActiveBackgroundColor: Colors.primary800
      }}
    >
      <Drawer.Screen
        name = "News"
        component = {TabsNavigator}
        options={{
          title: "News",
          drawerLabel: "News Categories",
          drawerIcon: ({color, size}) => (
            <Entypo name = "list" color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen
        name = "BookmarkedNews"
        component = {BookmarksScreen}
        options={{
          title: "Saved News",
          drawerLabel: "Saved News",
          drawerIcon: ({color, size}) => (
            <Entypo name = "bookmark" color={color} size={size} />
          )
        }}
      />
    </Drawer.Navigator>
  )
}

function TabsNavigator(){
  return(
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveBackgroundColor: Colors.primary800,
        tabBarActiveTintColor: Colors.accent500,
        tabBarInactiveBackgroundColor: Colors.primary500,
        tabBarInactiveTintColor: Colors.primary300,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "playfairBold"
        },
        tabBarStyle: {
          backgroundColor: Colors.primary500
        }
      }}
    >
      <Tabs.Screen 
        name = "USNews"
        component = {USNewsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Entypo name = "home" color={color} size={size} />
          ),
          tabBarLabel: "US News"
        }}
      />
      <Tabs.Screen 
        name = "WorldNews"
        component = {WorldNewsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name = "public" color={color} size={size} />
          ),
          tabBarLabel: "World News"
        }}
      />
      <Tabs.Screen 
        name = "TechNews"
        component = {TechNewsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name = "computer" color={color} size={size} />
          ),
          tabBarLabel: "Tech News"
        }}
      />
    </Tabs.Navigator>
  )
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


  if (!loaded){
    return null;
  }


  return (
    <>
      <StatusBar style = 'light'/>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='DrawerScreen'
          screenOptions={{
            headerTintColor: Colors.primary300,
            headerStyle: {backgroundColor: Colors.primary500},
            contentStyle: {backgroundColor: "black"}
          }}
        >
          <Stack.Screen 
            name = "DrawerScreen"
            component = {DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name = "NewsDetail"
            component = {NewsDetailScreen}
            options={{
              headerBackTitleVisible: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    </>
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

