import React, { useEffect, useState } from 'react';
import { Modal,View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
const windowWidth = Dimensions.get('window').width;
import axios from 'axios';
const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [cnic, setCnic] = useState('');
  const [cnicError, setCnicError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isImageModalVisible,setImageModalVisible]= useState('false');
  const [isFullImageModalVisible, setFullImageModalVisible] = useState(false);
  const countryCodes = ["AF", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BT", "BO", "BA", "BW", "BR", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "CF", "TD", "CL", "CN", "CO", "KM", "CG", "CD", "CR", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FJ", "FI", "FR", "GA", "GM", "GE", "DE", "GH", "GR", "GD", "GT", "GN", "GW", "GY", "HT", "HN", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IL", "IT", "CI", "JM", "JP", "JO", "KZ", "KE", "KI", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR", "MU", "MX", "FM", "MD", "MC", "MN", "ME", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NG", "KP", "NO", "OM", "PK", "PW", "PA", "PG", "PY", "PE", "PH", "PL", "PT", "QA", "RO", "RU", "RW", "KN", "LC", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "KR", "SS", "ES", "LK", "SD", "SR", "SZ", "SE", "CH", "SY", "TJ", "TZ", "TH", "TL", "TG", "TO", "TT", "TN", "TR", "TM", "TV", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VA", "VE", "VN", "YE", "ZM", "ZW"];

  const handleImageUpload = () => {
    setImageModalVisible(true);
  };
  
  const handleShowProfile = () =>{
    if (profileImage) {
      setFullImageModalVisible(true);
    }
  }; 

  const handleImageFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
    

    setImageModalVisible(false);
  };

  const handleImageFromGallery = async () => {
    // ... (handleImageUpload logic remains the same)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
    
    setImageModalVisible(false);
  };

  const generateUniqueName = () => {
    const timestamp = new Date().getTime(); // Use a timestamp for uniqueness
    const randomString = Math.random().toString(36).substring(7); // Generate a random string
    return `image_${timestamp}_${randomString}`;
  };
  const saveImageToDirectory = async (imageUri) => {
    try {
      const uniqueName = generateUniqueName(); // Generate a unique name for the image
      const destinationUri = `${FileSystem.documentDirectory}${uniqueName}.jpeg`;
  
      // Copy the image to the specified destination
      await FileSystem.copyAsync({
        from: imageUri,
        to: destinationUri,
      });
  
      console.log('Image saved to:', destinationUri);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };
  


  // console.log(profileImage);

  getData = async () => {
    const userId = await AsyncStorage.getItem("userId");

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://192.168.100.71:8080/api/users/${userId}`, // Use backticks
      headers: {}
    };
  
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setName(response.data.firstName);
        setCnic(response.data.cnicNumber);
        setPhoneNumber(response.data.phone_number);
        setEmail(response.data.email);
        setCountryCode(response.data.countryCode);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  useEffect(() => {
    getData();
   }, []);
  

  const handleSave = async () => {

    // if(profileImage){
    //   saveImageToDirectory(profileImage);
    // }
    const userId = await AsyncStorage.getItem("userId");

    let data = JSON.stringify({
      "firstName": name,
      "lastName": name,
      "email": email,
      "phone_number": phoneNumber,
      "cnicNumber": cnic,
      "countryCode":countryCode
    });
    
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://192.168.100.71:8080/api/users/update-user/${userId}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });



  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailRegex)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validateName = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.match(nameRegex)) {
      setNameError('Name cannot contain numbers or special characters');
    } else {
      setNameError('');
    }
  };
  // const validateCNIC = () => {
  //   const cnicRegex = /^[0-9]{13}$/;
  //   if (!cnic.match(cnicRegex)) {
  //     setCnicError('Invalid CNIC format');
  //   } else {
  //     setCnicError('');
  //   }
  // };

  const validatePhoneNumber = () => {
    const phoneNumberRegex = /^[0-9]{10,15}$/;
    if (!phoneNumber.match(phoneNumberRegex)) {
      setPhoneNumberError('Invalid phone number format');
    } else {
      setPhoneNumberError('');
    }
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("../assets/light-texture2234-1.png")}
    >
      <View style={styles.container}>
      <View style={styles.profileImageContainer}>
      <TouchableOpacity onPress={handleShowProfile}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            
            <View style={styles.profileImagePlaceholder}>
            </View>
            
          )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImageUpload}>
                <Text style={styles.uploadText}>Change Profile Picture</Text>
              </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setNameError('');
          }}
          onBlur={validateName}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="CNIC"
          keyboardType='numeric'
          value={cnic}
          onChangeText={(text) => {
            setCnic(text);
            setCnicError('');
          }}
          // onBlur={validateCNIC}
          maxLength={13}
        />
        {cnicError ? <Text style={styles.errorText}>{cnicError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          onBlur={validateEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <View style={styles.phonePickerContainer}>
          <TextInput
            style={[styles.countryCodeInput, styles.input]}
            placeholder="PK"
            value={countryCode}
            editable={false}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={countryCode}
              onValueChange={(itemValue) => {
                setCountryCode(itemValue);
              }}
              itemStyle={styles.pickerItem}
            >
              {countryCodes.map((code) => (
                <Picker.Item
                  key={code}
                  label={code}
                  value={code}
                  style={
                    countryCode === code
                      ? styles.SelectedPickerItem
                      : styles.SelectedPickerItem1
                  }
                />
              ))}
            </Picker>
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              setPhoneNumberError('');
            }}
            onBlur={validatePhoneNumber}
            keyboardType="numeric"
            maxLength={15}
          />
        </View>
        {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}

        <Modal
          animationType="slide"
          transparent={true}
          visible={isImageModalVisible}
          onRequestClose={() => setImageModalVisible(false)}
        >
          <View style={styles.imageModalContainer}>
            <TouchableOpacity style={styles.imageModalButton} onPress={handleImageFromCamera}>
              <Text style={styles.imageModalButtonText}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageModalButton} onPress={handleImageFromGallery}>
              <Text style={styles.imageModalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imageModalButton}
              onPress={() => setImageModalVisible(false)}
            >
              <Text style={styles.imageModalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isFullImageModalVisible}
          onRequestClose={() => setFullImageModalVisible(false)}
        >
          <View style={styles.imageModalContainer}>
          <View style={styles.fullImageContainer}>
            {profileImage && (
              <Image
                source={{ uri: profileImage }}
                style={styles.fullImage}
                resizeMode="contain"
              />
            )}
            </View>
            <TouchableOpacity
              style={styles.imageModalButton}
              onPress={() => setFullImageModalVisible(false)}
            >
              <Text style={styles.imageModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>


        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
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
  countryCodeInput: {
    top: 4,
    fontWeight: '500',
  },
  input: {
    borderBottomWidth: 1.5,
    borderColor: 'rgba(203, 203, 203, 1)',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  phonePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  SelectedPickerItem: {
    fontWeight: 'bold',
  },
  SelectedPickerItem1: {
    fontWeight: '100',
  },
  phoneInput: {
    flex: 3,
    borderBottomWidth: 1.5,
    borderColor: 'rgba(203, 203, 203, 1)',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 200,
  },
  button: {
    backgroundColor: 'rgba(3, 29, 68, 1)',
    paddingVertical: 15,
    paddingHorizontal: 150,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  pickerContainer: {
    width: 30,
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  imageModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', //rgba(255, 255, 255, 0.5)
  },
  imageModalButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: 250,
    alignItems: 'center',
  },
  imageModalButtonText: {
    color: 'rgba(3, 29, 68, 1)',
    fontSize: 16,
  },
  uploadText: {
    marginTop:10,
    color: 'rgba(3, 29, 68, 1)',
    fontSize: 16,
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    flex: 1,
    width: windowWidth * 0.9,
    alignSelf: 'center',
    marginTop: 20,
  },
  uploadTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '100%', 
    width: '100%',// Adjust this value as needed
  },
});

export default EditProfile;
