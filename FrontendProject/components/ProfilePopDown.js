import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";


const ProfileDropdown = () => {
    const navigation = useNavigation();
  

  return (
    <View style={styles.container}>
      
     
        <View style={styles.dropdown}>
          <View style={styles.item}>
            <Text style={styles.text}>Shayan Hassan Shayan@example.com</Text>
          </View>
          <TouchableOpacity style={styles.item1}
          onPress={() => navigation.navigate("EditProfile")}>
            <Text style={styles.text}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item1}
          onPress={() => navigation.navigate("AddEmployee")}>
            <Text style={styles.text}>Add Employee</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item1}
          onPress={() => navigation.navigate("ChangePassword")}>
            <Text style={styles.text}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item1}
          onPress={() => navigation.navigate("SwitchBusiness")}>
            <Text style={styles.text}>Switch Business</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item2}
          onPress={() => navigation.navigate("Login")}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  
  dropdown: {
    width: 180,
    position: 'absolute',
    top: 15,
    right: 45,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    padding: 10,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth:1,
    borderBottomColor:'black'
    
  },
  item1: {
    paddingVertical: 10,
    borderBottomWidth:0.5,
    borderBottomColor:'black'
    
  },
  item2: {
    paddingVertical: 10,
    paddingBottom:1
  },
  text: {
    fontSize: 16,
    width: 180,
    color: '#000',
    marginBottom:2
  },
});

export default ProfileDropdown;