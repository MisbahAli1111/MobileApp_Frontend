import * as React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useState,useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { TextInput } from "react-native-gesture-handler";


function Footer(props) {

  
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState(''); 


  useEffect(() => {
    setActiveScreen(props.prop);
  }, [props.prop]);

  function handleInvoicePress() {
    //const invoices=  ['Tayyab',"Oil Change", 'Paid','05-15-2000', '1200', '2400','2','2400','1','1'] 
    if (props.data==null){
   //   console.warn(props.data)
      navigation.navigate("Invoices", {data:props.data});
     } 
     navigation.navigate("Invoices", {data:props.data});
  }
  function handleHomePress() {
    
    navigation.navigate("Home");
  }

  function handleRecordPress() {
    navigation.navigate("MaintenanceRecord");
  }
  function handleVehiclePress() {
    navigation.navigate("Vehicles",{type:'default'});
  }
  function handleAddRecord() {
    navigation.navigate("AddRecord");
  }
  return (
    <View style={styles.cont}>

      <View style={[styles.rectangleView, styles.iconLayout1]} />
      <View style={styles.addVehicleChild12} />
      <Text style={[styles.home, styles.homeTypo]}>Home</Text>
      <Text style={[styles.vehicles, styles.homeTypo]}>Vehicles</Text>
      <Text style={[styles.addVehicle3, styles.homeTypo]}>Add Record</Text>
      <Text style={[styles.records, styles.homeTypo]}>Records</Text>
      <Text style={[styles.invoices, styles.homeTypo]}>Invoices</Text>
      <TouchableOpacity onPress={handleHomePress}>
        <Image
          style={[styles.ellipseIcon, styles.ellipseLayout]}
          contentFit="cover"
          source={
            activeScreen === "Home" ?  require("../assets/ellipse-7.png") : require("../assets/ellipse-8.png") }
        />
      </TouchableOpacity>
      <View style={[styles.housefill1, styles.text4Position]}>

        <TouchableOpacity onPress={handleHomePress}>
          <Image
            style={styles.homeMutedIcon1}
            contentFit="cover"
            source={require("../assets/homemuted1.png")}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.frame, styles.ellipseLayout]}
        onPress={handleRecordPress}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={
            activeScreen === "MaintenanceRecord" ?  require("../assets/ellipse-7.png") : require("../assets/ellipse-8.png")
          }
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.ellipsePressable, styles.ellipseLayout]}
        onPress={handleInvoicePress}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={
            activeScreen === "Invoices" ?  require("../assets/ellipse-7.png") : require("../assets/ellipse-8.png")
          }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleInvoicePress}>
        <Image
          style={styles.invoiceWarrantyLineSvgrepoIcon}
          contentFit="cover"
          source={require("../assets/invoicewarrantylinesvgrepocom-1.png")}
        />
      </TouchableOpacity>
      <Pressable
        style={[styles.groupPressable, styles.groupPressableLayout]}
        onPress={() => navigation.navigate("AddVehicle")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/group-111.png")}
        />
      </Pressable>
      
      <TouchableWithoutFeedback
      onPress={handleAddRecord}
      >
      <Image
        style={[styles.addVehicleChild13, styles.groupPressableLayout]}
        contentFit="cover"
        source={require("../assets/group-174.png")}
      />
      </TouchableWithoutFeedback>


      <TouchableOpacity onPressIn={handleVehiclePress}
        style={[styles.wrapper1, styles.ellipseLayout]}
        onPress={handleVehiclePress}
      >

        <Image
          style={styles.icon}
          contentFit="cover"
          source={
            activeScreen === "Vehicles" ?  require("../assets/ellipse-7.png") : require("../assets/ellipse-8.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleVehiclePress}>
        <Image
          style={styles.carCitroenTopVehicleSvgrepIcon}
          contentFit="cover"
          source={require("../assets/carcitroentopvehiclesvgrepocom-13.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRecordPress}>
        <Image
          style={styles.record641Icon}
          source={require('../assets/record64-1.png')}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  cont:{
    top:-8,
  },
  iconLayout1: {
    width: 430,
    left: 0,
  },
  text1Position: {
    display: "none",
    position: "absolute",
  },
  housefillFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  textTypo: {
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
    lineHeight: 17,
    textAlign: "left",
    color: Color.textTxtPrimary,
    fontSize: FontSize.caption2Regular_size,
  },
  addVehicle1Position: {
    fontSize: FontSize.size_sm,
    left: 0,
    position: "absolute",
  },
  uploadTypo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_base,
    color: Color.textTxtPrimary,
    fontWeight: "500",
  },
  vectorIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  wrapperLayout: {
    height: 43,
    position: "absolute",
  },
  vehicleTypo: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
  },
  uploadPosition: {
    top: "0%",
    position: "absolute",
  },
  addInnerPosition: {
    left: 24,
    position: "absolute",
  },
  childLayout: {
    height: 9,
    width: 14,
  },
  childBorder: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    position: "absolute",
  },
  lineParentLayout: {
    height: 34,
    width: 382,
    left: 24,
    position: "absolute",
  },
  groupPosition: {
    left: -1,
    top: 33,
  },
  savePosition: {
    left: 196,
    position: "absolute",
  },
  groupInnerLayout: {
    width: 384,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    position: "absolute",
  },
  addChildLayout2: {
    width: 20,
    top: 691,
    height: 20,
    position: "absolute",
  },
  iconLayout: {
    height: 30,
    width: 30,
    left: 372,
    position: "absolute",
    overflow: "hidden",
  },
  saveTypo: {
    color: Color.white,
    fontFamily: FontFamily.poppinsMedium,
    textAlign: "left",
    fontWeight: "500",
  },
  addChildLayout1: {
    height: 65,
    borderRadius: Border.br_2xs,
    top: 164,
    width: 392,
    position: "absolute",
  },
  text4Position: {
    left: 31,
    position: "absolute",
  },
  addChildLayout: {
    width: 9,
    top: 299,
    height: 14,
    position: "absolute",
  },
  homeTypo: {
    lineHeight: 18,
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    position: "absolute",
  },
  ellipseLayout: {
    height: 45,
    top: 800,
    width: 45,
    position: "absolute",
  },
  groupPressableLayout: {
    height: 104,
    width: 104,
    top: 735,
    position: "absolute",
  },
  lightTexture22341Icon: {
    top: 0,
    position: "absolute",
    height: 932,
  },
  image2Icon: {
    top: 803,
    height: 129,
    width: 430,
    left: 0,
  },
  homeMutedIcon: {
    width: 12,
    height: 14,
  },
  housefill: {
    height: 20,
    width: 14,
    top: 130,
    justifyContent: "center",
    left: 19,
    position: "absolute",
  },
  elementPosition: {
    left: 37,
    justifyContent: "center",
    height: 20,
    top: 130,
    position: "absolute",
  },
  text: {
    textAlign: "left",
    color: Color.textTxtPrimary,
  },
  addVehicle1: {
    top: -2,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.darkslateblue,
    textAlign: "left",
  },
  text1: {
    left: 88,
    textAlign: "left",
    color: Color.textTxtPrimary,
    display: "none",
    position: "absolute",
    top: 0,
  },
  addVehicleParent: {
    top: 132,
    left: 46,
    width: 93,
    height: 17,
    position: "absolute",
  },
  addVehicleChild: {
    top: 41,
    height: 80,
    position: "absolute",
  },
  addVehicleItem: {
    top: 60,
    left: 43,
    width: 340,
    height: 50,
    position: "absolute",
  },
  addVehicle2: {
    top: "7.08%",
    left: "38.14%",
    position: "absolute",
  },
  vectorIcon: {
    height: "2.29%",
    width: "5.09%",
    top: "7.3%",
    right: "89.8%",
    bottom: "90.42%",
    left: "5.12%",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    top: 59,
    width: 49,
    left: 19,
  },
  noImageFound: {
    top: 26,
    fontSize: FontSize.size_sm,
    left: 0,
    position: "absolute",
    color: Color.textTxtPrimary,
  },
  upload: {
    left: "10.96%",
    //   textDecoration: "display",
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_base,
    color: Color.textTxtPrimary,
    fontWeight: "500",
  },
  vectorIcon1: {
    height: "66.67%",
    width: "26.09%",
    top: "16.67%",
    right: "73.91%",
    bottom: "16.67%",
    left: "-29%",
  },
  uploadParent: {
    height: "51.06%",
    width: "79.31%",
    right: "10.34%",
    bottom: "48.94%",
    left: "10.34%",
  },
  noImageFoundParent: {
    top: 277,
    left: 157,
    width: 116,
    height: 47,
    position: "absolute",
  },
  vehicleType: {
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
  },
  car: {
    fontSize: FontSize.size_base,
    color: Color.textTxtPrimary,
  },
  frameChild: {
    marginLeft: 4,
  },
  carParent: {
    marginLeft: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  vehicleTypeParent: {
    flexDirection: "row",
  },
  addVehicleInner: {
    top: 413,
  },
  lineView: {
    width: 167,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    left: 23,
    top: 446,
  },
  addVehicleChild1: {
    left: 220,
    width: 182,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    top: 446,
  },
  vehicleModel: {
    left: 221,
    top: 413,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    position: "absolute",
  },
  text2: {
    left: 349,
    top: 413,
    fontSize: FontSize.size_base,
    color: Color.textTxtPrimary,
    position: "absolute",
  },
  addVehicleChild2: {
    top: 421,
    left: 387,
    position: "absolute",
  },
  frameWrapper: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupChild: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    position: "absolute",
    width: 167,
  },
  groupItem: {
    width: 187,
    top: 33,
    left: 196,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
  },
  frameContainer: {
    left: 197,
    top: 0,
    position: "absolute",
  },
  frameParent: {
    top: 467,
  },
  groupInner: {
    left: -1,
    top: 33,
  },
  davidDaniel: {
    width: 168,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
  },
  lineParent: {
    top: 522,
  },
  lineGroup: {
    top: 632,
  },
  lineContainer: {
    top: 687,
  },
  starIcon: {
    left: 338,
    display: "none"
  },
  addVehicleChild3: {
    top: 610,
    left: 23,
  },
  addVehicleInner1: {
    top: 577,
  },
  mdiuserCircleOutlineIcon: {
    top: 519,
  },
  materialSymbolspermContactIcon: {
    top: 574,
  },
  addVehicleChild4: {
    left: 359,
  },
  addVehicleChild5: {
    left: 380,
  },
  addVehicleChild6: {
    left: 296,
  },
  addVehicleChild7: {
    left: 317,
  },
  maskGroupIcon: {
    top: 63,
    width: 31,
    height: 31,
    left: 372,
    position: "absolute",
  },
  odometerSvgrepoCom1Icon: {
    top: 626,
  },
  rectangleIcon: {
    top: 737,
    left: 25,
    borderRadius: Border.br_7xs,
    width: 381,
    height: 45,
    position: "absolute",
  },
  save: {
    top: 747,
    left: 196,
    position: "absolute",
    fontSize: FontSize.size_base,
  },
  groupIcon: {
    top: 3,
    left: 29,
    width: 372,
  },
  maskGroupIcon1: {
    top: 227,
    height: 173,
    width: 392,
    left: 19,
    position: "absolute",
  },
  addVehicleChild8: {
    left: 19,
  },
  addVehicleChild9: {
    left: 129,
  },
  steeda: {
    top: 177,
    color: "#fefcfc",
    fontFamily: FontFamily.poppinsMedium,
    left: 31,
    fontSize: FontSize.size_base,
    textAlign: "left",
    fontWeight: "500",
  },
  text4: {
    top: 201,
    color: Color.white,
    fontFamily: FontFamily.poppinsMedium,
    textAlign: "left",
    fontWeight: "500",
    fontSize: FontSize.caption2Regular_size,
    left: 31,
  },
  addVehicleChild10: {
    left: 391,
  },
  addVehicleChild11: {
    left: 32,
  },
  rectangleView: {
    top: 785,
    backgroundColor: Color.steelblue_300,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    height: 98,
    position: "absolute",
  },
  addVehicleChild12: {
    top: 917,
    left: 139,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.textTxtPrimary,
    width: 154,
    height: 6,
    position: "absolute",
  },
  home: {
    left: 19,
    top: 850,
    lineHeight: 18,
  },
  vehicles: {
    left: 90,
    top: 850,
    lineHeight: 18,
  },
  addVehicle3: {
    top: 827,
    left: 166,
  },
  records: {
    left: 265,
    top: 850,
    lineHeight: 18,
  },
  invoices: {
    top: 850,
    lineHeight: 18,
    left: 340,
  },
  ellipseIcon: {
    left: 18,
  },
  homeMutedIcon1: {
    width: 25,
    height: 27,
    left: -3
  },
  housefill1: {
    top: 808,
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    left: 270,
  },
  ellipsePressable: {
    left: 348,
  },
  invoiceWarrantyLineSvgrepoIcon: {
    top: 810,
    left: 360,
    width: 26,
    height: 26,
    position: "absolute",
    overflow: "hidden",
  },
  groupPressable: {

    left: 155,
  },
  addVehicleChild13: {

    left: 155,
  },
  wrapper1: {
    left: 98,
  },
  carCitroenTopVehicleSvgrepIcon: {
    top: 806,
    left: 103,
    width: 36,
    height: 36,
    position: "absolute",
    overflow: "hidden",
  },
  record641Icon: {
    top: 808,
    left: 282,
    width: 27,
    height: 27,
    position: "absolute",
    overflow: "hidden",
  },
  addVehicle: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    height: 932,
    width: "100%",
  },
  groupParent: {
    top: 700,
    left: 14,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  groupLayout: {
    height: 45,
    width: 391,
    position: "absolute",
  },
  savebutton: {
    top: 11,
    left: 174,
    color: Color.white,
    width: 41,
    textAlign: "left",
    fontWeight: "500",
    fontSize: FontSize.size_base,
  },
  saveTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
});

export default Footer;