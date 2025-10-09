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
      source = {require("../assets/images/sub.png")}
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


          <View style = {styles.ingredientsContainer}>
            <Text style = {styles.ingredient}>Sandwich Size:</Text>
            <Text style = {styles.subIngredient}>{props.size}</Text>
            <Text style = {styles.ingredient}>Bread Type:</Text>
            <Text style = {styles.subIngredient}>{props.bread}</Text>
            <Text style = {styles.ingredient}>Cheese Type:</Text>
            <Text style = {styles.subIngredient}>{props.cheese}</Text>
            <Text style = {styles.ingredient}>Meats:</Text>
            {props.meats.map((item) => {
              if (item.value){
                return(
                  <Text key={item.id} style = {styles.subIngredient}>
                    {item.name}
                  </Text>
                );
              }
            })}
            <Text style = {styles.ingredient}>Sauces:</Text>
            {props.sauces.map((item) => {
              if (item.value){
                return(
                  <Text key={item.id} style = {styles.subIngredient}>
                    {item.name}
                  </Text>
                );
              }
            })}
            <Text style = {styles.ingredient}>Vegetables:</Text>
            {props.vegetables.map((item) => {
              if (item.value){
                return(
                  <Text key={item.id} style = {styles.subIngredient}>
                    {item.name}
                  </Text>
                )
              }
            })}
            <Text style = {styles.ingredient}>Add Ons:</Text>
            <Text style = {styles.subIngredient}>
              {props.toasted ? "Toasted" : ""}
              </Text>
            <Text style = {styles.subIngredient}>
              {props.doubleMeat ? "Double Meat" : ""}
              </Text>
            <Text style = {styles.subIngredient}>
              {props.doubleCheese ? "Double Cheese" : ""}
              </Text>
            <Text style = {styles.subIngredient}>
              {props.mealCombo ? "Meal Combo" : ""}
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
  ingredientContainer: {
    flex: 3,
  },
  ingredient: {
    fontSize: 20,
    color: Colors.primary500,
    fontFamily: "Note",

  },
  subIngredient: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.primary500
  },
  buttonContainer: {
    alignItems:'center'
  }


})