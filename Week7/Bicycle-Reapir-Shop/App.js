import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';

import Colors from './constants/colors';
import HomeScreen from './screens/HomeScreen';
import OrderReviewScreen from './screens/OrderReviewScreen';

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { SafeAreaProvider } from 'react-native-safe-area-context';

//Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();



export default function App() {
  const [loaded] = Font.useFonts({
    Note: require("./assets/fonts/Note.ttf")
  });

useEffect(() => {
  if (loaded) {
    SplashScreen.hideAsync();
  }
}, [loaded]);


const [currentScreen, setCurrentScreen] = useState("");
const [currentPrice, setCurrentPrice] = useState(0);

const timeRadioButtons = useMemo(
  () => [
    {
      id: "0",
      label: "Standard",
      value: "Standard",
      price: 0.0,
      borderColor: Colors.primary500,
      color: Colors.primary500,
    },
    {
      id: "1",
      label: "Expedited",
      value: "Expedited",
      price: 50.0,
      borderColor: Colors.primary500,
      color: Colors.primary500,
    },
    {
      id: "2",
      label: "Next Day",
      value: "Next Day",
      price: 100.0,
      borderColor: Colors.primary500,
      color: Colors.primary500,
    },
  ],
  []
);


const [timeId, setTimeId] = useState(0);
const [services, setServices] = useState([
  { id: 0, name: "Basic Tune-Up", value: false, price:50.0 },
  { id: 1, name: "Comprehensive Tune-Up", value: false, price: 75.0 },
  { id: 2, name: "Flat Tire Repair", value: false, price: 20.0 },
  { id: 3, name: "Brake Servicing", value: false, price: 50.0 },
  { id: 4, name: "Gear Servicing", value: false, price: 40.0 },
  { id: 5, name: "Chain Servicing", value: false, price: 15.0 },
  { id: 6, name: "Frame Repair", value: false, price: 35.0 },
  { id: 7, name: "Safety Check", value: false, price: 25.0 },
  { id: 8, name: "Accessory Install", value: false, price: 10.0 },
]);
const [newsLetterSignUp, setNewsLetterSignUp] = useState(false);
const [rentalMembership, setRentalMembership] = useState(false);



function setServicesHandler(id){
  setServices((prevServices) => 
    prevServices.map((item) =>
      item.id === id ? {...item, value: !item.value} : item
    )
  );
}


function newsLetterSignUpHandler(){
  setNewsLetterSignUp((previous) => !previous);
}

function rentalMembershipHandler(){
  setRentalMembership((previous) => !previous);
}

function homeScreenHandler(){
  setCurrentPrice(0);
  setTimeId(0);
  setNewsLetterSignUp(false);
  setRentalMembership(false);
  setCurrentScreen("");
  setServices((prevServices) => 
    prevServices.map((services) => ({...services, value: false}))
  );
}

function orderReviewHandler(){
  let price=0;
  for (let i=0; i<services.length; i++){
    if (services[i].value){
      price = price + services[i].price;
    }
  }

  if (newsLetterSignUp){
    price = price;

  }
  if (rentalMembership){
    price = price + 100.0;
  }
  price = price + timeRadioButtons[timeId].price;

  setCurrentPrice(price);
  setCurrentScreen("review");
}

let screen = (
  <HomeScreen
  timeId = {timeId}
  services = {services}
  newsLetterSignUp = {newsLetterSignUp}
  rentalMembership = {rentalMembership}
  timeRadioButtons = {timeRadioButtons}
  onSetTimeId = {setTimeId}
  onSetServices = {setServicesHandler}
  onSetNewsLetterSignUp = {newsLetterSignUpHandler}
  onSetRentalMembership = {rentalMembershipHandler}
  onNext = {orderReviewHandler}
  />
)

if (currentScreen === "review"){
  screen = (
    <OrderReviewScreen 
    time={timeRadioButtons[timeId].value}
    services={services}
    newsLetterSignUp={newsLetterSignUp}
    rentalMembership={rentalMembership}
    price={currentPrice}
    onNext={homeScreenHandler}
    />
  )
}

if (!loaded){
  return null;
}

  return (
    <>
    <StatusBar style='light'/>
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