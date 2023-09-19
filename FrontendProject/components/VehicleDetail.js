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
    setVehicleId(props.prop);

    if (vehicleId) {
      // console.log(vehicleId);
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${Config.apiServerUrl}/api/vehicle/${vehicleId}`,
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
    <View style={styles.container}>
    <Text style={styles.heading}>
      {vechileDetails.make} {vechileDetails.model} {vechileDetails.year}
    </Text>
    <View style={styles.box}>
      {/* Row 1 */}
      <View style={styles.row}>
        <Text style={styles.centeredText}>Vehicle Owner</Text>
        <Text style={styles.centeredText}>Registration Number</Text>
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
        <Text style={styles.centeredText1}>{vechileDetails.registrationNumber}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.centeredText}>Owners Contact</Text>
        <Text style={styles.centeredText}>Model</Text>
      </View>

      <View style={styles.rowWithMorePadding}>
        
        <TouchableOpacity onPress={handlePhoneLinkPress} style={[styles.centeredText, styles.hyperlinkText]}>
        <Text style={[styles.centeredText, styles.hyperlinkText]}>
          {vechileDetails.phoneNumber}
        </Text>
        </TouchableOpacity>
        <Text style={styles.centeredText1}>{vechileDetails.model}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.centeredText}>Milage</Text>
        <Text style={styles.centeredText}>Type</Text>
      </View>

      <View style={styles.rowWithMorePadding}>
        <Text style={styles.centeredText1}>{vechileDetails.kilometerDriven} KM</Text>
        <Text style={styles.centeredText1}>{vechileDetails.type}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.centeredText}>Colour</Text>
        <Text style={styles.centeredText}>Transmission</Text>
      </View>

      <View style={styles.rowWithMorePadding}>
        <Text style={styles.centeredText1}>{vechileDetails.color}</Text>
        <Text style={styles.centeredText1}>Manual</Text>
      </View>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  paddingBottom:"15%"
},
heading: {
  fontSize: hp('2%'),
  fontWeight: 'bold',
  marginBottom: hp('1%'),
},
box: {
  backgroundColor: '#bce8e8',
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
