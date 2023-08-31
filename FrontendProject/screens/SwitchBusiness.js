import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import BusinessList from "../components/BusinessList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const SwitchBusiness = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={[
          styles.backgroundImage,
        ]}
        source={require("../assets/light-texture2234-1.png")}
      />

      {/* <Text style={[styles.switchBusinessText]}>
        Switch Business
      </Text> */}

      <ScrollView style={styles.businessListContainer}>
      <View >
        <BusinessList />
      </View>
      </ScrollView>

      <Pressable
        style={[styles.createNewBusinessButton]}
        onPress={() => navigation.navigate("BusinessInfo")}
      >
        <Image
          style={styles.createNewBusinessIcon}
          source={require("../assets/rectangle-731.png")}
        />
        <Text style={styles.createNewBusinessText}>
          Create New Business
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  switchBusinessText: {
    fontSize: heightPercentageToDP('3%'),
    fontWeight: 'bold',
    marginTop: heightPercentageToDP('10%'),
  },
  businessListContainer: {
    flex: 1,
    width: '90%',
    // alignItems: 'center',
    // backgroundColor:'red',
    height: heightPercentageToDP('100%'), 
    marginTop: heightPercentageToDP('10%'),
  },
  createNewBusinessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    backgroundColor: 'rgba(3, 29, 68, 1)',
    borderRadius: 10,
    paddingVertical: heightPercentageToDP('2%'),
    paddingHorizontal: widthPercentageToDP('30%'),
    marginTop: heightPercentageToDP('1%'),
    marginBottom: heightPercentageToDP('1%'), // Adjusted marginTop
  },
  createNewBusinessText: {
    fontSize: 16,
    color: 'white',
  },
});

export default SwitchBusiness;