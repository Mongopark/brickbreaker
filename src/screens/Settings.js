import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
  TextInput
} from "react-native";
import Button from "../components/Button";
import colors from "../layouts/colors";
import fonts from '../layouts/fonts';
import Modal from './Modal';
import { LinearGradient } from "expo-linear-gradient";
// Install react-native-loading-spinner-overlay
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import axios from "axios";
//import the two below for context check if they have been previously imported and recheck if the location is correct
import { AllProvider, AllContext } from "../context/AllContext";
import { AuthProvider, AuthContext } from "../context/AuthContext";





const Settings = ({ navigation}, props) => {
  const {
    username, setUsername, email, setEmail, password, setPassword, isLoading, setIsLoading, userInfo, setUserInfo,
    // register,
    // Userlogin,
    // logout,
   } = useContext(AuthContext);
    const {sound, setSound, music, setMusic, backgroundMusic, backgroundSound,  } = useContext(AllContext);

  const [difficulty, setDifficulty] = useState('Easy');
  const [num, setNum] = useState(0);
  const [ firstModal, setFirstModal ] = useState(false);
  const [ secondModal, setSecondModal] = useState("");

const userlist = [
  {
    name: 'Mongopark',
    avatar_url: require('../../assets/profile3.jpg'),
    subtitle: 'amy.farha@gmail.com',
    instructiontitle: 'Objective: ',
    instruction: 'The primary objective of the game is to achieve the highest score possible within a limited time frame. Players earn points by successfully completing specific in-game tasks or challenges',
  },
  {
    name: 'Silasico',
    avatar_url: require('../../assets/profile1.jpg'),
    subtitle: 'cjackson@gmail.com',
    instructiontitle: 'Gameplay: ',
    instruction: 'Players can control their in-game character using intuitive touch and button controls.',
  },
  {
    name: 'OneBoyFromIfe',
    avatar_url: require('../../assets/profile2.jpg'),
    subtitle: 'amandam@gmail.com',
    instructiontitle: 'Challenges and Power-ups:',
    instruction: ' Challenges includes avoiding obstacles. Power-ups can enhance the characters abilities temporarily',
  },
];

// const Userlogin = async (username, password) => {
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
//       await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
//       console.log("Account created successfully");
//       alert("Account created successfully");
//       navigation.replace("Menu");
//     } else if (response.status === 400) {
//       console.log("Invalid Email or Password");
//       alert("Invalid Email or Password");
//     }

//     setIsLoading(false);
//   } catch (error) {
//     setIsLoading(false);
//     console.error({ error });
//     alert("An error occurred while registering: " + error.message);
//   }
// };



const logout = () => {
  setIsLoading(true);
  axios
    .get(`https://hngstage9backend.onrender.com/api/logout`)
    .then((res) => {
      console.log(res.data);
      AsyncStorage.removeItem("userInfo");
      setIsLoading(false);
      navigation.replace("Changeuser");
    })
    .catch((e) => {
      alert(`logout error ${e}`);
      setIsLoading(false);
    });
};


// For the Sound Switch
  const toggleSound = () => { 
    setSound(!sound)
    // if(sound){
    //   props.loadBackgroundSound;
    // }else{
    //   props.stopBackgroundSound;
    // }
  };
  //For the Music Switch
  const toggleMusic = () => {
    setMusic(!music)
    // if(music){
    // props.loadBackgroundMusic;
    // }else{
    //  props.stopBackgroundMusic;
    // }
  };

  const decreaseDifficulty = () => {
    if (num === -2) {
      setNum(0);
      setDifficulty('Easy');
    } else if (num === 0) {
      setNum(-1);
      setDifficulty('Medium');
    } else if (num === -1) {
      setNum(-2);
      setDifficulty('Hard');
    }
  };
  
  const increaseDifficulty = () => {
    if (num === -2) {
      setNum(-1);
      setDifficulty('Medium');
    } else if (num === -1) {
      setNum(0);
      setDifficulty('Easy');
    } else if (num === 0) {
      setNum(-2);
      setDifficulty('Hard');
    }
  };

  const startDifficulty= () => {
    if(difficulty=='Easy'){
      navigation.navigate('Home');
    setTimeout(() => {
      alert('You are Playing Easy Level');
    }, 1500);
    }else if(difficulty=='Medium'){
      navigation.navigate('Home');
      setTimeout(() => {
        alert('You are Playing Medium Level');
      }, 1500);
    }else if(difficulty=='Hard'){
      navigation.navigate('Home');
      setTimeout(() => {
        alert('You are Playing Hard Level');
      }, 1500);
    }
  }
  

  return (
    <LinearGradient
      // Button Linear Gradient
      colors={[colors.primarylight, colors.primarydark]}
      style={styles.container}>
         <Spinner visible={isLoading} />
        <Button
          title="Go Back"
          textstyle={{ fontSize: 20, fontFamily: fonts.extraBold }}
          style={{ width: '30%', height: 30, padding: 0, alignSelf: 'flex-start' }}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.cont}>      
      <Text style={styles.heading}>Setting</Text>
      <View
        style={styles.soundview}>
        <Text style={styles.sound}>SOUND</Text>
        <Switch
          thumbColor='gold'
          ios_backgroundColor="white"
          onValueChange={toggleSound}
          value={sound}
          style={styles.switch}
          trackColor={{ false: "white", true: "white" }} />
      </View>

      <View
        style={styles.soundview}>
        <Text style={styles.sound}>MUSIC</Text>
        <Switch
          thumbColor='gold'
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleMusic}
          value={music}
          style={styles.switch} />
      </View>

      <View style={styles.difficultyview}>
        <Text style={styles.sound}>DIFFICULTY</Text>
      </View>

      <View style={styles.difficultybar}>
        <View style={styles.difficultyicon}>
          <FontAwesome name="chevron-left" size={24} color={colors.buttontext} onPress={decreaseDifficulty} />
        </View>
        <TouchableOpacity
          style={{ padding: 10, borderRadius: 30, backgroundColor: "white" }} onPress={startDifficulty}>
          <Text style={styles.difficulty}>     {difficulty}     </Text>
        </TouchableOpacity>
        <View style={styles.difficultyicon}>
          <FontAwesome name="chevron-right" size={24} color={colors.buttontext} onPress={increaseDifficulty} />
     </View>
      </View>



    <Modal
        visible={firstModal}
        handleCloseModal={() => setFirstModal(false)}
      >
        <View style={styles.modalContainer}>
           {userlist.map((l, i) => (
        <View
          key={i}
          style={styles.modalItem}
          onPress={() => setFirstModal(false)} >
          <Image style={{ borderRadius: 50 }} source={l.avatar_url} />
          <View>
            <Text style={{ fontWeight: '700' }}>
              {l.name}
            </Text>
            <Text>{l.subtitle}</Text>
          </View>
        </View> ))}
        </View>
      </Modal>


      <Modal
        visible={ secondModal }
        handleCloseModal={() => setSecondModal(false)}
      >
        <View style={styles.modalContainer}>
        <Text style={{ fontWeight: '700', padding: 3, }}>Instructions</Text>
           {userlist.map((l, i) => (
        <View
          key={i}
          onPress={() => setSecondModal(false)} >
          <View style={[styles.modalItem, {padding: 20,}]}>
            <Text style={{ fontWeight: '700', padding: 3, }}>
              {i + 1 + '.'}
            </Text>
            <Text> <Text style={{ fontWeight: '700', padding: 3, }}>{l.instructiontitle}</Text>
            <Text>{l.instruction}</Text>  </Text>           
          </View>
        </View> ))}
        </View>
      </Modal>


      <Button title="ABOUT DEVELOPER" textstyle={{ fontSize: 20, fontFamily: fonts.extraBold, }}
            style={{ width: 200, height: 30, padding: 0 }} onPress={() => setFirstModal(true)} />


          <Button title="GAME INSTRUCTIONS" textstyle={{ fontSize: 20, fontFamily: fonts.extraBold, }}
            style={{ width: 230, height: 30, padding: 0 }} onPress={() => setSecondModal(true)} />
            {/* The Fifth Dialog- a dialog with three options and a cancel and confirm button below */}


    <Button title="CHANGE USER" textstyle={{ fontSize: 20, fontFamily: fonts.extraBold, }}
            style={{ width: 230, height: 30, padding: 0 }} onPress={
              logout
              // navigation.goBack().replace('Changeuser');
              } />

            </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  cont: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: colors.primarydark,
    fontSize: 90,
    alignSelf: 'center',
    fontFamily: fonts.extraBold,
  },
  soundview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '80%',
    paddingVertical: 20,
  },
  sound: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.extraBold,
  },
  difficulty: { 
    fontSize: 25, 
    color: colors.primarydark,
    fontFamily: fonts.extraBold, 
  },
  difficultyview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",          
    width: '80%',
    paddingTop: 20,
  },
  difficultybar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  difficultyicon: {
    borderRadius: 30,
    padding: 5,
    width: 40,
    height: 40,
    backgroundColor: colors.secondarylight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: "70%",
    backgroundColor: 'beige',
    padding: 20,
    gap: 20,
    borderRadius: 20,
  },
  modalItem: { 
    marginHorizontal: -10, 
    borderRadius: 8, 
    backgroundColor: 'white', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 8, 
  },
});

export default Settings;
