import {createContext, useState} from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

export default function FavoritesContextProvider({children}){
  const [favoriteIds, setFavoriteIds] = useState([]);

  function addFavorite(id){
    setFavoriteIds((currentFavIds) => {
      return [...currentFavIds, id];
    });
  }

  function removeFavorite(id){
    setFavoriteIds((currentFavIds) => {
      return currentFavIds.filter((favId) => favId !== id);
    });
  }

  const value = {
    ids: favoriteIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  }

  return (
    <FavoritesContext.Provider value = {value}>
      {children}
    </FavoritesContext.Provider>
  );
}