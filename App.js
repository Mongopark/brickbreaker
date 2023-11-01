import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeStack from "./src/navigators/HomeStack";
import { NavigationContainer } from "@react-navigation/native";
import useFonts from "./src/hooks/useFonts";
import Splash from "./src/screens/Splash";
//import the below for context and wrap your app with the provider like below and recheck if the location is correct
import { AllProvider, AllContext } from "./src/context/AllContext";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";

const App = () => {
  const appLoading = useFonts();
  if (appLoading) {
    console.log("loading");
    return <Splash />;
  }

  

  





  return (
    <AllProvider>
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <HomeStack />
      </NavigationContainer>
    </AuthProvider>
    </AllProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
