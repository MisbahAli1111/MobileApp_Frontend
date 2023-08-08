import React, { useState } from 'react';
import Header from '../components/Header';
import ImagePickerCamera from '../components/ImagePickerCamera';
import { FontFamily, Color, FontSize, Border } from '../GlobalStyles';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

const Login = () => {
  const userProfileImage = require('../assets/mask-group1.png');

  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const handleIconClick = () => {
    setShowImagePicker(true);
  };

  const handleImageSelected = (uri) => {
    setSelectedImageUri(uri);
    setShowImagePicker(false);
  };

  return (
    <View style={styles.login}>
      <TouchableOpacity onPress={handleIconClick} style={styles.text}>
        <Text style={styles.text}>Click Me</Text>
      </TouchableOpacity>
      {showImagePicker && (
        <ImagePickerCamera onImageSelected={handleImageSelected} />
      )}
      {selectedImageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImageUri }} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    height: '100%',
    flex: 1,
    width: '100%',
    // alignItems:"center",
    backgroundColor: Color.white,
  },
  text: {
    fontSize: 20,
    fontFamily: FontFamily.primaryBold,
    alignItems: 'center',
    marginTop: 100,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
});

export default Login;
