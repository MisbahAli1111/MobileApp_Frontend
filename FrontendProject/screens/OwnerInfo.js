import * as React from "react";
import { useState } from 'react';
import { Image } from "expo-image";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, ScrollView, TextInput, View, Pressable, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import axios from 'axios';

const OwnerInfo = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [cnic, setcnic] = useState('');
  const [email, setemail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhonenumber] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [ConfirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');

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
  const [NameEror, setNameError] = useState(false);
  const [CNICEror, setCNICError] = useState(false);


  const [nameFocused, setNameFocused] = useState(false);
  const [cnicFocused, setcnicFocused] = useState(false);
  const [emailFocused, setemailFocused] = useState(false);
  const [PasswordFocused, setPasswordFocused] = useState(false);
  const [ConfirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
  const [countryCodeFocused, setCountryCodeFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const countryCodes = ["AF", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BT", "BO", "BA", "BW", "BR", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "CF", "TD", "CL", "CN", "CO", "KM", "CG", "CD", "CR", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FJ", "FI", "FR", "GA", "GM", "GE", "DE", "GH", "GR", "GD", "GT", "GN", "GW", "GY", "HT", "HN", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IL", "IT", "CI", "JM", "JP", "JO", "KZ", "KE", "KI", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR", "MU", "MX", "FM", "MD", "MC", "MN", "ME", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NG", "KP", "NO", "OM", "PK", "PW", "PA", "PG", "PY", "PE", "PH", "PL", "PT", "QA", "RO", "RU", "RW", "KN", "LC", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "KR", "SS", "ES", "LK", "SD", "SR", "SZ", "SE", "CH", "SY", "TJ", "TZ", "TH", "TL", "TG", "TO", "TT", "TN", "TR", "TM", "TV", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VA", "VE", "VN", "YE", "ZM", "ZW"];

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCodeSelect = (code) => {
    setSelectedCode(code);
    setShowDropdown(false);
  };

  const handleSignUp = () => {

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
      if (!phoneNumber) {
        hasErrors = true;
        setNumberError(true);
        setPLError('Please provide Contact Number');

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
      let data = JSON.stringify({
        "firstName": name,
        "lastName": name,
        "phone_number": phoneNumber,
        "cnicNumber": cnic,
        "email": email,
        "password": Password
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://192.168.100.71:8080/api/users/register/owner',
        headers: {
          'Content-Type': 'application/json'
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
    <View style={styles.ownerInfo}>
      <Image
        style={[styles.lightTexture22341Icon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />
      <Text
        style={[styles.letsRegister, styles.letsPosition]}
      >{`Let’s Register `}</Text>
      <Text style={[styles.letsLevelUp, styles.letsPosition]}>
        Let’s level up your business, together.
      </Text>
      <Text style={[styles.ownerInfo1, styles.registerTypo]}>Owner Info</Text>



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
           CNICEror ? styles.davidDanielcR :styles.davidDanielc
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
           PasswordError ? styles.davidDanieleR : styles.davidDaniele
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


      {/* <TextInput style={[styles.davidDaniel, styles.registerTypo1]}
        placeholder="Name"
        value={name}
        onFocus={() => setNameFocused(true)}
        onBlur={() => setNameFocused(false)}
        onChangeText={setName}
      />
      <Image
        style={[
         NameEror ? styles.ownerInfoChildR: styles.ownerInfoChild
          , styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-12.png")}
      />
      <Image
        style={[styles.user1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/user-1.png")}
      />
      {NameEror ? <Text style={styles.nameError}>Please Enter a Valid Name</Text> : null}

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
        style={[
         CNICEror ? styles.ownerInfoItemR: styles.ownerInfoItem
          , styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-22.png")}
      />
      {CNICEror ? <Text style={styles.cnicError}>Please Enter a Valid CNIC number</Text> : null}

      <TextInput style={[styles.pk, styles.pkPosition]}
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
        style={[
         NumberEror ? styles.ownerInfoInnerR: styles.ownerInfoInner
          , styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-81.png")}
      />
      <Image
        style={[styles.phone1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/phone-1.png")}
      />
      {NumberEror ? <Text style={styles.numberError}>{PLEror}</Text> : null}


      <TextInput style={[styles.daviddaniel33outlookcom, styles.david1Typo]}
        placeholder="Email"
        value={email}
        onFocus={() => setemailFocused(true)}
        onBlur={() => setemailFocused(false)}
        onChangeText={setemail}

      />
      <Image
        style={[styles.atSign1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/atsign-1.png")}
      />
      <Image
        style={[
         EmailEror ? styles.lineIconR :styles.lineIcon
          , styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-91.png")}
      />
{EmailEror ? <Text style={styles.emailError}>Please Provide a valid Email</Text> : null}

      <TextInput style={[styles.david, styles.textTypo]}
        placeholder="Passwod"
        secureTextEntry={passwordVisible}
        value={Password}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        onChangeText={setPassword}
      />
      <Image
        style={[styles.key1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/key-1.png")}
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
      <Image
        style={[
         PasswordError ? styles.ownerInfoChild1R :styles.ownerInfoChild1
          , styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-72.png")}
      />
{PasswordError ? <Text style={styles.passwordError}>Please provide Password</Text> : null}
      <TextInput style={[styles.david1, styles.david1Typo]}
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

      <Image
        style={[
         CPasswordError ?  styles.ownerInfoChild2R :styles.ownerInfoChild2
          , styles.ownerChildLayout]}
        contentFit="cover"
        source={require("../assets/line-32.png")}
      />
{CPasswordError ? <Text style={styles.cError}>{CError}</Text> : null}
      {ErrorM ? <Text style={styles.cError}>{errorMessage}</Text> : null} */}







      <Pressable
        style={[styles.groupParent, styles.groupLayout]}
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
  );
};

const styles = StyleSheet.create({
  iconPosition: {
    width: 430,
    left: 0,
    position: "absolute",
  },
  nameError: {
    marginLeft: 30,
    color: 'red',
  },
  contwwrap: {
    flexDirection: 'row',
  },
  numberError: {
    top: -180,
    marginLeft: 30,
    marginBottom: 5,
    color: 'red',
    // position:'relative',
  },
  passwordError: {
    top: -90,
    marginLeft: 30,
    marginBottom: 2,
    color: 'red',
    // position:'relative',
  },
  cError: {
    top: -95,
    marginLeft: 30,
    marginBottom: 2,
    color: 'red',
    // position:'relative',
  },
  emailError: {
    top: -170,
    marginLeft: 30,
    marginBottom: 5,
    color: 'red',
    // position:'relative',
  },
  cnicError: {
    marginTop: 40,
    marginLeft: 30,
    marginBottom: -35,
    color: 'red',
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
    left: "15.00%",
    position: "relative",
  },
  code:
  {
    width: 80,
    left: -50,
  },

  textTypo: {
    height: "2.9%",

    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,


  },
  wrap: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'left', 
    paddingTop: '65%', 
    paddingBottom: '10%',
    paddingHorizontal: '5%',
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
  pkR: {
    color: Color.textTxtPrimary,
    left: 8,
    width: '8%',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "red",
  },
  ownerChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    right: "4.65%",

    width: "90.7%",
    height: "0.22%",
    left: "4.65%",
    position: "relative",
    borderTopWidth: 2,

    borderStyle: "solid",
    overflow: "hidden",
  },
  textPosition: {
    left: "28.12%",
    top: -168,
    width: "41.16%",
    height: "3%",
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    position: "relative",
  },
  pkPosition: {
    height: "10%",
    width: "20%",
    right: "85.19%",
    bottom: "62.51%",
    left: "0.23%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "relative",
    overflow: "hidden",
  },
  vectorIconLayout: {

  },
  countryCode: {
    height: 20,
    width: 20,
  },
  registerTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  letsPosition: {
    left: "5.10%",
    textAlign: "left",
    color: Color.darkslateblue,
    position: "absolute",
  },
  vectorIconPosition: {
    top: 10,
    left: -25,
    width: 20,
    position: "relative",
  },
  groupLayout: {
    height: 45,
    width: 391,
    position: "absolute",
  },
  iconLayout: {
    height: 20,
    width: 20,

    // position: "relative",
    // overflow: "hidden",
  },
  lightTexture22341Icon: {
    top: 0,
    width: 430,
    height: 932,
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
  pk: {
    color: Color.textTxtPrimary,
    left: 8,
    width: '8%',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#60b9d1",
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
    width: '75%',
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
  davidDanielc: {
    width: "30%",
    paddingLeft: 20,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    borderBottomWidth: 2,
    borderBottomColor: "#60b9d1",

    marginBottom: 10,
    width: '95%',
    fontSize: 15,
    padding: 6,
  },
  daviddaniel33outlookcom: {
    width: "55.81%",

  },
  david: {
    width: "20.7%",
    top: "-6.50%",
  },
  david1: {
    width: "38.84%",
    top: "-9.00%",
  },
  text: {

    textAlign: "left",
    borderBottomWidth: 2,
    borderBottomColor: "#60b9d1",
    marginBottom: 20,
    width: '80%',
    fontSize: 16,
    padding: 8,
  },
  ownerInfoChild: {
    bottom: "60.3%",
    borderColor: "#cbcbcb",
  },
  ownerInfoChildR: {
    bottom: "60.3%",
    borderColor: 'red',
  },
  ownerInfoItem: {
    top: 38,
    bottom: "40.14%",
    borderColor: "#cbcbcb",
  },
  ownerInfoItemR: {
    top: 38,
    bottom: "40.14%",
    borderColor: "red",
  },
  ownerInfoInner: {
    top: "-17.55%",
    bottom: "33.23%",
    borderColor: "#cbcbcb",
  },
  ownerInfoInnerR: {
    top: "-17.55%",
    bottom: "33.23%",
    borderColor: "red",
  },
  lineIcon: {
    top: "-18.86%",
    bottom: "27.33%",
    borderColor: "#cbcbcb",
  },
  lineIconR: {
    top: "-18.86%",
    bottom: "27.33%",
    borderColor: "red",
  },
  ownerInfoChild1: {
    top: "-10.00%",
    bottom: "53.95%",
    borderColor: "#cbcbcb",
  },
  ownerInfoChild1R: {
    top: "-10.00%",
    bottom: "53.95%",
    borderColor: "red",
  },
  ownerInfoChild2: {
    top: "-10.72%",
    bottom: "47.05%",
    borderColor: "#cbcbcb",
  },
  ownerInfoChild2R: {
    top: "-10.72%",
    bottom: "47.05%",
    borderColor: "red",
  },
  text1: {
    color: "#0096c7",
  },

  vectorIcon: {

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
    top: "17.15%",
    left: "31.4%",
    fontSize: FontSize.size_3xl,
    textAlign: "center",
    color: Color.darkslateblue,
  },
  letsRegister: {
    top: "9.00%",
    fontSize: FontSize.size_8xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
  },
  letsLevelUp: {
    height: "2.58%",
    width: "68.6%",
    top: "13.40%",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: "4.65%",
  },
  vectorIcon1: {
    height: 15,

  },
  touchableOpacity: {
    position: 'absolute',
    left: 360,
    width: 20,
    height: 20,
    top: 590,

  },

  vectorIcon2: {
    height: 15,
    top: -110,

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
    top: 0,
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
    top: 10,
    marginLeft: 4,
  },
  phone1Icon: {
    top: 15,
  },
  key1Icon: {
    top: 6,
    marginLeft: 5,
  },
  // key2Icon: {
  //   top: 650,
  // },
  user1Icon: {
    top: 10,
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
    // width: "100%",
    overflow: "hidden",
    justifyContent: 'center',
    height: 932,
    position: 'relative',
  },
});

export default OwnerInfo