import React, { useEffect, useState } from "react";
import {
  Linking,
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Config from "../screens/Config";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { useRoute } from "@react-navigation/native";


const EditProfile = () => {
  const route = useRoute();
  const { ownerid } = route.params;
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [cnic, setCnic] = useState("");
  const [cnicError, setCnicError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isImageModalVisible, setImageModalVisible] = useState("false");
  const [isFullImageModalVisible, setFullImageModalVisible] = useState(false);
  const [profileImageLink, setProfileImageLink] = useState(null);


  const [loading, setLoading] = useState(true);
  const countryCodes = [
    "AF",
    "AL",
    "DZ",
    "AD",
    "AO",
    "AG",
    "AR",
    "AM",
    "AU",
    "AT",
    "AZ",
    "BS",
    "BH",
    "BD",
    "BB",
    "BY",
    "BE",
    "BZ",
    "BJ",
    "BT",
    "BO",
    "BA",
    "BW",
    "BR",
    "BN",
    "BG",
    "BF",
    "BI",
    "KH",
    "CM",
    "CA",
    "CV",
    "CF",
    "TD",
    "CL",
    "CN",
    "CO",
    "KM",
    "CG",
    "CD",
    "CR",
    "HR",
    "CU",
    "CY",
    "CZ",
    "DK",
    "DJ",
    "DM",
    "DO",
    "EC",
    "EG",
    "SV",
    "GQ",
    "ER",
    "EE",
    "ET",
    "FJ",
    "FI",
    "FR",
    "GA",
    "GM",
    "GE",
    "DE",
    "GH",
    "GR",
    "GD",
    "GT",
    "GN",
    "GW",
    "GY",
    "HT",
    "HN",
    "HU",
    "IS",
    "IN",
    "ID",
    "IR",
    "IQ",
    "IE",
    "IL",
    "IT",
    "CI",
    "JM",
    "JP",
    "JO",
    "KZ",
    "KE",
    "KI",
    "KW",
    "KG",
    "LA",
    "LV",
    "LB",
    "LS",
    "LR",
    "LY",
    "LI",
    "LT",
    "LU",
    "MK",
    "MG",
    "MW",
    "MY",
    "MV",
    "ML",
    "MT",
    "MH",
    "MR",
    "MU",
    "MX",
    "FM",
    "MD",
    "MC",
    "MN",
    "ME",
    "MA",
    "MZ",
    "MM",
    "NA",
    "NR",
    "NP",
    "NL",
    "NZ",
    "NI",
    "NE",
    "NG",
    "KP",
    "NO",
    "OM",
    "PK",
    "PW",
    "PA",
    "PG",
    "PY",
    "PE",
    "PH",
    "PL",
    "PT",
    "QA",
    "RO",
    "RU",
    "RW",
    "KN",
    "LC",
    "VC",
    "WS",
    "SM",
    "ST",
    "SA",
    "SN",
    "RS",
    "SC",
    "SL",
    "SG",
    "SK",
    "SI",
    "SB",
    "SO",
    "ZA",
    "KR",
    "SS",
    "ES",
    "LK",
    "SD",
    "SR",
    "SZ",
    "SE",
    "CH",
    "SY",
    "TJ",
    "TZ",
    "TH",
    "TL",
    "TG",
    "TO",
    "TT",
    "TN",
    "TR",
    "TM",
    "TV",
    "UG",
    "UA",
    "AE",
    "GB",
    "US",
    "UY",
    "UZ",
    "VU",
    "VA",
    "VE",
    "VN",
    "YE",
    "ZM",
    "ZW",
  ];
  const handleImageUpload = () => {
    setImageModalVisible(true);
  };

  const handleShowProfile = () => {
    if (profileImageLink) {
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
      setProfileImageLink(result.assets[0].uri);
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
      setProfileImageLink(result.assets[0].uri);
    }

    setImageModalVisible(false);
  };

  const generateUniqueName = () => {
    const timestamp = new Date().getTime(); // Use a timestamp for uniqueness
    const randomString = Math.random().toString(36).substring(7); // Generate a random string
    return `image_${timestamp}_${randomString}`;
  };

  const getData = async (ownerid) => {
    if (ownerid) {
      const apiServerUrl = await AsyncStorage.getItem("apiServerUrl");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiServerUrl}/api/users/${ownerid}`, // Use backticks
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          setName(response.data.firstName);
          setCnic(response.data.cnicNumber);
          setPhoneNumber(response.data.phone_number);
          setEmail(response.data.email);
          setCountryCode(response.data.countryCode);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    

    if (route.params.ownerid) {
      getData(route.params.ownerid);
      getProfileImage(route.params.ownerid);
    }
  }, [ownerid]);

  const handleSave = async () => {
    const apiServerUrl = await AsyncStorage.getItem("apiServerUrl");
    if (ownerid) {
      let data = JSON.stringify({
        firstName: name,
        lastName: name,
        email: email,
        phone_number: phoneNumber,
        cnicNumber: cnic,
        countryCode: countryCode,
      });

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${apiServerUrl}/api/users/update-user/${ownerid}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          if (ownerid) {
            
            uploadImage(ownerid);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            navigation.navigate("Login");
          }
          console.log(error);
        });
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailRegex)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validateName = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.match(nameRegex)) {
      setNameError("Name cannot contain numbers or special characters");
    } else {
      setNameError("");
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
      setPhoneNumberError("Invalid phone number format");
    } else {
      setPhoneNumberError("");
    }
  };

  const uploadImage = async (ownerid) => {
    const apiServerUrl = await AsyncStorage.getItem("apiServerUrl");
    if (ownerid) {
      const imageData = new FormData();
      imageData.append("files", {
        uri: profileImageLink,
        name: new Date() + "_profile" + ".jpeg",
        type: "image/jpeg", // Adjust the MIME type as needed
      });
      

      const response = await axios.post(
        `${apiServerUrl}/api/file/upload/profile/${ownerid}`, // Change the endpoint as needed
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }
  };

  const getProfileImage = async (ownerid) => {
    try {
      const accessTokens = await AsyncStorage.getItem("accessToken");
      const token = "Bearer " + accessTokens;
      const apiServerUrl = await AsyncStorage.getItem("apiServerUrl");

      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiServerUrl}/api/users/${ownerid}/profile-image`,
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.request(config);

      if (response.status === 200) {
        const responseData = response.data;
        setProfileImageLink(`${apiServerUrl}` + responseData.url);
      } else if (error.response.status === 401) {
        
        navigation.navigate("Login");
      } else {
        console.log("Error: " + response.statusText);
      }
    } catch (error) {
      console.log("Error fetching profile image:", error);
    } finally {
      setLoading(false); // Set loading to false when the request completes
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
            {profileImageLink ? (
              <Image
                source={{ uri: profileImageLink }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholder}></View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleImageUpload}
            style={styles.uploadButton}
          >
            <Text style={styles.uploadButtonText}>Update Profile</Text>
          </TouchableOpacity>

          <View style={styles.contactIconsContainer}>
            <TouchableOpacity
              style={styles.contactIcon}
              onPress={() => {
                // Handle sending an email here
                if (email) {
                  Linking.openURL(`mailto:${email}`);
                }
              }}
            >
              <AntDesign name="mail" size={24} color="rgba(3, 29, 68, 1)" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactIcon}
              onPress={() => {
                // Handle making a phone call here
                if (phoneNumber) {
                  Linking.openURL(`tel:${phoneNumber}`);
                }
              }}
            >
              <AntDesign name="phone" size={24} color="rgba(3, 29, 68, 1)" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setNameError("");
            }}
            onBlur={validateName}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="CNIC"
            keyboardType="numeric"
            value={cnic}
            onChangeText={(text) => {
              setCnic(text);
              setCnicError("");
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
              setEmailError("");
            }}
            onBlur={validateEmail}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
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
                setPhoneNumberError("");
              }}
              onBlur={validatePhoneNumber}
              keyboardType="numeric"
              maxLength={15}
            />
          </View>
          {phoneNumberError ? (
            <Text style={styles.errorText}>{phoneNumberError}</Text>
          ) : null}

          <Modal
            animationType="slide"
            transparent={true}
            visible={isImageModalVisible}
            onRequestClose={() => setImageModalVisible(false)}
          >
            <View style={styles.imageModalContainer}>
              {/* Background Close Button */}
              <TouchableOpacity
                onPress={() => setImageModalVisible(false)}
                style={styles.closeButton}
              >
                <AntDesign
                  name="closecircle"
                  size={30}
                  color="rgba(3, 29, 68, 1)"
                />
              </TouchableOpacity>

              {/* Content */}
              <View style={styles.imageModalContent}>
                {/* Image Source Options */}
                <TouchableOpacity
                  style={styles.imageModalButton}
                  onPress={handleImageFromCamera}
                >
                  <Text style={styles.imageModalButtonText}>Take a Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.imageModalButton1}
                  onPress={handleImageFromGallery}
                >
                  <Text style={styles.imageModalButtonText}>
                    Choose from Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
              animationType="slide"
              transparent={true}
              visible={isFullImageModalVisible}
              onRequestClose={() => setFullImageModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.imageModalContainer1}>
                {console.log(profileImageLink)}
                  {profileImageLink ? (
                    
                      <Image
                        source={{ uri: profileImageLink }}
                        style={styles.fullImage}
                        resizeMode="contain"
                      />
                    )
                  : null}

                  <TouchableOpacity
                    style={
                     styles.imageCloseButton
                    }
                    onPress={() => setFullImageModalVisible(false)}
                  >
                    <AntDesign
                      name="closecircle"
                      size={heightPercentageToDP("4%")}
                      color="rgba(3, 29, 68, 1)"
                    />
                  </TouchableOpacity>
                </View>
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
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingTop: 100, // Adjust this value based on your header's height
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  countryCodeInput: {
    top: 4,
    fontWeight: "500",
    color:"black"
  },
  formContainer:{
    flex:1
  },
  pickerItem:{
    color:"black"
  },
  input: {
    borderBottomWidth: 1.5,
    borderColor: "rgba(203, 203, 203, 1)",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
  },
  phonePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  SelectedPickerItem: {
    fontWeight: "bold",
  },
  SelectedPickerItem1: {
    fontWeight: "100",
  },
  phoneInput: {
    flex: 3,
    borderBottomWidth: 1.5,
    borderColor: "rgba(203, 203, 203, 1)",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    // marginTop: 10,
  },
  button: {
    backgroundColor: "rgba(3, 29, 68, 1)",
    paddingVertical: 15,
    paddingHorizontal: 167,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: widthPercentageToDP("3.5%"),
  },
  pickerContainer: {
    width: 30,
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  imageModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  imageCloseButton: {
    position: "absolute",
    top: heightPercentageToDP("15%"), // Adjust the top percentage as needed
    right: widthPercentageToDP("0%"), // Adjust the right percentage as needed
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value (last number) for transparency
    justifyContent: "center",
    alignItems: "center",
  },
  imageModalContainer1: {
    position: "relative",
    width: widthPercentageToDP("80%"), // Adjust the width percentage as needed
    height: heightPercentageToDP("80%"), // Adjust the height percentage as needed
  },
  closeButton: {
    // position: 'absolute',
    top: heightPercentageToDP("4%"), // Adjust the percentage as needed
    left: widthPercentageToDP("35%"), // Adjust the percentage as needed
    zIndex: 999,
  },
  imageModalContent: {
    backgroundColor: "white",
    padding: widthPercentageToDP("4%"), // Adjust the percentage as needed
    borderRadius: widthPercentageToDP("2%"), // Adjust the percentage as needed
    width: widthPercentageToDP("80%"), // Adjust the percentage as needed
    alignItems: "center",
    height: heightPercentageToDP("30%"),
  },
  imageModalButton: {
    backgroundColor: "rgba(3, 29, 68, 1)",
    padding: heightPercentageToDP("1.5%"), // Adjust the percentage as needed
    borderRadius: widthPercentageToDP("1%"), // Adjust the percentage as needed
    marginVertical: heightPercentageToDP("0%"), // Adjust the percentage as needed
    width: "100%",
    alignItems: "center",
    marginTop: heightPercentageToDP("6%"),
  },
  imageModalButton1: {
    backgroundColor: "rgba(3, 29, 68, 1)",
    padding: heightPercentageToDP("1.5%"), // Adjust the percentage as needed
    borderRadius: widthPercentageToDP("1%"), // Adjust the percentage as needed
    marginVertical: heightPercentageToDP("0%"), // Adjust the percentage as needed
    width: "100%",
    alignItems: "center",
    marginTop: heightPercentageToDP("2%"),
  },
  imageModalButton2: {
    backgroundColor: "rgba(3, 29, 68, 1)",
    padding: heightPercentageToDP("1.5%"), // Adjust the percentage as needed
    borderRadius: widthPercentageToDP("2%"), // Adjust the percentage as needed
    marginVertical: heightPercentageToDP("1%"), // Adjust the percentage as needed
    width: "100%",
    alignItems: "center",
    marginTop: heightPercentageToDP("1%"),
  },
  imageModalButtonText: {
    color: "white",
    fontSize: widthPercentageToDP("4%"), // Adjust the percentage as needed
  },
  fullImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "100%",
    width: "100%", // Adjust this value as needed
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
  uploadButton: {
    backgroundColor: Color.darkslateblue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  uploadButtonText: {
    color: Color.white,
    fontSize: FontSize.size_base,
  },
  contactIconsContainer: {
    flexDirection: "row", // Arrange icons horizontally
    justifyContent: "center", // Center icons horizontally
    alignItems: "center",
    marginTop: heightPercentageToDP("2%"), // Center icons vertically
  },
  contactIcon: {
    marginRight: 10, // Add spacing between icons
  },
});

export default EditProfile;
