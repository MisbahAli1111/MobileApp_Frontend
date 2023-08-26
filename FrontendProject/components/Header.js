import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ProfileDropdown from './ProfilePopDown';
import { Color } from "../GlobalStyles";

const Header = ({ title, showBackArrow, profileImage, onBackPress }) => {
  const navigation = useNavigation();
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);

  const handleProfileImagePress = () => {
    setProfileDropdownVisible((prevState) => !prevState);
  };

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
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15
  },
});

export default Header;
