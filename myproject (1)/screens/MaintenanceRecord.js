import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import { TextInput } from "react-native-gesture-handler";
import ModalDropdown from 'react-native-modal-dropdown';
const MaintenanceRecord = () => {
  const navigation = useNavigation();


  const options = ['Option 1', 'Option 2', 'Option 3'];
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const records = [
    {
      maintainedOn: "sdbfgljb",
      maintainedBy: "Waleed Ali",
      mileage: "137,000",
      service: "Service Details 1",

    },
    {
      maintainedOn: "2nd January 2023",
      maintainedBy: "John Doe",
      mileage: "150,000",
      service: "Service Details 2",

    },
    {
      maintainedOn: "2nd January 2023",
      maintainedBy: "John Doe",
      mileage: "150,000",
      service: "Service Details 2",

    },
   
  ];

  const [currentPressedIndex, setCurrentPressedIndex] = useState(-1);

  const handlePress = (index) => {
    setCurrentPressedIndex(index);
   
    navigation.navigate("MaintenanceDetailView");
  };

 
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
  };


  const dropdownOptions = selectedOption !== '' ? [selectedOption, ...options] : options;

  
  

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
          {/* backicon  */}
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Home")}>

            <Image
              style={[styles.vectorIcon, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/vector2.png")}
            />
          </TouchableWithoutFeedback>
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
              <Text style={[styles.abc123, styles.abc123Clr]}>
                {search}
                </Text>
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


{/* here  */}
<View style={styles.cont}>
      <TouchableOpacity
        style={styles.filterContainer}
        onPress={() => this.dropdown.show()}
      >
        <Image
          style={[styles.filterIcon]}
          contentFit="cover"
          source={require("../assets/materialsymbolsarrowrightaltrounded.png")}
        />
        <Image
          style={[styles.filterIcon]}
          contentFit="cover"
          source={require("../assets/materialsymbolsarrowrightaltrounded1.png")}
        />
        <Text style={styles.filterText}>Filter</Text>
      </TouchableOpacity>

      <ModalDropdown
        ref={(ref) => (this.dropdown = ref)}
        options={dropdownOptions}
        textStyle={styles.optionText}
        dropdownStyle={styles.dropdown}
        onSelect={handleOptionSelect}
      />

    </View>



      </View>
      {/* search */}
      <View style={[styles.rectangleContainer, styles.rectangleLayout]}>
        <Pressable
          style={[styles.rectanglePressable, styles.rectanglePosition]}
          onPress={() => navigation.navigate("MaintenanceRecord")}
        />
        <TextInput style={[styles.davidDaniel, styles.davidTypo]}
        placeholder="David "
        value={search}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
        onChangeText={setSearch}
        >
          
        </TextInput>
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
      
      {/* face icon  */}
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
      {/* home eclipse */}
      <Pressable
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          style={[styles.ellipseIcon, styles.ellipseLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-5.png")}
        />
        <View style={[styles.housefill1, styles.housefillFlexBox]}>
          <Image
            style={styles.homeMutedIcon1}
            contentFit="cover"
            source={require("../assets/homemuted1.png")}
          />
        </View>
      </Pressable>

      {/* car eclipse  */}
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
      <Pressable
        onPress={() => navigation.navigate("Vehicles")}
      >
        <Image
          style={[
            styles.carCitroenTopVehicleSvgrepIcon,
            styles.containerPosition,
          ]}
          contentFit="cover"
          source={require("../assets/carcitroentopvehiclesvgrepocom-12.png")}
        />
      </Pressable>

      {/* book eclipse  */}
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

      {/* invoice eclipse  */}
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
      <Pressable
        onPress={() => navigation.navigate("Invoices")}
      >
        <Image
          style={[
            styles.invoiceWarrantyLineSvgrepoIcon,
            styles.svgrepoIconLayout,
          ]}
          contentFit="cover"
          source={require("../assets/invoicewarrantylinesvgrepocom-1.png")}
        />
      </Pressable>


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
      <Pressable
        onPress={() => navigation.navigate("AddVehicle")}
      >
        <Image
          style={[styles.maintenanceRecordChild1, styles.wrapper1Layout]}
          contentFit="cover"
          source={require("../assets/group-174.png")}
        />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("MaintenanceRecord")}
      >
        <Image
          style={[styles.microphoneSvgrepoCom1Icon, styles.svgrepoIconLayout]}
          contentFit="cover"
          source={require("../assets/microphonesvgrepocom-1.png")}
        />
      </Pressable>

    
    <View style={styles.boxContianer}>
    <ScrollView>
        {records.map((record, index) => (
          <View key={index} style={[styles.groupView, styles.groupParentLayout]}>
            <View style={[styles.groupFrame]}>
              <Pressable
                style={[styles.groupFrame, styles.groupParentLayout]}
                onPress={() => handlePress(index)}
              >
                {/* Image */}
                <Image
                  style={[
                    styles.rectangleIcon,
                    styles.groupParentLayout,
                    currentPressedIndex === index ? styles.pressedImageStyle : styles.defaultImageStyle,
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
      </View>
     

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
  

  boxContianer :{
    flexDirection:"column",
    flex:1,
    flexWrap:"wrap",
    marginTop:230,
    marginRight: 20,
    alignItems: 'flex-end', 
    
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
    left:5,
    position: "relative",
    alignItems: 'flex-start',
    flexWrap:"wrap",
    marginTop:5,
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
  text2TypoW: {
    color: Color.white,
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
    top: 850,
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
    top: 805,
  },
  containerPosition: {
    left: 96,
    position: "absolute",
  },
  svgrepoIconLayout: {
    height: 26,
    width: 26,
    position: "absolute",
    overflow: "hidden",
  },
  wrapper1Layout: {
    width: 106,
    top: 745,
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
    left: "-2%",
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
    top: 35,
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
    top: 2,
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
    top: 2,
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
    left: 270,
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
    top: 100,
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
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "800",
    position: "absolute",
    color:'black',
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
    top: 145,
    left: 14,
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

  maintainedOnW: {
    color: Color.white,
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

  carWash: {
    color: Color.gray_300,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  carWashW: {
    color: Color.white,
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
  text2W: {
    color: Color.white,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  groupContainer: {
    top: 230,
    left: 12,
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
  // groupParent1: {
  //   top: 512,
  //   left: 12,
  // },
  groupParent2: {
    top: 655,
    left: 12,
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
    top: 50,
    left: 375,
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
    top: 800,
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
    left: 18,
  },
  vehicles: {
    left: 89,
  },
  addVehicle: {
    top: 835,
    left: 172,
    fontSize: FontSize.size_sm,
  },
  records: {
    left: 272,
  },
  invoices: {
    left: 352,
  },
  ellipseIcon: {
    left: 15,
    position: "absolute",
  },
  container: {
    height: 45,
    width: 45,
    top: 805,
  },
  homeMutedIcon1: {
    width: 25,
    height: 27,
  },
  cont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },
  
  filterText: {
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 4,
  },
  optionText: {
    padding: 10,
  },
  selectedOptionText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  housefill1: {
    top: 812,
    left: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    left: 277,
    position: "absolute",
  },
  carCitroenTopVehicleSvgrepIcon: {
    top: 806,
    width: 44,
    height: 44,
    overflow: "hidden",
  },
  ellipsePressable: {
    left: 360,
    position: "absolute",
  },
  invoiceWarrantyLineSvgrepoIcon: {
    top: 815,
    left: 372,
  },
  wrapper1: {
    left: 163,
  },
  maintenanceRecordChild1: {
    left: 164,
  },
  microphoneSvgrepoCom1Icon: {
    top: 812,
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
