import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FavoritesContext } from '../store/context/bookmarks-context';
import { NEWS } from '../data/dummy_data';
import List from '../components/List/List';
import Colors from '../constants/colors';

export default function BookmarksScreen() {
const favoriteNewsCtx = useContext(FavoritesContext);
const favoriteNews = NEWS.filter((newsItem) => {
  return favoriteNewsCtx.ids.includes(newsItem.id);
});


  if (favoriteNews.length === 0){
    return(
      <View style={styles.container}>
        <Text style={styles.text}>You have no saved news yet</Text>
      </View>
    )
  }
  else{
    return (
      <List 
        items = {favoriteNews}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary300
  }
});