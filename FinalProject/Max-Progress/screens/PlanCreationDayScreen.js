import { Button, Text, View } from "react-native";



export default function PlanCreationDayScreen({navigation}){
  return(
    <View>
      <View>
        <Text>This Is The Plan Creation Day Screen</Text>
      </View>
      <View>
        <Button title="Next" onPress ={() => navigation.navigate("PlanCreationExercise")}/>
      </View>
    </View>
  )
}