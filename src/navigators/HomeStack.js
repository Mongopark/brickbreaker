import { createStackNavigator } from "@react-navigation/stack";
import Menu from "../screens/Menu";
import Home from "../screens/Home";
import Level from "../screens/Level";
import LeaderBoard from "../screens/LeaderBoard";
import Settings from "../screens/Settings";
import ChangeUser from "../screens/ChangeUser";
import React, { useEffect, useState, useContext } from "react";
//import the two below for context check if they have been previously imported and recheck if the location is correct
import { AllProvider, AllContext } from "../context/AllContext";
import { Audio } from "expo-av";


// Gotten from NdukweSamuel
const backgroundMusic = new Audio.Sound();
const backgroundSound = new Audio.Sound();
const Stack = createStackNavigator();

const HomeStack = () => {
      //list the items you need in the context
      const {level, setLevel, lives, setLives, totalscore, setTotalscore, sound, setSound, music, setMusic,  } = useContext(AllContext);

      // Gotten from NdukweSamuel
      // useEffect(() => {
      //   const loadBackgroundMusic = async () => {
      //     try {
      //       await backgroundMusic.loadAsync(require("../../assets/mob.mp3"));
      //       await backgroundMusic.setIsLoopingAsync(true); // Set the music to loop
      //       await backgroundMusic.playAsync();
      //     } catch (error) {
      //       console.error("Error loading background music:", error);
      //     }
      //   };
    
      //   const stopBackgroundMusic = async () => {
      //     try {
      //       await backgroundMusic.stopAsync();
      //       await backgroundMusic.unloadAsync();
      //     } catch (error) {
      //       console.error("Error stopping background music:", error);
      //     }
      //   };
    
      //   loadBackgroundMusic();
    
      //   return () => {
      //     stopBackgroundMusic();
      //   };
      // }, []);


      useEffect(() => {
if(music){
        const loadBackgroundMusic = async () => {
          try {
            await backgroundMusic.loadAsync(require("../../assets/mob.mp3"));
            await backgroundMusic.setIsLoopingAsync(true); // Set the music to loop
            await backgroundMusic.playAsync();
          } catch (error) {
            console.error("Error loading background music:", error);
          }
        };
        loadBackgroundMusic();
      }else{
        const stopBackgroundMusic = async () => {
          try {
            await backgroundMusic.stopAsync();
            await backgroundMusic.unloadAsync();
          } catch (error) {
            console.error("Error stopping background music:", error);
          }
        };
        stopBackgroundMusic();
      }
    }, [music]);


    useEffect(() => {
    if(sound){
      const loadBackgroundSound = async () => {
        try {
          await backgroundSound.loadAsync(require("../../assets/brick.mp3"));
          await backgroundSound.setIsLoopingAsync(true); // Set the music to loop
          await backgroundSound.playAsync();
        } catch (error) {
          console.error("Error loading background music:", error);
        }
      };
      loadBackgroundSound();
    }else{
      const stopBackgroundSound = async () => {
        try {
          await backgroundSound.stopAsync();
          await backgroundSound.unloadAsync();
        } catch (error) {
          console.error("Error stopping background music:", error);
        }
      };
      stopBackgroundSound();
    }
  }, [sound]);







  
  
        
         



  return (
    <Stack.Navigator
      initialRouteName="Changeuser"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true, // Enable swipe gestures for navigation
        gestureDirection: "horizontal", // Set the swipe direction
      }}
    >
      <Stack.Screen name={"Menu"} component={Menu} />
      <Stack.Screen name={"Home"} component={Home} />
      <Stack.Screen name={"Level"} component={Level} />
      <Stack.Screen name={"Leaderboard"} component={LeaderBoard} />
      <Stack.Screen name={"Settings"} component={Settings} />
      <Stack.Screen name={"Changeuser"} component={ChangeUser} />
    </Stack.Navigator>
  );
};

export default HomeStack;
