import * as React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { Image } from "expo-image";
import ErrorPopup from "../components/ErrorPopup";
import Config from "../screens/Config";
import { useIsFocused } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const rem = screenWidth / 16;
function VehicleRecords({ dsearch, type, added, searchType, searchOrder }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [VehicleType, setVehicleType] = useState([]);
  const [SearchType, setSearchType] = useState("");
  const [SearchOrder, setSearchOrder] = useState("");
  const [asyncVehicleId, setAsyncvehicleId] = useState("");
  const [data, setData] = useState([]);
  const [currentPressedIndex, setCurrentPressedIndex] = useState(-1);
  const [vehicles, setVehicles] = useState([]);

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [tempVehicleid, setTempVehicleId] = useState("");
  const [imageApi,SetImageApi] = useState("");

  const displayedVehicles = useMemo(() => {
    let filteredVehicles;

    if (search) {
      filteredVehicles = data;
    } else {
      if (VehicleType !== "default") {
        filteredVehicles = vehicles.filter(
          (vehicle) => vehicle.type === VehicleType
        );
      } else {
        filteredVehicles = vehicles;
      }
    }
    const sortedVehicles = filteredVehicles.slice().sort((a, b) => {
      const dateA = new Date(a.dateCreated);
      const dateB = new Date(b.dateCreated);

      if (searchOrder === "descending") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return sortedVehicles;
  }, [search, data, vehicles, VehicleType, searchOrder]);

  deleteVehicle = async () => {
    const Business_id = await AsyncStorage.getItem("Business_id");
    const apiServerUrl = await AsyncStorage.getItem("apiServerUrl");
    
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${apiServerUrl}/api/vehicle/${Business_id}/${tempVehicleid}/delete-vehicle`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
            
          navigation.navigate("Login");
        }
      });
  };

  const setPopUp = (vehicleIds) => {
    setTempVehicleId(vehicleIds);
    setShowErrorPopup(true);
  };
  const handlePress = (vehicleId) => {
    setCurrentPressedIndex(vehicleId);
    navigation.navigate("VehicleDetails", { vehicleId });
  };

  useEffect(() => {
    setSearch(dsearch);
    setSearchType(searchType);
    setSearchOrder(searchOrder);
    const formattedQuery = dsearch.trim().toUpperCase();

    if (VehicleType === "default") {
      const maintained = vehicles.filter((vehicle) => {
        const modelMatches =
          vehicle.model && vehicle.model.toUpperCase().includes(formattedQuery);
        const makeMatches =
          vehicle.make && vehicle.make.toUpperCase().includes(formattedQuery);
        const yearMatches =
          vehicle.year && vehicle.year.includes(formattedQuery);
        const nameMatches =
          vehicle.name && vehicle.name.toUpperCase().includes(formattedQuery);
        const NumberMatches = vehicle.registrationNumber
          .toUpperCase()
          .includes(formattedQuery);
        const contactMatches =
          vehicle.phoneNumber && vehicle.phoneNumber.includes(formattedQuery);
        const parentCompany =
          vehicle.parentCompany &&
          vehicle.parentCompany.toUpperCase().includes(formattedQuery);
        return (
          modelMatches ||
          makeMatches ||
          yearMatches ||
          nameMatches ||
          NumberMatches ||
          contactMatches ||
          parentCompany
        );
      });

      setData(maintained);
    } else {
      const maintained = vehicles.filter((vehicle) => {
        const s = searchType;

        const modelMatches =
          vehicle.model &&
          vehicle.model.toUpperCase().includes(formattedQuery) &&
          vehicle.type == VehicleType;
        const makeMatches =
          vehicle.make &&
          vehicle.make.toUpperCase().includes(formattedQuery) &&
          vehicle.type == VehicleType;
        const yearMatches =
          vehicle.year &&
          vehicle.year.includes(formattedQuery) &&
          vehicle.type == VehicleType;
        const nameMatches =
          vehicle.name &&
          vehicle.name.toUpperCase().includes(formattedQuery) &&
          vehicle.type == VehicleType;
        const NumberMatches =
          vehicle.registrationNumber.toUpperCase().includes(formattedQuery) &&
          vehicle.type == VehicleType;
        const contactMatches =
          vehicle.phoneNumber &&
          vehicle.phoneNumber.includes(formattedQuery) &&
          vehicle.type == VehicleType;
        const parentCompany =
          vehicle.parentCompany &&
          vehicle.parentCompany.toUpperCase().includes(formattedQuery) &&
          vehicle.type == VehicleType;

        return (
          modelMatches ||
          makeMatches ||
          yearMatches ||
          nameMatches ||
          NumberMatches ||
          contactMatches ||
          parentCompany
        );
      });

      setData(maintained);
    }
  }, [dsearch, VehicleType, searchType, searchOrder]);

  const getData = async () => {
    const Business_id = await AsyncStorage.getItem("Business_id");
    let token = await AsyncStorage.getItem("accessToken");
    const accessToken = "Bearer " + token;
    const apiServerUrl = await AsyncStorage.getItem("apiServerUrl");
    if(apiServerUrl)
    {
    SetImageApi(apiServerUrl);
    console.log(imageApi);
    }
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiServerUrl}/api/vehicle/${Business_id}/get-all-vehicles`,
      headers: {
        Authorization: accessToken,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setVehicles(response.data.data);
        console.log(response.data.data);
        AsyncStorage.setItem(
          "VehicleId",
          JSON.stringify(response.data.data[0].id)
        );
        AsyncStorage.setItem(
          "registrationNumber",
          JSON.stringify(response.data.data[0].registrationNumber)
        );
      })
      .catch((error) => {
        if (error.response.status === 401) {
            
          navigation.navigate("Login");
        }
        console.log(error);
      });
  };



  useEffect(() => {
    if (isFocused) {
      setVehicleType(type);
      getData();
    }
  }, [isFocused], [type]);

  const handleDeleteVehicle = () => {
    setShowErrorPopup(false);
    deleteVehicle();
  };

  return (
    <View>
      <View>
        <ScrollView style={styles.scroll}>
          {displayedVehicles.map((vehicle, index) => (

            <View
              key={index}
              style={[
                currentPressedIndex === vehicle.id
                  ? styles.groupParentLayoutW
                  : styles.groupParentLayout,
              ]}
            >
              <Pressable
                onPress={() => handlePress(vehicle.id)}
              >
                <View style={{ flexDirection: 'row', gap: 15 }}>
                  <View>
                    {/* car image */}
                    {vehicle.vehicleMediaList &&
                      vehicle.vehicleMediaList.length > 0 ? (
                      <Image
                        style={[styles.rectangleIcon]}
                        contentFit="cover"
                        source={{ uri: `${imageApi}` + vehicle.vehicleMediaList[0] }}
                      />
                    ) : (
                      <Image
                        style={[styles.rectangleIcon]}
                        contentFit="cover"
                        source={require("../assets/carcitroentopvehiclesvgrepocom-1.png")}
                      />
                    )}
                  </View>
                 
                  <View style={{}}>
                    
                    {/* first line  */}
                    <View style={[styles.parentFlexBox]}>
                      <View style={[styles.frameParentLayout]}>
                        <Text
                          style={[
                            styles.landCruiserV8,
                            currentPressedIndex === vehicle.id
                              ? styles.name
                              : styles.name1Clr,
                          ]}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {vehicle.make} {vehicle.model} {vehicle.year}
                        </Text>
                      </View>
                      <View>
                        <ErrorPopup
                          visible={showErrorPopup}
                          message={"Are you sure you want to remove Vehicle?"}
                          onConfirm={() => handleDeleteVehicle()} // Use an arrow function here
                          onCancel={() => {
                            setShowErrorPopup(false);
                            setTempVehicleId(null); // Reset vehicleIds when the popup is closed
                          }}
                        />
                        <TouchableOpacity onPress={() => setPopUp(vehicle.id)}>
                          <FontAwesome
                            name="trash"
                            size={rem}
                            color={
                              currentPressedIndex === vehicle.id ? "white" : "black"
                            }
                          />
                        </TouchableOpacity>
                      </View>


                    </View>
                    {/* For Company Name  */}
                    {vehicle.parentCompany && (
                      <View style={[styles.parentFlexBox]}>
                        <Image
                          style={[styles.frameIconPositionn]}
                          contentFit="cover"
                          source={
                            currentPressedIndex === vehicle.id
                              ? require("../assets/frame.png")
                              : require("../assets/frame2.png")
                          }
                        />
                        <Text
                          style={[
                            styles.name,
                            currentPressedIndex === vehicle.id
                              ? styles.name
                              : styles.name1Clr,
                          ]}
                        >
                          Company Name
                        </Text>
                        <Text
                          style={
                            currentPressedIndex === vehicle.id
                              ? styles.text1Typo
                              : styles.text2Typo
                          }
                        >
                          {vehicle.parentCompany}
                        </Text>

                      </View>
                    )}
                    {/* Customer Name */}
                    <View style={[styles.parentFlexBox]}>
                      <Image
                        style={[styles.frameIconPositionn]}
                        contentFit="cover"
                        source={
                          currentPressedIndex === vehicle.id
                            ? require("../assets/frame.png")
                            : require("../assets/frame2.png")
                        }
                      />
                      <Text
                        style={[
                          styles.name,
                          currentPressedIndex === vehicle.id
                            ? styles.name
                            : styles.name1Clr,
                        ]}
                      >
                        Name
                      </Text>
                      <Text
                        style={
                          currentPressedIndex === vehicle.id
                            ? styles.text1Typo
                            : styles.text2Typo
                        }
                      >
                        {vehicle.name}
                      </Text>

                    </View>
                    {/* contact number  */}
                    <View style={[styles.parentFlexBox]}>
                      <Image
                        style={[styles.frameIconPosition]}
                        contentFit="cover"
                        source={
                          currentPressedIndex === vehicle.id
                            ? require("../assets/materialsymbolspermcontactcalendaroutline.png")
                            : require("../assets/materialsymbolspermcontactcalendaroutline1.png")
                        }
                      />
                      <Text
                        style={[
                          styles.name1,
                          currentPressedIndex === vehicle.id
                            ? styles.name
                            : styles.name1Clr,
                        ]}
                      >
                        Contact
                      </Text>
                      <Text
                        style={
                          currentPressedIndex === vehicle.id
                            ? styles.text1Typo
                            : styles.text2Typo
                        }
                      >
                        {vehicle.phoneNumber}
                      </Text>
                    </View>
                    {/* registrationNumber */}
                    <View style={[styles.parentFlexBox]}>
                      <Image
                        style={[
                          styles.frameIconPosition,
                        ]}
                        contentFit="cover"
                        source={
                          currentPressedIndex === vehicle.id
                            ? require("../assets/licenseplatenumbersvgrepocom-11.png")
                            : require("../assets/licenseplatenumbersvgrepocom-12.png")
                        }
                      />
                      <Text
                        style={[
                          styles.name1,
                          currentPressedIndex === vehicle.id
                            ? styles.name
                            : styles.name1Clr,
                        ]}
                      >
                        Registration Number
                      </Text>
                      <Text
                        style={[
                          styles.sa20021,
                          currentPressedIndex === vehicle.id
                            ? styles.text1Typo
                            : styles.text2Typo,
                        ]}
                      >
                        {vehicle.registrationNumber}
                      </Text>
                    </View>

                  </View>
                </View>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  scroll: {
    height: screenWidth * 1.3,
    width: screenWidth,
    marginTop: screenWidth * 0.57,
    // backgroundColor:'red'
  },
  groupParentLayout: {
    backgroundColor: Color.steelblue_300,
    padding: 0.5 * rem,
    marginVertical: 0.2 * rem,
    alignSelf: "center",
    width: screenWidth * 0.9,
    borderRadius: 8,
  },
  groupParentLayoutW: {
    backgroundColor: Color.darkslateblue,
    padding: 0.5 * rem,
    marginVertical: 0.2 * rem,
    alignSelf: "center",
    width: screenWidth * 0.9, // Set a maximum width (adjust as needed)
    borderRadius: 8,

  },

  filterTypo: {
    fontFamily: FontFamily.poppinsMedium,
    color: Color.darkslateblue,
  },
  filt: {
    top: 2,
    left: -6,
  },
  iconLayout3: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  vehiclesChildPosition: {
    width: 392,
    left: 12,
    position: "absolute",
  },
  textClr: {
    color: Color.white,
    textAlign: "left",
  },
  trashRow: {
    flexDirection: "row",
  },


  frameParentLayout: {
    // backgroundColor:'red',
    // height: rem,
    // width: screenWidth * 0.44,
    // backgroundColor:'red',
  },
  parentFlexBox: {
    flexDirection: "row",
    gap: 4,
  },
  nameTypo: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_smi,
  },
  text1Typo: {
    color: Color.gray_200,
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  frameIconPosition: {
    height: rem * 0.7,
    width: rem * 0.7,
  },
  frameIconPositionn: {
    height: 20,
    width: 20,
  },
  groupContainerPosition: {
    top: -6,
    // marginTop:-2,
    marginLeft: 142,
    position: "relative",
  },
  filterPosition: {
    top: 22,
    left: 22,
    position: "absolute",
  },
  frameGroupPosition: {
    flexDirection: 'row',
    gap: 4,
  },
  groupIconPosition: {
    top: 3,
    position: "absolute",
  },
  innerLayout: {
    backgroundColor: Color.steelblue_300,
    width: screenWidth * 0.94,
    borderRadius: Border.br_5xs,
    position: "absolute",
  },
  innerLayoutW: {
    backgroundColor: Color.darkslateblue,
    width: screenWidth * 0.94,
    borderRadius: Border.br_5xs,
    position: "absolute",
  },
  groupParentPosition: {
    left: screenWidth * 0.4,
    position: "absolute",
  },
  name1Clr: {
    color: Color.dimgray_200,
    textAlign: "left",
  },
  text2Typo: {
    color: Color.Black,
    marginLeft: 5,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },

  imageTypo: {
    color: Color.dimgray_100,
    left: 73,
    fontSize: FontSize.caption2Regular_size,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  text5Typo: {
    fontSize: FontSize.caption2Regular_size,
    textAlign: "left",
    fontWeight: "500",
  },
  materialIconLayout: {
    height: 15,
    width: 15,
    position: "absolute",
    overflow: "hidden",
  },
  corollaTypo: {
    textTransform: "uppercase",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  iconLayout2: {
    height: "100%",
    width: "100%",
  },
  iconLayout: {
    height: 153,
    width: 204,
    position: "absolute",
  },
  lightTexture22341Icon: {
    left: 2,
    width: 428,
    top: 0,
    position: "absolute",
    height: 932,
  },
  image2Icon: {
    top: 803,
    height: 129,
    display: "none",
  },
  groupChild: {
    backgroundColor: Color.gray_400,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    height: 60,
    top: 0,
  },
  groupItem: {
    top: 13,
    left: 43,
    width: 340,
    height: 50,
    position: "absolute",
  },
  vehicles1: {
    top: "0%",
    left: "69.64%",
    textAlign: "center",
    color: Color.darkslateblue,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    position: "absolute",
  },
  vectorIcon: {
    height: "88.85%",
    width: "9.77%",
    top: "8.33%",
    right: "90.23%",
    bottom: "2.82%",
    left: "0%",
    position: "absolute",
  },
  vehiclesParent: {
    height: "38.1%",
    width: "52.09%",
    top: "30.16%",
    right: "42.79%",
    bottom: "31.75%",
    left: "5.12%",
    position: "absolute",
  },
  wrapper: {
    width: 49,
    height: 43,
    top: 59,
    left: 19,
    position: "absolute",
  },
  rectangleParent: {
    top: 35,
    height: 63,
  },
  vehiclesChild: {
    top: 247,
    backgroundColor: Color.darkslateblue,
    height: 143,
    borderRadius: Border.br_5xs,
    width: 392,
  },
  text: {
    top: 262,
    textAlign: "left",
    textTransform: "uppercase",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    position: "absolute",
    left: 166,
  },
  name: {
    textAlign: "left",
    color: Color.white,
  },
  shahzoreAsif: {
    width: 100,
  },


  nameParentC: {
    top: 37,
    position: "absolute",
  },
  frameIcon: {
    width: 20,
    top: 18,
    overflow: "hidden",
  },

  frameParent: {
    width: 173,
    left: 0,
    top: 0,
  },
  contactParent: {
    flexDirection: "row",
    gap: 4,
  },
  materialSymbolspermContactParent: {
    width: 214,
    height: 22,
  },
  sa2002: {
    width: 62,
  },
  registrationNumberParent: {
    flexDirection: "row",
    left: screenWidth * 0.4,
  },

  frameGroup: {
    width: 229,
    top: 0,
    top: 18,
  },
  groupParent: {
    top: 291,
    left: screenWidth * 0.4,
    position: "absolute",
  },
  vehiclesItem: {
    top: 410,
    left: 24,
    height: 143,
  },
  civicX2020: {
    left: 1,
    textTransform: "uppercase",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    position: "absolute",
    top: 0,
  },
  name1: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_smi,
  },
  tahaMir: {
    width: 100,
  },
  sa20021: {
    width: 65,
  },
  groupContainer: {
    height: 84,
    width: 229,
  },
  civicX2020Parent: {
    top: 425,
    height: 113,
    width: 229,
  },
  vehiclesInner: {
    top: 0,
    height: screenWidth * 0.38,
  },
  vehiclesInnerJ: {
    top: 0,
    height: screenWidth * 0.32,
  },
  landCruiserV8: {
    textTransform: "uppercase",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    width: screenWidth * 0.52,
    // backgroundColor:'red',
  },

  rectangleIcon: {
    borderRadius: 79,
    width: screenWidth*0.22,
    height: screenWidth*0.22,
  },
  image: {
    bottom: 279,
  },
  rectangleView: {
    top: 736,
    height: 143,
    left: 19,
  },
  suzukiMehranVxr: {
    top: 751,
    textTransform: "uppercase",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    position: "absolute",
    left: 166,
  },
  groupParent2: {
    top: 780,
    left: screenWidth * 0.4,
    position: "absolute",
  },
  image1: {
    bottom: 116,
  },
  homeMutedIcon: {
    width: 12,
    height: 14,
  },
  housefill: {
    width: 14,
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    left: 0,
    top: 0,
    position: "absolute",
  },
  elementPosition: {
    left: 22,
    justifyContent: "center",
    height: 20,
    top: 0,
    position: "absolute",
  },
  text5: {
    lineHeight: 17,
    fontFamily: FontFamily.caption2Regular,
    color: Color.textTxtPrimary,
  },
  vehicles2: {
    top: 0,
    left: 32,
    fontSize: FontSize.size_sm,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.steelblue_100,
    textAlign: "left",
    position: "absolute",
  },
  breadcrumbs: {
    width: 88,
    top: 1,
  },
  materialSymbolsarrowRightAIcon: {
    left: 29,
    top: 0,
  },
  materialSymbolsarrowRightAIcon1: {
    top: 6,
    left: 33,
  },
  filter: {
    top: 2,
    position: "absolute",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsMedium,
    left: 0,
  },
  materialSymbolsarrowRightAParent: {
    left: 342,
    width: 48,
    top: 0,
  },
  breadcrumbsParent: {
    top: 110,
    width: 390,
    left: 19,
  },
  groupInner: {
    // height: 55,
    left: 0,
    top: 0,
  },
  corollaGli2015: {
    top: 14,
    left: 21,
    textAlign: "left",
    color: Color.darkslateblue,
  },
  icon1: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  vector: {
    left: "86.39%",
    top: "14.57%",
    right: "8.16%",
    bottom: "67.21%",
    width: "5.45%",
    height: "18.22%",
    position: "absolute",
  },
  corollaGli20151: {
    top: 87,
    left: 146,
    textAlign: "left",
    textTransform: "uppercase",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  rectangleGroup: {
    top: 152,
    height: 111,
  },
  groupIcon: {
    width: 372,
    left: 29,
    height: 43,
  },
  maskGroupIcon: {
    top: 47,
    left: 372,
    width: 31,
    height: 31,
    position: "absolute",
  },
  maskGroupIcon1: {
    top: 292,
    width: 18,
    height: 18,
    left: 166,
    position: "absolute",
  },
  vehiclesChild1: {
    top: 476,
    left: 102,
    width: 55,
    height: 10,
    position: "absolute",
  },
  image3Icon: {
    top: 259,
    left: 33,
  },
  image4Icon: {
    top: 416,
    left: 14,
  },
  ellipseIcon: {
    top: 433,
    width: 103,
    height: 103,
  },
  hondaCivicTurbo21Icon: {
    top: 320,
    left: 173,
    width: 286,
    height: 191,
    position: "absolute",
  },
  vehicles: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    width: "100%",
    height: 932,
  },
});

export default VehicleRecords;
