import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const ProfileDropdown = () => {
    const navigation = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggleDropdown}>
        <Image
          source={require('../assets/mask-group1.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdown}>
          <View style={styles.item}>
            <Text style={styles.text}>Shayan Hassan Shayan@example.com</Text>
          </View>
          <TouchableOpacity style={styles.item1}>
            <Text style={styles.text}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item1}
          onPress={() => navigation.navigate("AddEmployee")}>
            <Text style={styles.text}>Add Employee</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item1}>
            <Text style={styles.text}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item1}
          onPress={() => navigation.navigate("SwitchBusiness")}>
            <Text style={styles.text}>Switch Business</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item1}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    left: 320,
    top:-10
  },
  dropdown: {
    width: 180,
    position: 'absolute',
    top: 25,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    elevation: 5,
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
  text: {
    fontSize: 16,
    width: 180,
    color: '#000',
    marginBottom:2
  },
});

export default ProfileDropdown;