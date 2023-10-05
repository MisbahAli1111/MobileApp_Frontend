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
import { Color,FontSize } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Config from "../screens/Config";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


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
      const apiServerUrl = await AsyncStorage.getItem("apiServerUrl");
      if (profileImageLink == null) {
        setLoading(true);
      }

      if (userId) {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${apiServerUrl}/api/users/${userId}/profile-image`,
          headers: {
            Authorization: token,
          },
        };

        const response = await axios.request(config);

        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.url !== null) {
            setProfileImageLink(`${apiServerUrl}` + responseData.url);
          }
        }else if (error.response.status === 401) {
            
          navigation.navigate("Login");
        }else {
          console.log("Error: " + response.statusText);
        }
      }
    } catch (error) {
      console.log("Error fetching profile image:", error);
      if (error.response.status === 401) {
            
        navigation.navigate("Login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(profileImage === 'Yes')
    {
    getProfileImage();
    }
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
            onPress={() => navigation.navigate(onBackPress, { type: "default" })}
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
    marginTop: hp("3%"), // Adjust the marginTop to create spacing from the top
    flexDirection: "row",
    alignItems: "center",
    height: hp("10%"), // Use heightPercentageToDP for responsive height
    backgroundColor: "transparent", // Make the background transparent so that the image background is visible
  },
  title: {
    flex: 1,
    fontSize: FontSize.size_3xl,
    fontWeight: "700",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    paddingHorizontal: wp("3%"), // Use widthPercentageToDP for responsive padding
  },
  arrowImage: {
    width: wp("5%"),
    height: hp("5%"),
    resizeMode: "contain",
  },
  profileImage: {
    width: wp("7%"),
    height: wp("7%"), // Set the height to the same as the width to make it circular
    borderRadius: wp("3.5%"), // Half of the width to make it circular
    marginRight: wp("3%"),
  },
  
  placeholderImage: {
    width: wp("8%"),
    height: hp("8%"),
    borderRadius: wp("3.5%"),
    marginRight: wp("3%"),
  },
});

export default Header;
