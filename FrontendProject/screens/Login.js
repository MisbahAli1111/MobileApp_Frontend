import React from "react";
import { Image } from "expo-image";
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [Merror, setMError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setMError(false);
    setEmailError(false);
    setPasswordError(false);

    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (email && password) {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        // 192.168.0.236 shayan IP
        // 192.168.100.71 Misbah IP
        url: "http://192.168.0.236:8080/login",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data === "Invalid Credentials!") {
            setError(response.data);
            setMError(true);
          } else {
            const accessToken = response.data.accessToken;
            const userId = response.data.userId;

            AsyncStorage.setItem("accessToken", accessToken);
            AsyncStorage.setItem("userId", userId);
            navigation.navigate("SwitchBusiness");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/light-texture2234-1.png")}
    >
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      {emailError ? (
        <Text style={styles.nameError}>Please provide Email</Text>
      ) : null}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <AntDesign
            name={showPassword ? "eye" : "eyeo"}
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      {passwordError ? (
        <Text style={styles.nameError}>Please provide Password</Text>
      ) : null}
      {Merror ? <Text style={styles.nameError}>{error}</Text> : null}

      <View style={styles.signUpContainer}>
        <Text style={styles.notRegisteredText}>Not registered?</Text>
        <Pressable onPress={() => navigation.navigate("OwnerInfo")}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={handleLogin} style={styles.button}>
          <Image
            style={styles.buttonImage}
            source={require("../assets/rectangle-73.png")}
          />
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: widthPercentageToDP("10%"), // Responsive padding
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: heightPercentageToDP("2%"), // Responsive margin
  },
  input: {
    width: "100%",
    height: heightPercentageToDP("6%"),
    borderWidth: 0, // Removing the border here
    borderBottomWidth: 1, // Adding a bottom border
    borderColor: "gray",
    paddingHorizontal: widthPercentageToDP("3%"),
    fontSize: heightPercentageToDP("2%"),
    fontFamily: FontFamily.poppinsMedium,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  nameError: {
    color: "red",
    marginBottom: heightPercentageToDP("2%"), // Responsive margin
  },
  signUpText: {
    marginTop: heightPercentageToDP("2%"), // Responsive margin
    fontSize: 16,
    textAlign: "center",
  },
  signUpLink: {
    color: "#007AFF",
  },
  buttonContainer: {
    marginTop: heightPercentageToDP("3%"),
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(3, 29, 68, 1)",
    borderRadius: 10,
    width: "100%",
    height: heightPercentageToDP("6%"),
    paddingHorizontal: widthPercentageToDP("40%"),
  },
  // buttonImage: {
  //   width: widthPercentageToDP("10%"),
  //   height: widthPercentageToDP("10%"),
  //   // marginRight: widthPercentageToDP("2%"),
  // },
  buttonText: {
    fontSize: 16,
    color: "white",
    position: "absolute", // Added position absolute
    textAlign: "center",
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: heightPercentageToDP("2%"), // Responsive margin
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: widthPercentageToDP("10%"),
  },
  notRegisteredText: {
    fontSize: 16,
    color: "gray",
    marginRight: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "gray",
    width: "100%",
    height: heightPercentageToDP("6%"),
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: widthPercentageToDP("3%"),
    fontSize: heightPercentageToDP("2%"),
    fontFamily: FontFamily.poppinsMedium,
  },
});

export default Login;
