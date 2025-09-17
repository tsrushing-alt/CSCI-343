import {StyleSheet, View, Text, Image} from "react-native";

export default function Restaurant(props){
  return(
        <View style = {styles.itemContainer}>
          <View style = {styles.itemTitleContainer}>
            <Text style = {styles.itemTitle}>{props.name}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style = {styles.image} source={props.image}/>
          </View>
          <View style = {styles.ratingContainer}>
            <Text style = {styles.rating}>{props.rating} / 10</Text>
          </View>
        </View>
  );
}


const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
  },
  itemTitleContainer: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 30,
    textAlign: "center"
  },
  imageContainer: {
    alignItems: 'center',
    borderWidth: 3,
    borderRadis: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  ratingContainer: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderRadius: 5
  },
  rating: {
    fontSize: 30,
    textAlign: 'center'
  }
})