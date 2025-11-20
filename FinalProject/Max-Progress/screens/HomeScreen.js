import { View, Text, Button} from "react-native";
import PLANS from "../data/dummy_data";
import PlanList from "../components/Plans/PlanList";

export default function HomeScreen({navigation}){
  return(

    <View style={{flex: 1}}>
        <PlanList items={PLANS}/>

      <View>
        <Button title="Create New Plan" onPress ={() => navigation.navigate("PlanCreation")}/>
      </View>
    </View>
  )
}