import * as React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Linking,
  ScrollView
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import Vehicles from "../screens/Vehicles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../screens/Config";
function VehicleDetails(props) {
  const navigation = useNavigation();
  const [vehicleId, setVehicleId] = useState("");
  const [vechileDetails, setVehicleDetails] = useState([]);

  // console.log(vehicleId);

  getData = async () => {
    let token = await AsyncStorage.getItem("accessToken");
    const accessToken = "Bearer " + token;
    const apiServerUrl = await AsyncStorage.getItem("apiServerUrl");
    setVehicleId(props.prop);

    if (vehicleId) {
      // console.log(vehicleId);
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${apiServerUrl}/api/vehicle/${vehicleId}`,
        headers: {
          Authorization: accessToken,
        },
      };

      axios
        .request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          setVehicleDetails(response.data);
          // console.log(vechileDetails.ownerId);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            
            navigation.navigate("Login");
          }
          console.log(error);
        });
    }
  };

  const handlePhoneLinkPress = () => 
  {
    if (vechileDetails.phoneNumber) {
      Linking.openURL(`tel:${vechileDetails.phoneNumber}`);
    }

  };

  useEffect(() => {
    // console.log(vehicleId);
    getData();
  });

  return (
    <ScrollView style={styles.wrap}
    contentContainerStyle={{ alignItems:"center",paddingBottom:hp("15%")}}>
    <Text style={styles.heading}>
      {vechileDetails.make} {vechileDetails.model} {vechileDetails.year}
    </Text>
    <View style={styles.box}>
      {/* Row 1 */}
      <View style={styles.row}>
        <Text style={styles.centeredText1}>Vehicle Owner</Text>
        <Text style={styles.centeredText1}>Registration Number</Text>
      </View>
      {/* Row 2 */}
      <View style={styles.rowWithMorePadding}>
      <TouchableOpacity style={[styles.centeredText, styles.hyperlinkText]}
          onPress={() =>
            navigation.navigate("CustomerDetails", {
              ownerid: vechileDetails.ownerId, // Pass the ownerid as a parameter
            })
          }
        >
        <Text style={[styles.centeredText, styles.hyperlinkText]}>{vechileDetails.name}</Text>
        </TouchableOpacity>
        <Text style={styles.centeredText}>{vechileDetails.registrationNumber}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.centeredText1}>Owners Contact</Text>
        <Text style={styles.centeredText1}>Model</Text>
      </View>

      <View style={styles.rowWithMorePadding}>
        
        <TouchableOpacity onPress={handlePhoneLinkPress} style={[styles.centeredText, styles.hyperlinkText]}>
        <Text style={[styles.centeredText, styles.hyperlinkText]}>
          {vechileDetails.phoneNumber}
        </Text>
        </TouchableOpacity>
        <Text style={styles.centeredText}>{vechileDetails.model}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.centeredText1}>Milage</Text>
        <Text style={styles.centeredText1}>Type</Text>
      </View>

      <View style={styles.rowWithMorePadding}>
        <Text style={styles.centeredText}>{vechileDetails.kilometerDriven} KM</Text>
        <Text style={styles.centeredText}>{vechileDetails.type}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.centeredText1}>Colour</Text>
        <Text style={styles.centeredText1}>Transmission</Text>
      </View>

      <View style={styles.rowWithMorePadding}>
        <Text style={styles.centeredText}>{vechileDetails.color}</Text>
        <Text style={styles.centeredText}>Manual</Text>
      </View>
    </View>
  </ScrollView>
);
};

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    zIndex: 1,
    overflow: "hidden",
    paddingBottom:wp("2%")
  },
heading: {
  fontSize: hp('2.5%'),
  fontWeight: 'bold',
  marginBottom: hp('1%'),
},
box: {
  backgroundColor: Color.steelblue_300,
  padding: wp('1%'), // Adjusted padding
  borderRadius: wp('2%'),
  width: wp('90%'), // Adjusted width
},
row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: hp('1%'), // Adjusted margin
},
rowWithMorePadding: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: hp('2%'), // Adjusted margin
},
centeredText: {
  flex: 1,
  textAlign: 'center', // Center the text horizontally
  fontWeight: 'bold',
  fontSize:wp("4%")
},
centeredText1: {
  flex: 1,
  textAlign: 'center', // Center the text horizontally
  fontSize:wp("4%")
},
centeredText2: {
  flex: 1,
  textAlign: 'center', // Center the text horizontally
  fontSize:wp("4%"),
  marginLeft:wp("5%"),
  fontWeight: 'bold',
},
centeredText3: {
  flex: 1,
  textAlign: 'center', // Center the text horizontally
  fontSize:wp("4%"),
  marginLeft:wp("4%"),
},
hyperlinkText: {
  color: '#007bff', // You can use any color you prefer
  textDecorationLine: 'underline',
},
centeredTextContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});

export default VehicleDetails;
