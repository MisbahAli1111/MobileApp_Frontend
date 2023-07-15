import * as React from "react";
import { useState } from 'react';
import { Image } from "expo-image";

import { StyleSheet, Text,TextInput, View, Pressable,TouchableOpacity, Alert, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import { TouchableHighlight } from "react-native-gesture-handler";


const OwnerInfo = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [cnic, setcnic] = useState('');
  const [email, setemail] = useState('');
  const[Password,setPassword] = useState('');
  const[ConfirmPassword,setConfirmPassword] = useState('');
  const[countryCode,setCountryCode] = useState('');
  const[phoneNumber,setPhonenumber] = useState('');
  const[passwordVisible,setPasswordVisible] = useState(true);
  const[ConfirmPasswordVisible,setConfirmPasswordVisible] = useState(true);

  const [nameFocused, setNameFocused] = useState(false);
  const [cnicFocused, setcnicFocused] = useState(false);
  const [emailFocused, setemailFocused] = useState(false);
  const [PasswordFocused, setPasswordFocused] = useState(false);
  const [ConfirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
  const [countryCodeFocused,setCountryCodeFocused] = useState(false);

  const handleSignUp = () => {
    if(name && cnic && email && Password && ConfirmPassword && phoneNumber && countryCode && Password === ConfirmPassword)
    {
      navigation.navigate('AddEmployee');
    }
    else if(Password !== ConfirmPassword)
    {
      Alert.alert('Password and Confirm Password Should be Same.')
    }
    else{
      Alert.alert('Fill all Fields')
    }
  };

  return (
    <View style={styles.ownerInfo}>
      <Image
        style={[styles.lightTexture22341Icon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />
      <TextInput style={[styles.davidDaniel, styles.registerTypo1]}
      placeholder="Name"
        value={name}
        onFocus={() => setNameFocused(true)}
        onBlur={() => setNameFocused(false)}
        onChangeText={setName}
      />
      <TextInput style={[styles.daviddaniel33outlookcom, styles.david1Typo]}
      placeholder="Email"
        value={email}
        onFocus={() => setemailFocused(true)}
        onBlur={() => setemailFocused(false)}
        onChangeText={setemail}

      />
        
      
      <TextInput style={[styles.david, styles.textTypo]}
      placeholder="Password"
        secureTextEntry={passwordVisible}
        value={Password}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        onChangeText={setPassword}
        
      />
      <TextInput style={[styles.david1, styles.david1Typo]}
      placeholder="Confirm Password"
        secureTextEntry={ConfirmPasswordVisible}
        value={ConfirmPassword}
        onFocus={() => setConfirmPasswordFocused(true)}
        onBlur={() => setConfirmPasswordFocused(false)}
        onChangeText={setConfirmPassword}
      />
      <TextInput style={[styles.text, styles.textTypo]}
        placeholder="CNIC Number"
        value={cnic}
        keyboardType="numeric"
        maxLength={13}
        onFocus={() => setcnicFocused(true)}
        onBlur={() => setcnicFocused(false)}
        onChangeText={setcnic}
      />
      <Image
        style={[styles.ownerInfoChild, styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-12.png")}
      />
      <Image
        style={[styles.ownerInfoItem, styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-22.png")}
      />
      <Image
        style={[styles.ownerInfoInner, styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-81.png")}
      />
      <Image
        style={[styles.lineIcon, styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-91.png")}
      />
      <Image
        style={[styles.ownerInfoChild1, styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-72.png")}
      />
      <Image
        style={[styles.ownerInfoChild2, styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-32.png")}
      />
      <TextInput style={[styles.pk, styles.pkPosition]}
      placeholder='PK'
        value={countryCode}
        maxLength={2}
        onFocus={() => setCountryCodeFocused(true)}
        onBlur={() => setCountryCodeFocused(false)}
        onChangeText={setCountryCode}
      />
      <Image
        style={[styles.vectorIcon, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/vector-12.png")}
      />
      <TextInput style={[styles.text2, styles.textPosition]}
      placeholder="Phone Number"
        value={phoneNumber}
        keyboardType="numeric"
        maxLength={11}
        onFocus={() => setPhoneNumberFocused(true)}
        onBlur={() => setPhoneNumberFocused(false)}
        onChangeText={setPhonenumber}
      />
      <Image
        style={[styles.ownerInfoChild3, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/vector-22.png")}
      />
      <Image
        style={[styles.ownerInfoChild2, styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-32.png")}
      />
      <Text style={[styles.ownerInfo1, styles.registerTypo]}>Owner Info</Text>
      <Text
        style={[styles.letsRegister, styles.letsPosition]}
      >{`Let’s Register `}</Text>
      <Text style={[styles.letsLevelUp, styles.letsPosition]}>
        Let’s level up your business, together.
      </Text>

     {/* show Password */}
      <Pressable
       onPress={
        ()=> {setPasswordVisible((prev) => !prev);}
        }>
      <Image
        
        style={[styles.vectorIcon1, styles.vectorIconPosition]}
        contentFit="cover"
        source={require("../assets/vector9.png")}
      />
      </Pressable>
      <Pressable
      onPress={
        ()=> {setConfirmPasswordVisible((prev) => !prev);}
        }
      >
      <Image
        style={[styles.vectorIcon2, styles.vectorIconPosition]}
        contentFit="cover"
        source={require("../assets/vector10.png")}
      />
      </Pressable>
      
      
      <View style={styles.rectangleView} />
      <Pressable
      
    onPress={() => navigation.navigate('BusinessInfo')}
      >
      <Image
        style={[styles.groupIcon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/group-261.png")}
      />
      </Pressable>
      <Pressable
        style={[styles.groupParent, styles.groupLayout]}
        onPress= {handleSignUp}
        
        
      >
        <Image
          style={[styles.groupChild, styles.groupLayout]}
          contentFit="cover"
          source={require("../assets/group-166.png")}
        />
        <Text style={[styles.register, styles.registerTypo]}>Register</Text>
      </Pressable>
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
      <Image
        style={[styles.key1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/key-1.png")}
      />
      
      <Image
        style={[styles.user1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/user-1.png")}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  iconPosition: {
    width: 430,
    left: 0,
    position: "absolute",
  },
  registerTypo1: {
    textAlign: "left",
    fontSize: FontSize.size_base,
  },
  david1Typo: {
    height: "3%",
    textAlign: "left",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: "12.79%",
    position: "absolute",
  },
  textTypo: {
    height: "2.9%",
    textAlign: "left",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: "12.79%",
    position: "absolute",
  },
  ownerChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    right: "4.65%",
    width: "90.7%",
    height: "0.22%",
    left: "4.65%",
    position: "absolute",
    overflow: "hidden",
  },
  textPosition: {
    left: "25.12%",
    top: "48.82%",
    width: "41.16%",
    height: "3%",
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  pkPosition: {
    width: 33,
    top: "48.82%",
    height: "3%",
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: "12.79%",
    position: "absolute",
  },
  vectorIconLayout: {
    bottom: "49.21%",
    top: "49.81%",
    width: "3.81%",
    height: "0.98%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  registerTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  letsPosition: {
    left: "4.65%",
    textAlign: "left",
    color: Color.darkslateblue,
    position: "absolute",
  },
  vectorIconPosition: {
    left: 360,
    width: 20,
    // maxHeight: "100%",
    // maxWidth: "100%",
    position: "absolute",
    // overflow: "hidden",
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
    top: 0,
    width: 430,
    height: 932,
  },
  davidDaniel: {
    width: "30%",
    top: "35.3%",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    left: "12.79%",
    textAlign: "left",
    position: "absolute",
  },
  daviddaniel33outlookcom: {
    width: "55.81%",
    top: "55.69%",
  },
  david: {
    width: "20.7%",
    top: "62.88%",
  },
  david1: {
    width: "38.84%",
    top: "69.53%",
  },
  text: {
    width: "63.95%",
    top: "42.17%",
  },
  ownerInfoChild: {
    top: "39.48%",
    bottom: "60.3%",
  },
  ownerInfoItem: {
    top: "59.64%",
    bottom: "40.14%",
  },
  ownerInfoInner: {
    top: "66.55%",
    bottom: "33.23%",
  },
  lineIcon: {
    top: "73.46%",
    bottom: "26.33%",
  },
  ownerInfoChild1: {
    top: "45.83%",
    bottom: "53.95%",
  },
  ownerInfoChild2: {
    top: "52.74%",
    bottom: "47.05%",
  },
  text1: {
    color: "#0096c7",
  },
  pk: {
    color: Color.textTxtPrimary,
  },
  vectorIcon: {
    right: "77.05%",
    left: "19.14%",
  },
  text2: {
    color: Color.darkslateblue,
  },
  pk1: {
    color: Color.darkslateblue,
  },
  ownerInfoChild3: {
    right: "76.82%",
    left: "19.37%",
  },
  ownerInfo1: {
    height: "3.54%",
    width: "37.21%",
    top: "30.15%",
    left: "31.4%",
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    color: Color.darkslateblue,
  },
  letsRegister: {
    top: "14.27%",
    fontSize: FontSize.size_8xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
  },
  letsLevelUp: {
    height: "2.58%",
    width: "68.6%",
    top: "18.99%",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: "4.65%",
  },
  vectorIcon1: {
    height: 15,
    top: 590,
  },
  touchableOpacity:{
    position: 'absolute',
    left: 360,
    width: 20,
    height: 20,
    top: 590,
    
   
  },
   
  vectorIcon2: {
    height: 15,
    top: 650,
    
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
  groupChild: {
    left: 0,
    width: 391,
    top: 0,
  },
  register: {
    top: 11,
    left: 157,
    color: "#fffdfd",
    width: 76,
    textAlign: "left",
    fontSize: FontSize.size_base,
  },
  groupParent: {
    top: 810,
    left: 10,
  },
  atSign1Icon: {
    top: 522,
  },
  phone1Icon: {
    top: 458,
  },
  key1Icon: {
    top: 585,
  },
  // key2Icon: {
  //   top: 650,
  // },
  user1Icon: {
    top: 332,
  },
  ownerInfoChild5: {
    top: 3,
    left: 29,
    width: 372,
    height: 43,
    position: "absolute",
  },
  ownerInfo: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: 932,
    position: 'absolute',
  },
});

export default OwnerInfo;
