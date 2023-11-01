import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, PanResponder, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from "../layouts/colors";
import Bricks from "../components/Bricks"

const Home = () => {
  const ballMovement = useState(new Animated.ValueXY())[0]
  const pan = useState(new Animated.ValueXY())[0]
  /* const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  return <View {...panResponder.panHandlers} />;
  */
  
  useEffect(() => {
    BallMovement()
  }, [])
  
  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  )[0];
  
  const BallMovement = () => {
    Animated.loop(
      Animated.timing(ballMovement, {
        toValue: {x: ballMovement.x + 50, y: ballMovement.y + -100},
        duration: 1000,
        useNativeDriver: true
      })
    ).start()
  }

  const BricksArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
  
  
  return (
    <View style={styles.container}>
      <View style={styles.view80}>
        <View style = {{flex: 1, gap: 10, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"}}>
          {
            BricksArr.map(brick => {
              return (
                <Bricks />
              )
            })
          }
        </View>
        
        <Animated.View style = {{
          ...styles.ball, 
          transform: [{translateX: ballMovement.x}, {translateY: ballMovement.y}]
        }}>
        
        </Animated.View>
      
        <Animated.View style = {{
          transform: [{translateX: pan.x}],
          backgroundColor: "black",
          width: 50,
        }}>
          <Text>My Box</Text>
        </Animated.View>
      </View>
      <View style={styles.view20}>

{/* Control button Starts here */}
        {/* <View style={styles.controlbutton}>
          <TouchableOpacity style={styles.up}><Ionicons name="caret-up" style={styles.iconup} /></TouchableOpacity>
          
           <View style={styles.sideway}>
<TouchableOpacity><Ionicons name="caret-back" style={styles.iconleft} /></TouchableOpacity>
<TouchableOpacity><Ionicons name="square" style={styles.iconcenter} /></TouchableOpacity>
<TouchableOpacity><Ionicons name="caret-forward" style={styles.iconright} /></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.down}><Ionicons name="caret-down" style={styles.icondown} /></TouchableOpacity>
        </View> */}
{/* Control button ends here */}


        <View
          style = {{
            backgroundColor: "yellow",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          {...panResponder.panHandlers}
          
        >
          <Text>Move your box here</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  view80: {
    flex: 8, // 80% of the available height
    backgroundColor: colors.primarydark, 
  },
  view20: {
    flex: 2, // 20% of the available height
    backgroundColor: colors.primarylight, 
  },
  controlbutton:{
    marginTop: 5,
    borderRadius: 65,
    backgroundColor: colors.secondarylight,
    width: 130,
    height: 130,
    alignSelf: 'center',
  },
  up:{
    alignSelf: 'center',
    padding: 3, 
    borderColor: 'red',
    borderWidth: 1,
  },
  sideway:{
    flexDirection: 'row',
    justifyContent: 'space-between',   
    padding: 3, 
    borderColor: 'red',
    borderWidth: 1,
  },  
  down:{
    alignSelf: 'center',   
    padding: 3, 
    borderColor: 'red',
    borderWidth: 1,
  },
  iconup:{
    fontSize: 33,
    color: colors.buttontext,
  },
  iconleft:{
    fontSize: 33,
    color: colors.buttontext,
  },
  iconcenter:{
    fontSize: 33,
    color: colors.buttontext,
  },
  iconright:{
    fontSize: 33,
    color: colors.buttontext,
  },
  icondown:{
    fontSize: 33,
    color: colors.buttontext,
  },
  ball: {
    width: 12,
    height: 12,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
});

export default Home;
