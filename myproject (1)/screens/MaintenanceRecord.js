import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";

const MaintenanceRecord = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.maintenanceRecord}>
      <Image
        style={styles.lightTexture22341Icon}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />
      <Image
        style={styles.image2Icon}
        contentFit="cover"
        source={require("../assets/image-2.png")}
      />
      <View style={styles.rectangleParent}>
        <View style={[styles.groupChild, styles.groupInnerShadowBox]} />
        <View style={styles.groupItem} />
        <View style={styles.recordParent}>
          <Text style={styles.record}>Record</Text>
          <Image
            style={[styles.vectorIcon, styles.iconLayout1]}
            contentFit="cover"
            source={require("../assets/vector2.png")}
          />
        </View>
        <Pressable
          style={[styles.wrapper, styles.wrapperLayout]}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            style={styles.iconLayout}
            contentFit="cover"
            source={require("../assets/rectangle-58.png")}
          />
        </Pressable>
      </View>
      <View style={styles.groupParent}>
        <View style={[styles.breadcrumbsWrapper, styles.breadcrumbsLayout]}>
          <View style={[styles.breadcrumbs, styles.breadcrumbsLayout]}>
            <View style={[styles.housefill, styles.housefillFlexBox]}>
              <Image
                style={styles.homeMutedIcon}
                contentFit="cover"
                source={require("../assets/homemuted.png")}
              />
            </View>
            <View style={styles.elementPosition} />
            <View style={styles.elementPosition}>
              <Text style={[styles.text, styles.davidTypo1]}>\</Text>
            </View>
            <View style={[styles.element2, styles.housefillFlexBox]}>
              <Text style={[styles.text, styles.davidTypo1]}>\</Text>
            </View>
            <View style={[styles.surface, styles.surfaceParentFlexBox]}>
              <Text style={styles.search}>Search</Text>
            </View>
            <View style={[styles.surface1, styles.surfaceParentFlexBox]}>
              <Text style={[styles.abc123, styles.abc123Clr]}>ABC-123</Text>
            </View>
          </View>
        </View>
        <Pressable
          style={[styles.groupWrapper, styles.groupLayout]}
          onPress={() => navigation.navigate("AddRecord")}
        >
          <View style={[styles.rectangleGroup, styles.groupLayout]}>
            <View style={[styles.groupInner, styles.groupInnerLayout]} />
            <View style={styles.addRecordParent}>
              <Text style={[styles.addRecord, styles.addTypo]}>Add Record</Text>
              <Image
                style={[styles.vectorIcon1, styles.iconLayout1]}
                contentFit="cover"
                source={require("../assets/vector14.png")}
              />
            </View>
          </View>
        </Pressable>
        <View style={styles.materialSymbolsarrowRightAParent}>
          <Image
            style={[
              styles.materialSymbolsarrowRightAIcon,
              styles.materialIconLayout,
            ]}
            contentFit="cover"
            source={require("../assets/materialsymbolsarrowrightaltrounded.png")}
          />
          <Image
            style={[
              styles.materialSymbolsarrowRightAIcon1,
              styles.materialIconLayout,
            ]}
            contentFit="cover"
            source={require("../assets/materialsymbolsarrowrightaltrounded1.png")}
          />
          <Text style={[styles.filter, styles.abc123Clr]}>Filter</Text>
        </View>
      </View>
      <View style={[styles.rectangleContainer, styles.rectangleLayout]}>
        <Pressable
          style={[styles.rectanglePressable, styles.rectanglePosition]}
          onPress={() => navigation.navigate("MaintenanceRecord")}
        />
        <Text style={[styles.davidDaniel, styles.davidTypo]}>David Daniel</Text>
        <Pressable
          style={styles.vector}
          onPress={() => navigation.navigate("MaintenanceRecord")}
        >
          <Image
            style={[styles.icon1, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/vector8.png")}
          />
        </Pressable>
      </View>
      <View style={[styles.groupContainer, styles.groupParentLayout]}>
        <View style={[styles.groupFrame, styles.groupParentLayout]}>
          <Pressable
            style={[styles.groupFrame, styles.groupParentLayout]}
            onPress={() => navigation.navigate("MaintenanceDetailView")}
          >
            <Image
              style={[styles.rectangleIcon, styles.groupParentLayout]}
              contentFit="cover"
              source={require("../assets/rectangle-54.png")}
            />
            <View style={[styles.frameParent, styles.frameParentLayout]}>
              <View
                style={[styles.maintainedOnParent, styles.surfaceParentFlexBox]}
              >
                <Text
                  style={[styles.maintainedOn, styles.davidTypo]}
                >{`Maintained On `}</Text>
                <Text style={[styles.stJanuary2023, styles.text2Typo]}>
                  1st January 2023
                </Text>
              </View>
              <View
                style={[styles.maintainedByParent, styles.surfaceParentFlexBox]}
              >
                <Text style={[styles.maintainedOn, styles.davidTypo]}>
                  Maintained By
                </Text>
                <Text style={[styles.stJanuary2023, styles.text2Typo]}>
                  Waleed Ali
                </Text>
              </View>
              <View style={[styles.mileageWrapper, styles.wrapperPosition]}>
                <Text style={[styles.maintainedOn, styles.davidTypo]}>
                  Mileage
                </Text>
              </View>
              <View style={[styles.serviceWrapper, styles.wrapperPosition]}>
                <Text style={[styles.maintainedOn, styles.davidTypo]}>
                  Service
                </Text>
              </View>
            </View>
            <Image
              style={[styles.groupIcon, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/group-80.png")}
            />
            <Image
              style={[
                styles.vehicleServicesSvgrepoCom1Icon,
                styles.vehicleIconLayout,
              ]}
              contentFit="cover"
              source={require("../assets/vehicleservicessvgrepocom-1.png")}
            />
          </Pressable>
        </View>
        <Text style={[styles.carWash, styles.carPosition]}>Car Wash</Text>
        <Text style={[styles.text2, styles.textPosition]}>137,000</Text>
      </View>
      <View style={[styles.groupView, styles.groupParentLayout]}>
        <View style={[styles.groupFrame, styles.groupParentLayout]}>
          <Pressable
            style={[styles.groupFrame, styles.groupParentLayout]}
            onPress={() => navigation.navigate("MaintenanceDetailView")}
          >
            <Image
              style={[styles.rectangleIcon, styles.groupParentLayout]}
              contentFit="cover"
              source={require("../assets/rectangle-54.png")}
            />
            <View style={[styles.frameParent, styles.frameParentLayout]}>
              <View
                style={[styles.maintainedOnParent, styles.surfaceParentFlexBox]}
              >
                <Text
                  style={[styles.maintainedOn, styles.davidTypo]}
                >{`Maintained On `}</Text>
                <Text style={[styles.stJanuary2023, styles.text2Typo]}>
                  1st January 2023
                </Text>
              </View>
              <View
                style={[styles.maintainedByParent, styles.surfaceParentFlexBox]}
              >
                <Text style={[styles.maintainedOn, styles.davidTypo]}>
                  Maintained By
                </Text>
                <Text style={[styles.stJanuary2023, styles.text2Typo]}>
                  Waleed Ali
                </Text>
              </View>
              <View style={[styles.mileageWrapper, styles.wrapperPosition]}>
                <Text style={[styles.maintainedOn, styles.davidTypo]}>
                  Mileage
                </Text>
              </View>
              <View style={[styles.serviceWrapper, styles.wrapperPosition]}>
                <Text style={[styles.maintainedOn, styles.davidTypo]}>
                  Service
                </Text>
              </View>
            </View>
            <Image
              style={[styles.groupIcon, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/group-80.png")}
            />
            <Image
              style={[
                styles.vehicleServicesSvgrepoCom1Icon,
                styles.vehicleIconLayout,
              ]}
              contentFit="cover"
              source={require("../assets/vehicleservicessvgrepocom-11.png")}
            />
          </Pressable>
        </View>
        <Text style={[styles.carWash, styles.carPosition]}>Car Wash</Text>
        <Text style={[styles.text2, styles.textPosition]}>137,000</Text>
      </View>
      <View style={[styles.groupParent1, styles.groupParentLayout]}>
        <View style={[styles.groupFrame, styles.groupParentLayout]}>
          <Pressable
            style={[styles.groupFrame, styles.groupParentLayout]}
            onPress={() => navigation.navigate("MaintenanceDetailView")}
          >
            <Image
              style={[styles.rectangleIcon, styles.groupParentLayout]}
              contentFit="cover"
              source={require("../assets/rectangle-541.png")}
            />
            <View style={[styles.frameParent, styles.frameParentLayout]}>
              <View
                style={[styles.maintainedOnParent, styles.surfaceParentFlexBox]}
              >
                <Text
                  style={[styles.maintainedOn2, styles.davidTypo]}
                >{`Maintained On `}</Text>
                <Text style={[styles.stJanuary20232, styles.text4Typo]}>
                  1st January 2023
                </Text>
              </View>
              <View
                style={[styles.maintainedByParent, styles.surfaceParentFlexBox]}
              >
                <Text style={[styles.maintainedOn2, styles.davidTypo]}>
                  Maintained By
                </Text>
                <Text style={[styles.davidDaniel1, styles.davidTypo]}>
                  David Daniel
                </Text>
              </View>
              <View style={[styles.mileageWrapper, styles.wrapperPosition]}>
                <Text style={[styles.maintainedOn2, styles.davidTypo]}>
                  Mileage
                </Text>
              </View>
              <View style={[styles.serviceWrapper, styles.wrapperPosition]}>
                <Text style={[styles.maintainedOn2, styles.davidTypo]}>
                  Service
                </Text>
              </View>
            </View>
            <Image
              style={[styles.groupIcon, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/group-801.png")}
            />
            <Image
              style={[
                styles.vehicleServicesSvgrepoCom1Icon,
                styles.vehicleIconLayout,
              ]}
              contentFit="cover"
              source={require("../assets/vehicleservicessvgrepocom-12.png")}
            />
          </Pressable>
        </View>
        <Text style={[styles.carWash2, styles.text4Typo]}>Car Wash</Text>
        <Text style={[styles.text4, styles.text4Typo]}>137,000</Text>
      </View>
      <View style={[styles.groupParent2, styles.groupParentLayout]}>
        <View style={[styles.groupFrame, styles.groupParentLayout]}>
          <Pressable
            style={[styles.groupFrame, styles.groupParentLayout]}
            onPress={() => navigation.navigate("MaintenanceDetailView")}
          >
            <Image
              style={[styles.rectangleIcon, styles.groupParentLayout]}
              contentFit="cover"
              source={require("../assets/rectangle-54.png")}
            />
            <View style={[styles.frameParent, styles.frameParentLayout]}>
              <View
                style={[styles.maintainedOnParent, styles.surfaceParentFlexBox]}
              >
                <Text
                  style={[styles.maintainedOn, styles.davidTypo]}
                >{`Maintained On `}</Text>
                <Text style={[styles.stJanuary2023, styles.text2Typo]}>
                  1st January 2023
                </Text>
              </View>
              <View
                style={[styles.maintainedByParent, styles.surfaceParentFlexBox]}
              >
                <Text style={[styles.maintainedOn, styles.davidTypo]}>
                  Maintained By
                </Text>
                <Text style={[styles.stJanuary2023, styles.text2Typo]}>
                  Waleed Ali
                </Text>
              </View>
              <View style={[styles.mileageWrapper, styles.wrapperPosition]}>
                <Text style={[styles.maintainedOn, styles.davidTypo]}>
                  Mileage
                </Text>
              </View>
              <View style={[styles.serviceWrapper, styles.wrapperPosition]}>
                <Text style={[styles.maintainedOn, styles.davidTypo]}>
                  Service
                </Text>
              </View>
            </View>
            <Image
              style={[styles.groupIcon, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/group-80.png")}
            />
            <Image
              style={[
                styles.vehicleServicesSvgrepoCom1Icon,
                styles.vehicleIconLayout,
              ]}
              contentFit="cover"
              source={require("../assets/vehicleservicessvgrepocom-11.png")}
            />
          </Pressable>
        </View>
        <Text style={[styles.carWash, styles.carPosition]}>Car Wash</Text>
        <Text style={[styles.text2, styles.textPosition]}>137,000</Text>
      </View>
      <View style={[styles.groupParent3, styles.groupParentLayout]}>
        <View style={[styles.groupFrame, styles.groupParentLayout]}>
          <Pressable
            style={[styles.groupFrame, styles.groupParentLayout]}
            onPress={() => navigation.navigate("MaintenanceDetailView")}
          >
            <Image
              style={[styles.rectangleIcon, styles.groupParentLayout]}
              contentFit="cover"
              source={require("../assets/rectangle-542.png")}
            />
            <View style={[styles.frameParent, styles.frameParentLayout]}>
              <View
                style={[styles.maintainedOnParent, styles.surfaceParentFlexBox]}
              >
                <Text
                  style={[styles.maintainedOn, styles.davidTypo]}
                >{`Maintained On `}</Text>
                <Text style={[styles.stJanuary2023, styles.text2Typo]}>
                  1st January 2023
                </Text>
              </View>
              <View
                style={[styles.maintainedByParent, styles.surfaceParentFlexBox]}
              >
                <Text style={[styles.maintainedOn, styles.davidTypo]}>
                  Maintained By
                </Text>
                <Text style={[styles.stJanuary2023, styles.text2Typo]}>
                  Waleed Ali
                </Text>
              </View>
              <View style={[styles.mileageWrapper, styles.wrapperPosition]}>
                <Text style={[styles.maintainedOn, styles.davidTypo]}>
                  Mileage
                </Text>
              </View>
              <View style={[styles.serviceWrapper, styles.wrapperPosition]}>
                <Text style={[styles.maintainedOn, styles.davidTypo]}>
                  Service
                </Text>
              </View>
            </View>
            <Image
              style={[styles.groupIcon, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/group-80.png")}
            />
            <Image
              style={[
                styles.vehicleServicesSvgrepoCom1Icon4,
                styles.vehicleIconLayout,
              ]}
              contentFit="cover"
              source={require("../assets/vehicleservicessvgrepocom-11.png")}
            />
          </Pressable>
        </View>
        <Text style={[styles.carWash, styles.carPosition]}>Car Wash</Text>
        <Text style={[styles.text2, styles.textPosition]}>137,000</Text>
      </View>
      <Image
        style={[styles.maintenanceRecordChild, styles.wrapperLayout]}
        contentFit="cover"
        source={require("../assets/group-1711.png")}
      />
      <Image
        style={styles.maskGroupIcon}
        contentFit="cover"
        source={require("../assets/mask-group.png")}
      />
      <View style={[styles.maintenanceRecordItem, styles.frameParentLayout]} />
      <View
        style={[styles.maintenanceRecordInner, styles.groupInnerShadowBox]}
      />
      <View style={[styles.rectangleView, styles.groupInnerLayout]} />
      <Text style={[styles.home, styles.homeTypo]}>Home</Text>
      <Text style={[styles.vehicles, styles.homeTypo]}>Vehicles</Text>
      <Text style={[styles.addVehicle, styles.addTypo]}>Add Vehicle</Text>
      <Text style={[styles.records, styles.homeTypo]}>Records</Text>
      <Text style={[styles.invoices, styles.homeTypo]}>Invoices</Text>
      <Image
        style={[styles.ellipseIcon, styles.ellipseLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-5.png")}
      />
      <Pressable
        style={[styles.container, styles.containerPosition]}
        onPress={() => navigation.navigate("Vehicles")}
      >
        <Image
          style={styles.iconLayout}
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
        style={[styles.frame, styles.ellipseLayout]}
        onPress={() => navigation.navigate("MaintenanceRecord")}
      >
        <Image
          style={styles.iconLayout}
          contentFit="cover"
          source={require("../assets/ellipse-7.png")}
        />
      </Pressable>
      <Image
        style={[
          styles.carCitroenTopVehicleSvgrepIcon,
          styles.containerPosition,
        ]}
        contentFit="cover"
        source={require("../assets/carcitroentopvehiclesvgrepocom-12.png")}
      />
      <Pressable
        style={[styles.ellipsePressable, styles.ellipseLayout]}
        onPress={() => navigation.navigate("Invoices")}
      >
        <Image
          style={styles.iconLayout}
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
        style={[styles.wrapper1, styles.wrapper1Layout]}
        onPress={() => navigation.navigate("AddVehicle")}
      >
        <Image
          style={styles.iconLayout}
          contentFit="cover"
          source={require("../assets/group-111.png")}
        />
      </Pressable>
      <Image
        style={[styles.maintenanceRecordChild1, styles.wrapper1Layout]}
        contentFit="cover"
        source={require("../assets/group-174.png")}
      />
      <Image
        style={[styles.microphoneSvgrepoCom1Icon, styles.svgrepoIconLayout]}
        contentFit="cover"
        source={require("../assets/microphonesvgrepocom-1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupInnerShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    left: 0,
  },
  iconLayout1: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  wrapperLayout: {
    height: 43,
    position: "absolute",
  },
  breadcrumbsLayout: {
    width: 150,
    height: 20,
    left: 0,
    position: "absolute",
  },
  housefillFlexBox: {
    justifyContent: "center",
    position: "absolute",
  },
  davidTypo1: {
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  surfaceParentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  abc123Clr: {
    color: Color.darkslateblue,
    textAlign: "left",
  },
  groupLayout: {
    width: 119,
    height: 33,
    top: 0,
  },
  groupInnerLayout: {
    borderRadius: Border.br_11xl,
    position: "absolute",
  },
  addTypo: {
    lineHeight: 18,
    textAlign: "center",
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  materialIconLayout: {
    height: 15,
    width: 15,
    position: "absolute",
    overflow: "hidden",
  },
  rectangleLayout: {
    height: 55,
    width: 392,
    position: "absolute",
  },
  rectanglePosition: {
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
  },
  davidTypo: {
    fontSize: FontSize.size_smi,
    textAlign: "left",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  groupParentLayout: {
    height: 132,
    width: 392,
    position: "absolute",
  },
  frameParentLayout: {
    height: 104,
    position: "absolute",
  },
  text2Typo: {
    color: Color.gray_300,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  wrapperPosition: {
    left: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  vehicleIconLayout: {
    width: 20,
    height: 20,
    position: "absolute",
    overflow: "hidden",
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
  text4Typo: {
    color: Color.gray_200,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  homeTypo: {
    top: 895,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    textAlign: "center",
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  ellipseLayout: {
    height: 45,
    width: 45,
    top: 845,
  },
  containerPosition: {
    left: 98,
    position: "absolute",
  },
  svgrepoIconLayout: {
    height: 26,
    width: 26,
    position: "absolute",
    overflow: "hidden",
  },
  wrapper1Layout: {
    width: 104,
    top: 777,
    height: 104,
    position: "absolute",
  },
  lightTexture22341Icon: {
    width: 430,
    left: 0,
    top: 0,
    position: "absolute",
    height: 932,
  },
  image2Icon: {
    top: 803,
    height: 129,
    display: "none",
    width: 430,
    left: 0,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.gray_400,
    height: 60,
    elevation: 10,
    shadowRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    width: 430,
    position: "absolute",
    top: 0,
  },
  groupItem: {
    top: 13,
    width: 340,
    height: 50,
    left: 43,
    position: "absolute",
  },
  record: {
    top: "0%",
    left: "73.97%",
    fontSize: FontSize.size_base,
    textAlign: "center",
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  vectorIcon: {
    height: "88.85%",
    width: "9.99%",
    top: "8.33%",
    right: "90.01%",
    bottom: "2.82%",
    left: "0%",
    position: "absolute",
  },
  recordParent: {
    height: "38.1%",
    width: "50.93%",
    top: "30.16%",
    right: "43.95%",
    bottom: "31.75%",
    left: "5.12%",
    position: "absolute",
  },
  wrapper: {
    top: 59,
    width: 49,
    left: 19,
  },
  rectangleParent: {
    top: 47,
    height: 63,
    width: 430,
    left: 0,
    position: "absolute",
  },
  homeMutedIcon: {
    width: 12,
    height: 14,
  },
  housefill: {
    width: 14,
    alignItems: "center",
    justifyContent: "center",
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
  text: {
    lineHeight: 17,
    textAlign: "left",
    fontSize: FontSize.caption2Regular_size,
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.caption2Regular,
  },
  element2: {
    left: 81,
    height: 20,
    top: 0,
  },
  search: {
    color: Color.steelblue_100,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  surface: {
    left: 27,
    top: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  abc123: {
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    fontSize: FontSize.size_sm,
  },
  surface1: {
    left: 90,
    top: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  breadcrumbs: {
    height: 20,
    top: 0,
  },
  breadcrumbsWrapper: {
    height: 20,
    top: 6,
  },
  groupInner: {
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    elevation: 20,
    backgroundColor: Color.steelblue_300,
    width: 119,
    height: 33,
    top: 0,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    left: 0,
    borderRadius: Border.br_11xl,
  },
  addRecord: {
    left: 17,
    fontSize: FontSize.caption2Regular_size,
    top: 0,
  },
  vectorIcon1: {
    height: "72.22%",
    width: "14.77%",
    top: "16.67%",
    right: "86.36%",
    bottom: "11.11%",
    left: "-1.14%",
    position: "absolute",
  },
  addRecordParent: {
    top: 8,
    left: 16,
    width: 88,
    height: 18,
    position: "absolute",
  },
  rectangleGroup: {
    left: 0,
    position: "absolute",
  },
  groupWrapper: {
    left: 273,
    position: "absolute",
  },
  materialSymbolsarrowRightAIcon: {
    left: 29,
    top: 0,
  },
  materialSymbolsarrowRightAIcon1: {
    left: 33,
    top: 6,
  },
  filter: {
    top: 2,
    fontSize: FontSize.caption2Regular_size,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    color: Color.darkslateblue,
    left: 0,
    position: "absolute",
  },
  materialSymbolsarrowRightAParent: {
    left: 221,
    width: 48,
    height: 21,
    top: 6,
    position: "absolute",
  },
  groupParent: {
    top: 130,
    height: 33,
    width: 392,
    left: 19,
    position: "absolute",
  },
  rectanglePressable: {
    height: 55,
    width: 392,
    position: "absolute",
    backgroundColor: Color.steelblue_300,
  },
  davidDaniel: {
    top: 14,
    left: 21,
    color: "rgba(115, 115, 115, 0.9)",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
    position: "absolute",
  },
  icon1: {
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
  rectangleContainer: {
    top: 183,
    left: 19,
  },
  rectangleIcon: {
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
  },
  maintainedOn: {
    color: Color.dimgray_200,
    fontFamily: FontFamily.poppinsRegular,
  },
  stJanuary2023: {
    marginLeft: 5,
  },
  maintainedOnParent: {
    left: 0,
    top: 0,
  },
  maintainedByParent: {
    top: 28,
    left: 0,
  },
  mileageWrapper: {
    top: 56,
  },
  serviceWrapper: {
    top: 84,
  },
  frameParent: {
    top: 15,
    width: 209,
    left: 43,
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
  vehicleServicesSvgrepoCom1Icon: {
    top: 97,
    left: 15,
  },
  groupFrame: {
    left: 0,
    top: 0,
  },
  carWash: {
    color: Color.gray_300,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  text2: {
    color: Color.gray_300,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  groupContainer: {
    top: 258,
    left: 19,
  },
  groupView: {
    top: 410,
    left: 19,
  },
  maintainedOn2: {
    color: Color.white,
    fontFamily: FontFamily.poppinsRegular,
  },
  stJanuary20232: {
    marginLeft: 5,
  },
  davidDaniel1: {
    color: "rgba(251, 251, 251, 0.9)",
    marginLeft: 5,
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  carWash2: {
    left: 96,
    top: 101,
    position: "absolute",
  },
  text4: {
    left: 101,
    top: 73,
    position: "absolute",
  },
  groupParent1: {
    top: 562,
    left: 19,
  },
  groupParent2: {
    top: 714,
    left: 19,
  },
  vehicleServicesSvgrepoCom1Icon4: {
    top: 963,
    left: 34,
  },
  groupParent3: {
    top: 866,
    left: 19,
  },
  maintenanceRecordChild: {
    top: 3,
    width: 372,
    left: 29,
  },
  maskGroupIcon: {
    top: 63,
    left: 386,
    width: 31,
    height: 31,
    position: "absolute",
  },
  maintenanceRecordItem: {
    top: 828,
    left: 2,
    backgroundColor: Color.aliceblue_100,
    width: 430,
  },
  maintenanceRecordInner: {
    top: 830,
    height: 102,
    backgroundColor: Color.steelblue_300,
    elevation: 10,
    shadowRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    width: 430,
    position: "absolute",
  },
  rectangleView: {
    top: 917,
    left: 139,
    backgroundColor: Color.textTxtPrimary,
    width: 154,
    height: 6,
  },
  home: {
    left: 22,
  },
  vehicles: {
    left: 99,
  },
  addVehicle: {
    top: 867,
    left: 172,
    fontSize: FontSize.size_sm,
  },
  records: {
    left: 271,
  },
  invoices: {
    left: 359,
  },
  ellipseIcon: {
    left: 20,
    position: "absolute",
  },
  container: {
    height: 45,
    width: 45,
    top: 845,
  },
  homeMutedIcon1: {
    width: 25,
    height: 27,
  },
  housefill1: {
    top: 852,
    left: 31,
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    left: 277,
    position: "absolute",
  },
  carCitroenTopVehicleSvgrepIcon: {
    top: 846,
    width: 44,
    height: 44,
    overflow: "hidden",
  },
  ellipsePressable: {
    left: 365,
    position: "absolute",
  },
  invoiceWarrantyLineSvgrepoIcon: {
    top: 855,
    left: 375,
  },
  wrapper1: {
    left: 163,
  },
  maintenanceRecordChild1: {
    left: 164,
  },
  microphoneSvgrepoCom1Icon: {
    top: 854,
    left: 289,
  },
  maintenanceRecord: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    height: 932,
    width: "100%",
  },
});

export default MaintenanceRecord;
