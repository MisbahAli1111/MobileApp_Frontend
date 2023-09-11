import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfileDropdown from "./ProfilePopDown";
import { Color } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Config from "../screens/Config";

const Header = ({ title, showBackArrow, profileImage, onBackPress }) => {
  const navigation = useNavigation();
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const [profileImageLink, setProfileImageLink] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleProfileImagePress = () => {
    setProfileDropdownVisible((prevState) => !prevState);
  };

  const getProfileImage = async () => {
    try {
      const accessTokens = await AsyncStorage.getItem("accessToken");
      const token = "Bearer " + accessTokens;
      const storedUserId = await AsyncStorage.getItem("userId");
      setUserId(storedUserId);
      if (profileImageLink == null) {
        setLoading(true);
      }

      if (userId) {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${Config.apiServerUrl}/api/users/${userId}/profile-image`,
          headers: {
            Authorization: token,
          },
        };

        const response = await axios.request(config);

        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.url !== null) {
            setProfileImageLink(`${Config.baseUrl1}` + responseData.url);
          }
        } else {
          console.log("Error: " + response.statusText);
        }
      }
    } catch (error) {
      console.log("Error fetching profile image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileImage();
  }, [userId]); 

  return (
    <ImageBackground
      source={require("../assets/light-texture2234-1.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {showBackArrow ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate(onBackPress)}
          >
            <Image
              source={require("../assets/vector2.png")}
              style={styles.arrowImage}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <Text style={styles.title}>{title}</Text>
        

        {loading ? (
          <ActivityIndicator size="small" color="black" />
        ) : profileImage === "Yes" ? (
          profileImageLink ? (
            <TouchableOpacity onPress={handleProfileImagePress}>
              <Image
                source={{ uri: profileImageLink }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleProfileImagePress}>
              {/* Display the Ant Design user icon when profileImageLink is null */}
              <View style={styles.profileImage}>
                <AntDesign name="user" size={25} color="black" />
              </View>
            </TouchableOpacity>
          )
        ) : (
          // Display the placeholder <View> when profileImage is "No"
          <View style={styles.placeholderImage} />
        )}

        {isProfileDropdownVisible && <ProfileDropdown />}
      </View>
    </ImageBackground>
  );
};

// Styles and export remain unchanged
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    top: 40,
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    backgroundColor: "transparent", // Make the background transparent so that the image background is visible
    // borderBottomWidth: 0.5,
    // borderBottomColor: Color.steelblue_200,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    paddingHorizontal: 15,
  },
  arrowImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 15,
  },
  placeholderImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
});

export default Header;
