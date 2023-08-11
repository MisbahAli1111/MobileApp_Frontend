import * as React from "react";
import { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text,TextInput, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from 'axios';
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


  const [EMessage, setEMessage] =useState('');
  const [CMessage , setCMessage] = useState('');
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };


  const handleSignUp = () => {
    let isValid = true;
  
    if (!name) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }
  
    if (!countryCode) {
      setPLError('Please select Country Code');
      setNumberError(true);
      isValid = false;
    } else {
      setPLError('');
      if (!phoneNumber) {
        setPLError('Please provide Contact Number');
        isValid = false;
      } else {
        setNumberError(false);
      }
    }
  
    if (!email) {
      setEMessage('Please provide an Email');
      setEmailError(true);
      isValid = false;
    } else {
      setEMessage('');
      if (!isValidEmail(email)) {
        setEMessage('Please provide a Valid Email');
        setEmailError(true);
        isValid = false;
      } else {
        setEmailError(false);
      }
    }
  
    if (!city) {
      setCMessage('Please select City');
      setCountryError(true);
      isValid = false;
    } else {
      setCMessage('');
      if (!country) {
        setCMessage('Please select Country');
        setCountryError(true);
        isValid = false;
      } else {
        setCountryError(false);
      }
    }
  
    if (!location) {
      setLocationError(true);
      isValid = false;
    } else {
      setLocationError(false);
    }
  
    if (isValid) {
      let data = JSON.stringify({
        "businessName": name,
        "businessAddress": location,
        "businessPhoneNumber": phoneNumber,
        "businessEmail": email,
        "businessCountry": country,
        "businessCity": city
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://192.168.100.71:8080/api/business/add-business/',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwicm9sZSI6WyJST0xFX09XTkVSIiwiUk9MRV9DVVNUT01FUiJdLCJwZXJtaXNzaW9ucyI6W10sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9sb2dpbiIsInBlcm1pc3Npb25CaXRzIjpbXSwiZXhwIjoxNjkxNzQ1NDQxfQ.gS3UkoTBtN47n0VNdXA30GEhQYP7RoRdsX1TMWUUydU'
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
      
    }
  };
  

  const [NameEror,setNameError]=useState(false);
  const [EmailEror,setEmailError]=useState(false);
  const [LocationEror,setLocationError]=useState(false);
 const [CountryError,setCountryError]=useState(false);
  const [PLEror,setPLError]=useState('');
  const [NumberEror,setNumberError]=useState(false);
  
  

  const [countryShowDropdown, setCountryShowDropdown] = useState(false);
  const [cityShowDropdown, setCityShowDropdown] = useState(false);
  const [codeShowDropdown, setCodeShowDropdown] = useState(false);
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)",
    "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "East Timor (Timor-Leste)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland",
    "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
    "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North",
    "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
    "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
    "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia",
    "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
    "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
    "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
    "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden",
    "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
    "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ]
  
  const countryCodes = ["AF", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BT", "BO", "BA", "BW", "BR", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "CF", "TD", "CL", "CN", "CO", "KM", "CG", "CD", "CR", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FJ", "FI", "FR", "GA", "GM", "GE", "DE", "GH", "GR", "GD", "GT", "GN", "GW", "GY", "HT", "HN", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IL", "IT", "CI", "JM", "JP", "JO", "KZ", "KE", "KI", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR", "MU", "MX", "FM", "MD", "MC", "MN", "ME", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NG", "KP", "NO", "OM", "PK", "PW", "PA", "PG", "PY", "PE", "PH", "PL", "PT", "QA", "RO", "RU", "RW", "KN", "LC", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "KR", "SS", "ES", "LK", "SD", "SR", "SZ", "SE", "CH", "SY", "TJ", "TZ", "TH", "TL", "TG", "TO", "TT", "TN", "TR", "TM", "TV", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VA", "VE", "VN", "YE", "ZM", "ZW"];
  
  const cities = [
    "Kabul", "Tirana", "Algiers", "Andorra la Vella", "Luanda", "St. John's", "Buenos Aires", "Yerevan", "Canberra", "Vienna",
    "Baku", "Nassau", "Manama", "Dhaka", "Bridgetown", "Minsk", "Brussels", "Belmopan", "Porto-Novo", "Thimphu",
    "Sucre", "Sarajevo", "Gaborone", "Brasilia", "Bandar Seri Begawan", "Sofia", "Ouagadougou", "Bujumbura", "Phnom Penh",
    "Yaoundé", "Ottawa", "Praia", "Bangui", "N'Djamena", "Santiago", "Beijing", "Bogotá", "Moroni", "Brazzaville",
    "Kinshasa", "San José", "Zagreb", "Havana", "Nicosia", "Prague", "Copenhagen", "Djibouti", "Roseau", "Santo Domingo",
    "Quito", "Cairo", "San Salvador", "Malabo", "Asmara", "Tallinn", "Addis Ababa", "Suva", "Helsinki", "Paris",
    "Libreville", "Banjul", "Tbilisi", "Berlin", "Accra", "Athens", "St. George's", "Guatemala City", "Conakry",
    "Bissau", "Georgetown", "Port-au-Prince", "Tegucigalpa", "Budapest", "Reykjavik", "New Delhi", "Jakarta", "Tehran",
    "Baghdad", "Dublin", "Jerusalem", "Rome", "Yamoussoukro", "Kingston", "Tokyo", "Amman", "Astana", "Nairobi",
    "South Tarawa", "Kuwait City", "Bishkek", "Vientiane", "Riga", "Beirut", "Maseru", "Monrovia", "Tripoli",
    "Vaduz", "Vilnius", "Luxembourg City", "Skopje", "Antananarivo", "Lilongwe", "Kuala Lumpur", "Male", "Bamako",
    "Valletta", "Majuro", "Nouakchott", "Port Louis", "Mexico City", "Palikir", "Chisinau", "Monaco", "Ulaanbaatar",
    "Podgorica", "Rabat", "Maputo", "Naypyidaw", "Windhoek", "Yaren", "Kathmandu", "Amsterdam", "Wellington",
    "Managua", "Niamey", "Abuja", "Pyongyang", "Oslo", "Muscat", "Islamabad", "Ngerulmud", "Panama City",
    "Port Moresby", "Asunción", "Lima", "Manila", "Warsaw", "Lisbon", "Doha", "Bucharest", "Moscow",
    "Kigali", "Basseterre", "Castries", "Kingstown", "Apia", "San Marino", "Sao Tome", "Riyadh", "Dakar",
    "Belgrade", "Victoria", "Freetown", "Singapore", "Bratislava", "Ljubljana", "Honiara", "Mogadishu", "Pretoria",
    "Seoul", "Juba", "Madrid", "Colombo", "Khartoum", "Paramaribo", "Mbabane", "Stockholm", "Bern",
    "Damascus", "Dushanbe", "Dodoma", "Bangkok", "Dili", "Lomé", "Nuku'alofa", "Port of Spain", "Tunis",
    "Ankara", "Ashgabat", "Funafuti", "Kampala", "Kyiv", "Abu Dhabi", "London", "Washington, D.C.", "Montevideo",
    "Tashkent", "Port Vila", "Vatican City", "Caracas", "Hanoi", "Sana'a", "Lusaka", "Harare"
  ];
  
  
  
  
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
 <Text style={[styles.businessInfo1, styles.nextTypo]}>Business Info</Text>
      <Text
        style={[styles.letsRegister, styles.letsPosition]}
      >{`Let’s Register `}</Text>
      <Text style={[styles.letsLevelUp, styles.letsPosition]}>
        Let’s level up your business, together.
      </Text>
      


      {/* Name  */}
     
      <TextInput style={[styles.davidDaniel, styles.davidDanielTypo]}
      placeholder="Name"
        value={name}
        onFocus={() => setNameFocused(true)}
        onBlur={() => setNameFocused(false)}
        onChangeText={setName}
      />
      <Image
        style={[styles.user1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/user-1.png")}
      />
      <Image
        style={[
         NameEror ? styles.businessInfoChildR : styles.businessInfoChild
          , styles.businessChildLayout]}
        contentFit="cover"
        source={require("../assets/line-11.png")}
      />
      
      {NameEror ? <Text style={styles.nameError}>Please Enter a Valid Name</Text> : null }

      
      {/* Email  */}
      <TextInput style={[styles.daviddaniel33outlookcom, styles.davidDanielTypoE]}
      placeholder="Email"
        value={email}
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
        onChangeText={setEmail}
      />
      <Image
        style={[styles.atSign1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/atsign-1.png")}
      />
      <Image
        style={[
          EmailEror ? styles.businessInfoItemR : styles.businessInfoItem ,
           styles.businessChildLayout]}
        contentFit="cover"
        source={require("../assets/line-21.png")}
      />
{EmailEror ? <Text style={styles.nameError}>{EMessage}</Text> : null }

      
      {/* Location  */}
      <TextInput style={[styles.h218GulshanKarachi, styles.davidDanielTypo]}
      placeholder="location"
        value={location}
        onFocus={() => setlocationFocused(true)}
        onBlur={() => setlocationFocused(false)}
        onChangeText={setlocation}
      />
      <Image
        style={[styles.mapPin1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/mappin-1.png")}
      />
      <Image
        style={[
          LocationEror ? styles.businessInfoInnerR :styles.businessInfoInner
          , styles.businessChildLayout]}
        contentFit="cover"
        source={require("../assets/line-31.png")}
      />
      {LocationEror ? <Text style={styles.nameError}>Please Enter a Valid Location</Text> : null }


      {/* City  */}
      <TextInput style={[styles.karachi, styles.karachiTypo]}
      placeholder="city"
      value={city}
      editable={false}
      />
     <TextInput style={[styles.pakistan, styles.karachiTypo]}
       placeholder="country"
       value={country}
      editable={false}
     />
     <Pressable>
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
          <Picker.Item     value="Karachi" />
          {cities.map((code) => (
            <Picker.Item key={code} label={code} value={code} />
          ))}
        </Picker>
        </View>
      }

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
      <Image
        style={[
          CountryError ? styles.businessInfoInnerR :styles.businessInfoInner
          , styles.businessChildLayout]}
        contentFit="cover"
        source={require("../assets/line-31.png")}
      />
      {CountryError ? <Text style={styles.nameError}>{CMessage}</Text> : null }
      



      <TextInput style={styles.textInput}
        placeholder="Phone Number"
        value={phoneNumber}
        keyboardType='numeric'
        maxLength={15}
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
        style={[styles.phone1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/phone-1.png")}
      />
     <Image
        style={[
         NumberEror ?  styles.businessInfoChild2R : styles.businessInfoChild2
          , styles.businessChildLayout]}
        contentFit="cover"
        source={require("../assets/line-4.png")}
      />

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
      {NumberEror ? <Text style={styles.nameError}>{PLEror}</Text> : null }
      
      
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildPosition: {
    left: 0,
    top: 0,
  
  },
  nameWrap:{},
  wrap:{
    flex:1,
    // backgroundColor:'red',
  },
  davidDanielTypo: {
    height: 28,
    top:2,
    textAlign: "left",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    marginLeft: 66,
    position: "relative",
  },
  nameError:{
    marginTop:12,
    marginLeft:50,
    color:'red',
  },
  davidDanielTypoE: {
    height: 28,
    textAlign: "left",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: 56,
    position: "relative",
  },
  businessChildLayout: {
    height: 2,
    width: 370,
    left: 20,
    position: "relative",
    marginTop:10,
  },
  pkPosition: {
    width: 30,
    height: 27,
    marginTop:-35,
    marginBottom:8,
    textAlign: "left",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    marginLeft: 65,
    position: "relative",
  },
  karachiTypo: {
    
    height: 27,
    textAlign: "left",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    position: "relative",
  },
  cityTouch:{
    top: 500,
    height: 10,
    width: 16,
    position: "absolute",
  },
  businessChildPosition: {
    marginTop:-20,
    height: 10,
    width: 16,
    position: "relative",
  },
  businnessChildPosition: {
    height: 10,
    width: 16,
    position: "relative",
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
    position: "relative",
    overflow: "hidden",
  },
  lightTexture22341Icon: {
    width: 430,
    position: "absolute",
    height: 932,
    top: 0,
  },
  davidDaniel: {
    marginTop:330,
    width: 181,
  },
  daviddaniel33outlookcom: {
    marginTop:20,
    width: 231,
    marginLeft:10,
  },
  businessInfoChild: {
   marginTop:10,
  },
  businessInfoChildR: {
    marginTop:10,
    backgroundColor:'red',
   },
 
  businessInfoItem: {
    marginTop:10,
  },
  businessInfoItemR: {
    marginTop:10,
    backgroundColor:'red',
  },
  
  businessInfoInner: {
    
  },
  businessInfoInnerR: {
    backgroundColor:'red',
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
    marginLeft: 130,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    position:'relative',
    marginTop:20,
    marginBottom:8,
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
    // backgroundColor:'red',
    marginTop:-28,
    marginLeft:12,
    left: 83,
    height: 10,
    width: 16,
    position: "relative",
    overflow:"hidden",
  },
  pk1: {
    color: Color.darkslateblue,
  },
  h218GulshanKarachi: {
    width: 282,
    marginTop:20,    
  },
  businessInfoChild2R: {
   backgroundColor:'red',
  },
  businessInfoChild3: {
  },
  karachi: {
    width: 90,
    marginLeft: 35,
    marginTop:25,
  },
  businessInfoChild4: {
    marginLeft:130,
    position:'relative',
  },
  pakistan: {
    marginLeft: 175,
    width: 120,
    marginTop:-25,
  },
  businessInfoChild5: {
    marginLeft: 300,
    marginTop:-30,
  },
  CountryClick: {
    marginLeft: 252,
    marginTop:-50,
    width:80,
    height:40,
    // backgroundColor:'red',
  },
  CityClick: {
    marginTop:-40,
    marginLeft:110,
    // backgroundColor:'red',
    height:50,
    width:50,
  },
  codeClick:{
    marginTop:-48,
    marginBottom:10,
    marginLeft:77,
    height:50,
    width:50,
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
    top: 9,
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
    marginTop:-25,
    marginLeft:10,
    marginBottom:10,
  },
  user1Icon: {
    marginTop:-25,
    marginLeft:8,
  },
  atSign1Icon: {
    marginTop:-25,
    marginLeft:10,
  },
  phone1Icon: {
   marginTop:-44,
   marginLeft:15,
   marginBottom:8,
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