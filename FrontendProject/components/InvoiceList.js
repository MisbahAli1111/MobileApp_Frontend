import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { Image } from "expo-image";
import isEqual from "lodash/isEqual";
import ErrorPopup from "../components/ErrorPopup";
import Config from "../screens/Config";
import {
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border, Padding } from "../GlobalStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const rem = screenWidth / 16;

function Invoicelist({ dsearch, searchOrder }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [search, setSearch] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [data, setData] = useState([]);
  const [Invoices, setInvoices] = useState([]);
  const [tempInvoiceid, setTempInvoiceId] = useState("");
  const [currentPressedIndex, setCurrentPressedIndex] = useState(-1);
  const [reload, setReload] = useState(0);

  const displayedRecords = useMemo(() => {
    let filteredVehicles;

    if (search) {
      filteredVehicles = data;
    } else {
      filteredVehicles = Invoices;
    }

    const sortedVehicles = filteredVehicles.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (searchOrder === "ascending") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return sortedVehicles;
  }, [search, data, Invoices, searchOrder]);

  const handlePress = (index, recordId) => {
    setCurrentPressedIndex(index);
    navigation.navigate("InvoiceDetailView", { recordId });
  };

  const handleDeleteVehicle = () => {
    setShowErrorPopup(false);
    deleteVehicle();
  };
  const setPopUp = (vehicleIds) => {
    setTempInvoiceId(vehicleIds);
    setShowErrorPopup(true);
  };

  deleteVehicle = async () => {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${Config.apiServerUrl}/api/invoice/${tempInvoiceid}/delete-invoice`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
       getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  getData = async () => {
    const Business_id = await AsyncStorage.getItem("Business_id");
    let token = await AsyncStorage.getItem("accessToken");
    const accessToken = "Bearer " + token;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${Config.apiServerUrl}/api/invoice/get-invoices/${Business_id}`,
      headers: {
        Authorization: accessToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        const newData = response.data;
        const hasDataChanged = !isEqual(newData, Invoices);

        if (hasDataChanged) {
          // console.log(JSON.stringify(newData));
          setInvoices(newData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setSearch(dsearch);

    const formattedQuery = dsearch.toUpperCase().trim();
    const maintained = Invoices.filter((invoice) => {
      const nameMatches =
        invoice.name && invoice.name.toUpperCase().includes(formattedQuery);
      const ownerMatches =
        invoice.vehicleOwner &&
        invoice.vehicleOwner.toUpperCase().includes(formattedQuery);
      const numberMatches = invoice.registrationNumber
        .toUpperCase()
        .includes(formattedQuery);
      const parentCompanyMatches =
        invoice.parentCompany &&
        invoice.parentCompany.toUpperCase().includes(formattedQuery);
      const totalMatches = invoice.total.toString().includes(formattedQuery);

      const dateMatches = (query) => {
        const formattedDate = query.split("/").reverse().join("-"); // Convert to 'YYYY-MM-DD' format
        const maintanenceDate = invoice.date.split("T")[0];
        return maintanenceDate.includes(formattedDate);
      };

      return (
        nameMatches ||
        parentCompanyMatches ||
        totalMatches ||
        numberMatches ||
        ownerMatches ||
        dateMatches(formattedQuery)
      );
    });
    setData(maintained);
  }, [dsearch]);

  return (
    <ScrollView style={styles.wrap}>
      {displayedRecords.map((record, index) => (
        <View
          key={index}
          style={[
            styles.groupView,
            currentPressedIndex === index
              ? styles.groupParentLayoutW
              : styles.groupParentLayout,
          ]}
        >
          <Pressable
            style={styles.press}
            onPress={() => handlePress(index, record.id)}
          >
            <View style={[styles.groupFrame]}>
              <View style={styles.rowWrap}>
                <Text
                  style={[
                    styles.muhammadAli4,
                    currentPressedIndex === index
                      ? styles.text4Typo
                      : styles.textTypo,
                  ]}
                >
                  {record.name}
                </Text>
                <ErrorPopup
                  visible={showErrorPopup}
                  message={"Are you sure you want to remove Invoice?"}
                  onConfirm={() => handleDeleteVehicle()} // Use an arrow function here
                  onCancel={() => {
                    setShowErrorPopup(false);
                    setTempInvoiceId(null); // Reset vehicleIds when the popup is closed
                  }}
                />
                <TouchableOpacity onPress={() => setPopUp(record.id)}>
                  <FontAwesome
                    name="trash"
                    size={25}
                    color={currentPressedIndex === index ? "white" : "black"}
                  />
                </TouchableOpacity>
              </View>

              <View style={[styles.inv0001Parent]}>
                <Text
                  style={[
                    currentPressedIndex === index
                      ? styles.inv00014
                      : styles.inv0001,
                    currentPressedIndex === index
                      ? styles.text4Typo
                      : styles.textTypo,
                  ]}
                >
                  INV{record.id}
                </Text>

                <Text
                  style={[
                    styles.muhammadAli44,
                    currentPressedIndex === index
                      ? styles.text4Typo
                      : styles.paidTypo,
                  ]}
                >
                  Rs. {record.total}
                </Text>
              </View>

              <View style={[styles.inv0001Parent]}>
                <Text
                  style={[
                    currentPressedIndex === index
                      ? styles.jan20234
                      : styles.jan2023,
                  ]}
                >
                  {record.invoiceDue}
                </Text>
                <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
                  <View
                    style={[
                      styles.groupInner,
                      styles.groupChildLayout,
                      record.status ? styles.groupChild1 : null,
                    ]}
                  />

                  <Text
                    style={[
                      styles.due,
                      styles.paidTypo,
                      record.status ? styles.paid1 : null,
                    ]}
                  >
                    {record.status ? "Paid" : "Due"}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  groupParentLayout: {
    backgroundColor: Color.steelblue_300,
    marginVertical: 0.2 * rem,
    alignSelf: "center",
    width: screenWidth * 0.91,
    height: screenHeight * 0.108,
    borderRadius: 8,
  },
  groupParentLayoutW: {
    backgroundColor: Color.darkslateblue,
    marginVertical: 0.2 * rem,
    alignSelf: "center",
    width: screenWidth * 0.91,
    height: screenHeight * 0.108,
    borderRadius: 8,
  },
  rowWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    margin: 10,
    marginTop: 10,
  },
  cont: {
    width: 385,
    marginLeft: 1,
  },
  press: {
    // backgroundColor:'red',
    width: screenWidth * 0.91,
    height: screenHeight * 0.105,
  },
  invPosition: {
    left: 0,
    top: 0,
  },

  groupChildLayout1: {
    borderRadius: Border.br_3xs,
    height: 85,
    width: 375,
    left: 0,
    position: "absolute",
  },
  paidTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  inv0001ParentLayout: {
    height: 23,
    position: "absolute",
  },
  textTypo: {
    color: Color.dimgray_100,

    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "700",
  },
  janPosition: {
    top: 1,
    fontSize: FontSize.size_sm,
  },
  textPosition: {
    left: 75,
    fontSize: FontSize.size_sm,
    top: 1,
  },
  rs3000Typo: {},
  rs3000TypoR: {
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    color: Color.white,

    position: "absolute",
    width: "110%",
  },
  frameWrapperPosition: {
    left: 325,
    top: 47,
  },
  paidWrapperPosition: {
    backgroundColor: Color.darkolivegreen,
    borderRadius: Border.br_sm,
    left: 0,
    top: 0,
  },
  groupChildLayout: {
    width: 53,
    height: 23,
  },
  groupChild4Bg: {
    backgroundColor: Color.darkslateblue,
    top: 0,
  },
  text4Typo: {
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    color: Color.white,
  },
  iconChildPosition: {
    width: 430,
    left: 0,
    position: "absolute",
  },
  iconLayout2: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  groupChild21Layout: {
    height: 43,
    position: "absolute",
  },
  totalClr: {
    color: Color.red,
    fontSize: FontSize.size_lg,
    top: 1032,
  },
  totalTypo: {
    fontWeight: "600",
    textAlign: "left",
    position: "absolute",
  },
  rectangleLayout: {
    height: 55,
    width: 372,
    position: "absolute",
  },
  iconLayout1: {
    height: "100%",
    width: "100%",
  },
  invoicesChild2ShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: -4,
    },
  },
  invoicesChild3Layout: {
    borderRadius: Border.br_11xl,
    position: "absolute",
  },
  homeTypo: {
    lineHeight: 18,
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
  },
  iconLayout: {
    height: 45,
    width: 45,
    top: 845,
    position: "absolute",
  },
  housefillFlexBox: {
    justifyContent: "center",
    alignItems: "center",
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
  housefill1Position: {
    height: 20,
    left: 2,
    position: "absolute",
  },
  text13Typo: {
    fontSize: FontSize.caption2Regular_size,
    fontWeight: "500",
  },
  lightTexture22341Icon: {
    width: 424,
    position: "absolute",
    height: 932,
    left: 0,
  },
  groupChild: {
    top: 0,
  },
  muhammadAli: {
    textAlign: "left",
    color: Color.textTxtPrimary,
    fontSize: FontSize.size_base,
    left: 15,
    top: 15,
    position: "absolute",
  },
  inv0001: {
    fontSize: FontSize.size_mini,
    marginLeft: 0.5 * rem,
    top: 0,
  },
  jan2023: {
    fontSize: FontSize.size_sm,
    color: Color.dimgray_100,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    marginLeft: 0.5 * rem,
    width: "100%",
    position: "absolute",
  },
  text: {
    color: Color.dimgray_100,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  inv0001Parent: {
    flexDirection: "row",
  },
  rs3000: {
    color: Color.textTxtPrimary,
  },
  paid: {
    color: Color.white,
    fontSize: FontSize.size_mini,
    textAlign: "left",
  },
  paidWrapper: {
    paddingHorizontal: 9,
    paddingVertical: 0,
    flexDirection: "row",
    position: "absolute",
  },
  frameWrapper: {
    width: 52,
    height: 23,
    position: "absolute",
  },
  vectorParent: {
    top: 0,
  },
  groupItem: {
    backgroundColor: Color.steelblue_300,
    top: 0,
  },
  groupInner: {
    backgroundColor: Color.gold,
    borderRadius: Border.br_sm,
    width: 53,
    left: -18,
    top: 0,
  },
  due: {
    left: -7.5,
    color: Color.white,
    fontSize: FontSize.size_mini,
    textAlign: "center",
    // alignContent:"center",
    top: -1,
    position: "absolute",
  },
  rectangleGroup: {
    // marginLeft:10*rem,
    textAlign: "right",
    position: "absolute",
    marginLeft: 12.8 * rem,

    marginTop: 0.1 * rem,
  },
  rectangleParent: {},
  groupChild1: {
    backgroundColor: Color.darkolivegreen,
    borderRadius: Border.br_sm,
    left: -18,
    top: -2,
  },
  paid1: {
    left: -7.5,

    color: Color.white,
    fontSize: FontSize.size_mini,
    textAlign: "center",

    position: "absolute",
  },
  rectangleContainer: {
    top: 420,
  },
  groupPressable: {
    top: 105,
  },
  groupChild4: {
    borderRadius: Border.br_3xs,
    height: 85,
    width: 393,
    left: 0,
    position: "absolute",
  },
  muhammadAli4: {
    fontSize: 0.7 * rem,
  },
  muhammadAli44: {
    fontSize: FontSize.size_base,
    marginLeft: 10 * rem,
  },
  inv00014: {
    fontSize: FontSize.size_mini,
    marginLeft: 0.5 * rem,
    top: 0,
  },
  jan20234: {
    fontSize: FontSize.size_sm,
    color: Color.white,
    marginLeft: 0.5 * rem,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    width: "100%",
    position: "absolute",
  },
  text4: {
    left: 75,
    fontSize: FontSize.size_sm,
    top: 1,
  },
  inv0001Parent2: {
    width: 174,
    top: 47,
    left: 15,
  },
  rs30004: {
    color: Color.white,
  },
  rectangleParent2: {
    top: 315,
  },
  groupChild6: {
    backgroundColor: Color.gainsboro_100,
    top: 0,
  },
  groupChild7: {
    backgroundColor: Color.dimgray_100,
    borderRadius: Border.br_sm,
    width: 53,
    left: 0,
    top: 0,
  },
  rectangleParent4: {
    top: 525,
  },
  rectangleParent10: {
    top: 630,
  },
  rectangleParent14: {
    top: 742,
  },
  rectangleParent16: {
    top: 847,
  },
  groupParent: {
    top: 257,
    width: 393,
    left: 19,
    position: "absolute",
    height: 932,
  },
  image2Icon: {
    top: 803,
    height: 129,
    display: "none",
  },
  groupContainer38Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  groupContainer38Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  rectangleIcon: {
    top: -6,
    height: 80,
  },
  groupChild20: {
    top: 13,
    left: 43,
    width: 340,
    height: 50,
    position: "absolute",
  },
  invoices1: {
    top: "0%",
    left: "70.22%",
    textAlign: "center",
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  vectorIcon: {
    height: "88.85%",
    width: "9.72%",
    top: "8.33%",
    right: "90.28%",
    bottom: "2.82%",
    left: "0%",
    position: "absolute",
  },
  invoicesParent: {
    height: "38.1%",
    width: "52.33%",
    top: "30.16%",
    right: "42.56%",
    bottom: "31.75%",
    left: "5.12%",
    position: "absolute",
  },
  groupChild21: {
    top: 59,
    width: 49,
    left: 19,
  },
  vectorGroup: {
    height: 63,
    top: 47,
  },
  text12: {
    left: 383,
    fontFamily: FontFamily.montserratRegular,
    textAlign: "left",
    position: "absolute",
  },
  total: {
    left: 17,
    fontFamily: FontFamily.montserratSemibold,
    color: Color.red,
    fontSize: FontSize.size_lg,
    top: 1032,
  },
  invoicesChild: {
    top: 1003,
    left: 322,
    borderStyle: "solid",
    borderColor: "#ff0000",
    borderTopWidth: 1,
    width: 149,
    height: 1,
    position: "absolute",
  },
  invoicesItem: {
    top: 980,
    left: 339,
    width: 19,
    height: 0,
    position: "absolute",
  },
  rectanglePressable: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.steelblue_300,
    left: 0,
    top: 0,
  },
  searchInvoice: {
    top: 14,
    left: 21,
    color: "#1e1e1e",
    textAlign: "left",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  icon: {
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

  invoicesInner: {
    top: 3,
    left: 29,
    width: 372,
  },
  maskGroupIcon: {
    top: 63,
    left: 380,
    width: 31,
    height: 31,
    position: "absolute",
  },
  invoicesChild1: {
    top: 782,
    backgroundColor: Color.aliceblue_100,
    height: 150,
  },
  invoicesChild2: {
    top: 830,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowRadius: 10,
    elevation: 10,
    height: 102,
    width: 430,
    left: 0,
    position: "absolute",
    backgroundColor: Color.steelblue_300,
  },
  invoicesChild3: {
    top: 917,
    left: 139,
    backgroundColor: Color.textTxtPrimary,
    width: 154,
    height: 6,
  },
  home: {
    left: 22,
    top: 895,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    position: "absolute",
  },
  vehicles: {
    left: 99,
    top: 895,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    position: "absolute",
  },
  addVehicle: {
    top: 867,
    left: 172,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    lineHeight: 18,
    position: "absolute",
  },
  Invoices: {
    left: 271,
    top: 895,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    position: "absolute",
  },
  invoices2: {
    left: 359,
    top: 895,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    position: "absolute",
  },
  ellipseIcon: {
    left: 20,
  },
  homeMutedIcon: {
    width: 25,
    height: 27,
  },
  housefill: {
    top: 852,
    left: 31,
    position: "absolute",
  },
  wrapper: {
    left: 277,
  },
  groupIcon: {
    left: 105,
  },
  microphoneSvgrepoCom1Icon: {
    left: 287,
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
  invoicesChild4: {
    left: 164,
  },
  homeMutedIcon1: {
    width: 12,
    height: 14,
  },
  housefill1: {
    width: 14,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
  },
  elementPosition: {
    left: 22,
    height: 20,
    justifyContent: "center",
    top: 0,
    position: "absolute",
  },
  text13: {
    lineHeight: 17,
    fontFamily: FontFamily.caption2Regular,
    textAlign: "left",
    color: Color.textTxtPrimary,
  },
  invoices3: {
    top: 0,
    left: 35,
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.darkslateblue,
    fontSize: FontSize.size_sm,
  },
  breadcrumbs: {
    top: 12,
    width: 87,
  },
  createInvoice: {
    lineHeight: 18,
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    color: Color.white,
  },
  createInvoiceWrapper: {
    left: 222,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    elevation: 20,
    paddingHorizontal: Padding.p_11xl,
    paddingVertical: Padding.p_6xs,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    backgroundColor: Color.darkslateblue,
    top: 0,
    flexDirection: "row",
  },
  breadcrumbsParent: {
    flex: 1,
    width: "80%",
    height: 32,
    position: "absolute",
    marginTop: 130,
    marginLeft: 22,
  },
  invoices: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    width: "100%",
    height: 932,
  },

  serviceWrapper: {
    top: 84,
  },
  wrap: {
    width: screenWidth,
    height: screenHeight * 0.64,
  },
  text2Typo: {
    color: Color.gray_300,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  frameParent: {
    top: 15,
    width: 209,
    left: 43,
  },

  text2TypoW: {
    color: Color.white,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  mileageWrapper: {
    top: 56,
  },
  frameParentLayout: {
    height: 104,
    position: "absolute",
  },
  maintainedOnParent: {
    left: 0,
    top: 0,
  },
  wrapperPosition: {
    left: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },

  maintainedByParent: {
    top: 28,
    left: 0,
  },

  surfaceParentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  maintainedOn: {
    color: Color.dimgray_200,
    fontFamily: FontFamily.poppinsRegular,
  },

  maintainedOnW: {
    color: Color.white,
    fontFamily: FontFamily.poppinsRegular,
  },
  davidTypo: {
    fontSize: FontSize.size_smi,
    textAlign: "left",
  },
  groupIcon: {
    height: "57.58%",
    width: "5.1%",
    top: "11.36%",
    right: "91.07%",
    bottom: "31.06%",
    left: "3.83%",
    position: "absolute",
  },

  iconLayout1: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  vehicleServicesSvgrepoCom1Icon: {
    top: 97,
    left: 15,
  },
  vehicleIconLayout: {
    width: 20,
    height: 20,
    position: "absolute",
    overflow: "hidden",
  },
  stJanuary2023: {
    marginLeft: 5,
  },
  carWashW: {
    color: Color.white,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  carWash: {
    color: Color.gray_300,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  text2W: {
    color: Color.white,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  carPosition: {
    left: 96,
    top: 101,
    position: "absolute",
  },
  textPosition: {
    left: 101,
    top: 73,
    position: "absolute",
  },
  text2: {
    color: Color.gray_300,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  rectangleIcon: {
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
  },
});

export default Invoicelist;
