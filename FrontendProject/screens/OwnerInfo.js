import * as React from "react";
import { useState } from "react";
import { Image } from "expo-image";
import { Picker } from "@react-native-picker/picker";
import {
  TouchableOpacity,
  Modal,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import * as ImagePicker from "expo-image-picker";
const windowWidth = Dimensions.get("window");
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

const OwnerInfo = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [cnic, setcnic] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [countryCode, setCountryCode] = useState("");
  const [ConfirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [NameEror, setNameError] = useState(false);
  const [cnicErorr, setCnicError] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userId, setUserId] = useState(null);
  const [EmailErorr, setEmailError] = useState(false);
  const [LocationEror, setLocationError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [CPasswordError, setCPasswordError] = useState(false);
  const [NoError, setNoError] = useState(false);
  const [PLEror, setPLError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [NumberEror, setNumberError] = useState(false);
  const [ErrorM, setErrorM] = useState(false);
  const [LPasswordError, setLPasswordError] = useState(false);
  const [CError, setCError] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isImageModalVisible, setImageModalVisible] = useState("false");
  const [isFullImageModalVisible, setFullImageModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidError, setPasswordValidError] = useState(false); // Track password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleImageUpload = () => {
    setImageModalVisible(true);
  };

  const handleShowProfile = () => {
    if (profileImage) {
      setFullImageModalVisible(true);
    }
  };

  const clearError = () => {
    setTimeout(() => {
      setPLError(false);
      setCError(false);
      setCPasswordError(false);
      setCnicError(false);
      setEmailError(false);
      setLPasswordError(false);
      setNameError(false);
      setNumberError(false);
      setPasswordError(false);
      setErrorM(false);
      setErrorMessage("");
      setPasswordValidError(false);
    }, 10000); // 2000 milliseconds (2 seconds)
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

  const uploadImage = async (userId) => {
    console.log(userId);
    if (profileImage) {
      const imageData = new FormData();
      imageData.append("files", {
        uri: profileImage,
        name: new Date() + "_profile" + ".jpeg",
        type: "image/jpeg", // Adjust the MIME type as needed
      });

      console.log("formData: ", imageData);

      const response = await axios.post(
        `http://192.168.0.236:8080/api/file/upload/profile/${userId}`, // Change the endpoint as needed
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const isPasswordValid = (password) => {
    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      return false;
    }
  
    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }
  
    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // Check if the password contains at least one digit
    if (!/\d/.test(password)) {
      return false;
    }
  
    // Check if the password contains at least one special character from @$!%?&
    if (!/[@$!%?&]/.test(password)) {
      return false;
    }
  
    // All criteria are met
    return true;
  };
  
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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleCodeSelect = (code) => {
    setSelectedCode(code);
    setShowDropdown(false);
  };

  const handleSignUp = async () => {
    let hasErrors = false;
    setErrorM(false);
    if (!name) {
      setNameError(true);
      hasErrors = true;
    } else {
      setNameError(false);
    }

    if (!cnic) {
      setCnicError(true);
      hasErrors = true;
    } else {
      setCnicError(false);
    }

    if (!email || !isValidEmail(email)) {
      setEmailError(true);
      hasErrors = true;
    } else {
      setEmailError(false);
    }

    if (!countryCode) {
      setPLError("Please select Country Code");
      setNumberError(true);
      hasErrors = true;
    } else {
      setPLError("");
    }
    if (!phoneNumber) {
      setNumberError(true);
      setPhoneError("Please provide Contact Number");
      hasErrors = true;
    } else {
      setNumberError(false);
    }

    if (!Password ) {
      setPasswordError(true);
      hasErrors = true;
    } else if (!isPasswordValid(Password)) {
        setPasswordValidError(true);
        hasErrors=true;
      }
      else{
      setPasswordError(false);
      setPasswordValidError(false);
    }

    if (!ConfirmPassword) {
      setCPasswordError(true);
      setCError("Please provide Confirm password");
      hasErrors = true;
    } else {
      if (Password !== ConfirmPassword) {
        setCPasswordError(true);
        setLPasswordError(true);
        setCError("Password and Confirm Password do not match");
        hasErrors = true;
      } else {
        setLPasswordError(false);
        setCPasswordError(false);
      }
    }

    if (!hasErrors) {
      const Business_id = await AsyncStorage.getItem("Business_id");
      let token = await AsyncStorage.getItem("accessToken");
      const accessToken = "Bearer " + token;
      let data = JSON.stringify({
        firstName: name,
        lastName: name,
        phoneNumber: phoneNumber,
        cnicNumber: cnic,
        countryCode: countryCode,
        email: email,
        password: Password,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://192.168.0.236:8080/api/users/register/owner",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data.status === "OK") {
            const createdUserId = response.data.data;
            console.log(response.data.data);
            setUserId(createdUserId);

            // Perform logic using the updated userId here
            if (createdUserId) {
              uploadImage(createdUserId);
            }

            setName("");
            setCountryCode("");
            setEmail("");
            setConfirmPassword("");
            setPassword("");
            setPhonenumber("");
            setProfileImage("");
            setcnic("");
            clearError();

            navigation.navigate("Login");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setErrorM(true);
            setErrorMessage("Email Already Exists!"); // Update the error message here
          } else {
            console.error("An error occurred:", error);
            setErrorM(true);
            setErrorMessage("An error occurred. Please try again."); // Default error message
          }
        });
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      resizeMode="cover"
      source={require("../assets/light-texture2234-1.png")}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={handleShowProfile}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
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
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <AntDesign name="user" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            {NameEror && (
              <Text style={styles.errorText}>Name is required.</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="idcard" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="CNIC Number"
              value={cnic}
              onChangeText={setcnic}
              keyboardType="numeric"
              maxLength={15}
            />
            {cnicErorr && (
              <Text style={styles.errorText}>Enter CNIC / Invalid CNIC.</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="mail" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            {EmailErorr && (
              <Text style={styles.errorText}>Invalid email format.</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="key" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={Password}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
            />
            {PasswordError && (
              <Text style={styles.errorText}>Password is required.</Text>
            )}
            {LPasswordError && (
              <Text style={styles.errorText}>
                Password and Confirm Password do not match.
              </Text>
            )}
            {passwordValidError && (
              <Text style={styles.errorText}>Enter Correct Password</Text>
            )}
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <AntDesign name="eyeo" style={styles.passwordIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="key" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={ConfirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            {CPasswordError && (
              <Text style={styles.errorText}>
                Confirm Password is required.
              </Text>
            )}
            {LPasswordError && (
              <Text style={styles.errorText}>
                Password and Confirm Password do not match.
              </Text>
            )}
            {passwordValidError && (
              <Text style={styles.errorText}>Enter Correct Password</Text>
            )}
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
              <AntDesign name="eyeo" style={styles.passwordIcon} />
            </TouchableOpacity>
          </View>

          {/* Country Code and Phone Number */}
          <View style={styles.phoneContainer}>
            <View
              style={[
                styles.countryCodeContainer,
                { flex: 0.3, marginRight: widthPercentageToDP("2%") },
              ]}
            >
              <AntDesign name="phone" style={styles.icon} />
              <Picker
                selectedValue={countryCode}
                onValueChange={(itemValue) => setCountryCode(itemValue)}
                style={styles.countryCodePicker}
              >
                <Picker.Item label=" " value="PK" />
                {countryCodes.map((countryCode) => (
                  <Picker.Item
                    key={countryCode}
                    label={countryCode}
                    value={countryCode}
                  />
                ))}
              </Picker>
            </View>

            <TextInput
              style={[styles.phoneNumberInput, { flex: 0.7 }]}
              placeholder="Phone Number"
              value={phoneNumber}
              keyboardType="numeric"
              maxLength={15}
              onChangeText={setPhonenumber}
            />
          </View>
          {PLEror && <Text style={styles.errorText}>{PLEror}</Text>}
          {NumberEror && <Text style={styles.errorText}>{phoneError}</Text>}
        </View>
        <View style={styles.emailExists}>
          {ErrorM && (
            <Text style={styles.errorText}>Email Already Exists!</Text>
          )}
        </View>
        <View style={styles.registerButtonContainer}>
          <TouchableOpacity
            onPress={handleSignUp}
            style={styles.registerButton}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        {clearError()}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFullImageModalVisible}
        onRequestClose={() => setFullImageModalVisible(false)}
      >
        <View style={styles.imageModalContainer}>
          <View style={styles.fullImageContainer}>
            {profileImage && (
              <Image source={{ uri: profileImage }} style={styles.fullImage} />
            )}
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setFullImageModalVisible(false)}
          >
            <AntDesign name="close" size={30} color="rgba(3, 29, 68, 1)" />
          </TouchableOpacity>
        </View>
      </Modal>

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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  businessInfoText: {
    fontSize: widthPercentageToDP("6%"),
    fontWeight: "bold",
    marginTop: heightPercentageToDP("10%"),
  },
  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightPercentageToDP("15%"),
  },
  profileImage: {
    width: widthPercentageToDP("30%"),
    height: widthPercentageToDP("30%"),
    borderRadius: widthPercentageToDP("15%"),
  },
  profileImagePlaceholder: {
    width: widthPercentageToDP("30%"),
    height: widthPercentageToDP("30%"),
    borderRadius: widthPercentageToDP("15%"),
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  uploadButton: {
    backgroundColor: "rgba(3, 29, 68, 1)",
    paddingVertical: heightPercentageToDP("1.5%"),
    paddingHorizontal: widthPercentageToDP("5%"),
    borderRadius: widthPercentageToDP("2%"),
    marginTop: heightPercentageToDP("1%"),
  },
  uploadButtonText: {
    color: "white",
    fontSize: widthPercentageToDP("4%"),
  },
  formContainer: {
    width: widthPercentageToDP("90%"),
    marginTop: heightPercentageToDP("5%"),
    marginBottom: heightPercentageToDP("10%"),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: heightPercentageToDP("1%"),
    marginBottom: heightPercentageToDP("2%"),
  },
  icon: {
    fontSize: widthPercentageToDP("4%"),
    marginRight: widthPercentageToDP("1%"),
  },
  input: {
    flex: 1,
    fontSize: widthPercentageToDP("4%"),
    fontFamily: FontFamily.poppinsMedium,
  },
  pickerRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: heightPercentageToDP("2%"),
  },
  pickerContainer: {
    flex: 1,
    marginRight: widthPercentageToDP("2%"),
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  picker: {
    height: heightPercentageToDP("5%"),
    width: "100%",
  },
  pickerInput: {
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: heightPercentageToDP("1.5%"),
    marginBottom: heightPercentageToDP("2%"),
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: widthPercentageToDP("3%"),
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: heightPercentageToDP("1.5%"),
  },
  countryCodePicker: {
    height: heightPercentageToDP("5%"),
    width: "100%",
  },
  phoneNumberInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "gray",
    height: heightPercentageToDP("4.75%"),
    fontSize: widthPercentageToDP("4%"),
    fontFamily: FontFamily.poppinsMedium,
    marginLeft: widthPercentageToDP("3%"),
  },
  registerButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // marginTop: heightPercentageToDP('0%'),
    marginBottom: widthPercentageToDP("3%"),
  },
  registerButton: {
    backgroundColor: "rgba(3, 29, 68, 1)",
    paddingVertical: heightPercentageToDP("2%"),
    alignItems: "center",
    width: widthPercentageToDP("93%"),
    borderRadius: widthPercentageToDP("2%"),
    marginBottom: widthPercentageToDP("3%"),
    alignSelf: "flex-start", // Align the button to the start (top) of the container
    marginTop: -heightPercentageToDP("0%"),
  },
  registerButtonText: {
    color: "white",
    fontSize: widthPercentageToDP("4%"),
  },
  imageModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    position: "absolute",
    top: heightPercentageToDP("2%"),
    right: widthPercentageToDP("2%"),
    zIndex: 999,
    paddingHorizontal: widthPercentageToDP("2%"),
    paddingVertical: heightPercentageToDP("1%"),
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
  passwordIcon: {
    fontSize: widthPercentageToDP("5%"),
    marginLeft: widthPercentageToDP("1%"), // Adjust the spacing as needed
  },
  errorText: {
    color: "red", // Adjust the font size as needed, using a percentage value
    marginTop: "1%", // Add spacing between the input and the error message, using a percentage value
  },
  emailExists: {
    marginTop: -heightPercentageToDP("10%"),
  },
});

export default OwnerInfo;
