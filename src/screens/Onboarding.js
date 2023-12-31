import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../layouts/colors";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';

const Onboarding = ({ navigation }) => {
  const navigation = useNavigation(); 


  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.img} />
      <View style={styles.content}>
        <View style={styles.text}>
          <TextOpen style={styles.welcome}>
            Welcome on board
          </TextOpen>
          <TouchableOpacity 
             onPress={() => navigation.navigate("Loading")}
            >
            <TextOpen style={styles.signText}>Create an account</TextOpen>
          </TouchableOpacity>
        </View>
        <View style={styles.action}>
          <CustomBouton
            label={"Continue with Google"}
            provider={"google"}
            onPress={() => navigation.navigate("Loading")}
          />
          <View style={styles.bottom}>
            <TextOpen style={styles.login}>Have an account ? </TextOpen>
            <TouchableOpacity
            onPress={() => navigation.navigate("Loading")}
            >
              <TextOpen style={styles.log}>Login</TextOpen>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 30,
  },
  welcome: {
    fontSize: 24,
    ...Platform.select({
      ios: {
        margin: 24,
      },
      android: {
        marginHorizontal: 0,
      },
      default: {
        // other platforms, web for example
        marginHorizontal: 0,
      },
    }),

    color: colors.primary,
  },
  content: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "space-between",
    gap: 16,
    marginVertical: 30,
    paddingVertical: 20,
  },
  signText: {
    fontSize: 20,

    color: colors.secondary,
    
    ...Platform.select({
      ios: {
        marginHorizontal: 24,
      },
      android: {
        marginHorizontal: 0,
      },
      default: {
        // other platforms, web for example
        marginHorizontal: 0,
      },
    }),

    color: "#33313E",

  },
});
