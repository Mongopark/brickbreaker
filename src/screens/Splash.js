import { View, Text, StyleSheet, ImageBackground } from "react-native"
import font from "../layouts/fonts"
import colors from "../layouts/colors"

const Splash = () => {
  return(
    <View style = {styles.cont}>
      <ImageBackground
      source={require('../../assets/splash.png')} // Set the path to your image
      style={styles.imageBackground}
    >
      </ImageBackground>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBackground: {
    flex: 1,
    position: 'relative',
    resizeMode: 'cover', // You can adjust the resizeMode as needed
    justifyContent: 'center', // Adjust as needed
  },
})