import React, { useState,useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const Config = () => {
  const [ipAddress, setIpAddress] = useState("");
  const[apiServerUrl,setApiServerUrl] = useState("");
  const [ipError, setIpError] = useState("");
  const navigation = useNavigation();

  const validateIpAddress = async () => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (!ipAddress) {
      setIpError("IP Address is required.");
    } else if (!ipRegex.test(ipAddress)) {
      setIpError("Please enter a valid IP address.");
    } else {
      setIpError(""); // Clear the error message
      setApiServerUrl(`http://${ipAddress}:8080`);
      if(apiServerUrl){
      try {
        console.log("API: ",apiServerUrl)
        await AsyncStorage.setItem("apiServerUrl", apiServerUrl);
        console.log("Saved");
      } catch (error) {
        console.error("Error storing apiServerUrl in AsyncStorage: ", error);
      }
      console.log(apiServerUrl);
      navigation.navigate("Login");
    }
}
  };


  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/light-texture2234-1.png")}
    >
      <TextInput
        style={styles.input}
        placeholder="Enter IP Address"
        value={ipAddress}
        onChangeText={(text) => {
          setIpAddress(text);
          setIpError(""); // Clear the error message when the user types
        }}
      />
      {ipError ? <Text style={styles.errorText}>{ipError}</Text> : null}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={validateIpAddress} style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: widthPercentageToDP("10%"), // Responsive padding
  },
  input: {
    width: widthPercentageToDP("80%"), // Responsive width
    height: heightPercentageToDP("6%"),
    borderWidth: 0, // Removing the border here
    borderBottomWidth: 1, // Adding a bottom border
    borderColor: "gray",
    paddingHorizontal: widthPercentageToDP("3%"),
    fontSize: heightPercentageToDP("2%"),
    borderRadius: 5,
    marginBottom: heightPercentageToDP("2%"), // Responsive margin
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "rgba(3, 29, 68, 1)",
    paddingVertical: 10,
    paddingHorizontal: widthPercentageToDP("10%"), // Responsive padding
    borderRadius: 5,
    marginHorizontal: widthPercentageToDP("2%"), // Responsive margin
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: heightPercentageToDP("1.5%"),
    marginBottom: heightPercentageToDP("2%"), // Responsive margin
  },
});

export default Config;
