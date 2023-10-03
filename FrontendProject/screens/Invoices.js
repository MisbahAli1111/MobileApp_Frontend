import React, { useState,useEffect } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  TextInput,
  Dimensions,
  Keyboard,
  View,
  Text,
  Pressable,
  TouchableOpacity
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontFamily, Color, Border, FontSize, Padding } from "../GlobalStyles";
import Footer from "../components/Footer";
import MaintenanceRecordList from "../components/MaintenanceRecordList";
import FilterSearchVehicle from "../components/FilterSearchVehicle";
import InvoiceList from "../components/InvoiceList";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const rem = screenWidth / 16;

const Invoices = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [filterSearchClicked, setFilterSearchClicked] = useState(false);
  const [searchType, setSearchType] = useState([]);
  const [isSearch , setIsSearch] = useState(false);
  const [searchOrder, setSearchOrder] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const handleQuery = (query) => {
    setSearch(query);
    setIsSearch(true);
  };

  const functionFilterSearch = () => {
    setFilterSearchClicked(true);
  };
  const addFilterInState = (attribute = ["default"], sort = "default") => {
    setFilterSearchClicked(false);
    setSearchType(attribute);
    setSearchOrder(sort);

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

      <View style={{ top: screenWidth * 0.34, width: screenWidth * 0.9, alignSelf: 'center' }}>
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
        <TouchableOpacity onPress={() => navigation.navigate("Invoices")}>
          <Text style={styles.breadcrumbText1}>Invoices</Text>
        </TouchableOpacity>
        {isSearch && search ? (
        <Text style={styles.breadcrumbSeparator}  numberOfLines={1}> / </Text>
        ) : null}
        {isSearch && search ? (
        <Text style={styles.breadcrumbText} numberOfLines={1}>{search}</Text>
        ) : null}
      </View>
          <View style={{ flex: 1, top: 4, alignItems: 'flex-end' }}>
          <Pressable onPress={functionFilterSearch}>
              <Text style={styles.filterText}>Filter</Text>
            </Pressable>
            {filterSearchClicked && (
              <FilterSearchVehicle
                onFilterSelect={(attribute, sort) =>
                  addFilterInState(attribute, sort)
                }
              />
            )}
            <TouchableOpacity
              style={[styles.groupLayoutt]}
              onPress={() => navigation.navigate("ListRecords")}
            >
              <View style={styles.rectangleGroupp}>
                <Text style={[styles.addTypo]}>
                  Add Invoice
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <View>
            <TextInput
              style={{ fontSize: 15, fontWeight: '700', width: screenWidth * 0.74 }}
              placeholder="Search Invoice"
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


      {isKeyboardVisible ? null : (
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
          <Footer prop={"Invoices"} />
        </View>
      )}
      <View style={styles.boxContianer}>
        <InvoiceList dsearch={search} searchOrder={searchOrder} />
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
  rectangleLayout: {
    borderRadius: 6,
    paddingVertical: screenHeight * 0.016,
    paddingLeft: screenWidth * 0.07,
    paddingEnd: screenWidth * 0.03,
    position: "absolute",

  },


  addTypo: {
    flex: 1,
    color: 'white',
  },
  rectangleGroupp: {
    backgroundColor: Color.darkslateblue,
    paddingEnd: screenWidth * 0.06,
    paddingLeft: screenWidth * 0.06,
    paddingVertical: screenWidth * 0.02,
    borderRadius: 20,
    flex: 1,
  },
  groupLayoutt: {
    alignItems: 'flex-end',
    flex: 1,
    top:-7,
    position: 'absolute',
  },
  filterText: {
    left: -135,
    // top: 8,
    fontWeight: 700,
    fontFamily: FontFamily.poppinsSemibold,
    fontSize: FontSize.size_sm,
    color: "#000",
    fontWeight: "500",
  },
  breadcrumbContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: hp("11%"), // Adjust this value as needed to move the breadcrumbs down // Set the background color to match the container's background
    // paddingLeft: wp("5%"), // Add padding to align with the content
    paddingRight: wp("5%"), // Add padding to align with the content
  },
  // Move the breadcrumb below the header

  breadcrumbImage: {
    width: wp("4%"), // Adjust the width as needed
    height: hp("2%"), // Adjust the height as needed
    marginRight: wp("1%"), // Add margin to separate the image from text
    // Adjust the color of the image
  },

  breadcrumbText: {
    fontSize: wp("3.5%"), // Adjust font size using wp
    color: "rgba(3, 29, 68, 1)",
    width:rem*2.4,
    // backgroundColor:'red',
    fontFamily: FontFamily.poppinsMedium,
    marginTop: hp("0.7%"), // Breadcrumb text color
  },
  breadcrumbText1: {
    fontSize: wp("3.5%"), // Adjust font size using wp
    color: Color.steelblue_100,
    fontFamily: FontFamily.poppinsMedium,
    marginTop: hp("0.7%"), // Breadcrumb text color
  },

  breadcrumbSeparator: {
    fontSize: wp("4%"), // Adjust font size using wp
    color: "rgba(3, 29, 68, 1)", // Separator text color
    // paddingHorizontal: wp("1%"), // Add horizontal padding using wp to separate items
  },

  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2%"),
    // Add paddingBottom to accommodate the "Km Driven" input
  },

  profileImageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("3%"),
    // paddingHorizontal:wp("2%"),
    paddingLeft:wp("2%"),
    paddingRight:wp("2%")
  },
  profileImage: {
    width: wp("30%"),
    height: wp("30%"),
  },
  profileImagePlaceholder: {
    width: wp("100%"),
    height: wp("70%"),
    
    
  },
  profileImagePlaceholder1: {
    width: wp("90%"),
    height: wp("20%"),
  },
  uploadButton: {
    backgroundColor: "rgba(3, 29, 68, 1)",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("5%"),
    borderRadius: wp("2%"),
    marginTop: hp("0%"),
  },
  uploadButtonText: {
    color: "white",
    fontSize: wp("4%"),
  },
  imageUploadContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  carouselItem: {
    width: wp("100%"), // Match the width of profileImagePlaceholder
    height: wp("60%"), // Match the height of profileImagePlaceholder
  },
  carouselImage: {
    width: "100%", // Use 100% width to maintain aspect ratio
    height: "100%", // Use 100% height to maintain aspect ratio
    resizeMode: "contain", // Use 'contain' to keep the image's aspect ratio
  },
  paginationContainer: {
    marginTop: hp("0%"), // Adjust spacing as needed
  },
  cont: {
    // marginLeft: 1,
  },
  boxContianer: {
    flex: 1,
    flexWrap: "wrap",
    marginTop: 250,
    maxHeight: screenWidth * 1.24,
    // marginBottom:90,
    // maxHeight: 525,
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
  text13Typo: {
    fontSize: FontSize.caption2Regular_size,
    fontWeight: "500",
  },

  createInvoice: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    color: Color.white,
  },
  invoicesChild3Layout: {
    borderRadius: Border.br_11xl,
    position: "absolute",
  },
  createInvoiceWrapper: {
    paddingHorizontal: Padding.p_11xl,
    paddingVertical: Padding.p_6xs,
    backgroundColor: Color.darkslateblue,
  },
  totalTypo: {
    fontWeight: "600",
    textAlign: "left",
    position: "absolute",
  },
  invoices3: {
    top: 0,
    left: 35,
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.darkslateblue,
    fontSize: FontSize.size_sm,
  },
  text13Typo: {
    fontSize: FontSize.caption2Regular_size,
    fontWeight: "500",
  },
  text13: {
    lineHeight: 17,
    fontFamily: FontFamily.caption2Regular,
    textAlign: "left",
    color: Color.textTxtPrimary,
  },

  homeMutedIcon1: {
    width: 12,
    height: 14,
  },
  housefill1: {
    //  width: rem*0.5,
    // justifyContent: "center",
    // alignItems: "center",
    top: 0,
  },


  breadcrumbsParent: {
    flex: 1,
    width: screenWidth,
    position: "absolute",
    marginTop: screenWidth * 0.34,
    flexDirection: 'row',
  },
  paidTypo: {
    fontFamily: FontFamily.poppinsMedium,
    textAlign: "left",
    fontWeight: "500",
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

  searchInvoice: {
    top: rem * 0.5,
    left: rem * 0.5,
    color: "#1e1e1e",
    textAlign: "left",
    fontSize: FontSize.size_base,
    position: "absolute",
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

  rectangleParent18: {
    marginTop: screenWidth * 0.45,
    alignSelf: 'center',
    backgroundColor: Color.steelblue_300,
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
    left: 10,
    top: 0,
  },
  elementPosition: {
    left: 22,
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
    left: 95,
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
    left: 40,
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
    left: 105,
    top: 0,
    flexDirection: "row",
    justifyContent: "center",
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
    top: 100,
    height: 33,
    width: 392,
    left: 19,
    position: "absolute",
  },

  davidDaniel: {
    top: 14,
    left: 21,
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "800",
    position: "absolute",

    color: "black",
  },
  icon1: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  iconLayout1: {
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
  icon: {
    maxHeight: rem,
    maxWidth: rem,
    overflow: "hidden",
    // position:'absolute',
    alignSelf: 'flex-end',
    marginEnd: rem * 1,
    marginTop: rem * 0.5,
  },
  rectangleContainer: {
    top: 145,
    left: 20,
  },

  maintenanceRecord: {
    backgroundColor: Color.white,
    flex: 0.9,
    height: screenHeight,
    width: screenWidth,
  },
});

export default Invoices;
