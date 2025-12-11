import { FlatList, StyleSheet, View } from "react-native";
import PlanItem from "./PlanItem";
import Colors from "../../constants/colors/colors";

export default function PlanList(props) {
  function renderPlanItem(itemData) {
    const plan = itemData.item;

    const planItemProps = {
      id: plan.id,
      title: plan.title || "Untitled Plan",
      weeks: plan.weeks || [] 
    };

    return <PlanItem {...planItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={props.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlanItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary500,
    borderRadius: 12
  }
});