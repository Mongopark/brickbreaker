import { Pressable, StyleSheet, Text } from "react-native"
import colors from "../layouts/colors"
import React, {useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import fonts from "../layouts/fonts";
import { Ionicons } from '@expo/vector-icons';


const Button = ({ onPress, title, style, textstyle, unlocked }) => {
    const [levelcolorlight, setLevelcolorlight] = useState(colors.secondarylight);
    const [levelcolordark, setLevelcolordark] = useState(colors.secondarydark);
    const [levelcolortext, setLevelcolortext] = useState(colors.buttontext);

        
        useEffect(() => {
            if(unlocked==false){
                setLevelcolorlight('#d0d0d0');
                setLevelcolordark('#d0d0d0');
                setLevelcolortext('black');
              }      
          }, []);

  return (
    <Pressable
      onPress = {onPress}
    >
      <LinearGradient
        // Button Linear Gradient
        colors={[levelcolorlight, levelcolordark]}
        style = {{...styles.btn, ...style}} 
         start={{x: 0, y: 0}} 
         end={{x: 1, y: 0}}  >    
         <Text style = {{...styles.btnText, ...textstyle, ...{color: levelcolortext} }}
        // font = "OpenSans_600SemiBold"
      >
        {title}
      </Text>  
            {unlocked>0 ? (<Ionicons style={[styles.lock,{color: levelcolortext,}]} name="ios-lock-open" size={24} color="black" />) : (<Ionicons style={[styles.lock,{color: levelcolortext,}]} name="md-lock-closed" size={24} color="black" />) }
       </LinearGradient>
      </Pressable>
    
  )
}

const styles = StyleSheet.create({
  btn: {
    width: "70%",
    flexDirection: 'row',
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
  },
  lock: {
    fontSize: 40,
    fontFamily: fonts.bold
  }
})

export default Button;