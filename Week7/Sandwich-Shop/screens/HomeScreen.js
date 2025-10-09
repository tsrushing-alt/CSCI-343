import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import Colors from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Title from "../components/Title";
import NavButton from "../components/NavButton";
import { RadioGroup } from "react-native-radio-buttons-group";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen(props){
  //Set safe area screen boundaries
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient 
    colors = {[Colors.accent500, Colors.primary800]}
    style = {styles.container}
    >

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
        <Title>Deli Delights</Title>
      </View>

      <ScrollView stlye= {styles.scrollContainer}>
        {/*Sandwich size option*/}
        <View style={styles.radioContainer}>
          <Text style={styles.radioHeader}>Sandwich Size: </Text>
          <RadioGroup
          radioButtons={props.sizeRadioButtons}
          onPress={props.onSetSizeId}
          selectedId = {props.sizeId}
          layout='row'
          containerStyle={styles.radioGroup}
          labelStyle={styles.radioGroupLabel}
          />
        </View>

        {/*Bread option*/}
        <View style={styles.radioContainer}>
          <Text style={styles.radioHeader}>Bread Type: </Text>
          <RadioGroup
          radioButtons={props.breadRadioButtons}
          onPress={props.onSetBreadId}
          selectedId = {props.breadId}
          layout='row'
          containerStyle={styles.radioGroup}
          labelStyle={styles.radioGroupLabel}
          />
        </View>

        <View style = {styles.rowContainer}>
          {/*Meat Options */}
          <View style = {styles.checkBoxContainer}>
            <Text style={styles.checkBoxHeader}>Meat type: </Text>
            <View style={styles.checkBoxSubContainer}>
              {
                props.meats.map((item) => {
                  return(
                    <BouncyCheckbox
                    key={item.id}
                    text={item.name}
                    onPress={props.onSetMeats.bind(this, item.id)}
                    textStyle={styles.checkBoxLabel}
                    innerIconStyle = {styles.checkBoxInnerStyle}
                    iconStyle= {styles.checkBoxIconStyle}
                    fillColor={Colors.primary500}
                    style={styles.checkBox}
                    />
                  );
                })
              }
            </View>
          </View>

          {/*Sauce Options */}
          <View style = {styles.checkBoxContainer}>
            <Text style={styles.checkBoxHeader}>Sauce type: </Text>
            <View style={styles.checkBoxSubContainer}>
              {
                props.sauces.map((item) => {
                  return(
                    <BouncyCheckbox
                    key={item.id}
                    text={item.name}
                    onPress={props.onSetSauces.bind(this, item.id)}
                    textStyle={styles.checkBoxLabel}
                    innerIconStyle = {styles.checkBoxInnerStyle}
                    iconStyle= {styles.checkBoxIconStyle}
                    fillColor={Colors.primary500}
                    style={styles.checkBox}
                    />
                  );
                })
              }
            </View>
          </View>
        </View>

        {/*Middle Section*/}
        <View style = {styles.rowContainer}>
          {/*Vegetable Options */}
          <View style = {styles.checkBoxContainer}>
            <Text style={styles.checkBoxHeader}>Vegetable type: </Text>
            <View style={styles.checkBoxSubContainer}>
              {
                props.vegetables.map((item) => {
                  return(
                    <BouncyCheckbox
                    key={item.id}
                    text={item.name}
                    onPress={props.onSetVegetables.bind(this, item.id)}
                    textStyle={styles.checkBoxLabel}
                    innerIconStyle = {styles.checkBoxInnerStyle}
                    iconStyle= {styles.checkBoxIconStyle}
                    fillColor={Colors.primary500}
                    style={styles.checkBox}
                    />
                  );
                })
              }
            </View>
          </View>

          {/*Cheese Options */}
          <View style={styles.cheeseContainer}>
            <Text style={styles.checkBoxHeader}>Cheese type: </Text>
            <RadioGroup
            radioButtons={props.cheeseRadioButtons}
            onPress={props.onSetCheeseId}
            selectedId = {props.cheeseId}
            layout='column'
            containerStyle={styles.radioGroup}
            labelStyle={styles.radioGroupLabel}
            />
          </View>
        </View>

        {/*Lower Section*/}
        <View style = {styles.rowContainer}>
          {/*Add on Options */}
          <View style={styles.addOnsContainer}>
            <View style={styles.addOnsSubContainer}>
              <Text style ={styles.adOnsLabel}>Double Meat</Text>
              <Switch 
              onValueChange={props.onSetDoubleMeat}
              value={props.doubleMeat}
              thumbColor={
                props.doubleMeat ? Colors.primary500 : Colors.primary800
              }
              trackColor={{false: "#767577", true:"#81b0ff"}}
              />
            </View>
            <View style={styles.addOnsSubContainer}>
              <Text style ={styles.adOnsLabel}>Double Cheese</Text>
              <Switch 
              onValueChange={props.onSetDoubleCheese}
              value={props.doubleCheese}
              thumbColor={
                props.doubleCheese ? Colors.primary500 : Colors.primary800
              }
              trackColor={{false: "#767577", true:"#81b0ff"}}
              />
            </View>
          </View>
          <View style={styles.addOnsContainer}>
            <View style={styles.addOnsSubContainer}>
              <Text style ={styles.adOnsLabel}>Toasted</Text>
              <Switch 
              onValueChange={props.onSetToasted}
              value={props.toasted}
              thumbColor={
                props.toasted ? Colors.primary500 : Colors.primary800
              }
              trackColor={{false: "#767577", true:"#81b0ff"}}
              />
            </View>


            <View style={styles.addOnsSubContainer}>
              <Text style ={styles.adOnsLabel}>Meal Combo</Text>
              <Switch 
              onValueChange={props.onSetMealCombo}
              value={props.mealCombo}
              thumbColor={
                props.mealCombo ? Colors.primary500 : Colors.primary800
              }
              trackColor={{false: "#767577", true:"#81b0ff"}}
              />
            </View>
            
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <NavButton onNext={props.onNext}>Submit Order</NavButton>
        </View>
      </ScrollView>

    </View>

    </LinearGradient>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  },
  titleContainer: {
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.primary500,
    paddingHorizontal: 10
  },
  scrollContainer: {
    flex: 1,
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'center'

  },
  radioHeader: {
    fontSize: 30,
    color: Colors.primary500,
    fontFamily: "Note"
  },
  radioGroup: {
    paddingBottom: 20,

  },
  radioGroupLabel: {
    fontSize: 15,
    color: Colors.primary500,
    fontFamily: 'Note'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
    paddingHorizontal: 24
  },
  checkBoxContainer: {
    width: "48%"
  },
  checkBoxHeader: {
    fontSize: 20,
    color: Colors.primary500,
    fontFamily: "Note",
  },
  checkBoxSubContainer: {
    padding: 2,
    width: "100%"

  },
  checkBox: {
    padding: 2,
    width: "100%"
  },
  checkBoxLabel: {
    textDecorationLine: 'none',
    color: Colors.primary500,
    fontFamily: "Note"
    
  },
  checkBoxInnerStyle: {
    borderRadius: 0,
    borderColor: Colors.primary500
  },
  checkBoxIconStyle: {
    borderRadius: 0
  },
  cheeseContainer: {
    width: '50%',
    alignItems: 'flex-start',
  },
  adOnsContainer: {
    justifyContent: "space-between"
  },
  addOnsSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  adOnsLabel: {
    color: Colors.primary500,
    fontSize: 20,
    fontFamily: "Note"
  },
  buttonContainer: {
    alignItems:'center'
  }


})