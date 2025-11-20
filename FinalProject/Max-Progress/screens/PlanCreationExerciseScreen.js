import { Button, Text, View } from "react-native";



export default function PlanCreationExerciseScreen({navigation}){
  return(
    <View>
      <View>
        <Text>This Is The Plan Creation Exercise Screen</Text>
      </View>
      <View>
        <Button title="Finish" onPress ={() => navigation.navigate("Home")}/>
      </View>
    </View>
  )
}