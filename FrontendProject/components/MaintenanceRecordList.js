import * as React from "react";
import { useState,useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { TextInput } from "react-native-gesture-handler";

function RecordList({dsearch}) {
const navigation = useNavigation();
const [search, setSearch] = useState('');
const [data, setData] = useState([]);


  
const [currentPressedIndex, setCurrentPressedIndex] = useState(-1);

const records = [
  {
    id:"erwecs",
    maintainedOn: "sdbfgljb",
    maintainedBy: "yess",
    mileage: "137,000",
    service: "Service Details 1",
  },
  {
    id:"cnaojos",
    maintainedOn: "2nd January 2023",
    maintainedBy: "ggggg",
    mileage: "150,000",
    service: "Service Details 2",

  },
  {
    id:"wsncds",
    maintainedOn: "2nd January 2023",
    maintainedBy: "no",
    mileage: "150,000",
    service: "Service Details 2",

  },
 
];

const displayedRecords = search ? data : records;

const handlePress = (index,recordId) => {
  setCurrentPressedIndex(index);
  navigation.navigate("MaintenanceDetailView",{recordId:recordId});
};

useEffect(() => {
  setSearch(dsearch);
  const formattedQuery = dsearch.trim().toLowerCase();
  const maintained=records.filter((record) => record.maintainedBy.includes(formattedQuery))
  setData(maintained);
}, [dsearch]);


  return (
    <ScrollView>
    {
displayedRecords.map((record, index) => (
      <View key={index} style={[styles.groupView, styles.groupParentLayout]}>
        <View style={[styles.groupFrame]}>
          <Pressable
            style={[styles.groupFrame, styles.groupParentLayout]}
            onPress={() => handlePress(index,record.id)}
          >
            {/* Image */}
            <Image
              style={[
                styles.rectangleIcon,
                styles.groupParentLayout,
              ]}
              contentFit="cover"
              source={currentPressedIndex === index ? require("../assets/rectangle-541.png") : require("../assets/rectangle-54.png")}
            />
            <View style={[styles.frameParent, styles.frameParentLayout]}>
              <View
                style={[styles.maintainedOnParent, styles.surfaceParentFlexBox]}
              >
                <Text
                  style={[
                    currentPressedIndex === index ? styles.maintainedOnW : styles.maintainedOn,
                    styles.davidTypo,
                  ]}>
                  {`Maintained On `}</Text>

                <Text style={[
                  styles.stJanuary2023,
                  currentPressedIndex === index ? styles.text2TypoW : styles.text2Typo,
                ]}>
                  {record.maintainedOn}
                </Text>
              </View>
              <View
                style={[styles.maintainedByParent, styles.surfaceParentFlexBox]}
              >
                <Text style={[
                  currentPressedIndex === index ? styles.maintainedOnW : styles.maintainedOn,
                  styles.davidTypo,
                ]}>
                  Maintained By
                </Text>
                <Text style={[
                  styles.stJanuary2023,
                  currentPressedIndex === index ? styles.text2TypoW : styles.text2Typo,
                ]}>
                  {record.maintainedBy}
                </Text>
              </View>
              <View style={[styles.mileageWrapper, styles.wrapperPosition]}>
                <Text style={[
                  currentPressedIndex === index ? styles.maintainedOnW : styles.maintainedOn,
                  styles.davidTypo,
                ]}>
                  Mileage
                </Text>
              </View>
              <View style={[styles.serviceWrapper, styles.wrapperPosition]}>
                <Text style={[
                  currentPressedIndex === index ? styles.maintainedOnW : styles.maintainedOn,
                  styles.davidTypo,
                ]}>
                  Service
                </Text>
              </View>
            </View>
            <Image
              style={[styles.groupIcon, styles.iconLayout1]}
              contentFit="cover"
              source={currentPressedIndex === index ? require("../assets/group-801.png") : require("../assets/group-80.png")}
            />
            <Image
              style={[
                styles.vehicleServicesSvgrepoCom1Icon,
                styles.vehicleIconLayout,
              ]}
              contentFit="cover"
              source={
                currentPressedIndex === index ? require("../assets/vehicleservicessvgrepocom-12.png") : require("../assets/vehicleservicessvgrepocom-11.png")}
            />
            <Text style={[
               currentPressedIndex === index ? styles.carWashW :styles.carWash, styles.carPosition]}>Car Wash</Text>
            <Text style={[
              currentPressedIndex === index ? styles.text2W: styles.text2, styles.textPosition]}>137,000</Text>

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
    width: 392,
    left:5,
    position: "relative",
    alignItems: 'flex-start',
    flexWrap:"wrap",
    marginTop:5,
  },
  serviceWrapper: {
    top: 84,
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
 
  groupParentLayout: {
    height: 132,
    width: 392,
    left:5,
    position: "relative",
    alignItems: 'flex-start',
    flexWrap:"wrap",
    marginTop:5,
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

export default RecordList;