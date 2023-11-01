import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Racket = (props) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  const wheelstyle = {
    position: "relative", 
    width: height + 2, 
    height: height + 2, 
    backgroundColor: '#0099ff', 
    borderRadius: 10, 
    borderColor: props.color,
    borderWidth: 6,
  };


  return (
    <View style={{ position: "absolute", left: x, top: y, width: width, height: height, backgroundColor: '#0099ff', borderRadius: 10, borderColor: props.color, borderWidth: 3, justifyContent: 'space-between', flexDirection: 'row', }} >
        <View style={wheelstyle}></View>
        <View style={wheelstyle}></View>
      </View>
  );
};

const styles = StyleSheet.create({
  
});



export default Racket;