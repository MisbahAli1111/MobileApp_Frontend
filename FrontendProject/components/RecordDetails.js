import * as React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { TextInput } from "react-native-gesture-handler";

function RecordDetails() {


  const navigation = useNavigation();

  return (
    <View>

      {/* details  */}

      <View style={styles.detailsParent}>
        <Text style={[styles.details, styles.abc123Clr]}>Details</Text>
        <Text style={[styles.carWasMaintained, styles.jan2023Position]}>
          Car was maintained on 01 January 2023 by Waleed Ali. he changed spark
          plugs and tuned car also changed oil and oil filter. The car was fully
          maintained.
        </Text>
      </View>

      {/* blue div  */}

      <View style={[styles.vectorGroup, styles.vectorGroupLayout]}>
        <Image
          style={[styles.rectangleIcon, styles.vectorGroupLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-66.png")}
        />
        <View style={[styles.frameParent, styles.frameParentPosition]}>
          <View style={styles.frameWrapper}>
            <View style={styles.mileageWrapper}>
              <Text style={styles.dateTypo}>Mileage</Text>
            </View>
          </View>
          <View style={[styles.kmWrapper, styles.jan2023Position]}>
            <Text style={[styles.km, styles.kmTypo]}>137,000 km</Text>
          </View>
        </View>
        <View style={[styles.frameContainer, styles.waleedAliPosition]}>
          <View />
        </View>
        <Text
          style={[styles.registrationNumber, styles.dateTypo]}>{`Registration Number `}</Text>
        <Text style={[styles.abc1231, styles.kmTypo]}>ABC-123</Text>
        <Text style={[styles.maintainedBy, styles.dateTypo]}>
          Maintained By
        </Text>
        <Text style={[styles.waleedAli, styles.waleedAliPosition]}>
          Waleed Ali
        </Text>
        <View style={[styles.jan2023Parent, styles.parentPosition]}>
          <Text style={[styles.jan2023, styles.jan2023Position]}>
            01/Jan/2023
          </Text>
          <Text style={[styles.date, styles.dateTypo]}>Date</Text>
        </View>
        <View style={styles.carWashParent}>
          <Text style={[styles.jan2023, styles.jan2023Position]}>Car Wash</Text>
          <Text style={[styles.date, styles.dateTypo]}>Service</Text>
        </View>
        <View style={[styles.pmParent, styles.parentPosition]}>
          <Text style={[styles.jan2023, styles.jan2023Position]}>3:00 PM</Text>
          <Text style={[styles.date, styles.dateTypo]}>Time</Text>
        </View>
        <View style={[styles.carWrapper, styles.typePosition]}>
          <Text style={[styles.km, styles.kmTypo]}>{`Car `}</Text>
        </View>
        <Text style={[styles.type, styles.typePosition]}>{`Type `}</Text>
      </View>

      {/* car image  */}
      <Image
        style={[styles.maintenanceDetailViewChild2, styles.childViewPosition]}
        contentFit="cover"
        source={require("../assets/group-114.png")}
      />


      <Image
        style={styles.maintenanceDetailViewChild3}
        contentFit="cover"
        source={require("../assets/group-83.png")}
      />
      <Image
        style={[styles.vectorIcon1, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/vector4.png")}
      />
      <Image
        style={[styles.vectorIcon2, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/vector5.png")}
      />


    </View>
  );
}
const styles = StyleSheet.create({

  childViewPosition: {
    width: 430,
    left: -6.5,
    position: "absolute",
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
  textFlexBox: {
    textAlign: "left",
    color: Color.textTxtPrimary,
  },
  abc123Clr: {
    color: Color.darkslateblue,
    textAlign: "left",
    position: "absolute",
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
    height: 301,
    width: 392,
    position: "absolute",
  },
  frameParentPosition: {
    top: 25,
    position: "absolute",
  },
  jan2023Position: {
    top: 26,
    position: "absolute",
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
    fontWeight:700,
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
    top: "29.17%",
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
  },
  jan2023Parent: {
    width: 98,
    left: 25,
  },
  carWashParent: {
    top: 239,
    width: 79,
    left: 25,
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
    top: 480,
    left: 10,
  },
  details: {
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    width: 72,
    fontSize: FontSize.size_base,
    color: Color.Black,
    left: 0,
    top: 0,
  },
  carWasMaintained: {
    left: 1,
    width: 392,
    top: 26,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    color: Color.Black,
    fontSize: FontSize.size_base,
    fontWeight:700,
  },
  detailsParent: {
    top: 385,
    width: 393,
    height: 122,
    left: 20,
    position: "absolute",
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
    top: 150,
    height: 223,
  },
  maintenanceDetailViewChild3: {
    top: 378,
    left: 182,
    width: 55,
    height: 9,
    position: "absolute",
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