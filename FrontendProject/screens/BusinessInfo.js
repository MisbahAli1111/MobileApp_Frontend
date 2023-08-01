import * as React from "react";
import { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text,TextInput, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";


const BusinessInfo = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setlocation] = useState('');
  const[city,setCity] = useState('');
  const[country,setCountry] = useState('');
  const[countryCode,setCountryCode] = useState('');
  const[phoneNumber,setPhonenumber] = useState('');

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [locationFocused, setlocationFocused] = useState(false);
  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);

  const handleSignUp = () => {
    if(name && email && location && city && country && countryCode && phoneNumber)
    {
      navigation.navigate('OwnerInfo');
    }
    else{
      Alert.alert('Fill All fields');
    }
  };

  const [countryShowDropdown, setCountryShowDropdown] = useState(false);
  const [cityShowDropdown, setCityShowDropdown] = useState(false);
  const [codeShowDropdown, setCodeShowDropdown] = useState(false);
  const countries = ['Pakistan' , 'India' ,'China' ,'USA' ,'England'];
    const countryCodes = ['PK', 'IN', 'CH', 'US', 'UK'];
    const cities = ['Karachi', 'Lahore', 'Islamabad', 'Mumbai', 'Dehli', 'Bejing','Faisalabad','Miami','Washington','London','New York','Bristol'];
  
    const toggleCountryDropdown = () => {
      setCountryShowDropdown(!countryShowDropdown);
    };

    const toggleCityDropdown = () => {
      setCityShowDropdown(!cityShowDropdown);
    };

    const toggleCodeDropdown = () => {
      setCodeShowDropdown(!codeShowDropdown);
    };
  
    const handleCountrySelect = (code) => {
      setCountry(code);
      setCountryShowDropdown(false);
    };

    const handleCodeSelect = (code) => {
      setCountryCode(code);
      setCodeShowDropdown(false);
    };

    const handleCitySelect = (code) => {
      setCity(code);
      setCityShowDropdown(false);
    };


  return (
    <View style={styles.businessInfo}>
      <Image
        style={[styles.lightTexture22341Icon, styles.groupChildPosition]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />
      <TextInput style={[styles.davidDaniel, styles.davidDanielTypo]}
      placeholder="Name"
        value={name}
        onFocus={() => setNameFocused(true)}
        onBlur={() => setNameFocused(false)}
        onChangeText={setName}
      />
      <TextInput style={[styles.daviddaniel33outlookcom, styles.davidDanielTypo]}
      placeholder="Email"
        value={email}
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
        onChangeText={setEmail}
        
      />
      <Image
        style={[styles.businessInfoChild, styles.businessChildLayout]}
        contentFit="cover"
        source={require("../assets/line-11.png")}
      />
      <Image
        style={[styles.businessInfoItem, styles.businessChildLayout]}
        contentFit="cover"
        source={require("../assets/line-21.png")}
      />
      <Image
        style={[styles.businessInfoInner, styles.businessChildLayout]}
        contentFit="cover"
        source={require("../assets/line-31.png")}
      />
      <TextInput style={styles.textInput}
        placeholder="Phone Number"
        value={phoneNumber}
        keyboardType='numeric'
        maxLength={11}
        onFocus={() => setPhoneNumberFocused(true)}
        onBlur={() => setPhoneNumberFocused(false)}
        onChangeText={setPhonenumber}
      />
      <TextInput style={[styles.pk, styles.pkPosition]}
      placeholder='PK'
        value={countryCode}
        editable={false}
      />
      <Pressable
      // style={styles.vectorIcon}
      onPress = {toggleCodeDropdown}>
      
      <Image
        style={styles.vectorIcon}
        contentFit="cover"
        source={require("../assets/vector-21.png")}
      />
      
      </Pressable>

      { (
        <View style={styles.codeClick} >
        <Picker
          selectedValue={countryCode}
          onValueChange={(itemValue) => handleCodeSelect(itemValue)}
        >
          <Picker.Item   label="Select Country Code" value="PK" />
          {countryCodes.map((code) => (
            <Picker.Item key={code} label={code} value={code} />
          ))}
        </Picker>
        </View>
      )}




      <Image
        style={[styles.businessInfoInner, styles.businessChildLayout]}
        contentFit="cover"
        source={require("../assets/line-31.png")}
      />
      <TextInput style={[styles.h218GulshanKarachi, styles.davidDanielTypo]}
      placeholder="location"
        value={location}
        onFocus={() => setlocationFocused(true)}
        onBlur={() => setlocationFocused(false)}
        onChangeText={setlocation}

      />
      <Image
        style={[styles.businessInfoChild2, styles.businessChildLayout]}
        contentFit="cover"
        source={require("../assets/line-4.png")}
      />

      
      <Image
        style={[styles.businessInfoChild3, styles.businessChildLayout]}
        contentFit="cover"
        source={require("../assets/line-71.png")}
      />
      
      <TextInput style={[styles.karachi, styles.karachiTypo]}
      placeholder="city"
      value={city}
      editable={false}
      />
      
      <Pressable
      
      >
      <Image
        style={[styles.businessInfoChild4, styles.businessChildPosition]}
        contentFit="cover"
        source={require("../assets/vector-6.png")}
      />
      </Pressable>
    
      { 
        <View  style={styles.CityClick}>
        <Picker
          selectedValue={city}
          onValueChange={(itemValue) => handleCitySelect(itemValue)}
        >
          <Picker.Item    label="Select City" value="Karachi" />
          {cities.map((code) => (
            <Picker.Item key={code} label={code} value={code} />
          ))}
        </Picker>
        </View>
      }



      
      <TextInput style={[styles.pakistan, styles.karachiTypo]}
       
        placeholder="country"
        
        value={country}
       editable={false}
      />
      <Pressable
       
      onPress={toggleCountryDropdown}>
      <Image
        style={[styles.businessInfoChild5, styles.businnessChildPosition]}
        contentFit="cover"
        source={require("../assets/vector-7.png")}
      />
      </Pressable>
      {(
        <View style={styles.CountryClick} >
        <Picker
          selectedValue={country}
          onValueChange={(itemValue) => handleCountrySelect(itemValue)}
        >
          <Picker.Item  label="Select Country " value="Pakistan" />
          {countries.map((code) => (
            <Picker.Item key={code} label={code} value={code} />
          ))}
        </Picker>
        </View>
      )}



      <Text style={[styles.businessInfo1, styles.nextTypo]}>Business Info</Text>
      <Text
        style={[styles.letsRegister, styles.letsPosition]}
      >{`Let’s Register `}</Text>
      <Text style={[styles.letsLevelUp, styles.letsPosition]}>
        Let’s level up your business, together.
      </Text>
      <View style={styles.rectangleView} />
      <Pressable
        style={[styles.groupParent, styles.groupLayout]}
        onPress= {handleSignUp}
      >
        <Image
          style={[styles.groupChild, styles.groupLayout]}
          contentFit="cover"
          source={require("../assets/group-166.png")}
        />
        <Text style={[styles.next, styles.nextTypo]}>Next</Text>
      </Pressable>
      <Image
        style={[styles.mapPin1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/mappin-1.png")}
      />
      <Image
        style={[styles.user1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/user-1.png")}
      />
      <Image
        style={[styles.atSign1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/atsign-1.png")}
      />
      <Image
        style={[styles.phone1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/phone-1.png")}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildPosition: {
    left: 0,
    top: 0,
  },
  davidDanielTypo: {
    height: 28,
    textAlign: "left",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: 56,
    position: "absolute",
  },
  businessChildLayout: {
    height: 2,
    width: 390,
    left: 20,
    position: "absolute",
  },
  pkPosition: {
    width: 30,
    height: 27,
    top: 586,
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: 56,
    position: "absolute",
  },
  karachiTypo: {
    top: 519,
    height: 27,
    textAlign: "left",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  cityTouch:{
    top: 500,
    height: 10,
    width: 16,
    position: "absolute",
  },
  businessChildPosition: {
    top: 445,
    height: 10,
    width: 16,
    position: "absolute",
  },
  businnessChildPosition: {
    top: 393,
    height: 10,
    width: 16,
    position: "absolute",
  },
  nextTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  letsPosition: {
    left: 20,
    textAlign: "left",
    color: Color.darkslateblue,
    position: "absolute",
  },
  groupLayout: {
    height: 45,
    width: 391,
    position: "absolute",
  },
  iconLayout: {
    height: 20,
    width: 20,
    left: 20,
    position: "absolute",
    overflow: "hidden",
  },
  lightTexture22341Icon: {
    width: 430,
    position: "absolute",
    height: 932,
    top: 0,
  },
  davidDaniel: {
    top: 329,
    width: 181,
  },
  daviddaniel33outlookcom: {
    top: 393,
    width: 231,
  },
  businessInfoChild: {
    top: 367,
  },
  businessInfoItem: {
    top: 432,
  },
  businessInfoInner: {
    top: 624,
  },
  text: {
    left: 109,
    width: 176,
    height: 27,
    top: 586,
    textAlign: "left",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  textInput:
  {
    top: 585,
    left: 110,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,

  },
  pk: {
    color: Color.textTxtPrimary,
  },
  PkPress: {
    top: 570,
    left: 87,
    height: 20,
    width: 16,
    position: "absolute",
  },
  vectorIcon: {
    top: 566,
    left: 83,
    height: 10,
    width: 16,
    position: "absolute",
    overflow:"hidden",
  },
  pk1: {
    color: Color.darkslateblue,
  },
  h218GulshanKarachi: {
    width: 282,
    top: 455,
  },
  businessInfoChild2: {
    top: 496,
  },
  businessInfoChild3: {
    top: 560,
  },
  karachi: {
    width: 100,
    left: 30,
    top: 519,
  },
  businessInfoChild4: {
    left: 131,
    position:'absolute',
  },
  pakistan: {
    left: 165,
    width: 120,
  },
  businessInfoChild5: {
    left: 290,
  },
  CountryClick: {
    right: -242,
    top: 372,
    width:80
  
  },
  CityClick: {
    right: 248,
    top: 425,
    
  },
  codeClick:{
    top: 545,
    right:297

  },
  businessInfo1: {
    top: 281,
    left: 135,
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    width: 160,
    color: Color.darkslateblue,
  },
  letsRegister: {
    top: 133,
    fontSize: FontSize.size_8xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
  },
  letsLevelUp: {
    top: 177,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: 20,
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
  groupChild: {
    left: 0,
    top: 0,
  },
  next: {
    top: 11,
    left: 174,
    color: Color.white,
    width: 41,
    textAlign: "left",
    fontWeight: "500",
    fontSize: FontSize.size_base,
  },
  groupParent: {
    top: 800,
    left: 10,
  },
  mapPin1Icon: {
    top: 455,
  },
  user1Icon: {
    top: 333,
  },
  atSign1Icon: {
    top: 397,
  },
  phone1Icon: {
    top: 591,
  },
  groupIcon: {
    top: 3,
    left: 30,
    width: 372,
    height: 44,
    position: "absolute",
  },
  businessInfo: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: 932,
  },
});

export default BusinessInfo;