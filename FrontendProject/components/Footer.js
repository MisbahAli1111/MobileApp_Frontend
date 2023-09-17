import * as React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
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
// import { TextInput } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const rem = screenWidth / 16;
function Footer(props) {
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState("");

  useEffect(() => {
    setActiveScreen(props.prop);
  }, [props.prop]);

  function handleInvoicePress() {
    if (props.data == null) {

      navigation.navigate("Invoices", { data: props.data });
    }
    navigation.navigate("Invoices", { data: props.data });
  }
  function handleHomePress() {
    navigation.navigate("Home");
  }

  function handleRecordPress() {
    navigation.navigate("MaintenanceRecord");
  }
  function handleVehiclePress() {
    navigation.navigate("Vehicles", { type: "default" });
  }
  function handleAddRecord() {
    navigation.navigate("AddRecord");
  }
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

  // CHECK :: START
  bottom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    position: 'absolute',
    backgroundColor: Color.steelblue_300,
    width: screenWidth,
    height: screenHeight*0.11,
    top: screenHeight - screenHeight*0.11,
    display: 'flex',
    gap: rem*4.5,
  },

  imageDiv: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: rem*0.7,
  },

  imageDiv2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: rem*0.7,
  },

  bottomImg: {
    height: rem*1.78,
    width: rem*1.78,
  },
  groupPressableLayout: {
    height: rem*4,
    width: rem*4,
    position: 'absolute',
    top: screenHeight - screenHeight*0.11 - rem*1.8,
    zIndex: 999,
    left: screenWidth / 2 - rem*2,
  },
  homeMutedIcon1: {
    width: 25,
    height: 27,
    left: 9,
    top: 7,
    position: 'absolute'
  },

  // CHECK :: END


 
  ellipseLayout: {
    height: 45,
    width: 45,
  },

  lightTexture22341Icon: {
    top: 0,
    position: "absolute",
    height: 932,
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
    position: 'absolute',
    top: screenHeight - 100 + 45,
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
