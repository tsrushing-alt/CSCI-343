import { FlatList, View } from "react-native";
import CountryGridTile from "../components/CountryGridTile";
import { COUNTRIES } from "../data/dummy-data";
import Colors from "../constants/colors";

export default function HomeScreen({ navigation }) {

  function renderCountryItem(itemData) {
    function pressHandler() {
      navigation.navigate("DestinationsOverview", {
        countryId: itemData.item.id
      });
    }

    return (
      <CountryGridTile
        name={itemData.item.name}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <View>
      <FlatList
        data={COUNTRIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCountryItem}
        numColumns = {2}
      />
    </View>
  );
}
