import * as React from "react";
import { useState } from "react";
import { Image } from "expo-image";
import { Picker } from "@react-native-picker/picker";
import {TouchableOpacity,Modal,Dimensions, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import * as ImagePicker from 'expo-image-picker';
const windowWidth = Dimensions.get('window');
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddCustomer = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [cnic, setcnic] = useState('');
  const [email, setemail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhonenumber] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [countryCode, setCountryCode] = useState('');
  const [ConfirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [NameEror, setNameError] = useState(false);
  const [CNICEror, setCNICError] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [EmailEror, setEmailError] = useState(false);
  const [LocationEror, setLocationError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [CPasswordError, setCPasswordError] = useState(false);
  const [NoError, setNoError] = useState(false);
  const [PLEror, setPLError] = useState('');
  const [NumberEror, setNumberError] = useState(false);
  const [ErrorM, setErrorM] = useState(false);
  const [LPasswordError, setLPasswordError] = useState(false);
  const [CError, setCError] = useState('');
  const [nameFocused, setNameFocused] = useState(false);
  const [cnicFocused, setcnicFocused] = useState(false);
  const [emailFocused, setemailFocused] = useState(false);
  const [PasswordFocused, setPasswordFocused] = useState(false);
  const [ConfirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
  const [countryCodeFocused, setCountryCodeFocused] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isImageModalVisible,setImageModalVisible]= useState('false');
  const [isFullImageModalVisible, setFullImageModalVisible] = useState(false);

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

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const countryCodes = ["AF", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BT", "BO", "BA", "BW", "BR", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "CF", "TD", "CL", "CN", "CO", "KM", "CG", "CD", "CR", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FJ", "FI", "FR", "GA", "GM", "GE", "DE", "GH", "GR", "GD", "GT", "GN", "GW", "GY", "HT", "HN", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IL", "IT", "CI", "JM", "JP", "JO", "KZ", "KE", "KI", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR", "MU", "MX", "FM", "MD", "MC", "MN", "ME", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NG", "KP", "NO", "OM", "PK", "PW", "PA", "PG", "PY", "PE", "PH", "PL", "PT", "QA", "RO", "RU", "RW", "KN", "LC", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "KR", "SS", "ES", "LK", "SD", "SR", "SZ", "SE", "CH", "SY", "TJ", "TZ", "TH", "TL", "TG", "TO", "TT", "TN", "TR", "TM", "TV", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VA", "VE", "VN", "YE", "ZM", "ZW"];

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
      setCNICError(true);
      hasErrors = true;
    } else {
      setCNICError(false);
    }

    if (!email || !isValidEmail(email)) {
      setEmailError(true);
      hasErrors = true;
    } else {
      setEmailError(false);
    }

    if (!selectedCode) {
      setPLError('Please select Country Code');
      setNumberError(true);
      hasErrors = true;
    } else {
      setPLError('');
      if (!phoneNumber) {
        setNumberError(true);
        setPLError('Please provide Contact Number');
        hasErrors = true;
      } else {
        setNumberError(false);
      }
    }

    if (!Password) {
      setPasswordError(true);
      hasErrors = true;
    } else {
      setPasswordError(false);
    }

    if (!ConfirmPassword) {
      setCPasswordError(true);
      setCError('Please provide Confirm password');
      hasErrors = true;
    } else {
      if (Password !== ConfirmPassword) {
        setCPasswordError(true);
        setLPasswordError(true);
        setCError('Password and Confirm Password do not match');
        hasErrors = true;
      } else {
        setLPasswordError(false);
        setCPasswordError(false);
      }
    }

    if (!hasErrors) {
      const Business_id = await AsyncStorage.getItem("Business_id");
      let token= await AsyncStorage.getItem("accessToken");
      const accessToken = 'Bearer ' + token;
      // console.log(accessToken);
      let data = JSON.stringify({
        "firstName": name,
        "lastName": name,
        "phoneNumber": phoneNumber,
        "cnicNumber": cnic,
        "countryCode":selectedCode,
        "email": email,
        "password": Password
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://192.168.100.71:8080/api/users/register/customer/${Business_id}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data.status === 'OK') {
            navigation.navigate('Home');
          }
        })
        .catch((error) => {
          setErrorM(true);
          setErrorMessage("Email Already Exist!");
        });
     }
  };

  return (
    <View style={styles.addEmployee}>
      <Image
        style={[styles.lightTexture22341Icon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />

<View style={styles.profileImageContainer}>
      <TouchableOpacity onPress={handleShowProfile}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            
            <View style={styles.profileImagePlaceholder}>
            </View>
            
          )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImageUpload}  style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload</Text>
              </TouchableOpacity>
        </View>

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


<View style={styles.wrap}>

<View style={styles.contwwrap}>
  <Image
    style={[styles.user1Icon, styles.iconLayout]}
    contentFit="cover"
    source={require("../assets/user-1.png")}
  />
  <TextInput style={[
   NameEror ? styles.davidDanielR :styles.davidDaniel
  , styles.registerTypo1]}
    placeholder="Name"
    value={name}
    onFocus={() => setNameFocused(true)}
    onBlur={() => setNameFocused(false)}
    onChangeText={setName}
  />
</View>
{NameEror ? <Text style={styles.nameError}>Please Enter a Valid Name</Text> : null}
<View style={styles.contwwrap}>

  <TextInput style={[
   CNICEror ? styles.davidDanielcR : styles.davidDanielc
  , styles.registerTypo1]}
    placeholder="CNIC Number"
    value={cnic}
    keyboardType="numeric"
    maxLength={13}
    onFocus={() => setcnicFocused(true)}
    onBlur={() => setcnicFocused(false)}
    onChangeText={setcnic}
  />
</View>
{CNICEror ? <Text style={styles.nameError}>Please Enter a Valid CNIC number</Text> : null}

 <View style={styles.contwwrap}>
  <Image
    style={[styles.phone1Icon, styles.iconLayout]}
    contentFit="cover"
    source={require("../assets/phone-1.png")}
  />
  <TextInput style={[
   NumberEror ? styles.pkR : styles.pk
  , styles.registerTypo1]}
    placeholder='PK'
    value={selectedCode}
    editable={false}
  />
  <Pressable
    style={styles.countryCode}
    onPress={toggleDropdown}
  >
    <Image
      style={[styles.vectorIcon, styles.vectorIconLayout]}
      contentFit="cover"
      source={require("../assets/vector-12.png")}
    />
  </Pressable>
  {(
    <View style={styles.code} >
      <Picker
        selectedValue={selectedCode}
        onValueChange={(itemValue) => handleCodeSelect(itemValue)}
      >
        <Picker.Item label="Select Country Code" value="" />
        {countryCodes.map((code) => (
          <Picker.Item key={code} label={code} value={code} />
        ))}
      </Picker>
    </View>
  )}
  <TextInput style={[
    NumberEror ? styles.davidDanielpR : styles.davidDanielp
    , styles.registerTypo1]}
    placeholder="Phone Number"
    value={phoneNumber}
    keyboardType="numeric"
    maxLength={11}
    onFocus={() => setPhoneNumberFocused(true)}
    onBlur={() => setPhoneNumberFocused(false)}
    onChangeText={setPhonenumber}
  />
</View> 
{NumberEror ? <Text style={styles.nameError}>{PLEror}</Text> : null}
<View style={styles.contwwrap}>
  <Image
    style={[styles.atSign1Icon, styles.iconLayout]}
    contentFit="cover"
    source={require("../assets/atsign-1.png")}
  />
  <TextInput style={[
   EmailEror ? styles.davidDanieleR : styles.davidDaniele
  , styles.registerTypo1]}
    placeholder="Email"
    value={email}
    onFocus={() => setemailFocused(true)}
    onBlur={() => setemailFocused(false)}
    onChangeText={setemail}

  />
</View>
{EmailEror ? <Text style={styles.nameError}>Please Provide Valid Email</Text> : null}
<View style={styles.contwwrap}>
  <Image
    style={[styles.key1Icon, styles.iconLayout]}
    contentFit="cover"
    source={require("../assets/key-1.png")}
  />
  <TextInput style={[
   PasswordError ?  styles.davidDanieleR : styles.davidDaniele
  , styles.registerTypo1]}
    placeholder="Passwod"
    secureTextEntry={passwordVisible}
    value={Password}
    onFocus={() => setPasswordFocused(true)}
    onBlur={() => setPasswordFocused(false)}
    onChangeText={setPassword}
  />
  <Pressable
    onPress={
      () => { setPasswordVisible((prev) => !prev); }
    }>
    <Image

      style={[styles.vectorIcon1, styles.vectorIconPosition]}
      contentFit="cover"
      source={require("../assets/vector9.png")}
    />
  </Pressable>
</View>
{PasswordError ? <Text style={styles.nameError}>Please provide Password</Text> : null}
<View style={styles.contwwrap}>
  <Image
    style={[styles.key1Icon, styles.iconLayout]}
    contentFit="cover"
    source={require("../assets/key-1.png")}
  />
  <TextInput style={[
   CPasswordError ? styles.davidDanieleR : styles.davidDaniele
  , styles.registerTypo1]}
    placeholder="Confirm Password"
    secureTextEntry={ConfirmPasswordVisible}
    value={ConfirmPassword}
    onFocus={() => setConfirmPasswordFocused(true)}
    onBlur={() => setConfirmPasswordFocused(false)}
    onChangeText={setConfirmPassword}
  />
  <Pressable
    onPress={
      () => { setConfirmPasswordVisible((prev) => !prev); }
    }
  >
    <Image
      style={[styles.vectorIcon2, styles.vectorIconPosition]}
      contentFit="cover"
      source={require("../assets/vector10.png")}
    />
  </Pressable>
</View>
{CPasswordError ? <Text style={styles.nameError}>{CError}</Text> : null}
{ErrorM ? <Text style={styles.nameError}>{errorMessage}</Text> : null} 

</View>



      {/* <TextInput style={[styles.name, styles.passwordTypo]}
        placeholder="Name"
        value={name}
        onFocus={() => setNameFocused(true)}
        onBlur={() => setNameFocused(false)}
        onChangeText={setName}
      />
      <Image
        style={[styles.addEmployeeItem,
        NameEror ? styles.addChildLayoutR : styles.addChildLayout
        ]}
        contentFit="cover"
        source={require("../assets/line-1.png")}
      />
      {NameEror ? <Text style={styles.nameError}>Please Enter a Valid Name</Text> : null}
      <TextInput style={[styles.cnicNumber, styles.passwordTypo]}
        placeholder="CNIC Number"
        keyboardType="numeric"
        maxLength={13}
        value={cnic}
        onFocus={() => setcnicFocused(true)}
        onBlur={() => setcnicFocused(false)}
        onChangeText={setcnic}
      />
      <Image
        style={[styles.addEmployeeInner,
        CNICEror ? styles.addChildLayoutR : styles.addChildLayout
        ]}
        contentFit="cover"
        source={require("../assets/line-2.png")}
      />
      {CNICEror ? <Text style={styles.nameError}>Please Enter a Valid Name</Text> : null}

      <TextInput style={styles.pk}
        placeholder='PK'
        maxLength={2}
        value={countryCode}
        onFocus={() => setCountryCodeFocused(true)}
        onBlur={() => setCountryCodeFocused(false)}
        onChangeText={setCountryCode}
      />
      <Image
        style={styles.addEmployeeChild}
        contentFit="cover"
        source={require("../assets/vector-1.png")}
      />
      <TextInput style={[styles.text, styles.textPosition]}
        placeholder="Phone Number"
        keyboardType="numeric"
        maxLength={11}
        value={phoneNumber}
        onFocus={() => setPhoneNumberFocused(true)}
        onBlur={() => setPhoneNumberFocused(false)}
        onChangeText={setPhonenumber}
      />
      <Image
        style={[styles.lineIcon,
        NumberEror ? styles.addChildLayoutR : styles.addChildLayout
        ]}
        contentFit="cover"
        source={require("../assets/line-8.png")}
      />
      {NumberEror ? <Text style={styles.nameError}>{PLEror}</Text> : null}

      <TextInput style={[styles.daviddaniel33outlookcom, styles.passwordTypo]}
        placeholder="Email"

        value={email}
        onFocus={() => setemailFocused(true)}
        onBlur={() => setemailFocused(false)}
        onChangeText={setemail}
      />
      <Image
        style={[styles.addEmployeeChild1,
        EmailEror ? styles.addChildLayoutR : styles.addChildLayout
        ]}
        contentFit="cover"
        source={require("../assets/line-9.png")}
      />
      {EmailEror ? <Text style={styles.nameError}>Please Provide a valid Email</Text> : null}

      <TextInput style={[styles.password, styles.passwordTypo]}
        placeholder="Password"
        secureTextEntry={passwordVisible}
        value={Password}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        onChangeText={setPassword}
      />
      <Pressable
        onPress={
          () => { setPasswordVisible((prev) => !prev); }
        }>
        <Image
          style={[styles.vectorIcon1, styles.vectorIconPosition]}
          contentFit="cover"
          source={require("../assets/vector6.png")}
        />
      </Pressable>
      <Image
        style={[styles.addEmployeeChild2,
        PasswordError ? styles.addChildLayoutR : styles.addChildLayout

        ]}
        contentFit="cover"
        source={require("../assets/line-7.png")}
      />
      {PasswordError ? <Text style={styles.nameError}>Please provide Password</Text> : null}
      <TextInput style={[styles.confirmPassword, styles.passwordTypo]}
        placeholder="Confirm Password"
        secureTextEntry={ConfirmPasswordVisible}
        value={ConfirmPassword}
        onFocus={() => setConfirmPasswordFocused(true)}
        onBlur={() => setConfirmPasswordFocused(false)}
        onChangeText={setConfirmPassword}
      />
      <Pressable
        onPress={
          () => { setConfirmPasswordVisible((prev) => !prev); }
        }
      >
        <Image
          style={[styles.vectorIcon2, styles.vectorIconPosition]}
          contentFit="cover"
          source={require("../assets/vector7.png")}
        />
      </Pressable>
      <Image
        style={[
          styles.addEmployeeChild3,
          CPasswordError ? styles.addChildLayoutR : styles.addChildLayout]}
        contentFit="cover"
        source={require("../assets/line-3.png")}
      />
      {CPasswordError ? <Text style={styles.nameError}>{CError}</Text> : null}
      {ErrorM ? <Text style={styles.nameError}>{errorMessage}</Text> : null} */}














      <View style={[styles.groupParent, styles.groupLayout]}>
        <Pressable
          onPress={handleSignUp}
        >
          <Image
            style={[styles.groupChild, styles.groupLayout]}
            contentFit="cover"
            source={require("../assets/group-166.png")}
          />
          <Text style={[styles.register, styles.registerTypo]}>Register</Text>
        </Pressable>
      </View>

      <Text style={[styles.employeeInfo, styles.registerTypo]}>
        Employee Info
      </Text>





    </View>
  );
};

