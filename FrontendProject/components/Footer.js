import * as React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const rem = screenWidth / 16;
function Footer(props) {
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState("");

  useEffect(() => {
    setActiveScreen(props.prop);
  }, [props.prop]);

// console.warn(screenHeight);
  return (

    <View>

      <TouchableOpacity
        style={{ zIndex: 999 }}
        onPress={() => navigation.navigate('AddRecord')}>
        <Image
          style={[styles.groupPressableLayout]}
          contentFit="cover"
          source={require("../assets/group-174.png")}
        />
        <Text style={[styles.text]} >Add Record</Text>
      </TouchableOpacity>

      {/* footer here */}
      <View style={styles.bottom}>

        <View style={styles.imageDiv}>

          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
          >
            <Image
              style={[styles.bottomImg]}
              contentFit="cover"
              source={
                activeScreen === "Home"
                  ? require("../assets/ellipse-7.png")
                  : require("../assets/ellipse-8.png")
              }
            />
            <Image
              style={styles.homeMutedIcon1}
              contentFit="cover"
              source={require("../assets/homemuted1.png")}
            />
            <Text>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Vehicles', { type: "default" })}
          >
            <Image
              style={[styles.bottomImg]}
              contentFit="cover"
              source={
                activeScreen === "Vehicles"
                  ? require("../assets/ellipse-7.png")
                  : require("../assets/ellipse-8.png")
              }
            />
            <Image
              style={styles.carCitroenTopVehicleSvgrepIcon}
              contentFit="cover"
              source={require("../assets/carcitroentopvehiclesvgrepocom-13.png")}
            />
            <Text style={{ alignItems: 'center' }}>Vehicles</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.imageDiv2}>

          <TouchableOpacity
            onPress={() => navigation.navigate('MaintenanceRecord')}
          >
            <Image
              style={[styles.bottomImg]}
              contentFit="cover"
              source={
                activeScreen === "MaintenanceRecord"
                  ? require("../assets/ellipse-7.png")
                  : require("../assets/ellipse-8.png")
              }
            />
            <Image
              style={styles.record641Icon}
              source={require("../assets/record64-1.png")}
            />
            <Text>Records</Text>
            {/* checking  */}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Invoices')}
          >
            <Image
              style={[styles.bottomImg]}
              contentFit="cover"
              source={
                activeScreen === "Invoices"
                  ? require("../assets/ellipse-7.png")
                  : require("../assets/ellipse-8.png")
              }
            />
            <Image
              style={styles.invoiceWarrantyLineSvgrepoIcon}
              contentFit="cover"
              source={require("../assets/invoicewarrantylinesvgrepocom-1.png")}
            />
            <Text>Invoices</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>

  );
}
const styles = StyleSheet.create({

  bottom: {
    flex: 1,
    
    // bottom:0-heightPercentageToDP('100%'),
    flexDirection: "row",
    justifyContent: "space-between",
    position: 'absolute',
    backgroundColor: Color.steelblue_300,
    width: screenWidth,
    height: screenWidth*0.22,
    bottom:0-screenHeight-25,
    gap: rem * 4.5, 
  },

  imageDiv: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: rem * 0.7,
  },

  imageDiv2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: rem * 0.7,
  },

  bottomImg: {
    height: rem * 1.78,
    width: rem * 1.78,
  },
  groupPressableLayout: {
    height: rem * 4,
    width: rem * 4,
    position: 'absolute',
    bottom:0-screenHeight+10,
    zIndex: 999,
    left: screenWidth / 2 - rem * 2,
  },
  homeMutedIcon1: {
    width: 25,
    height: 27,
    alignSelf:'center',
    top:7,
    position: 'absolute'
  },

  // CHECK :: END



  ellipseLayout: {
    height: 45,
    width: 45,
  },
  text: {
    alignSelf: "center",
    color: Color.textTxtPrimary,
    position: 'absolute',
    bottom:0-screenHeight+5,
    zIndex: 999,
    left: screenWidth / 2 - 40,
  },





  invoiceWarrantyLineSvgrepoIcon: {
    width: 26,
    height: 26,
    left: 11,
    top: 9,
    position: "absolute",
    overflow: "hidden",
  },
  groupPressable: {
    left: 155,
  },

  wrapper1: {
    left: 98,
  },
  carCitroenTopVehicleSvgrepIcon: {
    left: 5,
    top: 5,
    width: 36,
    height: 36,
    position: "absolute",
    overflow: "hidden",
  },
  record641Icon: {
    left: 11,
    top: 7,
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

});

export default Footer;
