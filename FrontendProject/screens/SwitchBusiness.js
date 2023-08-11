import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import BusinessList from "../components/BusinessList";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SwitchBusiness = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.switchBusiness}>
      <Image
        style={[
          styles.lightTexture22341Icon,
          styles.switchBusinessItemPosition,
        ]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />
      <View style={styles.images11} />
      <Text style={[styles.switchBusiness1, styles.signedFlexBox]}>
        Switch Business
      </Text>
      <View style={styles.switchBusinessChild} />
      
      
  
      <View style={styles.boxContianer}>
        <BusinessList />
      </View>
      
      <Pressable
        style={[styles.vectorParent1, styles.groupChild1Layout]}
        onPress={() => navigation.navigate("BusinessInfo")}
      >
        <Image
          style={[styles.groupChild1, styles.groupChild1Layout]}
          contentFit="cover"
          source={require("../assets/rectangle-731.png")}
        />
        <Text style={[styles.createNewBusiness, styles.lastSignedInFlexBox]}>
          Create New Business
        </Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  switchBusinessItemPosition: {
    width: 430,
    left: 0,
    position: "absolute",
  },
  boxContianer: {
    flexDirection: "column",
    flex: 1,
    flexWrap: "wrap",
    marginTop: 160,
    alignItems: 'flex-end',
    left: 6,
  },
  signedFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  
  groupParentLayout: {
    height: 65,
    width: 393,
    left: 5,
    position: "relative",
    alignItems: 'flex-start',
    flexWrap: "wrap",
    marginTop: 15,
  },
  
  abcPosition1: {
    top: "0%",
    fontSize: FontSize.size_base,
    left: "0%",
    textAlign: "center",
    position: "absolute",
    fontWeight:500,
  },
  signedTypo: {
    fontSize: FontSize.size_sm,
    top: "53.33%",
    fontFamily: FontFamily.poppinsRegular,
    fontWeight:500,
  },
  abcPosition: {
    left: "2.8%",
    bottom: "15.38%",
    top: "15.38%",
    height: "69.23%",
    position: "absolute",
  },
  lastSignedInFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  groupChild1Layout: {
    height: 45,
    width: 393,
    position: "absolute",
  },
  lightTexture22341Icon: {
    top: 0,
    height: 932,
  },
  images11: {
    top: 908,
    width: 908,
    height: 451,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    left: 0,
    position: "absolute",
  },
  switchBusiness1: {
    top: "14.27%",
    left: "29.53%",
    fontSize: FontSize.size_3xl,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  switchBusinessChild: {
    top: 917,
    left: 138,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.textTxtPrimary,
    width: 154,
    height: 6,
    position: "absolute",
  },
  switchBusinessItem: {
    top: 44,
    height: 80,
  },
  groupChild: {
    borderRadius: Border.br_3xs,
    left: 0,
    top: 0,
  },
  abcBusiness: {
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.aliceblue_200,
    fontSize: FontSize.size_base,
    left: "0%",

  },
  signedIn: {
    left: "2.68%",
    color: Color.white,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "center",
    position: "absolute",
  },
  abcBusinessParent: {
    width: "78.5%",
    right: "89.47%",
    left: "2.04%",
    bottom: "15.38%",
    top: "33.58%",
    height: "69.23%",
    position: "absolute",
  },
  vectorParent: {
    left: 0,
    top: 0,
  },
  checkCircleSvgrepoCom1Icon: {
    top: 45,
    left: 342,
    width: 33,
    height: 33,
    position: "absolute",
    overflow: "hidden",
  },

  abcBusiness1: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    left: "0%",
    color: Color.darkslateblue,
  },
  lastSignedIn: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    top: "53.33%",
    left: "0%",
    color: Color.darkslateblue,
  },
  abcBusinessGroup: {
    width: "46.56%",
    right: "50.64%",
  },
  switchBusinessInner: {
    top: 186,
    left: 10,
    width: 393,
  },
  lastSignedIn1: {
    fontFamily: FontFamily.poppinsRegular,
    left: "0%",
    textAlign: "center",
    position: "absolute",
    color: Color.darkslateblue,
  },
  abcBusinessContainer: {
    width: "45.29%",
    right: "51.91%",
  },
  groupPressable: {
    top: 356,
    left: 10,
    width: 393,
  },
  lastSignedIn2: {
    left: "0.39%",
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "center",
    position: "absolute",
    color: Color.darkslateblue,
    
  },
  lastSignedInMoreThanAWeeParent: {
    width: "65.9%",
    right: "31.3%",
  },
  switchBusinessInner1: {
    top: 441,
    left: 10,
    width: 393,
  },
  groupChild1: {
    borderRadius: Border.br_7xs,
    left: -8,
    top: -35,
  },
  createNewBusiness: {
    top: -25,
    left: 113,
    color: Color.white,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  vectorParent1: {
    top: 845,
    left: 19,
  },
  groupIcon: {
    top: 3,
    left: 29,
    width: 372,
    height: 43,
    position: "absolute",
  },
  switchBusiness: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: 932,
  },
});

export default SwitchBusiness;