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
import { useState,useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import "expo-dev-client";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';





const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [Merror, setMError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 
  const [accessToken,setAccessToken]=useState();
  const [userInfo,setUserInfo]=useState();
  const [userData,setUserData]=useState('');
  GoogleSignin.configure({
    webClientId: '263042024802-mt8ii02e1cpd2nnkbs0v1qm6s2r2j17i.apps.googleusercontent.com',
  });

  const onGoogleButtonPress = async  () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
    const user_SignIn =  auth().signInWithCredential(googleCredential);
    user_SignIn.then((user) => {
      console.log("User: ",user.user);
    })
    .catch((error)=>
    {
      console.log(error);
    })
  };

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if(user)
    {
      console.log("User Logged In");
      navigation.navigate("SwitchBusiness");
    }
    else{
      console.log("No User Logged In")
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null; 
 

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
      // Retrieve apiServerUrl from AsyncStorage
      AsyncStorage.getItem("apiServerUrl")
        .then((apiServerUrl) => {
          if (apiServerUrl) {
            console.log("Login: ",apiServerUrl);
            const data = new FormData();
            data.append("email", email);
            data.append("password", password);
    
            let config = {
              method: "post",
              maxBodyLength: Infinity,
              url: `${apiServerUrl}/login`,
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: data,
            };
    
            // Make the login API request
            axios
              .request(config)
              .then((response) => {
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
                // Handle API request errors here
                console.log(error);
                // You can also set an error state here if needed
              });
          } else {
            // Handle the case where apiServerUrl is not found in AsyncStorage
            console.error("apiServerUrl not found in AsyncStorage");
            // You can also set an error state here if needed
          }
        })
        .catch((error) => {
          // Handle AsyncStorage errors here
          console.error("Error retrieving apiServerUrl from AsyncStorage: ", error);
          // You can also set an error state here if needed
        });
    }
  };
    

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/light-texture2234-1.png")}
    >
      <Pressable
  onLongPress={() => navigation.navigate("Config")}
  style={styles.titleContainer}
>
  <Text style={styles.title}>Login</Text>
</Pressable>

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

      <View style={styles.grayBorder}></View>

      {/* Sign in with Google Button */}
      <View style={styles.googleButtonContainer}>
        <Pressable 
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        style={styles.googleButton}>
        <AntDesign name="google" size={24} color="white" />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
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
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
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
  buttonText: {
    fontSize: widthPercentageToDP("4%"),
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
    marginTop:widthPercentageToDP("1%"),
    fontSize: heightPercentageToDP("2%"),
    fontFamily: FontFamily.poppinsMedium,
  },
  grayBorder: {
    borderBottomWidth: 1,
    borderColor: "gray",
    marginVertical: heightPercentageToDP("3%"),
    width: "100%",
  },
  googleButtonContainer: {
    marginTop: heightPercentageToDP("1%"),
    alignItems: "center",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(3, 29, 68, 1)", // Google Blue
    borderRadius: 10,
    width: "100%",
    height: heightPercentageToDP("6%"),
    paddingHorizontal: widthPercentageToDP("19%"), // Adjust as needed
  },
  googleButtonText: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
  
});

export default Login;
