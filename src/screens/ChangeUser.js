import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Animated,
  Easing,
  TextInput,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import fonts from "../layouts/fonts";
import colors from "../layouts/colors";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
// Install react-native-loading-spinner-overlay
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Config";
// import { KeyboardAvoidingView } from 'react-native-web';
//import the two below for context check if they have been previously imported and recheck if the location is correct
import { AllProvider, AllContext } from "../context/AllContext";
import { AuthProvider, AuthContext } from "../context/AuthContext";

const LeaderboardScreen = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [olduser, setOlduser] = useState(false);
  const {
    username, setUsername, email, setEmail, password, setPassword, isLoading, setIsLoading, userInfo, setUserInfo,
    // register,
    // Userlogin,
    // logout,
   } = useContext(AuthContext);
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


  const register = async (name, email, password) => {
    try {
      setIsLoading(true);

      const response = await axios.post(`${BASE_URL}/register`, {
        name,
        email,
        password,
      });

      console.log({ test: response?.status });

      if (response.status === 201) {
        // const userData = response.data;
        // setUserInfo(userData);
        // await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
        console.log("Account created successfully");
        alert("Account created successfully");
        // navigation.replace("Menu");
        setOlduser(true);
      } else if (response.status === 400) {
        console.log("Invalid Email or Password");
        alert("Invalid Email or Password");
      }

      // console.log({ username, email, password });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert("An error occurred while Registering: " + error.message);
    }
  };

  const Userlogin = async (username, password) => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `https://hngstage9backend.onrender.com/api/login`,
        {
          loginIdentifier: `${username}`,
          password: password,
        }
      );

      console.log({ test: response?.status });
      console.log({ test: response?.data });

      if (response?.data) {
        const userData = response.data;
        setUserInfo(userData);
        await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
        console.log("Logged In Successfully");
        alert("Logged In Successfully");
        navigation.replace("Menu");
      } else if (response.status === 400) {
        console.log("Invalid Email or Password");
        alert("Invalid Email or Password");
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error({ error });
      alert("An error occurred while Logging In: " + error.message);
    }
  };

 

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

  return (
    <LinearGradient
      colors={[colors.primarylight, colors.primarydark]}
      style={styles.container}
    >
      <Spinner visible={isLoading} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
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

        {/* Dummy data for Previous Users */}
        {/* <Text style={styles.heading}>Previous Users:</Text>
        <FlatList
          data={leaderboardData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Animated.View
              style={{ transform: [{ translateX: item.animationValue }] }}
            >
              <View style={styles.leaderboardItem}>
                <Text style={styles.rank}>{index + 1 + "."}</Text>
                <Image
                  style={styles.profilePicture}
                  source={item.profilePicture}
                />
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.levelReached}>
                  Level: {item.levelReached}
                </Text>
                <Text style={styles.totalScore}>
                  TotalScore: {item.totalScore}
                </Text>
              </View>
            </Animated.View>
          )}
        /> */}

        {olduser ? (
          <View>
            <Text style={[styles.login]}>Sign In</Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: 'center',
                paddingBottom: 12,
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>
                {" "}
                Create an account{" "}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  padding: 10,
                }}
                onPress={() => setOlduser(false)}
              >
                <Text style={{ color: "white" }}>SignUp</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 12 }}>
            <Text style={styles.inputTitle}>Username:</Text>
              <View style={styles.inputCont}>
                <TextInput
                  placeholder="Enter your Username or Email"
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  placeholderTextColor="black"
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                  }}
                />
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={styles.inputTitle}>Password:</Text>

              <View style={styles.inputCont}>
                <TextInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholderTextColor="black"
                  secureTextEntry={isPasswordShown}
                  style={{
                    width: "100%",
                  }}
                />

                <TouchableOpacity
                  onPress={() => setIsPasswordShown(!isPasswordShown)}
                  style={{
                    position: "absolute",
                    right: 12,
                  }}
                >
                  {isPasswordShown == true ? (
                    <Ionicons name="eye-off" size={24} color="black" />
                  ) : (
                    <Ionicons name="eye" size={24} color="black" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <Button
              title="Login"
              filled
              style={{
                padding: 0,
                margin: 0,
              }}
              onPress={() => {
                Userlogin(username, password);
                console.log("logged in");
              }}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.login}>Create New User:</Text>

            <View style={{ flexDirection: "row",
                justifyContent: "center",
                alignItems: 'center',
                paddingBottom: 12, }}>
              <Text style={{ fontSize: 20, color: "white" }}> Already Have An Account? </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  padding: 10,
                }}
                onPress={() => setOlduser(true)}
              >
                <Text style={{ color: "white" }}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity></TouchableOpacity>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.inputTitle}>Username:</Text>
              <View style={styles.inputCont}>
                <TextInput
                  placeholder="Enter your Username"
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  placeholderTextColor="black"
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                  }}
                />
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={styles.inputTitle}>Email address:</Text>
              <View style={styles.inputCont}>
                <TextInput
                  placeholder="Enter your email address"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholderTextColor="black"
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                  }}
                />
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={styles.inputTitle}>Password:</Text>

              <View style={styles.inputCont}>
                <TextInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholderTextColor="black"
                  secureTextEntry={isPasswordShown}
                  style={{
                    width: "100%",
                  }}
                />

                <TouchableOpacity
                  onPress={() => setIsPasswordShown(!isPasswordShown)}
                  style={{
                    position: "absolute",
                    right: 12,
                  }}
                >
                  {isPasswordShown == true ? (
                    <Ionicons name="eye-off" size={24} color="black" />
                  ) : (
                    <Ionicons name="eye" size={24} color="black" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <Button
              title="Create"
              filled
              style={{
                padding: 0,
                margin: 0,
              }}
              onPress={() => {
                register(username, email, password);
                console.log("logged in");
              }}
            />
          </View>
        )}
      </KeyboardAvoidingView>
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
    fontSize: 35,
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
  login: {
    color: colors.secondarydark,
    fontSize: 35,
    fontFamily: fonts.extraBold,
    textAlign: "center",
  },
  inputTitle: {
    fontSize: 16,
    fontFamily: fonts.extraBold,
    color: colors.secondarydark,
  },
  inputCont: {
    width: "100%",
    height: 48,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
    backgroundColor: "white",
  },
});

export default LeaderboardScreen;
