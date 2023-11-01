
import React, { useEffect, useRef, useContext, useState } from 'react';
import { View, StyleSheet, Text, Animated, Easing, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import fonts from '../layouts/fonts';
import Button from '../components/Button';
import colors from '../layouts/colors';
import AsyncStorage from "@react-native-async-storage/async-storage";
//import the two below for context check if they have been previously imported and recheck if the location is correct
import {AllProvider, AllContext} from '../context/AllContext';
import { AuthProvider, AuthContext } from "../context/AuthContext";

const Menu = ({ navigation }) => {
  const slideAnima = useRef(new Animated.Value(-100)).current;
  const slideAnim = useRef(new Animated.Value(-200)).current;
  const slideAni = useRef(new Animated.Value(-300)).current;
  const slideAn = useRef(new Animated.Value(-400)).current;
  //list the items you need in the context
  const {level, setLevel, lives, setLives, totalscore, setTotalscore } = useContext(AllContext);
  const { username, setUsername, email, setEmail, password, setPassword, isLoading, setIsLoading, userInfo, setUserInfo,
    // register,
    // Userlogin,
  // logout,
  isLoggedIn, } = useContext(AuthContext);
  // console.log(userInfo.user.name)
 


//following the principles of immutability and state management in React in changing object properties
  useEffect(() => {
    // Create a copy of the userInfo object
    const updatedUserInfo = { ...userInfo };
  
    // Update the properties of the copied object
    updatedUserInfo.msg.level = level;
    updatedUserInfo.msg.totalScore = totalscore;
  
    // Set the state with the updated userInfo object
    setUserInfo(updatedUserInfo);
  
    console.log(userInfo.msg.totalScore);
    console.log(updatedUserInfo.msg.level);
    console.log(isLoggedIn);
  
    // The rest of your code...
  }, [level, totalscore]);






  useEffect(() => {
//  userInfo.msg.level=level;
//   userInfo.msg.totalScore=totalscore;
// console.log(userInfo.msg.totalScore);
// console.log(isLoggedIn);

    // Define the slide-in animations
    const slideInAnimation = Animated.timing(slideAnima, {
      toValue: 0,
      duration: 1000, // Adjust the duration as needed
      easing: Easing.ease,
      useNativeDriver: false,
    });
    const slideInAnimatio = Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000, // Adjust the duration as needed
      easing: Easing.ease,
      useNativeDriver: false,
    });
    const slideInAnimati = Animated.timing(slideAni, {
      toValue: 0,
      duration: 1000, // Adjust the duration as needed
      easing: Easing.ease,
      useNativeDriver: false,
    });
    const slideInAnimat = Animated.timing(slideAn, {
      toValue: 0,
      duration: 1000, // Adjust the duration as needed
      easing: Easing.ease,
      useNativeDriver: false,
    });
    slideInAnimation.start();
    slideInAnimatio.start();
    slideInAnimati.start();
    slideInAnimat.start();
  }, []);

  return (
    <LinearGradient
      colors={[colors.primarylight, colors.primarydark]}
      style={styles.container}
    >
      {isLoggedIn?
      (<View style={styles.leaderboardItem}>
                {/* <Text style={styles.rank}>
                  {index + 1 + '.'}
                  </Text> */}
                <Image style={styles.profilePicture} 
                // source={item.profilePicture}
                source={require('../../assets/profile.jpg')}
                />
                <Text style={styles.username}> {userInfo.msg.name}
                  {/* {item.username} */}
                  </Text>
                <Text style={styles.levelReached}>Level Reached: {userInfo.msg.level}
                {/* {item.levelReached} */}
                </Text>
                <Text style={styles.totalScore}>TotalScore: { userInfo.msg.totalScore}
                {/* {item.totalScore} */}
                </Text>
              </View>):
              (<View style={styles.leaderboardItem}>
                {/* <Text style={styles.rank}>
                  {index + 1 + '.'}
                  </Text> */}
                <Image style={styles.profilePicture} 
                // source={item.profilePicture}
                source={require('../../assets/profile1.jpg')}
                />
                <Text style={styles.username}> Guest
                  {/* {item.username} */}
                  </Text>
                <Text style={styles.levelReached}>Level Reached: 1
                {/* {item.levelReached} */}
                </Text>
                <Text style={styles.totalScore}>TotalScore: 0
                {/* {item.totalScore} */}
                </Text>
              </View>)
}

      <Text style={styles.heading}>Menu</Text>
      <Animated.View style={{ transform: [{ translateX: slideAnima }] }}>
        <Button
          title="PLAY"
          textstyle={{ fontFamily: fonts.extraBold }}
          onPress={() => navigation.navigate("Home")}
        />
      </Animated.View>
      <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
        <Button
          title="LEVEL"
          textstyle={{ fontFamily: fonts.extraBold }}
          onPress={() => navigation.navigate("Level")}
        />
      </Animated.View>
      <Animated.View style={{ transform: [{ translateX: slideAni }] }}>
        <Button title="LEADERBOARD" textstyle={{ fontFamily: fonts.extraBold, }} style={{ paddingHorizontal: 0, }} onPress={() => navigation.navigate('Leaderboard')} />
      </Animated.View>
      <Animated.View style={{ transform: [{ translateX: slideAn }] }}>
        <Button
          title="SETTING"
          textstyle={{ fontFamily: fonts.extraBold }}
          onPress={() => navigation.navigate("Settings")}
        />
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  heading: {
    color: colors.primarydark,
    fontSize: 100,
    alignSelf: "center",
    fontFamily: fonts.extraBold,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  rank: {
    width: 30,
    textAlign: 'center',
    color: 'black',
    fontFamily: fonts.bold,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    fontFamily: fonts.bold,
  },
  levelReached: {
    fontSize: 12,
    color: colors.secondarylight,
    fontFamily: fonts.bold,
  },
  totalScore: {
    fontSize: 12,
    marginLeft: 20,
    color: colors.secondarylight,
    fontFamily: fonts.bold,
    marginRight: 10,
  },
});

export default Menu;
