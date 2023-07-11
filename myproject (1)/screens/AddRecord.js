import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const AddRecord = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.addRecord}>
      <Image
        style={[styles.lightTexture22341Icon, styles.iconGroupLayout]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />
      <Image
        style={[styles.image2Icon, styles.text1Position]}
        contentFit="cover"
        source={require("../assets/image-2.png")}
      />
      <View style={styles.breadcrumbs}>
        <View style={[styles.housefill, styles.housefillFlexBox]}>
          <Image
            style={styles.homeMutedIcon}
            contentFit="cover"
            source={require("../assets/homemuted.png")}
          />
        </View>
        <View style={styles.elementPosition} />
        <View style={styles.elementPosition}>
          <Text style={styles.textTypo}>\</Text>
        </View>
        <View style={styles.addMaintenanceRecordParent}>
          <Text style={styles.addMaintenanceRecord}>
            Add Maintenance Record
          </Text>
          <Text style={[styles.text1, styles.textTypo]}>\</Text>
        </View>
      </View>
      <Image
        style={[styles.addRecordChild, styles.text1Position]}
        contentFit="cover"
        source={require("../assets/rectangle-65.png")}
      />
      <Text style={[styles.text2, styles.pmTypo]}>22 - 02 -1993</Text>
      <View style={[styles.addRecordItem, styles.addPosition]} />
      <View style={[styles.addRecordInner, styles.addPosition]} />
      <Text style={[styles.pm, styles.pmTypo]}>06: 00pm</Text>
      <Text style={[styles.loritaDaniel, styles.pmTypo]}>Lorita Daniel</Text>
      <Text style={[styles.kmDriven, styles.pmTypo]}>KM Driven</Text>
      <Text style={[styles.oilChange, styles.pmTypo]}>Oil Change</Text>
      <View style={[styles.lineView, styles.childLayout]} />
      <View style={[styles.addRecordChild1, styles.childLayout]} />
      <View style={[styles.addRecordChild2, styles.childLayout]} />
      <View style={[styles.addRecordChild3, styles.childLayout]} />
      <Text style={[styles.jxc7789, styles.pmTypo]}>JXC - 7789</Text>
      <Image
        style={[styles.vectorIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vector.png")}
      />
      <Image
        style={[styles.vectorIcon1, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vector1.png")}
      />
      <Image
        style={[styles.groupIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/group-92.png")}
      />
      <Image
        style={[styles.date2SvgrepoCom11, styles.svgrepoIconLayout1]}
        contentFit="cover"
        source={require("../assets/date2svgrepocom-1-1.png")}
      />
      <Image
        style={styles.licensePlateNumberSvgrepoCIcon}
        contentFit="cover"
        source={require("../assets/licenseplatenumbersvgrepocom-1.png")}
      />
      <View style={styles.enterDetailParent}>
        <Text style={[styles.enterDetail, styles.pmTypo]}>Enter Detail...</Text>
        <View style={[styles.groupChild, styles.childLayout]} />
        <Image
          style={[styles.gallerySvgrepoCom1Icon, styles.svgrepoIconLayout1]}
          contentFit="cover"
          source={require("../assets/gallerysvgrepocom-1.png")}
        />
        <Image
          style={[styles.cameraSvgrepoCom61, styles.svgrepoIconLayout1]}
          contentFit="cover"
          source={require("../assets/camerasvgrepocom-6-1.png")}
        />
      </View>
      <Image
        style={[styles.timeOclockSvgrepoCom1Icon, styles.svgrepoIconLayout1]}
        contentFit="cover"
        source={require("../assets/timeoclocksvgrepocom-1.png")}
      />
      <View style={[styles.vectorParent, styles.groupItemLayout]}>
        <Image
          style={[styles.groupItem, styles.groupItemLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-73.png")}
        />
        <Text style={styles.save}>Save</Text>
      </View>
      <Image
        style={[styles.addRecordChild4, styles.addRecordChild4Layout]}
        contentFit="cover"
        source={require("../assets/group-171.png")}
      />
      <View style={[styles.rectangleView, styles.iconGroupLayout]} />
      <View style={styles.addRecordChild5} />
      <Text style={[styles.home, styles.addTypo]}>Home</Text>
      <Text style={[styles.vehicles, styles.addTypo]}>Vehicles</Text>
      <Text style={[styles.addVehicle, styles.addTypo]}>Add Vehicle</Text>
      <Text style={[styles.records, styles.addTypo]}>Records</Text>
      <Text style={[styles.invoices, styles.addTypo]}>Invoices</Text>
      <Image
        style={[styles.ellipseIcon, styles.frameLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-5.png")}
      />
      <Pressable
        style={styles.wrapperPosition}
        onPress={() => navigation.navigate("Vehicles")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/ellipse-5.png")}
        />
      </Pressable>
      <View style={[styles.housefill1, styles.housefillFlexBox]}>
        <Image
          style={styles.homeMutedIcon1}
          contentFit="cover"
          source={require("../assets/homemuted1.png")}
        />
      </View>
      <Pressable
        style={[styles.container, styles.frameLayout]}
        onPress={() => navigation.navigate("MaintenanceRecord")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/ellipse-7.png")}
        />
      </Pressable>
      <Image
        style={[styles.carCitroenTopVehicleSvgrepIcon, styles.wrapperPosition]}
        contentFit="cover"
        source={require("../assets/carcitroentopvehiclesvgrepocom-1.png")}
      />
      <Pressable
        style={[styles.frame, styles.frameLayout]}
        onPress={() => navigation.navigate("Invoices")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/ellipse-8.png")}
        />
      </Pressable>
      <Image
        style={[
          styles.invoiceWarrantyLineSvgrepoIcon,
          styles.svgrepoIconLayout,
        ]}
        contentFit="cover"
        source={require("../assets/invoicewarrantylinesvgrepocom-1.png")}
      />
      <Pressable
        style={[styles.groupPressable, styles.groupPressableLayout]}
        onPress={() => navigation.navigate("AddVehicle")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/group-11.png")}
        />
      </Pressable>
      <Image
        style={[styles.addRecordChild6, styles.groupPressableLayout]}
        contentFit="cover"
        source={require("../assets/group-174.png")}
      />
      <View style={[styles.vectorGroup, styles.iconGroupLayout]}>
        <Image
          style={[styles.groupInner, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-57.png")}
        />
        <View style={styles.groupChild1} />
        <View style={styles.addMaintenanceRecordGroup}>
          <Text style={[styles.addMaintenanceRecord1, styles.addTypo]}>
            Add Maintenance Record
          </Text>
          <Image
            style={[styles.vectorIcon2, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/vector2.png")}
          />
        </View>
        <Pressable
          style={[styles.rectanglePressable, styles.addRecordChild4Layout]}
          onPress={() => navigation.navigate("MaintenanceRecord")}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/rectangle-58.png")}
          />
        </Pressable>
      </View>
      <Image
        style={styles.maskGroupIcon}
        contentFit="cover"
        source={require("../assets/mask-group.png")}
      />
      <Image
        style={[styles.microphoneSvgrepoCom1Icon, styles.svgrepoIconLayout]}
        contentFit="cover"
        source={require("../assets/microphonesvgrepocom-1.png")}
      />
      <Image
        style={[styles.vectorIcon3, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vector3.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconGroupLayout: {
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
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
    lineHeight: 17,
    fontSize: FontSize.caption2Regular_size,
  },
  pmTypo: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    textAlign: "left",
    position: "absolute",
  },
  addPosition: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    top: 265,
    position: "absolute",
  },
  childLayout: {
    width: 384,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  svgrepoIconLayout1: {
    height: 25,
    width: 25,
    position: "absolute",
    overflow: "hidden",
  },
  groupItemLayout: {
    height: 45,
    width: 381,
    position: "absolute",
  },
  addRecordChild4Layout: {
    height: 43,
    position: "absolute",
  },
  addTypo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    color: Color.darkslateblue,
    fontWeight: "500",
    position: "absolute",
  },
  frameLayout: {
    width: 45,
    top: 845,
    height: 45,
    position: "absolute",
  },
  wrapperPosition: {
    left: 98,
    width: 45,
    top: 845,
    height: 45,
    position: "absolute",
  },
  svgrepoIconLayout: {
    height: 26,
    width: 26,
    position: "absolute",
    overflow: "hidden",
  },
  groupPressableLayout: {
    height: 104,
    width: 104,
    top: 777,
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
    width: 14,
    height: 20,
    left: 0,
    top: 0,
  },
  elementPosition: {
    left: 18,
    justifyContent: "center",
    height: 20,
    top: 0,
    position: "absolute",
  },
  addMaintenanceRecord: {
    top: 9,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.darkslateblue,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  text1: {
    left: 88,
    display: "none",
    position: "absolute",
    top: 0,
  },
  addMaintenanceRecordParent: {
    left: 27,
    width: 93,
    height: 17,
    top: 2,
    position: "absolute",
  },
  breadcrumbs: {
    top: 130,
    width: 120,
    height: 20,
    left: 19,
    position: "absolute",
  },
  addRecordChild: {
    top: 381,
    height: 216,
    width: 430,
    left: 0,
  },
  text2: {
    left: 24,
    top: 232,
    fontFamily: FontFamily.poppinsRegular,
  },
  addRecordItem: {
    width: 167,
    left: 23,
  },
  addRecordInner: {
    left: 220,
    width: 182,
  },
  pm: {
    left: 221,
    top: 232,
    fontFamily: FontFamily.poppinsRegular,
  },
  loritaDaniel: {
    top: 287,
    left: 24,
  },
  kmDriven: {
    top: 342,
    left: 24,
  },
  oilChange: {
    top: 398,
    left: 24,
  },
  lineView: {
    top: 376,
    left: 23,
  },
  addRecordChild1: {
    top: 432,
    left: 23,
  },
  addRecordChild2: {
    top: 320,
    left: 23,
  },
  addRecordChild3: {
    top: 211,
    left: 23,
  },
  jxc7789: {
    top: 178,
    left: 24,
  },
  vectorIcon: {
    right: "7.09%",
    left: "87.09%",
    bottom: "66.63%",
    top: "30.69%",
    width: "5.81%",
    height: "2.68%",
    maxWidth: "100%",
  },
  vectorIcon1: {
    right: "6.98%",
    left: "87.21%",
    bottom: "66.63%",
    top: "30.69%",
    width: "5.81%",
    height: "2.68%",
    maxWidth: "100%",
  },
  groupIcon: {
    height: "2.82%",
    width: "6.1%",
    top: "36.59%",
    right: "6.95%",
    bottom: "60.6%",
    left: "86.95%",
  },
  date2SvgrepoCom11: {
    left: 162,
    top: 231,
    height: 25,
  },
  licensePlateNumberSvgrepoCIcon: {
    top: 170,
    left: 366,
    width: 40,
    height: 40,
    position: "absolute",
    overflow: "hidden",
  },
  enterDetail: {
    left: 0,
    top: 0,
  },
  groupChild: {
    top: 34,
    left: -1,
  },
  gallerySvgrepoCom1Icon: {
    left: 350,
    top: 2,
  },
  cameraSvgrepoCom61: {
    left: 318,
    top: 2,
  },
  enterDetailParent: {
    top: 454,
    width: 382,
    height: 35,
    left: 24,
    position: "absolute",
  },
  timeOclockSvgrepoCom1Icon: {
    left: 374,
    top: 231,
    height: 25,
  },
  groupItem: {
    borderRadius: Border.br_7xs,
    left: 0,
    top: 0,
  },
  save: {
    top: 11,
    left: 171,
    color: Color.snow,
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_base,
    textAlign: "left",
    fontWeight: "500",
    position: "absolute",
  },
  vectorParent: {
    top: 737,
    left: 25,
  },
  addRecordChild4: {
    top: 3,
    left: 29,
    width: 372,
  },
  rectangleView: {
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
    position: "absolute",
  },
  addRecordChild5: {
    top: 917,
    left: 139,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.darkslateblue,
    width: 154,
    height: 6,
    position: "absolute",
  },
  home: {
    left: 22,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
    top: 895,
  },
  vehicles: {
    left: 99,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
    top: 895,
  },
  addVehicle: {
    top: 867,
    left: 172,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
  },
  records: {
    left: 271,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
    top: 895,
  },
  invoices: {
    left: 359,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
    top: 895,
  },
  ellipseIcon: {
    left: 20,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  homeMutedIcon1: {
    height: 27,
    width: 25,
  },
  housefill1: {
    top: 852,
    left: 31,
  },
  container: {
    left: 277,
  },
  carCitroenTopVehicleSvgrepIcon: {
    overflow: "hidden",
  },
  frame: {
    left: 365,
  },
  invoiceWarrantyLineSvgrepoIcon: {
    top: 855,
    left: 375,
  },
  groupPressable: {
    left: 163,
  },
  addRecordChild6: {
    left: 164,
  },
  groupInner: {
    top: -6,
    height: 80,
    position: "absolute",
  },
  groupChild1: {
    top: 13,
    left: 43,
    width: 340,
    height: 50,
    position: "absolute",
  },
  addMaintenanceRecord1: {
    top: "0%",
    left: "30.03%",
    textAlign: "center",
    fontSize: FontSize.size_base,
  },
  vectorIcon2: {
    height: "88.85%",
    width: "7.47%",
    top: "8.33%",
    right: "92.53%",
    bottom: "2.82%",
    left: "0%",
  },
  addMaintenanceRecordGroup: {
    height: "38.1%",
    width: "68.14%",
    top: "30.16%",
    right: "26.74%",
    bottom: "31.75%",
    left: "5.12%",
    position: "absolute",
  },
  rectanglePressable: {
    top: 59,
    width: 49,
    left: 19,
  },
  vectorGroup: {
    top: 47,
    height: 63,
    position: "absolute",
  },
  maskGroupIcon: {
    top: 63,
    left: 386,
    width: 31,
    height: 31,
    position: "absolute",
  },
  microphoneSvgrepoCom1Icon: {
    top: 854,
    left: 287,
  },
  vectorIcon3: {
    height: "1.26%",
    width: "4.65%",
    top: "43.35%",
    right: "7.67%",
    bottom: "55.39%",
    left: "87.67%",
  },
  addRecord: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    height: 932,
    width: "100%",
  },
});

export default AddRecord;
