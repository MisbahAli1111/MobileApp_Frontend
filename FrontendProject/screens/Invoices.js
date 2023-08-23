import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet,TextInput, TouchableWithoutFeedback, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize,Padding } from "../GlobalStyles";
import Footer from "../components/Footer";
import MaintenanceRecordList from  "../components/MaintenanceRecordList";
import FilterSearchVehicle from "../components/FilterSearchVehicle";
import InvoiceList from "../components/InvoiceList";
const Invoices = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const handleQuery= (query) => {
    setSearch(query);
  }

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


<View style={styles.breadcrumbsParent}>
          <View style={[styles.breadcrumbs, styles.housefill1Position]}>
            <View style={[styles.housefill1, styles.housefill1Position]}>
              <Image
                style={styles.homeMutedIcon1}
                contentFit="cover"
                source={require("../assets/homemuted.png")}
              />
            </View>
            <View style={styles.elementPosition} />
            <View style={styles.elementPosition}>
              <Text style={[styles.text13, styles.text13Typo]}>\</Text>
            </View>
            <Text style={[styles.invoices3, styles.totalTypo]}>Invoices</Text>
          </View>
          <Pressable
            style={[styles.createInvoiceWrapper, styles.invoicesChild3Layout]}
            onPress={() => navigation.navigate("MaintenanceRecord", { fromPreviousScreen: true })}
          >
            <Text style={[styles.createInvoice, styles.text13Typo]}>
              Create Invoice
            </Text>
          </Pressable>
        </View>



      {/* search */}
      <View style={[styles.rectangleParent18, styles.rectangleLayout]}>
          <Pressable
            style={[styles.rectanglePressable, styles.rectangleLayout]}
           
          />
         <TextInput style={[styles.searchInvoice, styles.paidTypo]}
        placeholder="Search Invoice "
        clearButtonMode="always"
        value={search}
        onChangeText={(query) => handleQuery(query)}
        />
          <Pressable
            style={styles.vector}
            onPress={() => navigation.navigate("MaintenanceRecord")}
          >
            <Image
              style={[styles.icon, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/vector13.png")}
            />
          </Pressable>
        </View>

      
      

 
  <View style={styles.cont}>
      <Footer  prop={"Invoices"} />
      </View>

    <View style={styles.boxContianer}>
    <InvoiceList dsearch={search} />
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
  FilterSearch:{
    left:228,
    top:10
  },
  cont:{
    marginLeft:1,
    
  },
  boxContianer :{
    flex:1,
    flexWrap:"wrap",
    marginTop:250,
    marginLeft: 12,
    marginBottom:90,
   
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
  addTypo: {
    lineHeight: 18,
    textAlign: "center",
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  createInvoice: {
    lineHeight: 18,
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    color: Color.white,
  },
  invoicesChild3Layout: {
    borderRadius: Border.br_11xl,
    position: "absolute",
  },
  createInvoiceWrapper: {
    left:226,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    elevation: 20,
    paddingHorizontal: Padding.p_11xl,
    paddingVertical: Padding.p_6xs,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    backgroundColor: Color.darkslateblue,
    top: 0,
    flexDirection: "row",
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
    width: 14,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
  },
  housefill1Position: {
    height: 20,
    left: 2,
    position: "absolute",
  },

  breadcrumbsParent: {
    flex: 1,
    width: '80%', 
    height: 32, 
    position: 'absolute',
    marginTop:130,
    marginLeft:22,
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
  rectangleLayout: {
    height: 55,
    width: 385,
    position: "absolute",
  },
  searchInvoice: {
    top: 14,
    left: 21,
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
  rectangleLayout: {
    height: 55,
    width: 375,
    position: "absolute",
  },
  rectangleParent18: {
    marginTop:180,
    marginLeft:21,
  },
  rectanglePressable: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.steelblue_300,
    left: 0,
    top: 0,
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
    top: 1,
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
  breadcrumbs: {
    height: 20,
    top: 15,
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
  rectanglePressable: {
    height: 55,
    width: 378,
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
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  rectangleContainer: {
    top: 145,
    left: 20,
  },


  maintenanceRecord: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    height: 932,
    width: "100%",
  },
});

export default Invoices;

