import { useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { DESTINATIONS, COUNTRIES } from "../data/dummy-data";
import DestinationItem from "../components/DestinationItem";

export default function DestinationsOverviewScreen({ route, navigation }) {
  const countryId = route.params.countryId;

  useLayoutEffect(() => {
    const country = COUNTRIES.find((c) => c.id === countryId);
    navigation.setOptions({ title: country ? country.name : "Destinations" });
  }, [countryId, navigation]);

  const displayedDestinations = DESTINATIONS.filter(
    (destination) => destination.countryId === countryId
  );

  function renderDestinationItem(itemData) {
    const destinationProps = {
      name: itemData.item.name,
      imageUrl: itemData.item.imageUrl,
      averageCost: itemData.item.averageCost,
      foundedYear: itemData.item.foundedYear,
      rating: itemData.item.rating,
      description: itemData.item.description,
      listIndex: itemData.item.index,
    };

    return <DestinationItem {...destinationProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedDestinations}
        keyExtractor={(item) => item.id}
        renderItem={renderDestinationItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
