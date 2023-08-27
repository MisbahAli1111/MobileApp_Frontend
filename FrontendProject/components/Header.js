import React, { useState,useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ProfileDropdown from './ProfilePopDown';
import { Color } from "../GlobalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Header = ({ title, showBackArrow, profileImage, onBackPress }) => {
  const navigation = useNavigation();
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [userId,setUserId] = useState('');
  const [profileImageLink,setProfileImageLink] = useState('');

  const handleProfileImagePress = () => {
    setProfileDropdownVisible((prevState) => !prevState);
  };

  // const getProfileImage = async () => {
  //   try {
  //     const accessTokens = await AsyncStorage.getItem('accessToken');
  //     const token = 'Bearer ' + accessTokens;
  
  //     const config = {
  //       method: 'get',
  //       maxBodyLength: Infinity,
  //       url: `http://192.168.0.236:8080/api/users/${userId}/profile-image`,
  //       headers: {
  //         Authorization: token,
  //       },
  //     };
  
  //     const response = await axios.request(config);
  
  //     if (response.status === 200) {
  //       const responseData = response.data;
  //       console.log(responseData.url); // Access URL directly from response data
  //       setProfileImageLink(profileImage);
  //       // console.log(profileImage); // Set the URL in your component's state
  //     } else {
  //       console.log('Error: ' + response.statusText);
  //     }
  //   } catch (error) {
  //     console.log('Error fetching profile image:', error);
  //   }
  // };
          

  useEffect(() => {
    // Retrieve the user ID from AsyncStorage
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        setUserId(storedUserId);
      } catch (error) {
        console.error('Error fetching user ID from AsyncStorage:', error);
      }
      
    };
    console.log(profileImage);
    fetchUserId();
    // getProfileImage();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/light-texture2234-1.png')} // Replace with the actual image path
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {showBackArrow && (
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate({onBackPress})}>
            <Image source={require('../assets/vector2.png')} style={styles.arrowImage} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        {profileImage &&
          <TouchableOpacity onPress={handleProfileImagePress}>
          {/* {console.log(profileImage)} */}
            <Image source={profileImage} style={styles.profileImage} />
          </TouchableOpacity>}
        {isProfileDropdownVisible && <ProfileDropdown />}
      </View>
    </ImageBackground>
  );
};

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
    width: 20,
    height: 40,
    borderRadius: 20,
    marginRight: 15
  },
});

export default Header;