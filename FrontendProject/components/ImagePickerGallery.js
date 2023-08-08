import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerGallery = ({ onImageSelected }) => {
  

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need gallery permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        multiple: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        onImageSelected(selectedAsset.uri);

      }
    })();
  }, []);

  // return (
  //   <View style={styles.container}>
  //     {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default ImagePickerGallery;