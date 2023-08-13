import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [cnic, setCnic] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const countryCodes = ["AF", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BT", "BO", "BA", "BW", "BR", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "CF", "TD", "CL", "CN", "CO", "KM", "CG", "CD", "CR", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FJ", "FI", "FR", "GA", "GM", "GE", "DE", "GH", "GR", "GD", "GT", "GN", "GW", "GY", "HT", "HN", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IL", "IT", "CI", "JM", "JP", "JO", "KZ", "KE", "KI", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR", "MU", "MX", "FM", "MD", "MC", "MN", "ME", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NG", "KP", "NO", "OM", "PK", "PW", "PA", "PG", "PY", "PE", "PH", "PL", "PT", "QA", "RO", "RU", "RW", "KN", "LC", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "KR", "SS", "ES", "LK", "SD", "SR", "SZ", "SE", "CH", "SY", "TJ", "TZ", "TH", "TL", "TG", "TO", "TT", "TN", "TR", "TM", "TV", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VA", "VE", "VN", "YE", "ZM", "ZW"];

  const handleImageUpload = async () => {
    // ... handleImageUpload logic
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        setProfileImage(result.uri);
      }
  };

  const handleSave = () => {
    // ... handleSave logic
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../assets/light-texture2234-1.png")}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={handleImageUpload} style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text>Upload Picture</Text>
            </View>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="CNIC"
          keyboardType='numeric'
          value={cnic}
          onChangeText={setCnic}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.phonePickerContainer}>
          <TextInput
            style={[styles.countryCodeInput,styles.input]}
            placeholder="PK"
            value={countryCode}
            onChangeText={setCountryCode}
          />
          <View style={styles.pickerContainer}>
          <Picker
            selectedValue={countryCode}
            onValueChange={(itemValue) => {
              setCountryCode(itemValue);
              console.log("Selected Value: ", countryCode);
            }}
            style={styles.countryCodePicker}
          >
            {countryCodes.map((code) => (
              <Picker.Item key={code} label={code} value={code} />
            ))}
          </Picker>
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingTop: 100, // Adjust this value based on your header's height
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileImagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeInput:{
    top:4,
  },
  input: {
    borderBottomWidth: 1.5,
    borderColor: 'rgba(203, 203, 203, 1)',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  phonePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  countryPickerContainer: {
    flex: 1,
    borderBottomWidth: 1.5,
    borderColor: 'rgba(203, 203, 203, 1)',
    paddingRight: 10,
  },
  borderBreak: {
    width: 10, // Adjust as needed
    borderBottomWidth: 1.5,
    borderColor: 'rgba(203, 203, 203, 1)',
  },
  phoneInput: {
    flex: 3,
    borderBottomWidth: 1.5,
    borderColor: 'rgba(203, 203, 203, 1)',
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop:50,
  },
  button: {
    backgroundColor: 'rgba(3, 29, 68, 1)',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  pickerContainer: {
    width: 30, // Adjust this value according to your design
    marginLeft: 10, // Add spacing between TextInput and Picker
  },
});

export default EditProfile;
