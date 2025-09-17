import { StatusBar } from 'expo-status-bar';
import { useState} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList } from 'react-native';
import Movie from './components/Movie';
export default function App() {
  const [movieItems, setMovieItems] = useState([
    {
      name: "Batman:\n The Dark Knight",
      image: require("./assets/images/darkknight.jpg"),
      rating: "8.2",
      id: 1
    },
    {
      name: "Her",
      image: require("./assets/images/her.jpg"),
      rating: "8.7",
      id: 2
    },
    {
      name: "Synechdoche, New York",
      image: require("./assets/images/synechdoche.jpg"),
      rating: "9.6",
      id: 3
    },
    {
      name: "Rock Dog",
      image: require("./assets/images/rockdog.jpg"),
      rating: "10.0",
      id: 4
    },
    {
      name: "Rock Dog 2",
      image: require("./assets/images/rockdog2.jpg"),
      rating: "10.0",
      id: 5
    },
    {
      name: "Rock Dog 3:\n Battle the Beat",
      image: require("./assets/images/rockdog3.jpg"),
      rating: "10.0",
      id: 6
    },
    {
      name: "I'm Thinking of Ending Things",
      image: require("./assets/images/thinking.jpg"),
      rating: "8.8",
      id: 7
    },
    {
      name: "Paprika",
      image: require("./assets/images/paprika.jpg"),
      rating: "9.6",
      id: 8
    },
    {
      name: "Pulp Fiction",
      image: require("./assets/images/pulpfiction.jpg"),
      rating: "8.4",
      id: 9
    },
    {
      name: "American Psycho",
      image: require("./assets/images/psycho.jpg"),
      rating: "8.5",
      id: 10
    }
  ]);

  return (
    <>
      <StatusBar style = 'dark' />
      <SafeAreaView style = {styles.rootContainer}>
        <View style = {styles.titleContainer}>
          <Text style = {styles.title}>Top 10 Movies</Text>
        </View>

        <View style = {styles.listContainer}>
          <FlatList
          showsVerticalScrollIndicator={false} 
          data={movieItems}
          keyExtractor={(item, index) => (item.id)}
          renderItem={(itemData) => {
            return <Movie 
              name={itemData.item.name}
              image={itemData.item.image}
              rating={itemData.item.rating}
              id={itemData.item.id}
              />
          }}
          
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#718afcff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    justifyContent: "center",
    marginBottom: 50,
    paddingHorizontal: 5,
    borderWidth: 5,
    borderRadius: 10,
    marginTop: 50,
    backgroundColor: "#FCDB71"
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  listContainer: {
    flex: 8,
    width: '90%'
  }
});
