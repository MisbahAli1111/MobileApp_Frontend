import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ProfileDropdown from './ProfilePopDown';
import { Color } from "../GlobalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Header = ({ title, showBackArrow, profileImage, onBackPress }) => {
  const navigation = useNavigation();
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const [profileImageLink, setProfileImageLink] = useState('');
  const [baseUrl, setBaseUrl] = useState('http://192.168.0.236:8080');
  const [baseUrlM, setBaseUrlM]= useState('http://192.168.100.71:8080');
  const [loading, setLoading] = useState(true); // Add loading state

  
  const handleProfileImagePress = () => {
    setProfileDropdownVisible((prevState) => !prevState);
  };

  const getProfileImage = async () => {
    try {
      const accessTokens = await AsyncStorage.getItem('accessToken');
      const token = 'Bearer ' + accessTokens;
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);

      if (userId) {
        console.log("userID found");

        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `http://192.168.100.71:8080/api/users/${userId}/profile-image`,
          headers: {
            Authorization: token,
          },
        };

        const response = await axios.request(config);

        if (response.status === 200) {
          const responseData = response.data;
          setProfileImageLink(baseUrlM+responseData.url); // Update the state directly
        } else {
          console.log('Error: ' + response.statusText);
        }
      }
    } catch (error) {
      console.log('Error fetching profile image:', error);
    } finally {
      setLoading(false); // Set loading state to false regardless of success or error
    }
  };

  useEffect(() => {
    getProfileImage();
  }, [userId]); // Fetch the profile image whenever userId changes

  return (
    <ImageBackground
  source={require('../assets/light-texture2234-1.png')}
  style={styles.backgroundImage}
>
  <View style={styles.container}>
    {showBackArrow ? (
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(onBackPress)}>
        <Image source={require('../assets/vector2.png')} style={styles.arrowImage} />
      </TouchableOpacity>
    ) : (
      <View style={styles.placeholderImage} />
    )}
    <Text style={styles.title}>{title}</Text>

    {loading ? (
      <ActivityIndicator size="small" color="black" />
    ) : (
      profileImageLink ? (
        <TouchableOpacity onPress={handleProfileImagePress}>
          <Image source={{ uri: profileImageLink }} style={styles.profileImage} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholderImage} />
      )
    )}
    {isProfileDropdownVisible && <ProfileDropdown />}
  </View>
</ImageBackground>

  );
};

// Styles and export remain unchanged
const styles = StyleSheet.create({
  backgroundImage: {
    flex:1,
    resizeMode: 'cover',
  },
  container: {
    top: 40,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'transparent', // Make the background transparent so that the image background is visible
    // borderBottomWidth: 0.5,
    // borderBottomColor: Color.steelblue_200,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    justifyContent:"center",
    alignItems:"center"
  },
  backButton: {
    paddingHorizontal: 15,
  },
  arrowImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 15
  },
  placeholderImage:
  {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15
  }
});

export default Header;