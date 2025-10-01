import { StyleSheet, Text, View, Image, FlatList, Button} from 'react-native';
import {useSafeAreaInsets } from 'react-native-safe-area-context';
import Title from "../components/Title";
import EventItem from '../components/EventItem';
import {useState} from 'react';

export default function EventsScreen(props) {
  //Setting safe area screen boundaries
  const insets = useSafeAreaInsets();

  const [eventItems, setEventItems] = useState([
    {
      name: "American FLoyd",
      image: require("../assets/images/americanfloyd.jpg"),
      date: "01/13/2024",
      id: 1
    },
    {
      name: "Badfish",
      image: require("../assets/images/badfish.jpg"),
      date: "07/08/2024",
      id: 2
    },
    {
      name: "Tell Me Lies",
      image: require("../assets/images/tellmelies.jpg"),
      date: "02/14/2024",
      id: 3
    },
    {
      name: "Blackberry",
      image: require("../assets/images/blackberry.jpg"),
      date: "12/12/2024",
      id: 4
    },
    {
      name: "Electric Avenue",
      image: require("../assets/images/electric.jpg"),
      date: "12/28/2024",
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
        <Title>Events</Title>
      </View>

      <View style = {styles.listContainer}>
        <FlatList
        data = {eventItems}
        keyExtractor = {(item, index) => {
          return item.id;
        }}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        renderItem={(itemData ) => {
          return (
            <EventItem
            name={itemData.item.name}
            image={itemData.item.image}
            date={itemData.item.date}
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