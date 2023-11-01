import AsyncStorage from "@react-native-async-storage/async-storage";

// install axios
import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";
import { BASE_URL } from "../Config";
//import the two below for context check if they have been previously imported and recheck if the location is correct
import { AllProvider, AllContext } from "./AllContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation }) => {
  //list the items you need in the context
  const {level, setLevel, lives, setLives, totalscore, setTotalscore } = useContext(AllContext);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});




  // const register = async (username, email, password) => {
  //   try {
  //     setIsLoading(true);

  //     const response = await axios.post(`${BASE_URL}/register`, {
  //       name: username,
  //       email,
  //       password,
  //     });

  //     console.log({ test: response?.status });

  //     if (response.status === 201) {
  //       const userData = response.data;
  //       setUserInfo(userData);
  //       console.log(userInfo)
  //       await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
  //       console.log("Account created successfully");
  //       alert("Account created successfully");
  //       navigation.replace("Menu");
  //       setOlduser(true);
  //     } else if (response.status === 400) {
  //       console.log("Invalid Email or Password");
  //       alert("Invalid Email or Password");
  //     }

  //     // console.log({ username, email, password });
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error(error);
  //     alert("An error occurred while registering: " + error.message);
  //   }
  // };







  //  const Userlogin = async (username, password) => {
  //   try {
  //     setIsLoading(true);

  //     const response = await axios.post(
  //       `https://hngstage9backend.onrender.com/api/login`,
  //       {
  //         loginIdentifier: `${username}`,
  //         password: password,
  //       }
  //     );

  //     console.log({ test: response?.status });
  //     console.log({ test: response?.data });

  //     if (response?.data) {
  //       const userData = response.data;
  //       setUserInfo(userData);
  //       console.log(userInfo);
  //       await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
  //       console.log("Logged In Successfully");
  //       alert("Logged In Successfully");
  //       navigation.replace("Menu");
  //     } else if (response.status === 400) {
  //       console.log("Invalid Email or Password");
  //       alert("Invalid Email or Password");
  //     }

  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error({ error });
  //     alert("An error occurred while Logging in: " + error.message);
  //   }
  // };






  // const AddLeader = async (username, password) => {
  //   try {
  //     // setIsLoading(true);

  //     const response = await axios.post(
  //       `https://hngstage9backend.onrender.com/api/LearderBoard`,
  //       {
  //         totalScore: totalscore,
  //         level,
  //       }
  //     );

  //     console.log({ test: response?.status });
  //     console.log({ test: response?.data });

  //     if (response?.data) {
  //       // const userData = response.data;
  //       // setUserInfo(userData);
  //       // console.log(userInfo);
  //       // await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
  //       console.log("Leader Added Successfully");
  //       alert(response.data);
  //     } else if (response.status === 400) {
  //       console.log("Invalid Post Request");
  //       alert("Invalid Post Request");
  //     }

  //     // setIsLoading(false);
  //   } catch (error) {
  //     // setIsLoading(false);
  //     console.error({ error });
  //     alert("An error occurred while adding LeaderBoard: " + error.message);
  //   }
  // };


  //Function to add to LeaderBoard
  const AddLeader = async (totalscore, level, userInfo) => {
    try {
      
      const bearerToken = userInfo.token;
  
      const response = await axios.post(
        `https://hngstage9backend.onrender.com/api/LearderBoard`,
        {
          totalScore: totalscore,
          level,
        },
        {
          headers: {
            Authorization: bearerToken, 
          },
        }
      );
  
      console.log({ test: response?.status });
      console.log({ test: response?.data });
  
      if (response?.data) {
        console.log("Leader Added Successfully");
        alert(response.data);
      } else if (response.status === 400) {
        console.log("Invalid Post Request");
        alert("Invalid Post Request");
      }
    } catch (error) {
      console.error({ error });
      alert("An error occurred while adding LeaderBoard: " + error.message);
    }
  };






  const isLoggedIn = async () => {
    try {
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
        console.log(userInfo);
      }
    } catch (e) {
      alert(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        username, setUsername, email, setEmail, password, setPassword, isLoading, setIsLoading, userInfo, setUserInfo,
        // register,
        // Userlogin,
        logout,
        isLoggedIn,
        AddLeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
