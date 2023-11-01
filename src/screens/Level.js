import React, { useEffect, useRef, useState, useContext } from 'react';
import { ScrollView, View, Text, Animated, Easing, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../components/Button';
import colors from '../layouts/colors';
import fonts from '../layouts/fonts';
import LevelButton from '../components/LevelButton';
import { Ionicons } from '@expo/vector-icons';
//import the two below for context check if they have been previously imported and recheck if the location is correct
import {AllProvider, AllContext} from '../context/AllContext';

const Level = ({ navigation }) => {
  //list the items you need in the context
  const {level, setLevel } = useContext(AllContext);

  var levelsData = [
    { id: 1, title: 'LEVEL 1', animationValue: new Animated.Value(-200), unlocked: false },
    { id: 2, title: 'LEVEL 2', animationValue: new Animated.Value(-300), unlocked: false },
    { id: 3, title: 'LEVEL 3', animationValue: new Animated.Value(-400), unlocked: false },
    { id: 4, title: 'LEVEL 4', animationValue: new Animated.Value(-500), unlocked: false },
    { id: 5, title: 'LEVEL 5', animationValue: new Animated.Value(-600), unlocked: false },
    { id: 6, title: 'LEVEL 6', animationValue: new Animated.Value(-700), unlocked: false },
    { id: 7, title: 'LEVEL 7', animationValue: new Animated.Value(-800), unlocked: false },
    { id: 8, title: 'LEVEL 8', animationValue: new Animated.Value(-900), unlocked: false },
    { id: 9, title: 'LEVEL 9', animationValue: new Animated.Value(-1000), unlocked: false },
    { id: 10, title: 'LEVEL 10', animationValue: new Animated.Value(-1100), unlocked: false },
  ];

    levelsData.forEach((levelData, index) => {
      if (index < level) {
        levelData.unlocked = true;
      }
    });


  useEffect(() => {
    // Unlock levels based on the level state
    // for (let i = 0; i < levelsData.length; i++) {
    //   if(levelsData[i].id<=level){
    //   levelsData[i].unlocked= true;
    //   }
    // }

    // levelsData.forEach((levelData, index) => {
    //   if (index < level) {
    //     levelData.unlocked = true;
    //   }
    // });

    // Start the slide-in animation when the component mounts
    levelsData.forEach((levelData) => {
      const slideInAnimation = Animated.timing(levelData.animationValue, {
        toValue: 0,
        duration: 1000, // Adjust the duration as needed
        easing: Easing.ease,
        useNativeDriver: false,
      });
      slideInAnimation.start();
    });
  }, [level]);

  return (
    <ScrollView>
      <LinearGradient
        colors={[colors.primarylight, colors.primarydark ]}
        style={styles.container}
      >
        <BackButton
          title="Go Back"
          textstyle={{ fontSize: 20, fontFamily: fonts.extraBold }}
          style={{ width: '30%', height: 30, padding: 0, alignSelf: 'flex-start' }}
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.heading}>Level</Text>

        {levelsData.map((levelData) => (
          <Animated.View key={levelData.id} style={{ transform: [{ translateX: levelData.animationValue }] }}>
            <LevelButton
              title={levelData.title}
              textstyle={{ fontFamily: fonts.extraBold }}
              unlocked={levelData.unlocked}
              onPress={() => {
                if (levelData.unlocked) {
                  navigation.navigate('Home');
                }
              }}
            />
          </Animated.View>
        ))}
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  heading: {
    color: colors.primarydark,
    fontSize: 150,
    alignSelf: 'center',
    fontFamily: fonts.extraBold,
  },
});

export default Level;
