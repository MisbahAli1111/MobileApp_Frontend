import { useState, useEffect, useMemo } from "react";
import { Image } from "expo-image";
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    View,
    Text,
    Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import Footer from "../components/Footer";
import axios from "axios";
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "./Config";
import Icon from "react-native-vector-icons/FontAwesome";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const rem = screenWidth / 16;
let invoiceR=-1;
const MaintenanceRecord = ({ route }) => {
    const { fromPreviousScreen } = route.params;
    const navigation = useNavigation();
    const [searchType, setSearchType] = useState([]);
    const [searchOrder, setSearchOrder] = useState("");
    const [search, setSearch] = useState("");
    const [filterSearchClicked, setFilterSearchClicked] = useState(false);
    const [create, setCreate] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [records, setRecords] = useState([]);
    const isFocused = useIsFocused();
    const [currentPressedIndex, setCurrentPressedIndex] = useState(-1);

    useEffect(() => {
        if (isFocused) {
          getData();
        }
      }, [isFocused]);

      getData = async () => {
        const Business_id = await AsyncStorage.getItem("Business_id");
    
        let token = await AsyncStorage.getItem("accessToken");
        const accessToken = "Bearer " + token;
        // 192.168.100.71
    
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${Config.apiServerUrl}/api/maintenance-record/get-all-records/${Business_id}`,
          headers: {
            Authorization: accessToken,
          },
        };
    
        axios
          .request(config)
          .then((response) => {
            setRecords(response.data);
            return response.data;
          })
          .catch((error) => {
            console.log(error);
             if (error.response.status === 401) {
             
              navigation.navigate("Login");
            }
          });
      };
      const handlePress = (index, recordId) => {
          setCurrentPressedIndex(index);
          invoiceR=recordId;
        // console.warn(invoiceR);
      };
      const formatDateTime = (isoDateTime) => {
        const date = new Date(isoDateTime);
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
        const day = date.getDate().toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        return `${month}/${day}/${year}`;
      };

      createInvoice=()=>{
        // console.warn(invoiceR);
        if(invoiceR!=-1)
        navigation.navigate("CreateInvoice", { recordId: invoiceR });
      }

    return (
        <View style={styles.maintenanceRecord}>
            <Image
                style={styles.lightTexture22341Icon}
                contentFit="cover"
                source={require("../assets/light-texture2234-1.png")}
            />
            <Image
                style={styles.image2Icon}
                contentFit="cover"
                source={require("../assets/image-2.png")}
            />

            <View style={{ top: screenWidth * 0.35, width: screenWidth * 0.9, alignSelf: 'center' }}>
                <View style={{ position: 'absolute', flexDirection: 'row', gap: screenWidth * 0.13 }}>

                    <View style={{ gap: screenWidth * 0.01, flexDirection: 'row' }}>
                        <Icon name="home" size={rem * 0.6} color="black" />
                        <Text style={{ fontSize: rem * 0.5, fontWeight: 700 }} >/</Text>
                        <Text style={{ fontSize: rem * 0.5, fontWeight: 700 }}>Invoices</Text>
                        <Text style={{ fontSize: rem * 0.5, fontWeight: 700, maxWidth: screenWidth * 0.27 }} numberOfLines={1}>/ Search Records</Text>

                    </View>
                    {/* <View style={{ flex: 1, top: -20, alignItems: 'flex-end' }}>
       
            <TouchableOpacity
              style={[styles.groupLayoutt]}
              onPress={() => navigation.navigate("AddRecord")}
            >
              <View style={styles.rectangleGroupp}>
                <Text style={[styles.addTypo]}>
                  Add Record
                </Text>
                <Image
                  contentFit="cover"
                  source={require("../assets/vector14.png")}
                />
              </View>
            </TouchableOpacity>
          </View> */}
                </View>


            </View>


            <View style={[styles.rectangleParent18, styles.rectangleLayout]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text
                            style={{ fontSize: rem * 0.7, fontWeight: '700', width: screenWidth * 0.68 }}
                        >Select Record to Create Invoice
                        </Text>
                    </View>
                    <View>
                        <View>

                            <TouchableOpacity
                                style={[styles.groupLayoutt]}
                                onPress={() => createInvoice()}
                            >
                                <View style={styles.rectangleGroupp}>
                                    <Text style={[styles.addTypo]}>
                                        Create
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>


            <View style={styles.cont}>
                <Footer prop={"MaintenanceRecord"} />
            </View>

            <View style={styles.boxContianer}>
            <ScrollView style={styles.wrap}>
      {records.map((record, index) => {
        return (
          <View
            key={index}
            style={[
              currentPressedIndex === index
                ? styles.groupParentLayoutW
                : styles.groupParentLayout,
            ]}
          >
            <View>
              <Pressable
                onPress={() => handlePress(index, record.id)}
              >
                <View style={styles.textWrap}>
                  <View style={styles.rowWrap}>
                    <Icon
                      name="wrench"
                      size={0.5 * rem}
                      color={currentPressedIndex === index ? "white" : "black"}
                    />
                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.maintainedOnW
                          : styles.maintainedOn,
                        styles.davidTypo,
                      ]}
                    >
                      Service
                    </Text>
                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.carWashW
                          : styles.carWash,
                      ]}
                    >
                      {record.service}
                    </Text>
                    <View style={{ flex: 1 }}></View>
                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.text2TypoW
                          : styles.text2Typo,
                      ]}
                    >
                      {formatDateTime(record.maintanenceDateTime)}
                    </Text>
                  </View>
                  <View style={styles.rowWrap}>
                    <Icon
                      name="car"
                      size={0.5 * rem}
                      color={currentPressedIndex === index ? "white" : "black"}
                    />

                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.maintainedOnW
                          : styles.maintainedOn,
                      ]}
                    >
                      Reg. Number
                    </Text>
                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.carWashW
                          : styles.carWash,
                      ]}
                    >
                      {record.registrationNumber}
                    </Text>
                  </View>
                  <View style={styles.rowWrap}>
                    <Icon
                      name="user"
                      size={0.6 * rem}
                      marginLeft={0.1 * rem}
                      color={currentPressedIndex === index ? "white" : "black"}
                    />

                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.maintainedOnW
                          : styles.maintainedOn,
                      ]}
                    >
                      Maintained By
                    </Text>
                    <Text
                      style={[
                        styles.stJanuary2023,
                        currentPressedIndex === index
                          ? styles.text2TypoW
                          : styles.text2Typo,
                      ]}
                    >
                      {record.name}
                    </Text>
                  </View>
                  <View style={styles.rowWrap}>
                    <Icon
                      name="tachometer"
                      size={0.6 * rem}
                      color={currentPressedIndex === index ? "white" : "black"}
                    />
                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.maintainedOnW
                          : styles.maintainedOn,
                      ]}
                    >
                      Mileage
                    </Text>
                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.text2W
                          : styles.text2,
                        styles.textPosition,
                      ]}
                    >
                      {record.kilometerDriven}
                    </Text>
                  </View>
                  <View style={styles.rowWrap}>
                    <Icon
                      name="user"
                      size={0.62 * rem}
                      marginLeft={0.15 * rem}
                      color={currentPressedIndex === index ? "white" : "black"}
                    />

                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.maintainedOnW
                          : styles.maintainedOn,
                      ]}
                    >
                      Vehicle Owner
                    </Text>
                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.carWashW
                          : styles.carWash,
                      ]}
                    >
                      {record.vehicleOwner}
                    </Text>
                  </View>
                  {record.parentCompany && (
                    <View style={styles.rowWrap}>
                      <Icon
                        name="building"
                        size={0.5 * rem}
                        marginLeft={0.2 * rem}
                        color={
                          currentPressedIndex === index ? "white" : "black"
                        }
                      />
                      <Text
                        style={[
                          currentPressedIndex === index
                            ? styles.maintainedOnW
                            : styles.maintainedOn,
                        ]}
                      >
                        Parent Company
                      </Text>
                      <Text
                        style={[
                          currentPressedIndex === index
                            ? styles.carWashW
                            : styles.carWash,
                        ]}
                      >
                        {record.parentCompany}
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            </View>
          </View>
        );
      })}
    </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    groupInnerShadowBox: {
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        left: 0,
    },
    textWrap: {
        fontSize: FontSize.size_smi,
      },
      maintainedOn: {
        color: Color.dimgray_200,
        fontFamily: FontFamily.poppinsRegular,
        marginLeft: 0.45 * rem,
      },
    
      maintainedOnW: {
        color: Color.white,
        fontFamily: FontFamily.poppinsRegular,
        marginLeft: 0.45 * rem,
      },
      carWashW: {
        color: Color.white,
        fontSize: FontSize.size_smi,
        textAlign: "right",
        fontFamily: FontFamily.caption2Regular,
        fontWeight: "500",
        marginLeft: 0.4 * rem,
      },
      stJanuary2023: {
        marginLeft: 0.3 * rem,
      },
      text2: {
        color: Color.gray_300,
        fontSize: 0.5 * rem,
        textAlign: "left",
        fontFamily: FontFamily.caption2Regular,
        fontWeight: "500",
        marginLeft: 0.2 * rem,
      },
      text2TypoW: {
        color: Color.white,
        fontSize: 0.5 * rem,
    
        fontFamily: FontFamily.caption2Regular,
        fontWeight: "500",
      },
      text2Typo: {
        color: Color.gray_300,
        fontSize: 0.5 * rem,
    
        fontFamily: FontFamily.caption2Regular,
        fontWeight: "500",
      },
      carWash: {
        color: Color.gray_300,
        fontSize: FontSize.size_smi,
        textAlign: "right",
        fontFamily: FontFamily.caption2Regular,
        fontWeight: "500",
        marginLeft: 0.4 * rem,
      },
      text2W: {
        color: Color.white,
        fontSize: 0.5 * rem,
        textAlign: "left",
        fontFamily: FontFamily.caption2Regular,
        fontWeight: "500",
        marginLeft: 0.2 * rem,
      },
      rowWrap: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 0.02 * rem,
      },
    FilterSearch: {
        left: 228,
        top: 10,
    },
    cont: {
        marginLeft: 1,
        zIndex: 999,
    },
    groupLayoutt: {
        // alignItems: 'flex-end',
        flex: 1,
        position: 'absolute',
    },
    rectangleParent18: {
        marginTop: screenWidth * 0.41,
        // alignSelf: 'center',
        // backgroundColor: Color.steelblue_300,
    },
    rectangleLayout: {
        borderRadius: 6,
        paddingVertical: screenHeight * 0.016,
        paddingLeft: screenWidth * 0.05,
        paddingEnd: screenWidth * 0.03,
        position: "absolute",

    },
    rectangleGroupp: {
        backgroundColor: Color.darkslateblue,
        paddingEnd: screenWidth * 0.06,
        paddingLeft: screenWidth * 0.06,
        paddingVertical: screenWidth * 0.016,
        borderRadius: 20,
        flex: 1,
    },
    filterText: {
        left: -132,
        top: 15,
        fontWeight: 700,
        fontFamily: FontFamily.poppinsSemibold,
        fontSize: FontSize.size_sm,
        color: "#000",
        fontWeight: "500",
    },
    boxContianer: {
        marginTop: screenWidth * 0.58,
        // backgroundColor:'red',
        // alignItems: 'flex-end',
    },
    iconLayout1: {
        maxHeight: "100%",
        maxWidth: "100%",
        overflow: "hidden",
    },
    wrapperLayout: {
        height: 43,
        position: "absolute",
    },
    breadcrumbsLayout: {
        width: 150,
        height: 20,
        left: 0,
        position: "absolute",
    },

    davidTypo1: {
        fontFamily: FontFamily.caption2Regular,
        fontWeight: "500",
    },
    surfaceParentFlexBox: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
    },
    abc123Clr: {
        color: Color.darkslateblue,
        textAlign: "left",
    },
    groupLayout: {
        width: 119,
        height: 33,
        top: 0,
    },
    groupInnerLayout: {
        borderRadius: Border.br_11xl,
        position: "absolute",
    },
    addTypo: {
        flex: 1,
        color: 'white',
    },
    rectangleContainer: {
        flexDirection: "row",
        alignItems: "center",
        top: 50,
    },
    blueContainer: {
        position: "absolute",

        borderRadius: 10,
    },
    saveContainer: {
        height: 34,
        width: 100,
        marginTop: 8,
        marginLeft: 275,
        alignSelf: "baseline",
        position: "absolute",
        backgroundColor: Color.darkslateblue,
        borderRadius: 48,
    },
    blueText: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: 13,
        color: Color.darkslateblue,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    blueTextB: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: 4,
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    wrap: {
        width: screenWidth,
        height: screenWidth * 1.30,
        
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
    rectanglePosition: {
        borderRadius: Border.br_5xs,
        left: 0,
        top: 0,
    },
    davidTypo: {
      
    },
    iconLayout: {
        height: "100%",
        width: "100%",
    },

    lightTexture22341Icon: {
        width: 430,
        left: 0,
        top: 0,
        position: "absolute",
        height: 932,
    },
    image2Icon: {
        top: 803,
        height: 129,
        display: "none",
        width: 430,
        left: 0,
        position: "absolute",
    },
    groupChild: {
        backgroundColor: Color.gray_400,
        height: 60,
        elevation: 10,
        shadowRadius: 10,
        shadowColor: "rgba(0, 0, 0, 0.03)",
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        width: 430,
        position: "absolute",
        top: 0,
    },
    groupItem: {
        top: 13,
        width: 340,
        height: 50,
        left: 43,
        position: "absolute",
    },
    record: {
        top: "0%",
        left: "73.97%",
        fontSize: FontSize.size_base,
        textAlign: "center",
        color: Color.textTxtPrimary,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        position: "absolute",
    },
    vectorIcon: {
        height: "88.85%",
        width: "9.99%",
        top: "8.33%",
        right: "90.01%",
        bottom: "2.82%",
        left: "-2%",
        position: "absolute",
    },
    recordParent: {
        height: "38.1%",
        width: "50.93%",
        top: "30.16%",
        right: "43.95%",
        bottom: "31.75%",
        left: "5.12%",
        position: "absolute",
    },
    wrapper: {
        top: 59,
        width: 49,
        left: 19,
    },
    rectangleParent: {
        top: 35,
        height: 63,
        width: 430,
        left: 0,
        position: "absolute",
    },
    homeMutedIcon: {
        width: 0.5 * rem,
        height: 0.5 * rem,
        top: 0.09 * rem,
    },
    housefill: {
        flexDirection: "row",
        marginLeft: 0.4 * rem,
    },
    elementPosition: {
        left: 30,
        justifyContent: "center",
        height: 20,
        top: 1,
        position: "absolute",
    },
    text: {
        lineHeight: 17,
        textAlign: "left",
        marginLeft: 0.2 * rem,
        fontSize: FontSize.caption2Regular_size,
        color: Color.textTxtPrimary,
        fontFamily: FontFamily.caption2Regular,
    },
    element2: {
        left: 95,
        height: 20,
        top: 0,
    },
    search: {
        color: Color.steelblue_100,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        marginLeft: 0.2 * rem,
    },
    surface: {
        left: 10,
        top: 2,
        flexDirection: "row",
        justifyContent: "center",
    },
    abc123: {
        fontWeight: "500",
        fontFamily: FontFamily.poppinsSemibold,
        fontSize: 0.5 * rem,
    },
    surface1: {
        left: 12.5 * rem,
        top: 0,
        flexDirection: "row",
        justifyContent: "center",
    },
    breadcrumbs: {
        height: 20,
        top: 0,
    },
    breadcrumbsWrapper: {
        height: 20,
        top: 6,
    },
    groupInner: {
        shadowColor: "rgba(0, 0, 0, 0.05)",
        shadowRadius: 20,
        elevation: 20,
        backgroundColor: Color.steelblue_300,
        width: 119,
        height: 33,
        top: 0,
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        left: 0,
        borderRadius: Border.br_11xl,
    },
    addRecord: {
        left: 17,
        fontSize: FontSize.caption2Regular_size,
        top: 0,
    },
    vectorIcon1: {
        height: "72.22%",
        width: "14.77%",
        top: "16.67%",
        right: "86.36%",
        bottom: "11.11%",
        left: "-1.14%",
        position: "absolute",
    },
    addRecordParent: {
        top: 8,
        left: 16,
        width: 88,
        height: 18,
        position: "absolute",
    },
    rectangleGroup: {
        left: 0,
        position: "absolute",
    },
    groupWrapper: {
        left: 260,
        position: "absolute",
    },

    groupParent: {
        top: 4.9 * rem,
        // height: 33,
        // width: 32,
        left: 0.49 * rem,
        position: "absolute",
    },
    rectanglePressable: {
        height: 2 * rem,
        width: screenWidth * 0.9,
        position: "absolute",
        backgroundColor: Color.steelblue_300,
    },
    davidDaniel: {
        top: 0.5 * rem,
        left: 0.8 * rem,
        fontSize: 0.7 * rem,
        fontFamily: FontFamily.caption2Regular,
        fontWeight: "800",
        position: "absolute",
        width: 9 * rem,
        color: "grey",
    },
    icon1: {
        maxHeight: "100%",
        maxWidth: "100%",
        overflow: "hidden",
    },
    vector: {
        left: "86.39%",
        top: "29.41%",
        right: "8.16%",
        bottom: "33.83%",
        width: "5.45%",
        height: "36.76%",
        position: "absolute",
    },
    rectangleContainer: {
        top: 155,
        left: 20,
    },

    maintenanceRecord: {
        backgroundColor: Color.white,
        flex: 1,
        overflow: "hidden",
        height: 932,
        width: "100%",
        zIndex: 1,
    },
});

export default MaintenanceRecord;
