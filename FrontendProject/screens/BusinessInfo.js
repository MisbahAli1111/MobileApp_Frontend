import * as React from "react";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import {
  ScrollView,
  Modal,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BusinessList from "../components/BusinessList";
import SwitchBusiness from "./SwitchBusiness";
import * as ImagePicker from "expo-image-picker";
import Config from "./Config";
const windowWidth = Dimensions.get("window");

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

const BusinessInfo = () => {
  const navigation = useNavigation();
  const [error,setErrorText] = useState("Enter this field");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setlocation] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("PK");
  const [phoneNumber, setPhonenumber] = useState("");
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = "";
  const [EMessage, setEMessage] = useState("");
  const [CMessage, setCMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isImageModalVisible, setImageModalVisible] = useState("false");
  const [isFullImageModalVisible, setFullImageModalVisible] = useState(false);
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    let token = await AsyncStorage.getItem("accessToken");
    const accessToken = "Bearer " + token;

    let isValid = true;

    if (!name) {
      console.log("hello");
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }
    {console.log("Valid: ",isValid)}

    if (!countryCode) {
      setCodeError(true);
      isValid = false;
    } else {
      setCodeError(false);
    }
      if (!phoneNumber) {
        setPhoneError(true);
        isValid = false;
      } else {
        setPhoneError(false);
      }
    

    if (!email) {
      setEMessage("Please provide an Email");
      setEmailError(true);
      isValid = false;
    } else {
      setEMessage("");
      if (!isValidEmail(email)) {
        setEMessage("Please provide a Valid Email");
        setEmailError(true);
        isValid = false;
      } else {
        setEmailError(false);
      }
    }

    if (!city) {
      setCMessage("Please select City");
      setCityError(true);
      isValid = false;
    } else {
      setCMessage("");
      setCityError(false);
    }
      if (!country) {
        setCountryError(true);
        isValid = false;
      } else {
        setCountryError(false);
      }
    

    if (!location) {
      setLocationError(true);
      isValid = false;
    } else {
      setLocationError(false);
    }
    setTimeout(() => {
      clearErrors();
    }, 10000);

    if (isValid) {
      {console.log("Valid: ",isValid)}
      let data = JSON.stringify({
        businessName: name,
        businessAddress: location,
        businessPhoneNumber: phoneNumber,
        businessEmail: email,
        businessCountry: country,
        businessCity: city,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${Config.apiServerUrl}/api/business/add-business/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
         if (response.data.status === "OK") {
            const createdUserId = response.data.data;
            setUserId(createdUserId);

            // Perform logic using the updated userId here
            if (createdUserId) {
              uploadImage(createdUserId);
            }
            {console.log("Valid2: ",isValid)}
            navigation.navigate(SwitchBusiness);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
  };

  const clearErrors = () => {
    setNameError("");
    setCityError("");
    setCodeError("");
    setCountryError("");
    setEmailError("");
    setLocationError("");
    setPhoneError("");
  };

  const handleImageUpload = () => {
    setImageModalVisible(true);
  };

  const handleShowProfile = () => {
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
      console.log(profileImage);
    }
    setImageModalVisible(false);
  };

  const uploadImage = async (BusinessId) => {

    const imageData = new FormData();
    imageData.append("files", {
      uri: profileImage,
      name: new Date() + "_profile" + ".jpeg",
      type: "image/jpeg", // Adjust the MIME type as needed
    });



    const response = await axios.post(
      `${Config.apiServerUrl}/api/file/upload/business/${BusinessId}`, // Change the endpoint as needed
      imageData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken, // Add your authorization token if required
        },
      }
    );

  };

  const [NameEror, setNameError] = useState(false);
  const [EmailEror, setEmailError] = useState(false);
  const [LocationEror, setLocationError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [CountryError, setCountryError] = useState(false);
  const [codeErorr, setCodeError] = useState("");
  const [phoneErorr, setPhoneError] = useState("");
  const [NumberEror, setNumberError] = useState(false);

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Brazzaville)",
    "Congo (Kinshasa)",
    "Costa Rica",
    "Cote d'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor (Timor-Leste)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

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

  const cities = [
    "Kabul",
    "Tirana",
    "Algiers",
    "Andorra la Vella",
    "Luanda",
    "St. John's",
    "Buenos Aires",
    "Yerevan",
    "Canberra",
    "Vienna",
    "Baku",
    "Nassau",
    "Manama",
    "Dhaka",
    "Bridgetown",
    "Minsk",
    "Brussels",
    "Belmopan",
    "Porto-Novo",
    "Thimphu",
    "Sucre",
    "Sarajevo",
    "Gaborone",
    "Brasilia",
    "Bandar Seri Begawan",
    "Sofia",
    "Ouagadougou",
    "Bujumbura",
    "Phnom Penh",
    "Yaoundé",
    "Ottawa",
    "Praia",
    "Bangui",
    "N'Djamena",
    "Santiago",
    "Beijing",
    "Bogotá",
    "Moroni",
    "Brazzaville",
    "Kinshasa",
    "San José",
    "Zagreb",
    "Havana",
    "Nicosia",
    "Prague",
    "Copenhagen",
    "Djibouti",
    "Roseau",
    "Santo Domingo",
    "Quito",
    "Cairo",
    "San Salvador",
    "Malabo",
    "Asmara",
    "Tallinn",
    "Addis Ababa",
    "Suva",
    "Helsinki",
    "Paris",
    "Libreville",
    "Banjul",
    "Tbilisi",
    "Berlin",
    "Accra",
    "Athens",
    "St. George's",
    "Guatemala City",
    "Conakry",
    "Bissau",
    "Georgetown",
    "Port-au-Prince",
    "Tegucigalpa",
    "Budapest",
    "Reykjavik",
    "New Delhi",
    "Jakarta",
    "Tehran",
    "Baghdad",
    "Dublin",
    "Jerusalem",
    "Rome",
    "Yamoussoukro",
    "Kingston",
    "Tokyo",
    "Amman",
    "Astana",
    "Nairobi",
    "South Tarawa",
    "Kuwait City",
    "Bishkek",
    "Vientiane",
    "Riga",
    "Beirut",
    "Maseru",
    "Monrovia",
    "Tripoli",
    "Vaduz",
    "Vilnius",
    "Luxembourg City",
    "Skopje",
    "Antananarivo",
    "Lilongwe",
    "Kuala Lumpur",
    "Male",
    "Bamako",
    "Valletta",
    "Majuro",
    "Nouakchott",
    "Port Louis",
    "Mexico City",
    "Palikir",
    "Chisinau",
    "Monaco",
    "Ulaanbaatar",
    "Podgorica",
    "Rabat",
    "Maputo",
    "Naypyidaw",
    "Windhoek",
    "Yaren",
    "Kathmandu",
    "Amsterdam",
    "Wellington",
    "Managua",
    "Niamey",
    "Abuja",
    "Pyongyang",
    "Oslo",
    "Muscat",
    "Islamabad",
    "Ngerulmud",
    "Panama City",
    "Port Moresby",
    "Asunción",
    "Lima",
    "Manila",
    "Warsaw",
    "Lisbon",
    "Doha",
    "Bucharest",
    "Moscow",
    "Kigali",
    "Basseterre",
    "Castries",
    "Kingstown",
    "Apia",
    "San Marino",
    "Sao Tome",
    "Riyadh",
    "Dakar",
    "Belgrade",
    "Victoria",
    "Freetown",
    "Singapore",
    "Bratislava",
    "Ljubljana",
    "Honiara",
    "Mogadishu",
    "Pretoria",
    "Seoul",
    "Juba",
    "Madrid",
    "Colombo",
    "Khartoum",
    "Paramaribo",
    "Mbabane",
    "Stockholm",
    "Bern",
    "Damascus",
    "Dushanbe",
    "Dodoma",
    "Bangkok",
    "Dili",
    "Lomé",
    "Nuku'alofa",
    "Port of Spain",
    "Tunis",
    "Ankara",
    "Ashgabat",
    "Funafuti",
    "Kampala",
    "Kyiv",
    "Abu Dhabi",
    "London",
    "Washington, D.C.",
    "Montevideo",
    "Tashkent",
    "Port Vila",
    "Vatican City",
    "Caracas",
    "Hanoi",
    "Sana'a",
    "Lusaka",
    "Harare",
  ];

  return (
    <ImageBackground
      style={styles.container}
      resizeMode="cover"
      source={require("../assets/light-texture2234-1.png")}
    >
      <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
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
          </View>
          {NameEror ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.inputContainer}>
            <AntDesign name="mail" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {EmailEror ? <Text style={styles.errorText}>{EMessage}</Text> : null}
          <View style={styles.inputContainer}>
            <AntDesign name="home" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setlocation}
            />
          </View>
          {LocationEror ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.pickerRowContainer}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={city}
                onValueChange={(itemValue) => setCity(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="City" value="" />
                {cities.map((city) => (
                  <Picker.Item key={city} label={city} value={city} />
                ))}
              </Picker>
            </View>
            
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={country}
                onValueChange={(itemValue) => setCountry(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Country" value="" />
                {countries.map((country) => (
                  <Picker.Item key={country} label={country} value={country} />
                ))}
              </Picker>
            </View>
            
          </View>
          {CountryError || cityError ? <Text style={styles.errorText}>{error}</Text> : null}

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
                <Picker.Item label="" value="" />
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
          {phoneErorr || codeErorr ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.registerButtonContainer}>
            <TouchableOpacity
              onPress={handleSignUp}
              style={styles.registerButton}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
              animationType="slide"
              transparent={true}
              visible={isFullImageModalVisible}
              onRequestClose={() => setFullImageModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.imageModalContainer1}>
                
                  {profileImage ? (
                    
                      <Image
                        source={{ uri: profileImage }}
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
      </ScrollView>
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
    marginTop: heightPercentageToDP("10%"),
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
    marginBottom: heightPercentageToDP("2%"),
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
    marginTop: heightPercentageToDP("5%"),
    marginBottom: widthPercentageToDP("0%"),
  },
  registerButton: {
    backgroundColor: "rgba(3, 29, 68, 1)",
    paddingVertical: heightPercentageToDP("2%"),
    alignItems: "center",
    width: "100%",
    borderRadius: widthPercentageToDP("2%"),
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
  errorText: {
    color: "red",
    fontSize: widthPercentageToDP("3%"),
    marginTop: heightPercentageToDP("1%"),
    fontFamily: FontFamily.poppinsMedium,
  },
});

export default BusinessInfo;
