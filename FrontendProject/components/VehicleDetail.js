import * as React from "react";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Modal, TouchableOpacity,ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {AntDesign} from "@expo/vector-icons";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';


function RecordDetails({recordId}) {

  const [ownerId,setOwnerId] = useState('');
  const [ownerName,setOwnerName] = useState('');
  const [detail , setDetail]=useState('');
  const [name, setName]=useState('');
  const [Mileage,setMileage]=useState('');
  const [service,setService]=useState('');
  const [type,setTyoe]=useState('');
  const [dateTime,setDateTime]=useState('');

  const [datePart, timePart] = dateTime.split('T');
  const [registrationNumber,setRegistrationNumber]=useState('');
  const [imageResponce,setImageResponce] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchedImages,setFetchedImages] = React.useState([]);
  const [baseUrl, setBaseUrl] = useState('http://192.168.0.236:8080');
  const navigation = useNavigation();
  const [originalUri,setOriginalUri] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    const fetchImages = async () => {
      try {
        setLoading(true); // Set loading to true while fetching
        let token = await AsyncStorage.getItem("accessToken");
        const accessToken = 'Bearer ' + token;

        if (recordId) {
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://192.168.0.236:8080/api/maintenance-record/${recordId}/images`,
            headers: {
              'Authorization': accessToken
            }
          };
    
          const response = await axios.request(config);
          const imageUrls = response.data.map(item => baseUrl + item.url);
          setFetchedImages(imageUrls);
          setLoading(false); // Set loading to false when images are fetched
        }
      } catch (error) {
        console.log(error);
        setLoading(false); // Make sure to set loading to false in case of an error
      }
    };

    fetchImages();

    const getOwnerId = async () => {
      try {
        const storedOwnerId = await AsyncStorage.getItem('ownerId');
        if (storedOwnerId !== null) {
          setOwnerId(storedOwnerId);
          console.log('Successfully retrieved ownerId from AsyncStorage:', storedOwnerId);
        } else {
          console.log('ownerId not found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error retrieving ownerId from AsyncStorage:', error);
      }
    };
    
    getOwnerId();
    if(ownerId)
    {
      getOwnerInfo(ownerId);
    }

  },[recordId,ownerId]);

  const getOwnerInfo = async (ownerId) => {
    if(ownerId)
    {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://192.168.0.236:8080/api/users/${ownerId}`, // Use backticks
      headers: {}
    };
  
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setOwnerName(response.data.firstName);
      })
      .catch((error) => {
        console.log(error);
      });
  }};

  getData=async()=>{
    let token= await AsyncStorage.getItem("accessToken");
    const accessToken = 'Bearer ' + token;
    if(recordId)
    {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://192.168.0.236:8080/api/maintenance-record/get-records/${recordId}`,
      headers: { 
        'Authorization':accessToken
      }
    };
    
    axios.request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      setDetail(response.data[0].maintanenceDetail);
      setName(response.data[0].name);
      setMileage(response.data[0].kilometerDriven);
      setService(response.data[0].service);
      setRegistrationNumber(response.data[0].registrationNumber);
      setTyoe(response.data[0].type);
      setDateTime(response.data[0].maintanenceDateTime);
     
    })
    .catch((error) => {
      console.log(error);
    });
  }
  };


  const renderCarouselItem = ({ item }) => {
    return (
      <TouchableOpacity
       onPress={() => handleOpen(item)}>
      <Image
        source={{ uri: item }}
        style={styles.carouselImage}
        contentFit="cover"
      />
      </TouchableOpacity>
    );
  };

  const handleOpen = (uri) => {
    setOriginalUri(uri);
    if(originalUri)
    {
    setModalVisible(true);
  }
};

  const handleClose = () => {
    setModalVisible(false);
    setOriginalUri('');
  };

  const calculateServiceDue = () => {
    const serviceTypeMap = {
      'Car': {
        'Oil Change': {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 3000,
        },
        'Car Wash': {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 1000,
        },
        'Car Maintenance': {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 15000,
        },
        'Alignment': {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 2000,
        },
        'Servicing': {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 2500,
        },
      },
      'Auto': {
        'Oil Change': {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 3000,
        },
        'Car Wash': {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 1000,
        },
        'Car Maintenance': {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 1350,
        },
        'Alignment': {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 1800,
        },
        'Servicing': {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 2250,
        },
      },
      'Bike': {
        'Oil Change': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1000,
        },
        'Car Wash': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 600,
        },
        'Car Maintenance': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 900,
        },
        'Alignment': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1200,
        },
        'Servicing': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1500,
        },
      },
      'Truck': {
        'Oil Change': {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 10000,
        },
        'Car Wash': {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 2000,
        },
        'Car Maintenance': {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 3000,
        },
        'Alignment': {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 4000,
        },
        'Servicing': {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 5000,
        },
      },
      'Other': {
        'Oil Change': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1000,
        },
        'Car Wash': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1000,
        },
        'Car Maintenance': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 2000,
        },
        'Alignment': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1200,
        },
        'Servicing': {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1500,
        },
      },
    };
  
  
  
  
    if (serviceTypeMap[type] && serviceTypeMap[type][service]) {
      const { kilometersDrivenPerDay, totalKilometersBetweenServices } = serviceTypeMap[type][service];
      const daysUntilNextService = totalKilometersBetweenServices / kilometersDrivenPerDay;
      return addDays(datePart, Math.floor(daysUntilNextService));
    }
  
    return addDays(datePart, 30); // Default value if service or type is unknown
  };
  
  

  // Function to add days to a date
  const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
  
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(newDate.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  

  const serviceDue = calculateServiceDue();

  return (
    <ScrollView style={styles.wrap}>

     
{/* car image  */}

     <View style={styles.Carousalcontainer}>
     {loading ? (
        <ActivityIndicator size="large" color="#007aff" />
      ) : (
        fetchedImages.length > 0 && (
          <View style={styles.imageContainer}>
            <Carousel
              data={fetchedImages}
              renderItem={renderCarouselItem}
              sliderWidth={350}
              itemWidth={400}
              onSnapToItem={(index) => setActiveSlide(index)}
              sliderHeight={100}
            />

            <Pagination
              dotsLength={fetchedImages.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="#007aff"
              dotStyle={styles.paginationDot}
              inactiveDotColor="#ccc"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
        )
      )}
     </View>
     {/* modal */}

     <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
        <Image source={{ uri: originalUri }} style={styles.modalMedia} contentFit="contain" />
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <AntDesign name="closecircle" size={30} color="rgba(3, 29, 68, 1)" />
          </TouchableOpacity>
        </View>
      </Modal>

     {/* details  */}
      <View style={styles.detailsParent}>
        <Text style={[styles.details, styles.abc123Clr]}>Details:</Text>
        <Text style={[styles.carWasMaintained, styles.jan2023Positionn]}>
        {detail}
        </Text>
      </View>

      {/* blue div  */}

      <View style={[styles.vectorGroup, styles.vectorGroupLayout]}>

        <View style={[styles.frameParent, styles.frameParentPosition]}>
          <View style={styles.frameWrapper}>
            <View style={styles.mileageWrapper}>
              <Text style={styles.dateTypo}>Mileage</Text>
            </View>
          </View>
          <View style={[styles.kmWrapper, styles.jan2023Position]}>
            <Text style={[styles.km, styles.kmTypo]}>{Mileage} km</Text>
          </View>
        </View>
        <View style={[styles.frameContainer, styles.waleedAliPosition]}>
          <View />
        </View>
        <Text
          style={[styles.registrationNumber, styles.dateTypo]}>{`Registration Number `}</Text>
        <Text style={[styles.abc1231, styles.kmTypo]}>{registrationNumber}</Text>
        <Text style={[styles.maintainedBy, styles.dateTypo]}>
          Maintained By
        </Text>
        <Text style={[styles.waleedAli, styles.waleedAliPosition]}>
          {name}
        </Text>
        <View style={[styles.jan2023Parent, styles.parentPosition]}>
          <Text style={[styles.jan2023, styles.jan2023Position]}>
            {datePart}
          </Text>
          <Text style={[styles.date, styles.dateTypo]}>Date</Text>
        </View>
        <View style={styles.carWashParent}>
          <Text style={[styles.jan2023, styles.jan2023Position]}>{service}</Text>
          <Text style={[styles.date, styles.dateTypo]}>Service</Text>
        </View>
        <View style={styles.carWashParent1}>
        <TouchableOpacity 
        onPress={()=> navigation.navigate("CustomerDetails")}>
          <Text style={[styles.jan2023, styles.jan2023Position,styles.hyperlink]}>{ownerName}</Text>
          </TouchableOpacity>
          <Text style={[styles.date, styles.dateTypo]}>Vehicle Owner</Text>
        </View>
        <View style={[styles.pmParent, styles.parentPosition]}>
          <Text style={[styles.jan2023, styles.jan2023Position]}>{timePart}</Text>
          <Text style={[styles.date, styles.dateTypo]}>Time</Text>
        </View>
        <View style={[styles.carWrapper, styles.typePosition]}>
          <Text style={[styles.km, styles.kmTypo]}>{type}</Text>
        </View>
        <Text style={[styles.type, styles.typePosition]}>{`Type `}</Text>
        <View style={styles.carWashParent2}>
          <Text style={[styles.jan2023, styles.jan2023Position]}>{serviceDue}</Text>
          <Text style={[styles.date, styles.dateTypo]}>Service Due</Text>
        </View>
      
      </View>
     



    </ScrollView>
  );
}
const styles = StyleSheet.create({
  hyperlink: {
    textDecorationLine: 'underline',
    color: '#0073e6', // Change the color to your desired hyperlink color
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalMedia: {
    width: '100%',
    height: '100%',
    // aspectRatio: 1, // This maintains the original image's aspect ratio
  },
  closeButton: {
    position: 'absolute',
    top: 10, // Adjust the top positioning as needed
    right: 10, // Adjust the right positioning as needed
    zIndex: 1, // Ensure the button appears above the image
  },
  carouselImage: {
  width: "100%",
  height: "100%",
  justifyContent: 'center',
  // alignItems: 'center',
  position:"relative",
  left:"5%"
},

  vehicleComponent:{
    top:-230,
  },
  carouselItem: {
    width: "100%",
    height: "100%",
    position:"relative",
    justifyContent: 'center',
    alignItems:'center',
  },
  paginationContainer: {
    paddingVertical: 5,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  imageUpload:{
    position:"absolute",

  },
  Carousalcontainer: {
    height:"40%",
    // backgroundColor:"red",
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative',
  },
  imageContainer: {
    position: 'relative',
    width: "90%",
    height: "90%",
    // backgroundColor:"blue",
    
  },
  image: {
    width: "100%",
    height: "100%",
    contentFit: 'cover',
  },
  
  childViewPosition: {
    width: 430,
    left: -6.5,
    position: "relative",
  },
  cont:{
    padding:6,
    top:-14,
    right:5,
    zIndex:999,
  },
  groupInnerLayout: {
    height: 43,
    position: "absolute",
  },
  housefillFlexBox: {
    justifyContent: "center",
    position: "absolute",
  },
  wrap:{
    marginTop:0,
    // height:538,
    width:"100%",
    zIndex:1,
    overflow:"hidden",
  },
  textFlexBox: {
    textAlign: "left",
    color: Color.textTxtPrimary,
  },
  abc123Clr: {
    color: Color.darkslateblue,
    textAlign: "left",
    position: "relative",
  },
  kmTypo: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
  },
  text2Typo: {
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "700",
  },
  vectorGroupLayout: {
    height: 380,
    width: 400,
    marginTop:20,
    position: "relative",
    backgroundColor:"#c2e0f2",
  },
  vectorGroupLayoutt: {
    height: 301,
    width: 392,
    
    position: "relative",
  },
  frameParentPosition: {
    top: 25,
    position: "absolute",
  },
  jan2023Position: {
    top: 26,
    position: "relative",
    width:200
  },
  jan2023Positionn: {
    top: 0,
    marginTop:5,
    position: "relative",
  },
  waleedAliPosition: {
    top: 51,
    left: 25,
    position: "absolute",
  },
  dateTypo: {
    color: Color.dimgray_100,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    fontSize: FontSize.size_base,
    // fontWeight:700,
  },
  parentPosition: {
    top: 167,
    height: 50,
    position: "absolute",
  },
  typePosition: {
    left: 279,
    position: "absolute",
  },
  homeTypo: {
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    textAlign: "center",
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "700",
    position: "absolute",
  },
  iconLayout: {
    height: 45,
    width: 45,
    top: 845,
    position: "absolute",
  },
  svgrepoIconLayout: {
    height: 26,
    width: 26,
    top: 855,
    position: "absolute",
    overflow: "hidden",
  },
  frameLayout: {
    height: 104,
    width: 104,
    top: 777,
    position: "absolute",
  },
  vectorIconLayout: {
    bottom: "68.68%",
    top: 0,
    width: "2.74%",
    height: "2.15%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  lightTexture22341Icon: {
    top: 0,
    height: 932,
    width: 430,
  },
  groupChild: {
    top: -6,
    height: 80,
  },
  groupItem: {
    top: 13,
    left: 43,
    width: 340,
    height: 50,
    position: "absolute",
  },
  maintenanceRecord: {
    top: "0%",
    left: "38.69%",
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "700",
    color: Color.textTxtPrimary,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  vectorIcon: {
    height: "94.85%",
    width: "28.98%",
    top: "1.33%",
    right: "92.02%",
    bottom: "2.82%",
    left: "1%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  maintenanceRecordParent: {
    height: "38.1%",
    width: "63.72%",
    top: "25.16%",
    right: "31.16%",
    bottom: "31.75%",
    left: "5.12%",
    position: "absolute",
  },
  groupInner: {
    top: 59,
    width: 49,
    left: 19,
  },
  vectorParent: {
    top: 40,
    height: 63,
  },
  homeMutedIcon: {
    height: 14,
    width: 12,
  },
  housefill: {
    alignItems: "center",
    width: 12,
    height: 20,
    left: 0,
    top: 0,
  },
  text: {
    top: 2,
    left: 81,
    width: 4,
    fontFamily: FontFamily.caption2Regular,
    lineHeight: 17,
    fontSize: FontSize.caption2Regular_size,
    textAlign: "left",
    fontWeight: "500",
    position: "absolute",
  },
  breadcrumbs: {
    width: 85,
    height: 20,
    left: 0,
    top: 0,
    position: "absolute",
  },
  abc123: {
    left: 92,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    top: 2,
  },
  text1: {
    fontFamily: FontFamily.caption2Regular,
    lineHeight: 17,
    fontSize: FontSize.caption2Regular_size,
    textAlign: "left",
    fontWeight: "500",
  },
  element: {
    left: 18,
    height: 20,
    top: 0,
  },
  record: {
    left: 27,
    color: Color.steelblue_100,
    fontSize: FontSize.size_sm,
    top: 2,
    position: "absolute",
  },
  breadcrumbsParent: {
    top: 115,
    width: 149,
    height: 20,
    left: 19,
    position: "absolute",
  },
  text2: {
    fontSize: FontSize.size_lg,
    textTransform: "uppercase",
    left: 22,
    top: 123,
    textAlign: "left",
    color: Color.textTxtPrimary,
    position: "absolute",
  },
  rectangleIcon: {
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
  },
  mileageWrapper: {
    flexDirection: "row",
  },
  frameWrapper: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  km: {
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
  },
  kmWrapper: {
    flexDirection: "row",
    alignItems: "center",
    left: 0,
  },
  frameParent: {
    width: 86,
    left: 281,
    height: 50,
  },
  frameContainer: {
    left: 25,
  },
  registrationNumber: {
    top: 95,
    left: 25,
    position: "absolute",
  },
  abc1231: {
    top: 121,
    left: 25,
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  maintainedBy: {
    left: 25,
    top: 25,
    position: "absolute",
  },
  waleedAli: {
    left: 25,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    color: Color.Black,
    fontSize: FontSize.size_base,
    
  },
  jan2023: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    color: Color.textTxtPrimary,
    fontSize: FontSize.size_base,
    left: 0,
  },
  date: {
    left: 0,
    top: 0,
    position: "absolute",
    width:200
  },
  jan2023Parent: {
    width: 98,
    left: 25,
  },
  carWashParent: {
    top: 230,
    width: 79,
    left: 25,
    height: 50,
    position: "absolute",
  },
  carWashParent2: {
    top: 290,
    width: 79,
    left: 25,
    height: 50,
    position: "absolute",
  },
  carWashParent1: {
    top: 230,
    width: 79,
    left: 280,
    height: 50,
    position: "absolute",
  },
  pmParent: {
    width: 61,
    left: 281,
  },
  carWrapper: {
    flexDirection: "row",
    top: 123,
    alignItems: "center",
  },
  type: {
    top: 98,
    color: Color.dimgray_100,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    fontSize: FontSize.size_base,
  },
  vectorGroup: {
    left: 5,
  },
  details: {
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    width: 72,
    fontSize: FontSize.size_base,
    color: Color.Black,
    left: 0,
    
  },
  carWasMaintained: {
    left: 1,
    width: 392,
    top: 0,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    color: Color.Black,
    fontSize: FontSize.size_base,
    fontWeight:700,
  },
  detailsParent: {
    top: 0,
    width: 393,

    left: 20,
    position: "relative",
  },
  maintenanceDetailViewChild: {
    top: 3,
    left: 29,
    width: 372,
  },
  maintenanceDetailViewItem: {
    top: 830,
    backgroundColor: Color.steelblue_300,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    height: 102,
  },
  maintenanceDetailViewInner: {
    top: 917,
    left: 139,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.textTxtPrimary,
    width: 154,
    height: 6,
    position: "absolute",
  },
  home: {
    top: 895,
    lineHeight: 18,
    left: 22,
  },
  vehicles: {
    left: 99,
    top: 895,
    lineHeight: 18,
  },
  addVehicle: {
    top: 867,
    left: 172,
  },
  records: {
    left: 271,
    top: 895,
    lineHeight: 18,
  },
  invoices: {
    left: 359,
    top: 895,
    lineHeight: 18,
  },
  ellipseIcon: {
    left: 20,
  },
  homeMutedIcon1: {
    width: 25,
    height: 27,
  },
  housefill1: {
    top: 852,
    left: 31,
    alignItems: "center",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    left: 277,
  },
  groupIcon: {
    left: 105,
  },
  container: {
    left: 365,
  },
  invoiceWarrantyLineSvgrepoIcon: {
    left: 375,
  },
  frame: {
    left: 163,
  },
  maintenanceDetailViewChild1: {
    left: 164,
  },
  maskGroupIcon: {
    top: 48,
    left: 372,
    width: 31,
    height: 31,
    position: "absolute",
  },
  microphoneSvgrepoCom1Icon: {
    left: 287,
  },
  maintenanceDetailViewChild2: {
    top: 0,
    height: 223,
  },
  maintenanceDetailViewChild3: {
    top: 0,
    left: 182,
    width: 55,
    height: 9,
    position: "relative",
  },
  vectorIcon1: {
    right: "6.77%",
    left: "90.49%",
  },
  vectorIcon2: {
    right: "92.61%",
    left: "4.65%",
  },
  maintenanceDetailView: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    height: 932,
    width: "100%",
  },

});

export default RecordDetails;