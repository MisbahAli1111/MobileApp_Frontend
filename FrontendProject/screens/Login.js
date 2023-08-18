import React from "react";
import { Image } from "expo-image";
import { ScrollView, TouchableOpacity, StyleSheet, View, Text, Pressable, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [Merror, setMError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
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
      data.append('email', email);
      data.append('password', password);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        // 172.20.64.1 shayan IP
        // 192.168.100.71 Misbah IP
        url: 'http://192.168.100.71:8080/login',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data === 'Invalid Credentials!') {
            setError(response.data);
            setMError(true)
          } else {
            const accessToken = response.data.accessToken;
            const userId = response.data.userId;

            AsyncStorage.setItem("accessToken", accessToken);
            AsyncStorage.setItem("userId", userId);
            
            // console.log(userId);
            //         AsyncStorage.getItem("accessToken")
            // .then(accessTokens => {
            //   console.log(accessTokens); 
            // })

            navigation.navigate('SwitchBusiness');

          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      {emailError ? <Text style={styles.nameError}>Please provide Email</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      {passwordError ? <Text style={styles.nameError}>Please provide Password</Text> : null}
      {Merror ? <Text style={styles.nameError}>{error}</Text> : null}
      <Pressable onPress={() => navigation.navigate("OwnerInfo")}>
        <Text style={styles.signUpText}>Not registered? <Text style={styles.signUpLink}>Sign Up</Text></Text>
      </Pressable>

      <View style={[styles.vectorParent, styles.groupItemLayout]}>
        <Pressable onPress={handleLogin}>
          <Image
            style={[styles.groupItem, styles.groupItemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-73.png")}
          />
          <Text style={styles.save}>Save</Text>
        </Pressable>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  signUpText: {
    marginTop: 10,
    marginBottom: 20,
    color: 'gray',
  },
  signUpLink:{
    marginTop: 10,
    marginBottom: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfeef2',
  },
  login: {
    height: 50,
    width: 100,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,

  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#60b9d1",
    marginBottom: 20,
    width: '80%',
    fontSize: 16,
    padding: 8,
  },
  groupItemLayout: {
    height: 45,
    width: 381,
    position: "absolute",
    top: 400,

  },
  groupItem: {
    borderRadius: Border.br_7xs,
    left: 0,
    top: 0,
  },
  nameError: {

    color: 'red',
  },
  save: {
    top: 445,
    left: 171,

    color: Color.snow,
    marginTop: -35,
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_base,
    textAlign: "left",
    fontWeight: "500",
    position: "absolute",
  },
});

export default Login;