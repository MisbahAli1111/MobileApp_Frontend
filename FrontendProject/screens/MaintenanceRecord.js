import React, { useState } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import Footer from "../components/Footer";
import MaintenanceRecordList from "../components/MaintenanceRecordList";
import FilterSearchRecord from "../components/FilterSearchRecord";
import Icon from "react-native-vector-icons/FontAwesome";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const rem = screenWidth / 16;

const MaintenanceRecord = ({ route }) => {
  const { fromPreviousScreen } = route.params;
  console.log(fromPreviousScreen);
  const navigation = useNavigation();
  const [searchType, setSearchType] = useState([]);
  const [searchOrder, setSearchOrder] = useState("");
  const [search, setSearch] = useState("");
  const [filterSearchClicked, setFilterSearchClicked] = useState(false);
  const [create, setCreate] = useState(false);
  const [isSearch, setIsSearch]= useState(false);
  const functionFilterSearch = () => {
    setFilterSearchClicked(true);
  };

  const addFilterInState = (attribute, sort) => {
    setFilterSearchClicked(false);
    setSearchType(attribute);
    setSearchOrder(sort);
  };
  const handleSavePress = () => {
    setCreate(true);

  };

  const handleQuery = (query) => {
    setSearch(query);
    setIsSearch(true);
  };

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

      <View style={{ top: screenWidth * 0.30, width: screenWidth * 0.9, alignSelf: 'center' }}>
        <View style={{ position: 'absolute', flexDirection: 'row', gap: screenWidth * 0.13 }}>

        <View style={styles.breadcrumbContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.breadcrumbImage}
            contentFit="cover"
            source={require("../assets/homemuted.png")}
          />
        </TouchableOpacity>
        <Text style={styles.breadcrumbSeparator}> / </Text>
        <TouchableOpacity onPress={() => navigation.navigate("MaintenanceRecord")}>
          <Text style={styles.breadcrumbText1}>Records</Text>
        </TouchableOpacity>
        {isSearch && search ? (
        <Text style={styles.breadcrumbSeparator}> / </Text>
        ) : null}
        {isSearch && search ? (
        <Text style={styles.breadcrumbText} numberOfLines={1}>{search}</Text>
        ) : null}
      </View>
          <View style={{ flex: 1, top: 3, alignItems: 'flex-end' }}>
           <Pressable onPress={functionFilterSearch}>
              <Text style={styles.filterText}>Filter</Text>
            </Pressable>
            {filterSearchClicked && (
              <FilterSearchRecord
                onFilterSelect={(attribute, sort) =>
                  addFilterInState(attribute, sort)
                }
              />
            )}
            <TouchableOpacity
              style={[styles.groupLayoutt]}
              onPress={() => navigation.navigate("AddRecord")}
            >
              <View style={styles.rectangleGroupp}>
                <Text style={[styles.addTypo]}>
                  Add Record
                </Text>
                <Image
                  contentFit="cover"
                  source={require("../assets/vector14.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>


      </View>


      <Pressable style={[styles.rectangleParent18, styles.rectangleLayout]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <TextInput
              style={{ fontSize: 15, fontWeight: '700', width: screenWidth * 0.74 }}
              placeholder="Search Record"
              clearButtonMode="always"
              value={search}
              onChangeText={(query) => handleQuery(query)}
            />
          </View>
          <View>
            <Image
              style={{ height: screenHeight * 0.03, width: screenWidth * 0.07 }}
              contentFit="cover"
              source={require("../assets/vector13.png")}
            />
          </View>
        </View>
      </Pressable>


      <View style={styles.cont}>
        <Footer prop={"MaintenanceRecord"} />
      </View>

      <View style={styles.boxContianer}>
        <MaintenanceRecordList
          dsearch={search}
          searchType={searchType}
          searchOrder={searchOrder}
          fromPreviousScreen={fromPreviousScreen}
          create={create}
          setCreate={setCreate}
        />
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
  FilterSearch: {
    left: 228,
    top: 10,
  },
  cont: {
    marginLeft: 1,
    zIndex: 999,
  },
  groupLayoutt: {
    alignItems: 'flex-end',
    flex: 1,
    top:-10,
    position: 'absolute',
  },
  rectangleParent18: {
    marginTop: screenWidth * 0.41,
    alignSelf: 'center',
    backgroundColor: Color.steelblue_300,
  },
  rectangleLayout: {
    borderRadius: 6,
    paddingVertical: screenHeight * 0.016,
    paddingLeft: screenWidth * 0.07,
    paddingEnd: screenWidth * 0.03,
    position: "absolute",

  },
  rectangleGroupp: {
    backgroundColor: Color.darkslateblue,
    paddingEnd: screenWidth * 0.06,
    paddingLeft: screenWidth * 0.06,
    paddingVertical: screenWidth * 0.016,
    borderRadius: 20,
    flex: 1,
  },
  breadcrumbContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: hp("11%"), // Adjust this value as needed to move the breadcrumbs down // Set the background color to match the container's background
    // paddingLeft: wp("5%"), // Add padding to align with the content
    // paddingRight: wp("5%"), // Add padding to align with the content
  },
  breadcrumbImage: {
    width: wp("4%"), // Adjust the width as needed
    height: hp("2%"), // Adjust the height as needed
    marginRight: wp("1%"), // Add margin to separate the image from text
    // Adjust the color of the image
  },
  breadcrumbSeparator: {
    fontSize: wp("4%"), // Adjust font size using wp
    color: "rgba(3, 29, 68, 1)", // Separator text color
    // paddingHorizontal: wp("1%"), // Add horizontal padding using wp to separate items
  },
  breadcrumbImage: {
    width: wp("4%"), // Adjust the width as needed
    height: hp("2%"), // Adjust the height as needed
    marginRight: wp("1%"), // Add margin to separate the image from text
    // Adjust the color of the image
  },
  breadcrumbText1: {
    fontSize: wp("3.5%"), // Adjust font size using wp
    color: Color.steelblue_100,
    fontFamily: FontFamily.poppinsMedium,
    marginTop: hp("0.7%"), // Breadcrumb text color
  },
  breadcrumbText: {
    fontSize: wp("3.5%"), // Adjust font size using wp
    color: "rgba(3, 29, 68, 1)",
    width:rem*3,
    fontFamily: FontFamily.poppinsMedium,
    marginTop: hp("0.7%"), // Breadcrumb text color
  },
  breadcrumbSeparator: {
    fontSize: wp("4%"), // Adjust font size using wp
    color: "rgba(3, 29, 68, 1)", // Separator text color
    // paddingHorizontal: wp("1%"), // Add horizontal padding using wp to separate items
  },
  filterText: {
    left: -132,
    top: 0,
    fontWeight: 700,
    fontFamily: FontFamily.poppinsSemibold,
    fontSize: FontSize.size_sm,
    color: "#000",
    fontWeight: "500",
  },
  boxContianer: {
    marginTop: screenWidth * 0.58,
    // backgroundColor:'red',
    // alignItems: 'flex-end',
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
    flex: 1,
    color: 'white',
  },
  rectangleContainer: {
    flexDirection: "row",
    alignItems: "center",
    top: 50,
  },
  blueContainer: {
    position: "absolute",

    borderRadius: 10,
  },
  saveContainer: {
    height: 34,
    width: 100,
    marginTop: 8,
    marginLeft: 275,
    alignSelf: "baseline",
    position: "absolute",
    backgroundColor: Color.darkslateblue,
    borderRadius: 48,
  },
  blueText: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 13,
    color: Color.darkslateblue,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  blueTextB: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 4,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  wrap: {
    flexDirection: "row",
  },

  vector: {
    // Your vector styles
  },
  icon1: {
    // Your icon styles
  },
  iconLayout: {
    // Your icon layout styles
  },

  rectanglePosition: {
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
  },
  davidTypo: {
    fontSize: 18,
    textAlign: "left",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
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
    width: 0.5 * rem,
    height: 0.5 * rem,
    top: 0.09 * rem,
  },
  housefill: {
    flexDirection: "row",
    marginLeft: 0.4 * rem,
  },
  elementPosition: {
    left: 30,
    justifyContent: "center",
    height: 20,
    top: 1,
    position: "absolute",
  },
  text: {
    lineHeight: 17,
    textAlign: "left",
    marginLeft: 0.2 * rem,
    fontSize: FontSize.caption2Regular_size,
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.caption2Regular,
  },
  element2: {
    left: 95,
    height: 20,
    top: 0,
  },
  search: {
    color: Color.steelblue_100,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    marginLeft: 0.2 * rem,
  },
  surface: {
    left: 10,
    top: 2,
    flexDirection: "row",
    justifyContent: "center",
  },
  abc123: {
    fontWeight: "500",
    fontFamily: FontFamily.poppinsSemibold,
    fontSize: 0.5 * rem,
  },
  surface1: {
    left: 12.5 * rem,
    top: 0,
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
    left: 260,
    position: "absolute",
  },

  groupParent: {
    top: 4.9 * rem,
    // height: 33,
    // width: 32,
    left: 0.49 * rem,
    position: "absolute",
  },
  rectanglePressable: {
    height: 2 * rem,
    width: screenWidth * 0.9,
    position: "absolute",
    backgroundColor: Color.steelblue_300,
  },
  davidDaniel: {
    top: 0.5 * rem,
    left: 0.8 * rem,
    fontSize: 0.7 * rem,
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "800",
    position: "absolute",
    width: 9 * rem,
    color: "grey",
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
    top: 155,
    left: 20,
  },

  maintenanceRecord: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    height: 932,
    width: "100%",
    zIndex: 1,
  },
});

export default MaintenanceRecord;
