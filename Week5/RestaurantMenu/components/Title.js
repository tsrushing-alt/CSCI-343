import {Text, StyleSheet} from 'react-native';
import Colors from '../constants/colors';

export default function Title(props){
  return<Text style = {styles.title }>{props.children}</Text>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 60,
    textAlign: "center",
    fontFamily: "GlametrixLight",
    color: Colors.primary500
  }
})