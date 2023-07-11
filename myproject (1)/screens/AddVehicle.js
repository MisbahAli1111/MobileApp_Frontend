import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { TextInput } from "react-native-gesture-handler";
const AddVehicle = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.addVehicle}>
      <Image
        style={[styles.lightTexture22341Icon, styles.iconLayout1]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />
      <Image
        style={[styles.image2Icon, styles.text1Position]}
        contentFit="cover"
        source={require("../assets/image-2.png")}
      />
      <View style={[styles.housefill, styles.housefillFlexBox]}>
        <Image
          style={styles.homeMutedIcon}
          contentFit="cover"
          source={require("../assets/homemuted.png")}
        />
      </View>
      <View style={styles.elementPosition} />
      <View style={styles.elementPosition}>
        <Text style={[styles.text, styles.textTypo]}>\</Text>
      </View>
      <View style={styles.addVehicleParent}>
        <Text style={[styles.addVehicle1, styles.addVehicle1Position]}>
          Add Vehicle
        </Text>
        <Text style={[styles.text1, styles.textTypo]}>\</Text>
      </View>
      <Image
        style={[styles.addVehicleChild, styles.iconLayout1]}
        contentFit="cover"
        source={require("../assets/rectangle-57.png")}
      />
      <View style={styles.addVehicleItem} />
      <Text style={[styles.addVehicle2, styles.uploadTypo]}>Add Vehicle</Text>
      <Image
        style={[styles.vectorIcon, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/vector2.png")}
      />
      <Pressable
        style={[styles.wrapper, styles.wrapperLayout]}
        onPress={() => navigation.navigate("MaintenanceRecord")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/rectangle-58.png")}
        />
      </Pressable>
      <View style={styles.noImageFoundParent}>
        <Text style={[styles.noImageFound, styles.vehicleTypo]}>
          No image Found
        </Text>
        <View style={[styles.uploadParent, styles.uploadPosition]}>
          <Text style={[styles.upload, styles.uploadPosition]}>Upload</Text>
          <Image
            style={[styles.vectorIcon1, styles.vectorIconLayout]}
            contentFit="cover"
            source={require("../assets/vector16.png")}
          />
        </View>
      </View>
      <View style={[styles.addVehicleInner, styles.addInnerPosition]}>
        <View style={styles.vehicleTypeParent}>
          <TextInput
            style={[styles.vehicleType, styles.vehicleTypo] }
            placeholder="Vehicle Type"
          ></TextInput>
          <View style={styles.carParent}>
          {/* <Text style={[styles.car, styles.vehicleTypo]}>{`Car `}</Text> */}
            <Image
              style={[styles.frameChild, styles.childLayout]}
              contentFit="cover"
              source={require("../assets/vector-61.png")}
            />
          </View>
        </View>
      </View>
      <View style={[styles.lineView, styles.childBorder]} />
      <View style={[styles.addVehicleChild1, styles.childBorder]} />
      <TextInput style={[styles.vehicleModel, styles.vehicleTypo]}  placeholder="Modal ">
      
      </TextInput>
      {/* <Text style={[styles.text2, styles.vehicleTypo]}>{`2011 `}</Text> */}
      <Image
        style={[styles.addVehicleChild2, styles.childLayout]}
        contentFit="cover"
        source={require("../assets/vector-61.png")}
      />
      <View style={[styles.frameParent, styles.lineParentLayout]}>
        <View style={styles.frameWrapper}>
          <View style={styles.vehicleTypeParent}>
            <TextInput
              style={[styles.vehicleType, styles.vehicleTypo]}
            placeholder="Registration Number     "
            ></TextInput>
          </View>
        </View>
        <View style={[styles.groupChild, styles.groupPosition]} />
        <View style={[styles.groupItem, styles.savePosition]} />
        <View style={styles.frameContainer}>
          <View style={styles.vehicleTypeParent}>
            <TextInput style={[styles.vehicleType, styles.vehicleTypo]} placeholder="Vehicle Color     ">
              
            </TextInput>
            <View style={styles.carParent}>
              {/* <Text style={[styles.car, styles.vehicleTypo]}>Black</Text> */}
              <Image
                style={[styles.frameChild, styles.childLayout]}
                contentFit="cover"
                source={require("../assets/vector-61.png")}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.lineParent, styles.lineParentLayout]}>
        <View style={[styles.groupInner, styles.groupInnerLayout]} />
        <View style={styles.frameWrapper}>
          <View style={styles.vehicleTypeParent}>
            <TextInput style={[styles.davidDaniel, styles.vehicleTypo]} placeholder="Name">
          
            </TextInput>
          </View>
        </View>
      </View>
      <View style={[styles.lineGroup, styles.lineParentLayout]}>
        <View style={[styles.groupInner, styles.groupInnerLayout]} />
        <View style={styles.frameWrapper}>
          <View style={styles.vehicleTypeParent}>
            <TextInput style={[styles.vehicleType, styles.vehicleTypo]} placeholder="Km Driven   ">
             
            </TextInput>
          </View>
        </View>
      </View>
      <View style={[styles.lineContainer, styles.lineParentLayout]}>
        <View style={[styles.groupInner, styles.groupInnerLayout]} />
        <View style={styles.frameWrapper}>
          <View style={styles.vehicleTypeParent}>
            <Text style={[styles.vehicleType, styles.vehicleTypo]}>
              Owner Rating
            </Text>
          </View>
        </View>
      </View>
      <Image
        style={[styles.starIcon, styles.addChildLayout2]}
        contentFit="cover"
        source={require("../assets/star-1.png")}
      />
      <View style={[styles.addVehicleChild3, styles.groupInnerLayout]} />
      <View style={[styles.addVehicleInner1, styles.addInnerPosition]}>
        <View style={styles.vehicleTypeParent}>
          <TextInput style={[styles.vehicleType, styles.vehicleTypo]} placeholder="phone Number    ">
           
          </TextInput>
        </View>
      </View>
      <Image
        style={[styles.mdiuserCircleOutlineIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/mdiusercircleoutline.png")}
      />
      <Image
        style={[styles.materialSymbolspermContactIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/materialsymbolspermcontactcalendaroutline2.png")}
      />
      <Image
        style={[styles.addVehicleChild4, styles.addChildLayout2]}
        contentFit="cover"
        source={require("../assets/star-2.png")}
      />
      <Image
        style={[styles.addVehicleChild5, styles.addChildLayout2]}
        contentFit="cover"
        source={require("../assets/star-2.png")}
      />
      <Image
        style={[styles.addVehicleChild6, styles.addChildLayout2]}
        contentFit="cover"
        source={require("../assets/star-1.png")}
      />
      <Image
        style={[styles.addVehicleChild7, styles.addChildLayout2]}
        contentFit="cover"
        source={require("../assets/star-1.png")}
      />
      <Image
        style={styles.maskGroupIcon}
        contentFit="cover"
        source={require("../assets/mask-group.png")}
      />
      <Image
        style={[styles.odometerSvgrepoCom1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/odometersvgrepocom-1.png")}
      />
      <Image
        style={styles.rectangleIcon}
        contentFit="cover"
        source={require("../assets/rectangle-73.png")}
      />
      <Text style={[styles.save, styles.saveTypo]}>Save</Text>
      <Image
        style={[styles.groupIcon, styles.wrapperLayout]}
        contentFit="cover"
        source={require("../assets/group-10.png")}
      />
      <Image
        style={styles.maskGroupIcon1}
        contentFit="cover"
        source={require("../assets/mask-group2.png")}
      />
      <Image
        style={[styles.addVehicleChild8, styles.addChildLayout1]}
        contentFit="cover"
        source={require("../assets/rectangle-622.png")}
      />
      <Image
        style={[styles.addVehicleChild9, styles.addChildLayout1]}
        contentFit="cover"
        source={require("../assets/rectangle-74.png")}
      />
      <Text style={[styles.steeda, styles.text4Position]}>STEEDA</Text>
      <Text style={[styles.text4, styles.text4Position]}>2023</Text>
      <Image
        style={[styles.addVehicleChild10, styles.addChildLayout]}
        contentFit="cover"
        source={require("../assets/vector-71.png")}
      />
      <Image
        style={[styles.addVehicleChild11, styles.addChildLayout]}
        contentFit="cover"
        source={require("../assets/vector-8.png")}
      />
      <View style={[styles.rectangleView, styles.iconLayout1]} />
      <View style={styles.addVehicleChild12} />
      <Text style={[styles.home, styles.homeTypo]}>Home</Text>
      <Text style={[styles.vehicles, styles.homeTypo]}>Vehicles</Text>
      <Text style={[styles.addVehicle3, styles.homeTypo]}>Add Vehicle</Text>
      <Text style={[styles.records, styles.homeTypo]}>Records</Text>
      <Text style={[styles.invoices, styles.homeTypo]}>Invoices</Text>
      <Image
        style={[styles.ellipseIcon, styles.ellipseLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-5.png")}
      />
      <View style={[styles.housefill1, styles.text4Position]}>
        <Image
          style={styles.homeMutedIcon1}
          contentFit="cover"
          source={require("../assets/homemuted1.png")}
        />
      </View>
      <Pressable
        style={[styles.frame, styles.ellipseLayout]}
        onPress={() => navigation.navigate("MaintenanceRecord")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/ellipse-8.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.ellipsePressable, styles.ellipseLayout]}
        onPress={() => navigation.navigate("Invoices")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/ellipse-8.png")}
        />
      </Pressable>
      <Image
        style={styles.invoiceWarrantyLineSvgrepoIcon}
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
          source={require("../assets/group-111.png")}
        />
      </Pressable>
      <Image
        style={[styles.addVehicleChild13, styles.groupPressableLayout]}
        contentFit="cover"
        source={require("../assets/group-174.png")}
      />
      <Pressable
        style={[styles.wrapper1, styles.ellipseLayout]}
        onPress={() => navigation.navigate("Vehicles")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/ellipse-7.png")}
        />
      </Pressable>
      <Image
        style={styles.carCitroenTopVehicleSvgrepIcon}
        contentFit="cover"
        source={require("../assets/carcitroentopvehiclesvgrepocom-13.png")}
      />
      <Image
        style={styles.record641Icon}
        contentFit="cover"
        source={require("../assets/record64-1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 45,
    top: 845,
    height: 45,
    position: "absolute",
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
    left: "36.96%",
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
    left: "0%",
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
    left: 22,
    top: 895,
    lineHeight: 18,
  },
  vehicles: {
    left: 96,
    top: 895,
    lineHeight: 18,
  },
  addVehicle3: {
    top: 867,
    left: 172,
  },
  records: {
    left: 271,
    top: 895,
    lineHeight: 18,
  },
  invoices: {
    top: 895,
    lineHeight: 18,
    left: 359,
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
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    left: 277,
  },
  ellipsePressable: {
    left: 365,
  },
  invoiceWarrantyLineSvgrepoIcon: {
    top: 855,
    left: 375,
    width: 26,
    height: 26,
    position: "absolute",
    overflow: "hidden",
  },
  groupPressable: {
    left: 163,
  },
  addVehicleChild13: {
    left: 164,
  },
  wrapper1: {
    left: 103,
  },
  carCitroenTopVehicleSvgrepIcon: {
    top: 850,
    left: 108,
    width: 36,
    height: 36,
    position: "absolute",
    overflow: "hidden",
  },
  record641Icon: {
    top: 853,
    left: 289,
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
});

export default AddVehicle;