const styles = StyleSheet.create({
  iconPosition: {
    width: 430,
    left: 0,
    position: "absolute",
  },
  passwordTypo: {
    textAlign: "left",
    fontSize: FontSize.size_base,
  },
  textPosition: {
    left: "22.98%",
    width: "40.93%",
    top: 0,
    marginTop: -16,
    height: "2.9%",
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    position: "relative",
  },
  phone1Icon: {
    top: 15,
  },
  atSign1Icon: {
    top: 10,
    marginLeft: 4,
  },
  nameError: {
    marginLeft: 30,
    color: 'red',
  },
  countryCode: {
    height: 20,
    width: 20,
  },
  addChildLayout: {
    marginTop: 6,
    left: "4.73%",
    right: "4.73%",
    width: "90.54%",
    height: "0.22%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "relative",
    overflow: "hidden",
  },
  registerTypo1: {
    textAlign: "left",
    fontSize: FontSize.size_base,
  },
  davidDanielp: {
    width: "30%",
    marginLeft: -60,
    alignContent: 'flex-start',
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    borderBottomWidth: 2,
    borderBottomColor: "#60b9d1",
    marginBottom: 10,
    width: '72%',
    fontSize: 15,
    padding: 6,
  },
  davidDanielpR: {
    width: "30%",
    marginLeft: -60,
    alignContent: 'flex-start',
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    borderBottomWidth: 2,
    borderBottomColor: "red",
    marginBottom: 10,
    width: '72%',
    fontSize: 15,
    padding: 6,
  },
  davidDaniele: {
    width: "30%",
    marginLeft: 4,
    alignContent: 'flex-start',
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    borderBottomWidth: 2,
    borderBottomColor: "#60b9d1",
    marginBottom: 10,
    width: '90%',
    fontSize: 15,
    padding: 6,
  },
  davidDanieleR: {
    width: "30%",
    marginLeft: 4,
    alignContent: 'flex-start',
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    borderBottomWidth: 2,
    borderBottomColor: "red",
    marginBottom: 10,
    width: '90%',
    fontSize: 15,
    padding: 6,
  },
  
  davidDanielc: {
    width: "30%",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    borderBottomWidth: 2,
    borderBottomColor: "#60b9d1",
    paddingLeft:15,
    marginBottom: 10,
    width: '97%',
    fontSize: 15,
    padding: 6,
  },
  davidDanielcR: {
    width: "30%",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    borderBottomWidth: 2,
    borderBottomColor: "red",
    paddingLeft:15,
    marginBottom: 10,
    width: '97%',
    fontSize: 15,
    padding: 6,
  },
  code:
  {
    width: 80,
    left: -50,
  },
  davidDaniel: {
    width: "30%",
    paddingLeft: 10,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    borderBottomWidth: 2,
    borderBottomColor: "#60b9d1",
    marginBottom: 10,
    width: '93%',
    fontSize: 15,
    padding: 6,
  },
  davidDanielR: {
    width: "30%",
    paddingLeft: 10,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    borderBottomWidth: 2,
    borderBottomColor: "red",
    marginBottom: 10,
    width: '93%',
    fontSize: 15,
    padding: 6,
  },
  key1Icon: {
    top: 6,
    marginLeft: 5,
  },
  addChildLayoutR: {
    marginTop: 6,
    left: "4.73%",
    right: "4.73%",
    width: "90.54%",
    height: "0.22%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "relative",
    overflow: "hidden",
    backgroundColor: 'red',
  },
  iconLayout: {
    height: 20,
    width: 20,

  },
  contwwrap: {
    flexDirection: 'row',
  },
  wrap: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'left',
    paddingTop: '0%', 
    paddingBottom: '10%', 
    paddingHorizontal: '8%',
  },
  groupLayout: {
    height: 45,
    width: 391,
    position: "absolute",
  },
  registerTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  vectorIconPosition: {
    left: 360,
    width: 20,
    // maxHeight: "100%",
    // maxWidth: "100%",
    position: "relative",
  },
  user1Icon: {
    top: 10,
  },
  lightTexture22341Icon: {
    top: 0,
    width: 430,
    height: 932,
  },
  daviddaniel33outlookcom: {
    width: "55.81%",
    top: 0,
    marginTop: 25,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    left: "7.55%",
    height: "3%",
    textAlign: "left",
    fontSize: FontSize.size_base,
    position: "relative",
  },
  name: {
    width: "13.02%",
    marginTop: 205,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    left: "7.45%",
    height: "3%",
    textAlign: "left",
    fontSize: FontSize.size_base,
    position: "relative",
  },
  password: {
    width: "20.47%",
    top: 0,
    marginTop: 25,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    left: "7.55%",
    height: "3%",
    textAlign: "left",
    fontSize: FontSize.size_base,
    position: "relative",
  },
  confirmPassword: {
    width: "39.07%",
    top: 0,
    marginTop: 25,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    left: "7.45%",
    height: "3%",
    textAlign: "left",
    fontSize: FontSize.size_base,
    position: "relative",
  },
  cnicNumber: {
    width: "29.07%",
    marginTop: 25,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    left: "7.65%",
    height: "3%",
    textAlign: "left",
    fontSize: FontSize.size_base,
    position: "relative",
  },
  text: {
    color: Color.dimgray_100,
  },
  pk: {
    color: Color.textTxtPrimary,
    left: 8,
    width: '8%',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#60b9d1",
  },
  pkR: {
    color: Color.textTxtPrimary,
    left: 8,
    width: '8%',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "red",
  },
  addEmployeeChild: {
    height: "0.98%",
    width: "3.58%",
    top: 0,
    marginTop: -20,
    right: "85.19%",
    bottom: "62.51%",
    left: "14.23%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "relative",
    overflow: "hidden",
  },
  addEmployeeItem: {
    top: 0,
    bottom: "73.66%",
  },
  addEmployeeInner: {
    top: 0,
    bottom: "53.53%",
  },
  lineIcon: {
    top: 0,
    bottom: "46.64%",
  },
  addEmployeeChild1: {
    top: 0,
    bottom: "39.75%",
  },
  addEmployeeChild2: {
    top: 0,
    bottom: "67.32%",
  },
  addEmployeeChild3: {
    top: 0,
    bottom: "60.43%",
  },
  text1: {
    color: Color.darkslateblue,
  },
  groupChild: {
    left: 0,
    width: 391,
    top: 0,
  },
  register: {
    top: 11,
    left: 157,
    color: Color.white,
    width: 76,
    textAlign: "left",
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  groupParent: {
    top: 800,
    left: 10,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  employeeInfo: {
    height: "3.54%",
    width: 200,
    top: "14.27%",
    left: 105,
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    justifyContent: 'center',
    color: Color.darkslateblue,
  },
  vectorIcon1: {
    height: 15,
    top: 0,
    marginTop: -25,
  },
  vectorIcon2: {
    height: 15,
    top: 0,
    marginTop: -25,
  },
  rectangleView: {
    top: 917,
    left: 138,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.textTxtPrimary,
    width: 154,
    height: 6,
    position: "absolute",
  },
  groupIcon: {
    top: 44,
    height: 80,
  },
  addEmployeeChild5: {
    top: 3,
    left: 29,
    width: 372,
    height: 43,
    position: "absolute",
  },
  addEmployee: {
    backgroundColor: Color.white,
    flex: 1,
    // width: "100%",
    overflow: "hidden",
    justifyContent: 'center',
    // height: 932,
    position: 'relative',
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    top:120,
    flex:1,
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
});

export default AddCustomer;