import { FlatList, StyleSheet, View, Text } from "react-native";
import PlanItem from "./PlanItem";


export default function PlanList(props){
  function showPlanList(itemData){
    const planItemProps = {
      id: itemData.item.id,
      title: itemData.item.title,
      days: itemData.item.days,
      weeks: itemData.item.weeks
    };
    return <PlanItem {...planItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data = {props.items}
        keyExtractor = {(item) => item.id}
        renderItem = {showPlanList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}


const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink"
  }
})