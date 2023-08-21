import * as React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text,TextInput, ScrollView,TouchableOpacity, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Vehicles from "../screens/Vehicles";
function VehicleRecords({dsearch,type,searchType,searchOrder}) {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [VehicleType, setVehicleType] = useState([]);
    const [SearchType, setSearchType]= useState('');
    const [SearchOrder, setSearchOrder]= useState('');

    const [data, setData] = useState([]);
    const [currentPressedIndex, setCurrentPressedIndex] = useState(-1);
    const [ vehicles, setVehicles]= useState([]);


    const displayedVehicles = useMemo(() => {
        let filteredVehicles;
    
        if (search) {
            filteredVehicles = data;
        } else {
            if (VehicleType !== 'default') {
                filteredVehicles = vehicles.filter((vehicle) => vehicle.type === VehicleType);
            } else {
                filteredVehicles = vehicles;
            }
        }
        // console.log(searchOrder);
        const sortedVehicles = filteredVehicles.slice().sort((a, b) => {
            const dateA = new Date(a.dateCreated);
            const dateB = new Date(b.dateCreated);
            
            if (searchOrder === "ascending") {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
    
        return sortedVehicles;
    }, [search, data, vehicles, VehicleType, searchOrder]);
    

      
    const handlePress = ( vehicleId) => {
        setCurrentPressedIndex(vehicleId);
        // console.log(vehicleId);
          navigation.navigate("VehicleDetails", { vehicleId });
    };

    useEffect(() => {
        setSearch(dsearch);
        setSearchType(searchType);
        setSearchOrder(searchOrder);
        // console.log(searchType);
        const formattedQuery = dsearch.trim().toUpperCase();
        
        if (VehicleType === "default") {
            const maintained = vehicles.filter((vehicle) => {
                if (!searchType.length > 0) {
                    const modelMatches = vehicle.model.toUpperCase().includes(formattedQuery);
                    const makeMatches = vehicle.make.toUpperCase().includes(formattedQuery);
                    const yearMatches = vehicle.year.includes(formattedQuery);
                    const nameMatches = vehicle.firstName.toUpperCase().includes(formattedQuery) || vehicle.lastName.toUpperCase().includes(formattedQuery);
                    return modelMatches || makeMatches || yearMatches || nameMatches;
                } else {
                    const searchTypeMatches = searchType.some(property => {
                        console.log(property);
                        if (property === "firstName") {
                            
                            const nameMatches = (vehicle.name.toUpperCase().toString().includes(formattedQuery));
                            return nameMatches;
                            
                        }
                        if (vehicle[property]) {
                            return vehicle[property].toUpperCase().includes(formattedQuery);
                        }
                        return false;
                    });
                    return searchTypeMatches;
                }
            });
    
            setData(maintained);
        } else {
            const maintained = vehicles.filter((vehicle) => {
                const s = searchType;
                if (!searchType.length > 0) {
                    const modelMatches = vehicle.model.toUpperCase().includes(formattedQuery) && vehicle.type === VehicleType;
                    const makeMatches = vehicle.make.toUpperCase().includes(formattedQuery) && vehicle.type === VehicleType;
                    const yearMatches = vehicle.year.includes(formattedQuery) && vehicle.type === VehicleType;
                    const nameMatches = (vehicle.firstName.toUpperCase().includes(formattedQuery) || vehicle.lastName.toUpperCase().includes(formattedQuery)) && vehicle.type === VehicleType;
                    return modelMatches || makeMatches || yearMatches || nameMatches;
                } else {
                    const searchTypeMatches = searchType.some(property => {
                        if (property === "firstName") {
                            const nameMatches = (vehicle.firstName.toUpperCase().includes(formattedQuery) )&& vehicle.type ==  VehicleType;
                            return nameMatches;
                        }
                        if (vehicle[property]) {
                            return vehicle[property].toUpperCase().includes(formattedQuery);
                        }
                        return false;
                    });
                    return searchTypeMatches && vehicle.type === VehicleType;
                }
            });
    
            setData(maintained);
        }
        
    }, [dsearch, VehicleType, searchType, searchOrder]);
       

      getData = async () =>{

        const Business_id = await AsyncStorage.getItem("Business_id");
        let token= await AsyncStorage.getItem("accessToken");
        const accessToken = 'Bearer ' + token;
        
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://192.168.100.71:8080/api/vehicle/${Business_id}/get-all-vehicles`,
            headers: { 
              'Authorization': accessToken
            }
          };
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setVehicles(response.data.data); 
            
          })
          .catch((error) => {
            console.log(error);
          });
          
        
      };


      useEffect(() => {
        setVehicleType(type);
        getData();
      }, [type]);


    //   console.log(displayedVehicles);

    return (

        <ScrollView style={styles.scroll}>
            {displayedVehicles.map((vehicle) => (
                <Pressable
                style={[styles.groupFrame, styles.groupParentLayout]}
                    onPress={() => handlePress(vehicle.id)}
                >
                    <View style={[styles.groupParent1, styles.groupParentLayout]}>
                        {/* blue  */}
                        <View style={[styles.vehiclesInner,
                            currentPressedIndex === vehicle.id ? styles.innerLayoutW : styles.innerLayout,
                             ]} />

                        <View style={[styles.frameParent1, styles.frameParentLayout]}>
                            <View style={[styles.nameParent, styles.parentFlexBox]}>
                                <Text style={[
                                     styles.name,
                                     currentPressedIndex === vehicle.id ? styles.name:styles.name1Clr
                                     ]}>Name</Text>
                                <Text style={
                                    currentPressedIndex === vehicle.id ? styles.text1Typo :styles.text2Typo
                                    }>{vehicle.name}</Text>
                                <Image
                                    style={[styles.frameIconn, styles.frameIconPositionn]}
                                    contentFit="cover"
                                     source={
                                        currentPressedIndex === vehicle.id ? require("../assets/frame.png") :   require("../assets/frame2.png")}
                                />
                            </View>
                            <Text style={[styles.landCruiserV8,
                                 currentPressedIndex === vehicle.id ? styles.name:styles.name1Clr
                                 ]}>
                                {vehicle.make}  {vehicle.model}  {vehicle.year}
                            </Text>

                        </View>
                        {/* car image  */}
                        <Image
                            style={[styles.rectangleIcon, styles.iconPosition]}
                            contentFit="cover"
                            source={require("../assets/rectangle-64.png")}
                        />
                        <View
                            style={[
                                styles.materialSymbolspermContactParent,
                                styles.groupContainerPosition,
                            ]}
                        >
                            <Image
                                style={[styles.frameIcon, styles.frameIconPosition]}
                                contentFit="cover"
                                source={
                                    currentPressedIndex === vehicle.id ? require("../assets/materialsymbolspermcontactcalendaroutline.png") : require("../assets/materialsymbolspermcontactcalendaroutline1.png")}
                            />
                            <View style={[styles.contactParent, styles.filterPosition]}>
                                <Text style={[styles.name1,
                                     currentPressedIndex === vehicle.id ? styles.name:styles.name1Clr
                                     ]}>Contact</Text>
                                <Text style={
                                    currentPressedIndex === vehicle.id ? styles.text1Typo :styles.text2Typo
                                    }>{vehicle.phoneNumber}</Text>
                            </View>
                        </View>
                        <View style={[styles.frameGroup, styles.frameGroupPosition]}>
                            <View
                                style={[styles.registrationNumberParent, styles.groupIconPosition]}
                            >
                                <Text style={[styles.name1,
                                     currentPressedIndex === vehicle.id ? styles.name:styles.name1Clr
                                     ]}>
                                    Registration Number
                                </Text>
                                <Text style={[styles.sa20021,
                                 currentPressedIndex === vehicle.id ? styles.text1Typo :styles.text2Typo
                                ]}>{vehicle.registrationNumber}</Text>
                            </View>
                            <Image
                                style={[
                                    styles.licensePlateNumberSvgrepoCIcon,
                                    styles.frameGroupPosition,
                                ]}
                                contentFit="cover"
                                source={
                                    currentPressedIndex === vehicle.id ? require("../assets/licenseplatenumbersvgrepocom-11.png")  :  require("../assets/licenseplatenumbersvgrepocom-12.png")
                                }
                            />
                        </View>
                    </View>
                </Pressable>
            ))}
        </ScrollView>

    );
}
const styles = StyleSheet.create({

    scroll:{
        marginTop:225,
        height:538,
        marginLeft:13,
        width:385,
        zIndex:1,
    },
    image2IconPosition: {
        width: 430,
        left: -5,
        position: "absolute",
    },
    groupParent1: {
        top: 0,
        left: 0,
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
    groupParentLayout: {
        height: 132,
        width: 392,
        left: 5,
        position: "relative",
        alignItems: 'flex-start',
        flexWrap: "wrap",
        marginTop: 5,
        marginBottom: 20, 
      },
      
       
    frameParentLayout: {
        height: 21,
        position: "absolute",
    },
    parentFlexBox: {
        flexDirection: "row",
        left: 164,
    },
    nameTypo: {
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_smi,
    },
    text1Typo: {
        marginLeft: 5,
        color: Color.gray_200,
        fontSize: FontSize.size_smi,
        textAlign: "left",
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
    },
    frameIconPosition: {
        height: 20,
        left: -10,
        position: "absolute",
    },
    frameIconPositionn: {
        height: 20,
        left: -33,
        position: "absolute",
    },
    groupContainerPosition: {
        top: 50,
        left: 140,
        position: "absolute",
    },
    filterPosition: {
        top: 20,
        left: 22,
        position: "absolute",
    },
    frameGroupPosition: {
        height: 25,
        left: 65,
        position: "absolute",
    },
    groupIconPosition: {
        top: 3,
        position: "absolute",
    },
    innerLayout: {
        backgroundColor: Color.steelblue_300,
        width: 375,
        borderRadius: Border.br_5xs,
        position: "absolute",
    },
    innerLayoutW: {
        backgroundColor: Color.darkslateblue,
        width: 375,
        borderRadius: Border.br_5xs,
        position: "absolute",
    },
    groupParentPosition: {
        left: 165,
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
    iconPosition: {
        left: 10,
        position: "absolute",
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
    nameParent: {
        top: 37,
        position: "absolute",
    },
    frameIcon: {
        width: 20,
        top: 18,
        overflow: "hidden",
    },
    frameIconn: {
        width: 20,
        top: 0,
        overflow: "hidden",
    },
    frameParent: {
        width: 173,
        left: 0,
        top: 0,
    },
    contactParent: {
        flexDirection: "row",
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
        left: 98,
    },
    licensePlateNumberSvgrepoCIcon: {
        width: 20,
        top: 0,
        overflow: "hidden",
    },
    frameGroup: {
        width: 229,
        top: 100,
    },
    groupParent: {
        top: 291,
        left: 165,
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
        width: 62,
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
        top: -5,
        height: 143,

    },
    landCruiserV8: {
        top: 7,
        textTransform: "uppercase",
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        fontSize: FontSize.size_base,
        position: "absolute",
        left: 132,
        width: 300,
    },
    frameParent1: {
        width: 175,
        left: 0,
        top: 0,
    },

    rectangleIcon: {
        borderRadius: 79,
        width: 100,
        top: 18,
        height: 100,
        
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
        left: 165,
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
        height: 55,
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