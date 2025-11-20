import { Pressable } from "react-native";
import Colors from "../constants/colors";
import {Ionicons} from "@expo/vector-icons";


export default function BookmarkButton(props){
  if (props.pressed){
    return(
      <Pressable onPress={props.onPress}>
        <Ionicons name = "bookmark" size={30} color= {Colors.accent500} />
      </Pressable>
    );
  }
  else{
    return(
      <Pressable onPress={props.onPress}>
        <Ionicons name="bookmark-outline" size={30} color={Colors.accent500}/>
      </Pressable>
    )
  }
}