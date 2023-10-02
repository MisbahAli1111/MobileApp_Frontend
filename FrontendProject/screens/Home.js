import * as React from "react";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Text,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import VehicleCarousel from "../components/VehicleCarousel";
import { Color, Border, Padding, FontFamily, FontSize } from "../GlobalStyles";
import { TouchableWithoutFeedback } from "react-native";
import Footer from "../components/Footer";
import * as Svg from "react-native-svg";
import { LineChart } from "react-native-chart-kit";
import HomeVehicleTypes from "../components/HomeVehicleTypes";
import ProfilePopDown from "../components/ProfilePopDown";
import DashboardGraph from "../components/DashboardGraph";
import axios from "axios";
import Config from "./Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const Home = () => {
  const navigation = useNavigation();
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [invoiceDues, setInvoiceDues] = useState(0);
  const invoices = null;

  const data = [10, 20, 5, 25, 15, 30, 12];

  const getEmployee = async () => {
    const Business_id = await AsyncStorage.getItem("Business_id");
    const apiServerUrl = await AsyncStorage.getItem("apiServerUrl");
  
    if (!apiServerUrl) {
      // Handle missing apiServerUrl
      console.log("API server URL is missing.");
      return;
    }
  
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiServerUrl}/api/users/get-employees/${Business_id}`,
      headers: {},
    };
  
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setTotalEmployees(response.data.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigation.navigate("Login");
        }
        console.log(error);
      });
  };
  

  const getInvoiceDue = async () => {
    const Business_id = await AsyncStorage.getItem("Business_id");
    let token = await AsyncStorage.getItem("accessToken");
    const accessToken = "Bearer " + token;
    const apiServerUrl = await AsyncStorage.getItem("apiServerUrl");

    if (Business_id) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiServerUrl}/api/invoice/${Business_id}/invoiceDue`,
        headers: {
          Authorization: accessToken,
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setInvoiceDues(response.data.data);
        })
        .catch((error) => {
           if (error.response.status === 401) {
          
            navigation.navigate("Login");
          }
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getEmployee();
    getInvoiceDue();
  });

  return (
    <SafeAreaView>
    <ImageBackground style={styles.home}
    source={require("../assets/light-texture2234-1.png")}
    >
    <View style={styles.container}>
    <TouchableOpacity
    onPress={()=> navigation.navigate('MaintenanceRecord')}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.steelblue_300,
        borderRadius: widthPercentageToDP("2%"),
        paddingHorizontal: widthPercentageToDP("5%"),
        paddingVertical:widthPercentageToDP("3%"),
        marginHorizontal:widthPercentageToDP("3%"),
        marginBottom:widthPercentageToDP("3%")
      }}
    >
      <TextInput
        style={{
          flex: 1,fontFamily:FontFamily.poppinsMedium,
        }}
        placeholder="Search Record"
        placeholderTextColor="Black"
        editable={false}
      />
      <AntDesign name="search1"  color="black"  size={widthPercentageToDP("5%")}/>
    </View>
    </TouchableOpacity>

    <View style={styles.userAlerts}>
      <View style={styles.box}>
        <AntDesign name="warning" size={widthPercentageToDP('8%')} color="red" />
        <Text style={styles.number}>{invoiceDues}</Text>
        <Text style={styles.text}>Invoices Due</Text>
      </View>
      <View style={styles.box}>
        <AntDesign name="user" size={widthPercentageToDP('8%')} color="black" />
        <Text style={styles.number}>{totalEmployees}</Text>
        <Text style={styles.text}>Employees</Text>
      </View>
    </View>
    <View style={styles.blueBox}>
    <Text style={styles.vehiclesText}>Vehicles Maintained</Text>
    <DashboardGraph />
    <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SalesReport')}
         // Adjust the opacity as desired
      >
        <Text style={styles.buttonText}>Generate Report</Text>
      </TouchableOpacity>
    </View>
    {/* car , bike, auto.. */}
        <View style={styles.container1}>
        <VehicleCarousel />
      </View>


    </View>

      
      
        
      

      

      
      


      <View style={[styles.cont]}>
        <Footer prop={"Home"} data={invoices} />
      </View>
    </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    marginTop:heightPercentageToDP("12"),
    flex:1,
    // backgroundColor:'red',
    // maxHeight:heightPercentageToDP("100%"),
  },
  container1: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom:heightPercentageToDP("12%")
  },
  cont: {
    padding: 0,
    top: 0,
    position: "absolute",
    
  },
  button: {
    backgroundColor: 'rgba(3, 29, 68, 1)',
    height:"15%",
    width:widthPercentageToDP("40%"),
    borderRadius: 10,
    marginTop:heightPercentageToDP("21%"),
    marginBottom:heightPercentageToDP("4%"),
    alignContent:"center",
    justifyContent:"center"
  },
  buttonText: {
    color: 'white',
    fontSize: widthPercentageToDP("4%"),
    fontFamily:FontFamily.poppinsMedium,
    textAlign:"center"
  },
  blueBox: {
    
    backgroundColor:Color.steelblue_300,
    marginHorizontal:widthPercentageToDP("3%"),
    borderRadius:widthPercentageToDP("2%"),
    justifyContent: "center",
    alignItems: "center",
    height:heightPercentageToDP("35%"),
  },
  vehiclesText: {
    fontSize: 20,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    marginTop:heightPercentageToDP("5%"),
    marginBottom:heightPercentageToDP("2%"),
  },

  userAlerts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop:widthPercentageToDP("0%")
  },
  box: {
    alignItems: 'center',
    borderRadius: 10,
    width: widthPercentageToDP('43%'), // Adjust width as needed
    height: heightPercentageToDP('18%'),
    padding: widthPercentageToDP('5%'), // Adjust padding as needed
    backgroundColor: Color.steelblue_300,
    marginBottom:widthPercentageToDP("2%")
  },
  number: {
    fontSize: widthPercentageToDP('4%'), // Adjust font size as needed
    fontWeight: 'bold',
    marginTop: heightPercentageToDP('1%'), // Adjust margin as needed
  },
  text: {
    fontSize: widthPercentageToDP('4%'), // Adjust font size as needed
    color: 'black',
    fontFamily:FontFamily.poppinsMedium
  },
  home: {
    flex: 1,
    overflow: "hidden",
    height: "100%",
    width: "100%",
  },
});

export default Home;
