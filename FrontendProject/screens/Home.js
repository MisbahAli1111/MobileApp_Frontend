import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Button, Text, Pressable, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import { TextInput } from "react-native-gesture-handler";
import { TouchableWithoutFeedback } from 'react-native';
import Footer from "../components/Footer";
// import { BarChart } from 'react-native-chart-kit';

import DashboardGraph from "../components/DashboardGraph";
const Home = () => {
  const navigation = useNavigation();
  //data=[];
  const invoices = null;
  //const invoices=  ['Tayyab',"Oil Change", 'Paid','05-15-2000', '1200', '2400','2','2400','1','1'] 

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };



  return (
    <View style={styles.home}>

      <Image
        style={[styles.lightTexture22341Icon, styles.iconPosition1]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />
      <Image
        style={[styles.image2Icon, styles.iconPosition1]}
        contentFit="cover"
        source={require("../assets/image-2.png")}
      />
      <View style={[styles.homeChild, styles.homeLayout]} />
      <Text style={[styles.text, styles.textTypo1]}>009</Text>
      <Text style={[styles.paymentDues, styles.paymentDuesPosition]}>
        Payment Dues
      </Text>
      <Image
        style={[styles.alertTriangle1Icon, styles.iconLayout3]}
        contentFit="cover"
        source={require("../assets/alerttriangle-1.png")}
      />
      <View style={[styles.homeItem, styles.homeLayout]} />
      <Text style={[styles.totalEmployees, styles.groupChild4Layout]}>
        Total Employees
      </Text>
      <View style={styles.wrapper}>
        <Text style={[styles.text1, styles.text1Typo]}>009</Text>
      </View>
      <View style={[styles.rectangleParent, styles.groupChildLayout2]}>
        <Pressable
          style={[styles.groupChild, styles.groupChildLayout2]}
          onPress={() => navigation.navigate("MaintenanceRecord")}
        />
        <TextInput
          style={[styles.searchRecordAbc123, styles.text1Typo]}
          placeholder="Search Record"
        />
        <Pressable
          style={styles.vector}
          onPress={() => navigation.navigate("MaintenanceRecord")}
        >
          <Image
            style={[styles.icon, styles.iconLayout1]}
            contentFit="cover"
            source={require("../assets/vector8.png")}
          />
        </Pressable>
      </View>
      <View style={[styles.homeInner, styles.homeInnerLayout]} />

      <View style={styles.lineParent}>
      {/* <BarChart
        data={data}
        width={300}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#1E2923',
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: '#08130D',
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false // optional
        }}
        /> */}
      </View>


      {/* car , bike, auto.. */}

      {/* car  */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Vehicles', { type: 'Car' })}
        activeOpacity={0.5}
      >
        <LinearGradient
          style={[styles.rectangleLineargradient, styles.homeChild1Layout]}
          locations={[0, 1]}
          colors={["rgba(7, 132, 199, 0.5)", "rgba(217, 217, 217, 0)"]}
        />
        <Text style={[styles.car, styles.carTypo]}>Car</Text>
        <Image
          style={styles.pngwing3Icon}
          contentFit="cover"
          source={require("../assets/pngwing-3.png")}
        />
      </TouchableOpacity>

      {/* bike  */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Vehicles', { type: 'Bike' })}
        activeOpacity={0.5}
      >
        <Image
          style={[styles.pngwing1Icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/pngwing-1.png")}
        />
        <LinearGradient
          style={[styles.homeChild1, styles.homeChild1Layoutt]}
          locations={[0, 1]}
          colors={["rgba(7, 132, 199, 0.5)", "rgba(217, 217, 217, 0)"]}
        />
        <Text style={[styles.bike, styles.bikeLayout]}>Bike</Text>
      </TouchableOpacity>

      {/* truck  */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Vehicles', { type: 'Truck' })}
        activeOpacity={0.5}
      >
        <LinearGradient
          style={[styles.homeChild2, styles.homeChildLayout]}
          locations={[0, 1]}
          colors={["rgba(7, 132, 199, 0.5)", "rgba(217, 217, 217, 0)"]}
        />
        <Text style={[styles.truck, styles.autoTypo]}>Truck</Text>
        <Image
          style={[styles.pngwing2Icon, styles.groupChildLayout2]}
          contentFit="cover"
          source={require("../assets/pngwing-2.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Vehicles', { type: 'Auto' })}
        activeOpacity={0.5}
      >
        {/* auto  */}
        <LinearGradient
          style={[styles.homeChild3, styles.homeChildLayout]}
          locations={[0, 1]}
          colors={["rgba(7, 132, 199, 0.5)", "rgba(217, 217, 217, 0)"]}
        />
        <Text style={[styles.auto, styles.autoTypo]}>Auto</Text>
        <Image
          style={[styles.pngegg1Icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/pngegg-1.png")}
        />
      </TouchableOpacity>

      {/* // graph */}
      {/* <Text style={[styles.vehiclesMaintained, styles.dashboardTypo]}>
        Vehicles Maintained
      </Text>
      <Text style={styles.text2}>009</Text> */}

      <View style={styles.lineParent}>


      </View>



      <Image
        style={[styles.users1Icon, styles.iconLayout3]}
        contentFit="cover"
        source={require("../assets/users-1.png")}
      />



      <View style={[styles.homeChild7, styles.homeChildShadowBox]} />
      <View style={[styles.homeChild8, styles.childPosition]} />
      {/* top face icon */}
      <Image
        style={styles.maskGroupIcon}
        contentFit="cover"
        source={require("../assets/mask-group.png")}
      />
      {/* Dashboard */}
      <Text style={[styles.dashboard, styles.dashboardTypo]}>Dashboard</Text>
      {/* backicon top */}

      <TouchableWithoutFeedback onPressIn={() => navigation.navigate("SwitchBusiness")}>
        <Image
          style={[styles.vectorIcon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../assets/vector2.png")}
        />
      </TouchableWithoutFeedback>

      <View style={[styles.cont]}>
        <Footer prop={"Home"} data={invoices} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconPosition1: {
    width: 430,
    left: 0,
    position: "absolute",
  },
  homeLayout: {
    width: 186,
    top: 175,

    backgroundColor: Color.steelblue_300,
    borderRadius: Border.br_5xs,
    position: "absolute",
  },

  dashboardd: {


  },
  textTypo1: {
    color: Color.steelblue_100,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "left",
    position: "absolute",
  },
  paymentDuesPosition: {
    top: 295,
    fontSize: FontSize.size_base,
  },
  iconLayout3: {
    height: 25,
    top: 232,
    width: 25,
    position: "absolute",
    overflow: "hidden",
  },
  groupChild4Layout: {
    height: 24,
    position: "absolute",
  },
  text1Typo: {
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  groupChildLayout2: {
    height: 55,
    position: "absolute",
  },
  iconLayout1: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  homeInnerLayout: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.steelblue_300,
  },
  dashboardTypo: {
    color: Color.textTxtPrimary,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  homeChild1Layout: {
    backgroundColor: "transparent",
    width: 83,
    top: 620,
    borderRadius: Border.br_5xs,
    position: "absolute",
  },
  homeChild1Layoutt: {
    backgroundColor: "transparent",
    width: 83,
    top: 600,
    borderRadius: Border.br_5xs,
    position: "absolute",
  },

  carTypo: {
    height: 19,
    top: 710,
    textAlign: "center",
    color: Color.darkslateblue,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  homeChildLayout: {
    width: 84,
    backgroundColor: "transparent",
    height: 79,
    top: 600,
    borderRadius: Border.br_5xs,
    position: "absolute",
  },
  iconLayout: {
    height: 44,
    position: "absolute",
  },
  bikeLayout: {
    width: 36,
    position: "absolute",
  },
  autoTypo: {
    width: 46,
    height: 19,
    top: 690,
    textAlign: "center",
    color: Color.darkslateblue,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  groupPosition: {
    left: 40,
    height: 1,
    width: 313,
    borderTopWidth: 1,
    borderColor: "#737373",
    borderStyle: "solid",
    position: "absolute",
  },
  mTypo: {
    height: 15,
    fontSize: FontSize.caption2Regular_size,
    top: 124,
    color: Color.textTxtPrimary,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  groupChildLayout1: {
    width: 6,
    left: 113,
  },
  groupChildPosition7: {
    left: 328,
    width: 8,
  },
  textTypo: {
    height: 20,
    width: 34,
    color: Color.dimgray_100,
    fontSize: FontSize.caption2Regular_size,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    left: 0,
    position: "absolute",
  },
  groupChildPosition6: {
    borderTopRightRadius: Border.br_8xs,
    borderTopLeftRadius: Border.br_8xs,
  },
  groupChildPosition4: {
    height: 47,
    top: 68,
    position: "absolute",
  },
  groupChildPosition3: {
    backgroundColor: Color.goldenrod,
    borderTopRightRadius: Border.br_8xs,
    borderTopLeftRadius: Border.br_8xs,
  },
  groupChildLayout: {
    height: 54,
    top: 61,
    width: 8,
    position: "absolute",
  },

  cont: {
    padding: 6,
    top: -35,
    right: 5,
  },
  groupChildPosition2: {
    height: 63,
    top: 53,
    backgroundColor: Color.darkgray,
    borderTopRightRadius: Border.br_8xs,
    borderTopLeftRadius: Border.br_8xs,
    position: "absolute",
  },
  groupChildPosition1: {
    backgroundColor: Color.darkorange,
    borderTopRightRadius: Border.br_8xs,
    borderTopLeftRadius: Border.br_8xs,
  },
  groupChildPosition: {
    left: 202,
    borderTopRightRadius: Border.br_8xs,
    borderTopLeftRadius: Border.br_8xs,
    width: 6,
    position: "absolute",
  },
  childPosition: {
    top: 64,
    position: "absolute",
  },
  groupIconLayout: {
    height: 43,
    position: "absolute",
  },
  homeChildShadowBox: {
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowColor: "rgba(0, 0, 0, 0.03)",
    width: 430,
    left: 0,
    position: "absolute",
  },
  home1Typo: {
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  ellipseLayout: {
    height: 45,
    top: 800,
    width: 45,
    position: "absolute",
  },
  iconPosition: {
    top: 810,
    position: "absolute",
    overflow: "hidden",
  },
  homeChild6Layout: {
    height: 104,
    width: 104,
    top: 720,
    left: 0,
    position: "absolute",
  },
  lightTexture22341Icon: {
    height: 931,
    top: 0,
  },
  image2Icon: {
    top: 803,
    height: 129,
    display: "none",
  },
  homeChild: {
    height: 183,
    left: 19,
  },
  text: {
    left: 94,
    textAlign: "left",
    fontSize: FontSize.size_lgi,
    top: 265,
  },
  paymentDues: {
    left: 54,
    fontSize: FontSize.size_base,
    textAlign: "left",
    color: Color.steelblue_100,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  alertTriangle1Icon: {
    left: 100,
  },
  homeItem: {
    left: 225,
    height: 182,
  },
  totalEmployees: {
    left: 250,
    width: 135,
    textAlign: "center",
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    top: 295,
  },
  text1: {
    textAlign: "left",
    fontSize: FontSize.size_lgi,
    left: 0,
    top: 0,
    position: "absolute",
  },
  wrapper: {
    left: 300,
    width: 37,
    height: 29,
    top: 265,
    position: "absolute",
  },
  groupChild: {
    width: 392,
    height: 55,
    backgroundColor: Color.steelblue_300,
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
  },
  searchRecordAbc123: {
    top: 14,
    left: 21,
    width: 205,
    height: 26,
    fontSize: FontSize.size_base,
    textAlign: "left",
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
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
  rectangleParent: {
    top: 104,
    width: 392,
    height: 55,
    left: 15,
  },
  homeInner: {
    top: 375,
    width: 389,
    height: 215,
    left: 15,
    backgroundColor: Color.steelblue_300,
    position: "absolute",
  },
  vehiclesMaintained: {
    top: 390,
    left: 28,
    width: 188,
    height: 26,
    textAlign: "left",
  },
  text2: {
    top: 389,
    fontSize: 20,
    height: 32,
    width: 45,
    left: 342,
    color: Color.textTxtPrimary,
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  rectangleLineargradient: {
    height: 79,
    backgroundColor: "transparent",
    width: 83,
    left: 22,
    top: 677,
  },
  car: {
    left: 49,
    width: 30,
    //position: "absolute",
  },
  homeChild1: {
    left: 122,
    height: 78,
    backgroundColor: "transparent",
    width: 83,
    top: 677,
  },
  homeChild2: {
    left: 221,
  },
  homeChild3: {
    left: 321,
  },
  pngwing1Icon: {
    top: 635,
    left: 140,
    width: 48,
  },
  bike: {
    left: 146,
    height: 19,
    top: 690,
    textAlign: "center",
    color: Color.darkslateblue,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  truck: {
    left: 242,
  },
  auto: {
    left: 342,
    width: 46,
  },
  groupItem: {
    top: 115,
    left: 46,
    height: 1,
    width: 313,
    borderTopWidth: 1,
    borderColor: "#737373",
    borderStyle: "solid",
    position: "absolute",
  },
  groupInner: {
    top: 45,
  },
  lineView: {
    top: 80,
  },
  groupChild1: {
    top: 10,
  },
  m: {
    left: 65,
    width: 10,
  },
  t: {
    height: 15,
    fontSize: FontSize.caption2Regular_size,
    top: 124,
    color: Color.textTxtPrimary,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  w: {
    left: 154,
    width: 13,
  },
  t1: {
    left: 203,
    width: 8,
  },
  f: {
    width: 8,
    left: 242,
  },
  s: {
    left: 284,
    width: 8,
  },
  s1: {
    height: 15,
    fontSize: FontSize.caption2Regular_size,
    top: 124,
    color: Color.textTxtPrimary,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  text3: {
    top: 0,
  },
  text4: {
    top: 35,
  },
  text5: {
    top: 70,
  },
  text6: {
    top: 106,
    left: 25,
    width: 9,
    height: 14,
    color: Color.dimgray_100,
    fontSize: FontSize.caption2Regular_size,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  rectangleView: {
    top: 18,
    height: 98,
    backgroundColor: Color.darkgray,
    left: 66,
    borderTopLeftRadius: Border.br_8xs,
    width: 8,
    position: "absolute",
  },
  groupChild2: {
    top: 42,
    height: 74,
    backgroundColor: Color.crimson,
    left: 66,
    borderTopLeftRadius: Border.br_8xs,
    width: 8,
    position: "absolute",
  },
  groupChild3: {
    left: 157,
    width: 8,
    backgroundColor: Color.darkgray,
    borderTopRightRadius: Border.br_8xs,
    borderTopLeftRadius: Border.br_8xs,
  },
  groupChild4: {
    top: 92,
    left: 157,
    width: 8,
    height: 24,
    position: "absolute",
  },
  groupChild5: {
    top: 39,
    height: 77,
    backgroundColor: Color.darkgray,
    width: 8,
    left: 242,
    position: "absolute",
  },
  groupChild6: {
    backgroundColor: Color.goldenrod,
    borderTopRightRadius: Border.br_8xs,
    borderTopLeftRadius: Border.br_8xs,
    left: 242,
  },
  groupChild7: {
    width: 6,
    left: 113,
  },
  groupChild8: {
    height: 47,
    top: 68,
    position: "absolute",
    width: 6,
    left: 113,
  },
  groupChild9: {
    top: 31,
    height: 84,
    backgroundColor: Color.darkgray,
  },
  groupChild10: {
    top: 46,
    height: 70,
    backgroundColor: Color.crimson,
  },
  groupChild11: {
    left: 284,
    width: 8,
  },
  groupChild12: {
    height: 54,
    top: 61,
    width: 8,
    position: "absolute",
    left: 284,
  },
  groupChild13: {
    top: 29,
    height: 87,
    backgroundColor: Color.darkgray,
    left: 328,
    width: 8,
    position: "absolute",
  },
  groupChild14: {
    height: 51,
    backgroundColor: Color.darkorange,
    borderTopRightRadius: Border.br_8xs,
    borderTopLeftRadius: Border.br_8xs,
    left: 328,
    width: 8,
  },
  lineParent: {
    top: 438,
    left: 26,
    width: 358,
    height: 138,
    position: "absolute",
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',

  },
  groupIcon: {
    top: 3,
    left: 29,
    width: 372,
  },
  pngwing2Icon: {
    top: 635,
    width: 87,
    left: 221,
  },
  pngwing3Icon: {
    top: 662,
    left: 23,
    width: 82,
    height: 34,
    position: "absolute",
  },
  users1Icon: {
    left: 306,
  },
  pngegg1Icon: {
    top: 635,
    left: 332,
    width: 56,
  },
  homeChild4: {
    top: 785,
    height: 102,
    backgroundColor: 'red',
  },
  homeChild5: {
    top: 917,
    left: 139,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.textTxtPrimary,
    width: 154,
    height: 6,
    position: "absolute",
  },
  home1: {
    top: 845,
    fontSize: FontSize.size_sm,
    left: 22,
  },
  vehicles: {
    left: 91,
    top: 845,
    fontSize: FontSize.size_sm,
  },
  addVehicle: {
    top: 835,
    left: 172,
  },
  records: {
    left: 271,
    top: 845,
    fontSize: FontSize.size_sm,
  },
  invoices: {
    left: 350,
    top: 845,
    fontSize: FontSize.size_sm,
  },
  ellipseIcon: {
    left: 20,
  },
  iconLayout2: {
    height: "100%",
    width: "100%",
    right: 2
  },
  container: {
    left: 98,
  },
  homeMutedIcon: {
    height: 27,
    width: 25,
  },
  housefill: {
    top: 808,
    left: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  frame: {
    left: 277,
  },
  carCitroenTopVehicleSvgrepIcon: {
    top: 805,
    left: 101,
    height: 36,
    overflow: "hidden",
  },
  ellipsePressable: {
    left: 365,
  },
  invoiceWarrantyLineSvgrepoIcon: {
    left: 373,
    width: 26,
    height: 26,
  },
  groupPressable: {
    left: 163,
  },
  homeChild6: {
    left: 164,
  },
  homeChild7: {
    top: 51,
    backgroundColor: Color.gray_400,
    height: 60,
  },
  homeChild8: {
    left: 43,
    width: 340,
    height: 50,
  },
  maskGroupIcon: {
    top: 45,
    left: 372,
    width: 31,
    height: 31,
    position: "absolute",
  },
  dashboard: {
    top: "6.00%",
    left: "39.77%",
    textAlign: "center",
  },
  vectorIcon: {
    height: "2.29%",
    width: "5.09%",
    top: "6.50%",
    right: "89.8%",
    bottom: "89.99%",
    left: "5.12%",
    position: "absolute",
  },
  rectanglePressable: {
    top: 63,
    width: 49,
    left: 19,
  },
  record641Icon: {
    left: 289,
    width: 27,
    height: 27,
  },
  home: {
    backgroundColor: Color.white,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default Home;