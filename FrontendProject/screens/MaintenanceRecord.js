import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet,TextInput, TouchableWithoutFeedback, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import Footer from "../components/Footer";
import MaintenanceRecordList from  "../components/MaintenanceRecordList";
import FilterSearchRecord from "../components/FilterSearchRecord";


const MaintenanceRecord = () => {
  const navigation = useNavigation();
  const [searchType , setSearchType] = useState([]);
  const [searchOrder , setSearchOrder] = useState('');
  const [search, setSearch] = useState('');
  const [filterSearchClicked,setFilterSearchClicked] =useState(false);
  

  const functionFilterSearch = () =>{
    setFilterSearchClicked(true);
  };

const addFilterInState = (attribute, sort) => {
  
    setFilterSearchClicked(false);
    setSearchType(attribute);
    setSearchOrder(sort);
    // console.log('Selected Filters:', attribute)
    // console.log('selected Sort: ',sort)
  }; 

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
            
            {/* <View style={styles.elementPosition} /> */}
            <View style={styles.elementPosition}>
              <Text style={[styles.text, styles.davidTypo1]}>\</Text>
            </View>
            {/* <View style={[styles.element2, styles.housefillFlexBox]}>
              <Text style={[styles.text, styles.davidTypo1]}>\</Text>
            </View> */}
            <View style={[styles.surface, styles.surfaceParentFlexBox]}>
              <Text style={styles.search}>Search</Text>
            </View>
            <View style={[styles.surface1, styles.surfaceParentFlexBox]}>
              <Pressable onPress={functionFilterSearch}>
              <Text style={[styles.abc123, styles.abc123Clr]}>
                Filter
                </Text>
              </Pressable>
              {filterSearchClicked && <FilterSearchRecord onFilterSelect={(attribute,sort) => addFilterInState(attribute,sort)}/>}
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
</View>


      {/* search */}
      <View style={[styles.rectangleContainer, styles.rectangleLayout]}>
        <Pressable
          style={[styles.rectanglePressable, styles.rectanglePosition]}
          onPress={() => navigation.navigate("MaintenanceRecord")}
        />
        <TextInput style={[styles.davidDaniel, styles.davidTypo]}
        placeholder="David "
        clearButtonMode="always"
        value={search}
        onChangeText={(query) => handleQuery(query)}
        />
          
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

      
      

 
  <View style={styles.cont}>
      <Footer  prop={"MaintenanceRecord"} />
      </View>

    <View style={styles.boxContianer}>
    <MaintenanceRecordList dsearch={search} searchType={searchType} searchOrder={searchOrder} />
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
    zIndex:999,
  },
  boxContianer :{
    marginTop:220,
    marginLeft: 10, 
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
  addTypo: {
    lineHeight: 18,
    textAlign: "center",
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },

  rectangleLayout: {
    height: 55,
    width: 385,
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
    left: 30,
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
    fontWeight: "500",
    fontFamily: FontFamily.poppinsSemibold,
    fontSize: FontSize.size_sm,
  },
  surface1: {
    left: 220,
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
    left: 20,
  },


  maintenanceRecord: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    height: 932,
    width: "100%",
    zIndex:1,
  },
});

export default MaintenanceRecord;

