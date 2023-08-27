import * as React from "react";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border, Padding } from "../GlobalStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Invoicelist({ dsearch }) {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [Invoices, setInvoices] = useState([]);

  const [currentPressedIndex, setCurrentPressedIndex] = useState(-1);

  const getData = async () => {
    let token = await AsyncStorage.getItem("accessToken");
    const accessToken = 'Bearer ' + token;

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://192.168.100.71:8080/api/invoice/get-invoice',
      headers: {
        'Authorization': accessToken
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setInvoices(response.data);

      })
      .catch((error) => {
        console.log(error);
      });

  };

  const displayedRecords = search ? data : Invoices;
  console
  const handlePress = (index, recordId) => {
    setCurrentPressedIndex(index);
    // console.log(recordId);
    navigation.navigate("InvoiceDetailView", { recordId });
  };

  useEffect(() => {
    setSearch(dsearch);
    const formattedQuery = dsearch.trim().toLowerCase();
    const maintained = Invoices.filter((record) =>
      record.name.toLowerCase().includes(formattedQuery)
    );
    setData(maintained);
  }, [dsearch]);



  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.wrap}>
      {
        displayedRecords.map((record, index) => (
          <View key={index} style={[styles.groupView, styles.groupParentLayout]}>
            <View style={[styles.groupFrame]}>
              <Pressable
                style={[styles.rectangleParent, styles.parentLayout]}
                onPress={() => handlePress(index, record.id)}
              >
                <View style={[
                  currentPressedIndex === index ? styles.groupChild4Bg : styles.groupItem, styles.groupChildLayout1,]} />
                <Text style={[
                  styles.muhammadAli4,
                  currentPressedIndex === index ? styles.text4Typo : styles.paidTypo
                ]}>
                  {record.name}
                </Text>

                <View style={[styles.inv0001Parent, styles.inv0001ParentLayout]}>
                  <Text style={[
                    currentPressedIndex === index ? styles.inv00014 : styles.inv0001,
                    currentPressedIndex === index ? styles.text4Typo : styles.textTypo
                  ]}>INV{record.id}</Text>


                  <Text style={[
                    currentPressedIndex === index ? styles.jan20234 : styles.jan2023,
                    currentPressedIndex === index ? styles.text4Typo : styles.janPosition
                  ]}>
                    {record.invoiceDue}
                  </Text>


                  <Text style={[
                    currentPressedIndex === index ? styles.text4 : styles.text,
                    currentPressedIndex === index ? styles.textPosition : styles.textPosition
                  ]}>-</Text>
                </View>
                <Text style={[
                  currentPressedIndex === index ? styles.rs30004 : styles.rs3000,
                  , styles.rs3000Typo
                ]}>
                  Rs. {record.total}</Text>
                  
                <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
                  <View style={[
                    styles.groupInner,
                    styles.groupChildLayout,
                    record.status ? styles.groupChild1 : null 
                  ]} />

                  <Text style={[
                    styles.due,
                    styles.paidTypo,
                    record.status ? styles.paid1 : null 
                  ]}>
                    {record.status ? 'Paid' : 'Due'}
                  </Text>
                </View>
              </Pressable>

            </View>
          </View>

        ))}
    </ScrollView>

  );
}
const styles = StyleSheet.create({
  groupParentLayout: {
    height: 132,
    left: 5,
    position: "relative",
    alignItems: 'flex-start',
    flexWrap: "wrap",
    marginBottom: -30,

  },

  cont: {
    width: 385,
    marginLeft: 1,
  },
  invPosition: {
    left: 0,
    top: 0,
  },
  parentLayout: {
    height: 85,
    width: 393,
    left: 0,
    position: "relative",
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
    textAlign: "left",
    fontWeight: "500",
  },
  inv0001ParentLayout: {
    height: 23,
    position: "absolute",
  },
  textTypo: {
    color: Color.dimgray_100,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  janPosition: {
    left: 86,
    top: 1,
    fontSize: FontSize.size_sm,
  },
  textPosition: {
    left: 75,
    fontSize: FontSize.size_sm,
    top: 1,
  },
  rs3000Typo: {
    left: 300,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    top: -10,
    position: "relative",
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
    position: "absolute",
  },
  groupChild4Bg: {
    backgroundColor: Color.darkslateblue,
    top: 0,
  },
  text4Typo: {
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    color: Color.white,
    textAlign: "left",
    position: "absolute",
    width: "110%",
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
    left: 0,
    top: 0,
  },
  jan2023: {
    fontSize: FontSize.size_sm,
    color: Color.dimgray_100,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
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
    width: 175,
    top: 47,
    left: 15,
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
    left: 325,
    top: 47,
  },
  rectangleParent: {

  },
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
    fontSize: FontSize.size_base,
    left: 15,
    top: 15,
  },
  inv00014: {
    fontSize: FontSize.size_mini,
    left: 0,
    top: 0,
  },
  jan20234: {
    fontSize: FontSize.size_sm,
    left: 86,
    top: 1,
    width: "100%",
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
  rectangleParent18: {
    marginTop: 180,
    marginLeft: 22,
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
    width: '80%',
    height: 32,
    position: 'absolute',
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
    width: 390,
    marginLeft: 4,
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