import { Pressable, StyleSheet, Text } from "react-native"
import colors from "../layouts/colors"
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import fonts from "../layouts/fonts";
import { Ionicons } from '@expo/vector-icons';


const Button = ({
  onPress,
  title,
  style,
  textstyle
}) => {
  return (
    <Pressable
      onPress = {onPress}
    >
      <LinearGradient
        // Button Linear Gradient
        colors={[colors.secondarylight, colors.secondarydark]}
        style = {{...styles.btn, ...style}} 
         start={{x: 0, y: 0}} 
         end={{x: 1, y: 0}}  >         
      <Text
        style = {{...styles.btnText, ...textstyle}}
        // font = "OpenSans_600SemiBold"
      >
        {title}
      </Text>
      </LinearGradient>
      </Pressable>
    
  )
}

const styles = StyleSheet.create({
  btn: {
    width: "70%",
    borderRadius: 30,
    backgroundColor: colors.secondarylight,
    padding: 15,
    margin: 15,
    alignItems: "center",
    alignSelf: 'center',
    justifyContent: "center", 
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    boxShadow: 6,
    shadowColor: 'blue',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 9,
  },
  btnText: {
    color: colors.buttontext,
    fontSize: 40,
    fontFamily: fonts.bold
  }
})

export default Button;