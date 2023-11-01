import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from "react-native";
import fonts from "../layouts/fonts";
import colors from "../layouts/colors";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios"; // Import Axios if not already don
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

const LeaderboardScreen = ({ navigation }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  // const leaderboardData = [
  //   {
  //     username: "User1",
  //     levelReached: 5,
  //     totalScore: 100,
  //     profilePicture: require("../../assets/profile3.jpg"),
  //     animationValue: new Animated.Value(-200),
  //   },
  //   {
  //     username: "User2",
  //     levelReached: 8,
  //     totalScore: 200,
  //     profilePicture: require("../../assets/profile3.jpg"),
  //     animationValue: new Animated.Value(-300),
  //   },
  //   {
  //     username: "User3",
  //     levelReached: 4,
  //     totalScore: 300,
  //     profilePicture: require("../../assets/profile3.jpg"),
  //     animationValue: new Animated.Value(-400),
  //   },
  //   // Add more user data objects
  // ];
  let userimag = require("../../assets/profile3.jpg");

  console.log({ leaderboardData });

  // const fetchDataFromAPI = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://hngstage9backend.onrender.com/api/LearderBoard"
  //     );
  //     setLeaderboardData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching leaderboard data:", error);
  //   }
  // };


  // useEffect(() => {
  //   // Start the slide-in animation when the component mounts
  //   leaderboardData.forEach((item) => {
  //     const slideInAnimation = Animated.timing(item.animationValue, {
  //       toValue: 0,
  //       duration: 1000, // Adjust the duration as needed
  //       easing: Easing.ease,
  //       useNativeDriver: false,
  //     });
  //     slideInAnimation.start();
  //   });
  // }, []);
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(
          "https://hngstage9backend.onrender.com/api/LearderBoard"
        );
  
        // Initialize animationValue for each item
        const animatedData = response.data.map((item) => ({
          ...item,
          animationValue: new Animated.Value(0), // You can adjust the initial value as needed
        }));
  
        setLeaderboardData(animatedData);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };



    leaderboardData.forEach((item) => {
      const slideInAnimation = Animated.timing(item.animationValue, {
        toValue: 0,
        duration: 1000, // Adjust the duration as needed
        easing: Easing.ease,
        useNativeDriver: false,
      });
      slideInAnimation.start();
    });

    fetchDataFromAPI();
  }, []);
  // useEffect(() => {

  //   return () => {
  //   }
  // }, [])

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Dispatch your action here to get cart data
  //     fetchDataFromAPI();

  //     return () => {
  //       // Cleanup (if needed)
  //     };
  //   }, [])
  // );

  return (
    <LinearGradient
      colors={[colors.primarylight, colors.primarydark]}
      style={styles.container}
    >
      <View style={styles.container}>
        <Button
          title="Go Back"
          textstyle={{ fontSize: 20, fontFamily: fonts.extraBold }}
          style={{
            width: "30%",
            height: 30,
            padding: 0,
            alignSelf: "flex-start",
          }}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.heading}>LeaderBoard</Text>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <FlatList
            data={leaderboardData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Animated.View
                style={{ transform: [{ translateX: item.animationValue }] }}
              >
                <View style={styles.leaderboardItem}>
                  <Text style={styles.rank}>{index + 1 + "."}</Text>
                  <Image style={styles.profilePicture} source={userimag} />
                  <Text style={styles.username}>{item?.User?.name}</Text>
                  <Text style={styles.levelReached}>Level: {item?.level}</Text>
                  <Text style={styles.totalScore}>
                    TotalScore: {item?.totalScore}
                  </Text>
                </View>
              </Animated.View>
            )}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  heading: {
    color: colors.primarydark,
    fontSize: 50,
    alignSelf: "center",
    fontFamily: fonts.extraBold,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    borderColor: colors.primarydark,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  rank: {
    width: 30,
    textAlign: "center",
    color: "black",
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
    color: "black",
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

export default LeaderboardScreen;
