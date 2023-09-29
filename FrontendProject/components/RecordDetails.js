import * as React from "react";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Config from "../screens/Config";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { AntDesign } from "@expo/vector-icons";


function RecordDetails({ recordId }) {
  const [ownerId, setOwnerId] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [detail, setDetail] = useState("");
  const [name, setName] = useState("");
  const [Mileage, setMileage] = useState("");
  const [service, setService] = useState("");
  const [type, setTyoe] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [datePart, timePart] = dateTime.split("T");
  const [fetchedServiceDue, setFetchedServiceDue] = useState("");
  const [serviceDue, setServiceDue] = fetchedServiceDue.split("T");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [imageResponce, setImageResponce] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchedImages, setFetchedImages] = React.useState([]);
  const navigation = useNavigation();
  const [originalUri, setOriginalUri] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    
    const fetchImages = async () => {
      try {
        setLoading(true); // Set loading to true while fetching
        let token = await AsyncStorage.getItem("accessToken");
        const accessToken = "Bearer " + token;

        if (recordId) {
          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${Config.apiServerUrl}/api/maintenance-record/${recordId}/images`,
            headers: {
              Authorization: accessToken,
            },
          };

          const response = await axios.request(config);
          const imageUrls = response.data.map((item) => `${Config.baseUrl1}` + item.url);
          setFetchedImages(imageUrls);
          setLoading(false); 
        }
      } catch (error) {
        console.log(error);
        setLoading(false); 
      }
    };

    const getOwnerId = async (recordId) => {
      try {
        let token = await AsyncStorage.getItem("accessToken");
        const accessToken = "Bearer " + token;

        if (recordId) {
          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${Config.apiServerUrl}/api/maintenance-record/${recordId}/get-owner-id`,
            headers: {
              Authorization: accessToken,
            },
          };

          const response = await axios.request(config);
          setOwnerId(response.data);
        }
      } catch (error) {
        console.log(error);
         
      }
    };


    fetchImages();
    getOwnerId(recordId);
  }, [recordId]);

  getData = async () => {
    let token = await AsyncStorage.getItem("accessToken");
    const accessToken = "Bearer " + token;
    if (recordId) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${Config.apiServerUrl}/api/maintenance-record/get-records/${recordId}`,
        headers: {
          Authorization: accessToken,
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data[0]);
          setName(response.data[0].name);
          setMileage(response.data[0].kilometerDriven);
          setService(response.data[0].service);
          setRegistrationNumber(response.data[0].registrationNumber);
          setTyoe(response.data[0].type);
          setDateTime(response.data[0].maintanenceDateTime);
          setFetchedServiceDue(response.data[0].serviceDue);
          setOwnerName(response.data[0].vehicleOwner);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <ScrollView style={styles.wrap}
    contentContainerStyle={{ alignItems:"center",paddingBottom:hp("10%")}}>
     

    <View style={styles.box}>
      {/* Row 1 */}
      <View style={styles.row}>
        <Text style={styles.centeredText1}>Maintained By</Text>
        <Text style={styles.centeredText1}>Mileage</Text>
      </View>
      {/* Row 2 */}
      <View style={styles.rowWithMorePadding}>
        <Text style={styles.centeredText}>{name.split(" ")[0]}</Text>
        <Text style={styles.centeredText}>{Mileage} KM</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.centeredText1}>Registration Number</Text>
        <Text style={styles.centeredText1}>Type</Text>
      </View>

      <View style={styles.rowWithMorePadding}>
        
      <Text style={styles.centeredText}>{registrationNumber}</Text>
        <Text style={styles.centeredText}>{type}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.centeredText1}>Date</Text>
        <Text style={styles.centeredText1}>Time</Text>
      </View>

      <View style={styles.rowWithMorePadding}>
        <Text style={styles.centeredText}>{datePart}</Text>
        <Text style={styles.centeredText}>{timePart}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.centeredText1}>Service</Text>
        <Text style={styles.centeredText1}>Owner Name</Text>
      </View>

      <View style={styles.rowWithMorePadding}>
        <Text style={styles.centeredText}>{service}</Text>
        <TouchableOpacity style={[styles.centeredText, styles.hyperlinkText]}
          onPress={() =>
            navigation.navigate("CustomerDetails", {
              ownerid: ownerId,// Pass the ownerid as a parameter
            })
          }
        >
        <Text style={[styles.centeredText, styles.hyperlinkText]}>{ownerName}</Text>
        </TouchableOpacity>
        
      </View>

      <View style={styles.row}>
        <Text style={styles.centeredText1}>Service Due</Text>
        
      </View>

      <View style={styles.rowWithMorePadding}>
        <Text style={styles.centeredText}>{serviceDue}</Text>
        
      </View>
    </View>

      
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    zIndex: 1,
    overflow: "hidden",
    paddingBottom:wp("2%")
  },
  // hyperlink: {
  //   textDecorationLine: "underline",
  //   color: "#0073e6", // Change the color to your desired hyperlink color
  // },
  headingContainer: {
    marginBottom: hp('1%'),
    marginLeft:wp("5%") // Adjust margin as needed
  },
  heading: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    textAlign: 'left', // Align the heading to the left
  },
  subHeading: {
    fontSize: hp('1.5%'), // Adjust the font size as needed
    color: 'gray', // Customize the color
    textAlign: 'left', // Align the subheading to the left
  },
  
  box: {
    backgroundColor: Color.steelblue_300,
    padding: wp('3%'), // Adjusted padding
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

export default RecordDetails;
