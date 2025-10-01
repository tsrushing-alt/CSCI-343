import { Button, Text, View, StyleSheet } from "react-native";
import Colors from "../constants/colors";




export default function RecipesItem(props){
  return(
    <View style={styles.item}>
      <View style={styles.itemTitleContainer}>
        <Text style={styles.itemTitle}>{props.title}</Text>
      </View>
      <View style={styles.itemButtonsContainer}>
        <View style={styles.button}>
          <Button title="View" onPress={props.onView}/>
        </View>
        <View style={styles.button}>
          <Button title="Delete" onPress={props.onDelete}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
    borderRadius: 6,
    backgroundColor: Colors.accent500
  },
  itemTitleContainer: {
    justifyContent: 'center'
  },
  itemTitle: {
    fontFamily: 'paperNoteBold',
    fontSize: 20,
    color: Colors.primary300,
    padding: 8
  },
  itemButtonsContainer: {
    flexDirection: 'row',

  },
  button: {
    marginHorizontal: 3,
    marginVertical: 5
  }
})