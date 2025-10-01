import { StyleSheet, Text, View, Image, FlatList, Button} from 'react-native';
import {useSafeAreaInsets } from 'react-native-safe-area-context';
import Title from "../components/Title";
import MenuItem from '../components/MenuItem';
import {useState} from 'react';

export default function MenuScreen(props) {
  //Setting safe area screen boundaries
  const insets = useSafeAreaInsets();

  const [menuItems, setMenuItems] = useState([
    {
      name: "Old Timer",
      image: require("../assets/images/oldtimer.avif"),
      price: "$13.99",
      id: 1
    },
    {
      name: "Fajitas",
      image: require("../assets/images/fajitas.avif"),
      price: "$18.99",
      id: 2
    },
    {
      name: "Full Rack of Ribs",
      image: require("../assets/images/ribs.avif"),
      price: "$24.99",
      id: 3
    },
    {
      name: "Chicken Crispers",
      image: require("../assets/images/tenders.avif"),
      price: "$13.99",
      id: 4
    },
    {
      name: "Surf and Turf",
      image: require("../assets/images/surf.avif"),
      price: "$23.99",
      id: 5
    },
  ])
  return (
    <View style = {[
      styles.rootContainer,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }
    ]}>

      <View style = {styles.titleContainer}>
        <Title>Menu</Title>
      </View>

      <View style = {styles.listContainer}>
        <FlatList
        data = {menuItems}
        keyExtractor = {(item, index) => {
          return item.id;
        }}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        renderItem={(itemData ) => {
          return (
            <MenuItem
            name={itemData.item.name}
            image={itemData.item.image}
            price={itemData.item.price}
            />
          );
        }}
        />
      </View>

      <View style = {styles.buttonContainer}>
        <Button title='Main Menu' onPress={props.onNext} color = "#6b006bff"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },

  titleContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  listContainer: {
    flex: 7,
    width: 380
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 40,
    width: 150,

  }
});