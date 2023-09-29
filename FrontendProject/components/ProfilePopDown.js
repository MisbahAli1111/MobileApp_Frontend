import React, { useState , useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import Config from "../screens/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

const ProfileDropdown = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  getData = async () => {
    const userId = await AsyncStorage.getItem("userId");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${Config.apiServerUrl}/api/users/${userId}`, // Use backticks
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setName(response.data.firstName);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <View style={styles.item}>
          <Text style={styles.text}>{name} {email}</Text>
        </View>
        <TouchableOpacity
          style={styles.item1}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.text}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item1}
          onPress={() => navigation.navigate("AddEmployee")}
        >
          <Text style={styles.text}>Add Employee</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item1}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text style={styles.text}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item1}
          onPress={() => navigation.navigate("SwitchBusiness")}
        >
          <Text style={styles.text}>Switch Business</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item2}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  dropdown: {
    width: widthPercentageToDP("45%"),
    position: "absolute",
    top: 0,
    right: widthPercentageToDP("10%"),
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "black",
    padding: widthPercentageToDP("2%"),
  },
  item: {
    paddingVertical: heightPercentageToDP("1%"),
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  item1: {
    paddingVertical: heightPercentageToDP("1%"),
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
  },
  item2: {
    paddingVertical: heightPercentageToDP("1%"),
    paddingBottom: 1,
  },
  text: {
    fontSize: widthPercentageToDP("3.5%"),
    fontFamily:FontFamily.poppinsMedium,
    width: 180,
    color: "#000",
    marginBottom: 2,
  },
});

export default ProfileDropdown;
