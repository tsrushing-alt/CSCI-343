import { Button, Text, View } from "react-native";



export default function PlanCreationScreen({navigation}){
  return(
    <View>
      <View>
        <Text>This Is The Plan Creation Screen</Text>
      </View>
      <View>
        <Button title="Next" onPress ={() => navigation.navigate("PlanCreationDay")}/>
      </View>
    </View>
  )
}