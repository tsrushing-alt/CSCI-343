import { ScrollView, StyleSheet, Text, View, ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Title from "../components/Title";
import Colors from "../constants/colors";
import NavButton from "../components/NavButton";





export default function OrderReviewScreen(props){
  //set safe area screen boundaries
  const insets = useSafeAreaInsets();


  return(
      <ImageBackground
      source = {require("../assets/images/bike.png")}
      resizeMode = "cover"
      style = {styles.container}
      imageStyle = {styles.backgroundImage} >
      <View
      
      style = {[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }
      ]}
      >
        <View style = {styles.titleContainer}>
          <Title>Order Summary</Title>
        </View>

        <ScrollView stlye= {styles.scrollContainer}>
          <View style = {styles.subTitleContainer}>
            <Text style = {styles.subTitle}>Your order has been placed with your order details below</Text>
          </View>


          <View style = {styles.servicesContainer}>
            <Text style = {styles.service}>Service Time:</Text>
            <Text style = {styles.subService}>{props.time}</Text>
            <Text style = {styles.service}>Services:</Text>
            {props.services.map((item) => {
              if (item.value){
                return(
                  <Text key={item.id} style = {styles.subService}>
                    {item.name}
                  </Text>
                );
              }
            })}
            <Text style = {styles.service}>Add Ons:</Text>
            <Text style = {styles.subService}>
              {props.newsLetterSignUp ? "News Letter Sign Up" : ""}
              </Text>
            <Text style = {styles.subService}>
              {props.rentalMembership ? "Rental Membership" : ""}
              </Text>
          </View>
          <View style = {styles.subTitleContainer}>
            <Text style = {styles.subTitle}>SubTotal: ${props.price.toFixed(2)}</Text>
            <Text style = {styles.subTitle}>Sales Tax: ${(props.price * 0.06).toFixed(2)}</Text>
            <Text style = {styles.subTitle}>Total: ${(props.price + props.price * 0.06).toFixed(2)}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <NavButton onNext={props.onNext}>Return Home</NavButton>
          </View>
        </ScrollView>
      </View>
      </ImageBackground>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  },
  backgroundImage: {
    opacity: 0.3
  },
  titleContainer: {
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.primary500,
    paddingHorizontal: 10
  },
  scrollContainer: {
    flex: 1
  },
  subTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  subTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary500,
  },
  servicesContainer: {
    flex: 3,
  },
  service: {
    fontSize: 20,
    color: Colors.primary500,
    fontFamily: "Note",

  },
  subService: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.primary500
  },
  buttonContainer: {
    alignItems:'center'
  }


})