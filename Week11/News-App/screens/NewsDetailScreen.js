import { Image, StyleSheet, Text, View } from 'react-native';
import { NEWS } from "../data/dummy_data";
import { useContext, useLayoutEffect, useState } from 'react';
import Colors from '../constants/colors';
import BookmarkButton from '../components/BookmarkButton';
import { FavoritesContext } from '../store/context/bookmarks-context';

export default function NewsDetailScreen(props) {
  const favoriteNewsCtx = useContext(FavoritesContext);

  const newsId = props.route.params.newsId;
  const selectedNews = NEWS.find((news) => news.id === newsId);

  const newsIsFavorite = favoriteNewsCtx.ids.includes(newsId);

  function changeFavoriteStatusHandler(){
    if (newsIsFavorite){
      favoriteNewsCtx.removeFavorite(newsId);
    }
    else{
      favoriteNewsCtx.addFavorite(newsId);
    }
  }



  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: "",
      headerRight: () => {
        return (
          <BookmarkButton
            isFavorite={newsIsFavorite}
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [props.navigation, changeFavoriteStatusHandler]);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: selectedNews.imageUrl }}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.headline}>
          {selectedNews.headline}
        </Text>
        <Text style={styles.date}>
          {selectedNews.date}
        </Text>
        <Text style={styles.agency}>
          {selectedNews.agency} — {selectedNews.author}
        </Text>
        <Text style={styles.description}>
          {selectedNews.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  imageContainer: {
    marginVertical: 10,
    height: 300,
  },
  image: {
    height: "100%",
    resizeMode: "cover",
    borderRadius: 7,
  },
  infoContainer: {
    borderRadius: 7,
    backgroundColor: Colors.primary500o8,
    flex: 1,
    alignItems: 'center',
  },
  headline: {
    color: Colors.primary300,
    fontSize: 28,
    fontFamily: "playfairBold",
    paddingBottom: 10,
    textAlign: "center",
    width: "90%",
  },
  date: {
    color: Colors.primary300,
    fontSize: 18,
    fontFamily: "playfairItalic",
    paddingBottom: 5,
  },
  agency: {
    color: Colors.primary300,
    fontSize: 18,
    fontFamily: "playfair",
    marginBottom: 20,
  },
  description: {
    color: Colors.primary300,
    width: "90%",
    textAlign: "justify",
    fontSize: 16,
    fontFamily: "playfair",
  },
});
