import * as React from "react";
import { useState } from "react";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import { Alert } from "react-native";
import axios from "axios";
const AddEmployee = () => {
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
  const [errorMessage, setErrorMessage] = useState('');
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
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

    if (!countryCode) {
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
      let data = JSON.stringify({
        "firstName": name,
        "lastName": name,
        "phone_number": phoneNumber,
        "email": email,
        "password": Password
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://192.168.100.71:8080/api/users/register/employee',
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
    <View style={styles.addEmployee}>
      <Image
        style={[styles.lightTexture22341Icon, styles.iconPosition]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />



      <TextInput style={[styles.name, styles.passwordTypo]}
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
      {ErrorM ? <Text style={styles.nameError}>{errorMessage}</Text> : null}














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
  nameError: {
    marginTop: 12,
    marginLeft: 25,
    color: 'red',
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
    width: 35,
    color: Color.textTxtPrimary,
    top: 0,
    marginTop: 30,
    height: "2.9%",
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: "7.23%",
    position: "relative",
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
    width: "100%",
    overflow: "hidden",
    height: 932,
    position: 'absolute',
  },
});

export default AddEmployee;