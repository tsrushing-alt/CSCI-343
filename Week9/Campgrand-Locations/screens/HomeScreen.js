import { FlatList, Text, View } from "react-native";
import StateGridTile from "../components/StateGridTile";
import {STATES} from "../data/dummy-data";
import Colors from '../constants/colors';



export default function HomeScreen(props){
  function renderStateItem(itemData){
    function pressHandler(){
      props.navigation.navigate("CampgroundsOverview", {
        stateId: itemData.item.id
      });
    }

    return(
      <StateGridTile
        name = {itemData.item.name}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    )
  }

  return(
    <View>
      <FlatList
        data={STATES}
        keyExtractor={(item)=>{return item.id;}}
        renderItem={renderStateItem}
        numColumns={2}
      />
    </View>
  );
}