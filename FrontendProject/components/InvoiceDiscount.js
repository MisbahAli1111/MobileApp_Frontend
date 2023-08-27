import * as React from "react";
import { useState,useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity,TextInput,FlatList ,TouchableWithoutFeedback, ScrollView, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";

function InvoiceDiscount({ onItemsChange,APIDiscount }) {
const navigation = useNavigation();
const [items, setItems] = useState([{ discountName: '', discountRate: ''}]);

  useEffect(()=>{
    if (APIDiscount && APIDiscount.length > 0) {
      console.log("API Discount");
      console.log(APIDiscount);
      
      const initialDisItems = APIDiscount.map((item) => ({
        discountName: item.discountName,
        discountRate: item.discountRate.toString(),
      }));
      setItems(initialDisItems);
    }
  },[APIDiscount]);

  const renderItem =({ item, index })=>(
    <View style={[styles.rowContainer, styles.groupLayout]}>
    <TextInput
      style={[styles.addItem, styles.taxTypo1]}
      onChangeText={(text) => handleChangeItemName(text, index)}
      value={item.discountName}
      placeholder="Name"
    />
    <TextInput
      style={[styles.addRate, styles.addTypo1]}
      onChangeText={(text) => handleChangeRate(text, index)}
      value={item.discountRate}
      placeholder="Rate"
      keyboardType="numeric"
    /> 
  </View>
  
  );

  
  const handleChangeItemName = (text, index) => {
    const newItems = [...items];
    newItems[index].discountName = text;
    setItems(newItems);
  };

  const handleChangeRate = (text, index) => {
    const newItems = [...items];
    newItems[index].discountRate = text;
    setItems(newItems);
  };

  useEffect(() => {
    if (typeof onItemsChange === 'function') {
      onItemsChange(items);
    }
  }, [items]);


  const handleAddRow = () => {
    setItems([...items, { discountName: '', discountRate: ''}]);
  };

  return (
   
      <View style={styles.main}>

          <Image
            style={styles.rectangleIcon}
            contentFit="cover"
            source={require("../assets/rectangle-62.png")}
          />
            <View style={[styles.rowContainer, styles.groupLayout]}>
        <Text style={[styles.description, styles.rateTypo]}>DISCOUNT</Text>
        <Text style={[styles.rate, styles.rateTypo]}>RATE</Text>
       </View>
  
<View style={[styles.rectangleView, styles.rectangleViewBg]} >
          
     
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />


    </View>

<View
style={styles.wrap}
>
<TouchableOpacity onPress={handleAddRow}>
    <View style={styles.buttonBack}>
        <Image
        
        style={styles.addButton}
         contentFit="cover"
          source={require("../assets/vector11.png")}
        />
        </View>
      </TouchableOpacity>
</View>

    </View>
      
     
    
  );
}
const styles = StyleSheet.create({
    main:{
    width:500,
    left:20,
    marginTop:20,
    
    position:'relative',
    },
    buttonBack:{
      elevation: 20,
      shadowRadius: 150,
      shadowColor: "rgba(0, 0, 0, 0.05)",
      backgroundColor: Color.steelblue_200,
      height: 27,
      width: 48,
      borderRadius:10,
      shadowOpacity: 30,
      left:60,
      shadowOffset: {
        width: 0,
        height: 30,
        
      }
    
    },
    inputField: {
      
      paddingVertical: 5,
      paddingHorizontal: 10,
      flex: 1,
      marginRight: 5,
    },
    addButton:{
      height:16,
      width:16,
      alignContent:'center',
      left:16,
      top:4,
      marginTop:0,
     
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      paddingVertical: 10,
    },
    
    groupLayout: {
      flexDirection: 'row',
      alignItems: 'center',
      left:10,
    },
      // container:{
      //  // marginLeft:0,
      // },
      createChildLayout3: {
        height: 126,
        top: 501,
        width: 186,
      },
      groupChildPosition: {
        width: 430,
        left: 0,
        position: "absolute",
      },
      image2IconPosition: {
        display: "none",
        width: 430,
        left: 0,
        position: "absolute",
      },
      element2Position: {
        top: 130,
        height: 20,
      },
      elementFlexBox: {
        justifyContent: "center",
        position: "absolute",
      },
      text5Typo: {
        fontFamily: FontFamily.poppinsSemibold,
        fontWeight: "600",
        fontSize: FontSize.size_sm,
        position: "relative",
      },
      iconLayout: {
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden",
      },
      wrapperLayout: {
        height: 43,
        position: "absolute",
      },
      createLayout: {
        height: 2,
        borderTopWidth: 2,
        borderColor: "#cbcbcb",
        borderStyle: "solid",
        top: 204,
        width: 188,
        position: "absolute",
      },
      text5ClrName: {
        top:5,
        color: Color.dimgray_100,
        textAlign: "left",
      },
      text1Typo: {
        top: 1,
        color: Color.dimgray_100,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_base,
        textAlign: "left",
        position: "absolute",
        width:150,
      },
      lineViewPosition: {
        top: 34,
        height: 2,
        borderTopWidth: 2,
        borderColor: "#cbcbcb",
        borderStyle: "solid",
        position: "absolute",
      },
      // groupLayout: {
      //   height: 164,
      //   width: 392,
      //   position: "absolute",
      // },
      rectangleViewBg: {
        backgroundColor: Color.steelblue_300,
        borderRadius: 5,
        position: "relative",
      },
      rateTypo: {
        fontSize: FontSize.size_smi,
        color: Color.darkslateblue,
        fontFamily: FontFamily.poppinsMedium,
        textAlign: "left",
        fontWeight: "700",
        flexDirection:'row',
      },
      taxTypo1: {
        color: Color.dimgray_200,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
      },
      addTypo1: {
        left: 100,
        width: 164,
        color: Color.dimgray_200,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        position: "absolute",
        flexDirection:'row',
      },
      textTypo: {
        width: 30,
        left: 222,
        color: Color.dimgray_200,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        position: "absolute",
      },
      addTypo: {
        width: 88,
        left: 290,
        color: Color.dimgray_200,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        position: "absolute",
      },
      groupChildLayout: {
        height: 1,
        width: 393,
        borderTopWidth: 1,
        borderColor: "#d9d9d9",
        borderStyle: "solid",
        left: 0,
        position: "absolute",
      },
      createChildLayout2: {
        top: 463,
        height: 38,
        width: 186,
        borderRadius: Border.br_3xs,
        position: "absolute",
      },
      rectangleShadowBox: {
        height: 26,
        elevation: 5,
        shadowRadius: 5,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        width: 54,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        position: "absolute",
      },
      rateParentLayout: {
        height: 92,
        top: 473,
      },
      taxLayout2: {
        width: 80,
        position: "absolute",
      },
      taxLayout1: {
        width: 100,
        position: "absolute",
      },
      taxLayout: {
        width: 60,
        position: "absolute",
      },
      createChildLayout1: {
        width: 187,
        top: 535,
        height: 1,
        borderTopWidth: 1,
        borderColor: "#d9d9d9",
        borderStyle: "solid",
        position: "absolute",
      },
      createChildPosition: {
        top: 569,
        width: 187,
        height: 1,
        borderTopWidth: 1,
        borderColor: "#d9d9d9",
        borderStyle: "solid",
        position: "absolute",
      },
      discountsLayout: {
        width: 70,
        position: "absolute",
      },
      nameTypo: {
        width: 65,
        left: 12,
        color: Color.dimgray_200,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        position: "absolute",
      },
      totalTypo: {
        fontFamily: FontFamily.poppinsMedium,
        textAlign: "left",
        fontWeight: "500",
        position: "absolute",
      },
      groupChild6Layout: {
        height: 45,
        width: 381,
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
      createChildLayout: {
        width: 45,
        top: 845,
        height: 45,
        position: "absolute",
      },
      svgrepoIconLayout: {
        width: 26,
        height: 26,
        position: "absolute",
        overflow: "hidden",
      },
      groupPressableLayout: {
        height: 104,
        width: 104,
        top: 777,
        position: "absolute",
      },
      createInvoiceChild: {
        borderRadius: Border.br_3xs,
        left: 225,
        position: "absolute",
      },
      lightTexture22341Icon: {
        top: 0,
        height: 932,
      },
      image2Icon: {
        top: 803,
        height: 129,
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
      element: {
        left: 18,
        height: 20,
        top: 0,
      },
      text: {
        fontSize: FontSize.caption2Regular_size,
        lineHeight: 17,
        fontFamily: FontFamily.caption2Regular,
        textAlign: "left",
        color: Color.textTxtPrimary,
        fontWeight: "500",
      },
      element1: {
        left: 18,
        height: 20,
        top: 0,
      },
      invoices: {
        left: 27,
        color: Color.steelblue_100,
        top: 0,
        textAlign: "left",
      },
      breadcrumbs: {
        width: 87,
        height: 20,
        left: 19,
        position: "absolute",
      },
      groupChild: {
        top: -6,
        height: 80,
      },
      groupItem: {
        top: 13,
        left: 43,
        width: 340,
        height: 50,
        position: "absolute",
      },
      createInvoice1: {
        top: "0%",
        left: "53.01%",
        textAlign: "center",
        fontFamily: FontFamily.poppinsMedium,
        fontSize: FontSize.size_base,
        color: Color.textTxtPrimary,
        fontWeight: "500",
        position: "absolute",
      },
      vectorIcon: {
        height: "88.85%",
        width: "8.79%",
        top: "8.33%",
        right: "91.21%",
        bottom: "2.82%",
        left: "0%",
      },
      createInvoiceParent: {
        height: "38.1%",
        width: "57.91%",
        top: "30.16%",
        right: "36.98%",
        bottom: "31.75%",
        left: "5.12%",
        position: "relative",
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
      vectorParent: {
        top: 47,
        height: 63,
      },
      createInvoiceItem: {
        top: 381,
        height: 216,
      },
      createInvoiceInner: {
        left: 224,
      },
      regNumber: {
        top: 175,
        fontFamily: FontFamily.poppinsRegular,
        color: Color.dimgray_100,
        fontSize: FontSize.size_base,
        left: 225,
        position: "absolute",
      },
      groupIcon: {
        height: "2.25%",
        width: "9.3%",
        top: "300.57%",
        right: "4.42%",
        bottom: "79.19%",
        left: "86.28%",
        position:"absolute",
      },
      wrap:{
        height:40,
        width:185,
        left:-5,
        backgroundColor: Color.steelblue_300,
        borderRadius: 1,
        position: "relative",
      },
      text1: {
        left: 5,
      },
      invoiceStatusPicker:{
        top:232
      },
      groupInner: {
        left: -1,
        top: 34,
        width: 186,
      },
      lineView: {
        left: 205,
        width: 188,
        top: 34,
      },
      statusPaiddue: {
        left: 206,
      },
      date2SvgrepoCom11: {
        left: 159,
        height: 25,
        width: 25,
        top: 0,
        position: "absolute",
        overflow: "hidden",
      },
      parent: {
        top: 225,
        height: 35,
        width: 392,
        left: 19,
        position: "absolute",
      },
      element2: {
        left: 110,
        height: 20,
        top: 130,
      },
      createInvoice2: {
        top: 130,
        left: 119,
        color: Color.darkslateblue,
        fontFamily: FontFamily.poppinsSemibold,
        fontWeight: "600",
        fontSize: FontSize.size_sm,
        textAlign: "left",
        position: "absolute",
      },
      rectangleIcon: {
        height: 38,
        width: 185,
        left: -5,
        top: 0,
        borderRadius: Border.br_3xs,
        position: "absolute",
      },
      rectangleView: {
        marginTop:17,
        width: 185,
        left: -5,
      },
      vectorGroup: {
        left: 0,
        top: 0,
      },
      description: {
        width: 150,
        left: 6,
        position: "absolute",
        top: 10,
        flexDirection:'row',
      },
      addItem: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        color:'black',
        fontWeight:'700',
        width:100,
        flexDirection:'column',
        left:6 ,
      },
      addItem1: {
        width: 64,
        top: 81,
        color: Color.dimgray_200,
        left: 15,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        position: "absolute",
      },
      rate: {
        left: 102,
        width: 100,
        top: 10,
        position: "absolute",
        flexDirection:'column',
      },
      addRate: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        color:'black',
        fontWeight:'700',
        flexDirection:'row',
      },
      addRate1: {
        top: 81,
      },
      qty: {
        left: 220,
        width: 28,
        top: 10,
        position: "absolute",
      },
      text3: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        color:'black',
        fontWeight:'700',
      },
      text4: {
        top: 81,
      },
      amount: {
        left: 291,
        width: 57,
        top: 10,
        
        position: "absolute",
      },
      amountt: {
        left: 291,
        width: 80,
        top: -4,
        paddingVertical: 24,
        paddingHorizontal: 10,
        fontSize: 16,
        position: "absolute",
      },
    
      addAmount1: {
        top: 81,
      },
      groupChild1: {
        top: 73,
      },
      groupChild2: {
        top: 107,
      },
      groupParent: {
        top: 279,
        left: 19,
      },
      createInvoiceChild1: {
        left: 19,
      },
      createInvoiceChild2: {
        left: 19,
        height: 126,
        top: 501,
        width: 186,
      },
      groupChildShadowBox: {
        elevation: 20,
        shadowRadius: 20,
        shadowColor: "rgba(0, 0, 0, 0.05)",
        backgroundColor: Color.steelblue_200,
        height: 26,
        width: 54,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        left: 0,
        top: 0,
        borderRadius: Border.br_3xs,
        position: "absolute",
      },
      vectorIcon1: {
        height: "61.75%",
        width: "29.73%",
        top: "17.31%",
        right: "35.08%",
        bottom: "20.94%",
        left: "35.19%",
        borderRadius: Border.br_3xs,
      },
      rectangleParent: {
        left: 85,
        top: 583,
        elevation: 5,
        shadowRadius: 5,
        shadowColor: "rgba(0, 0, 0, 0.25)",
      },
      rectangleGroup: {
        top: 401,
        left: 188,
      },
      rectangleContainer: {
        left: 297,
        top: 583,
        elevation: 5,
        shadowRadius: 5,
        shadowColor: "rgba(0, 0, 0, 0.25)",
      },
      taxes: {
        left: 12,
        width: 40,
        top: 0,
        position: "absolute",
      },
      taxName: {
        top: 33,
        color: Color.dimgray_200,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        left: 0,
      },
      taxName1: {
        top: 71,
        color: Color.dimgray_200,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        left: 0,
      },
      taxesParent: {
        width: 69,
        position: "absolute",
        left: 29,
      },
      taxRate: {
        width:80,
        fontSize: FontSize.size_smi,
        color: Color.darkslateblue,
        fontFamily: FontFamily.poppinsMedium,
        textAlign: "left",
        fontWeight: "500",
        left: 0,
        top: 0,
      },
      taxRate1: {
        left: 10,
        width: 60,
        color: Color.dimgray_200,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        top: 33,
      },
      taxRate2: {
        left: 10,
        width: 60,
        color: Color.dimgray_200,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        top: 71,
      },
      taxRateParent: {
        left: 115,
        height: 92,
        top: 473,
      },
      createInvoiceChild3: {
        left: 19,
      },
      createInvoiceChild4: {
        left: 19,
      },
      createInvoiceChild5: {
        left: 225,
      },
      discounts: {
        fontSize: FontSize.size_smi,
        color: Color.darkslateblue,
        fontFamily: FontFamily.poppinsMedium,
        textAlign: "left",
        fontWeight: "500",
        left: 0,
        top: 0,
      },
      name: {
        top: 33,
      },
      name1: {
        top: 71,
      },
      discountsParent: {
        left: 236,
        height: 92,
        top: 473,
      },
      rate1: {
        left: 3,
        width: 65,
        fontSize: FontSize.size_smi,
        color: Color.darkslateblue,
        fontFamily: FontFamily.poppinsMedium,
        textAlign: "left",
        fontWeight: "500",
        top: 0,
        position: "absolute",
      },
      taxRate3: {
        top: 33,
        color: Color.dimgray_200,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        left: 0,
      },
      taxRate4: {
        top: 71,
        color: Color.dimgray_200,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        left: 0,
      },
      rateParent: {
        left: 331,
        height: 92,
        top: 473,
      },
      createInvoiceChild6: {
        left: 225,
      },
      createInvoiceChild7: {
        left: 225,
      },
      createInvoiceChild8: {
        left: 18,
      },
      lorita: {
        fontFamily: FontFamily.poppinsRegular,
        color: Color.dimgray_100,
        fontSize: FontSize.size_base,
      },
      loritaWrapper: {
        //flexDirection: "row",
      },
      frameView: {
        top: 171,
        left: 20,
        position: "absolute",
        width:180 ,
      },
      vectorIcon4: {
        height: "2.68%",
        width: "5.81%",
        top: "200.27%",
        right: "52.79%",
        bottom: "79.08%",
        left: "41.4%",
        position:"absolute",
      },
      text5: {
        left: 37,
        fontFamily: FontFamily.poppinsSemibold,
        fontWeight: "600",
        fontSize: FontSize.size_sm,
        position: "absolute",
        top: 0,
      },
      total: {
        fontFamily: FontFamily.poppinsMedium,
        fontSize: FontSize.size_sm,
        color: Color.textTxtPrimary,
        left: -5,
        top: 0,
      },
      rs3050: {
        left: 55,
        fontFamily: FontFamily.poppinsSemibold,
        fontWeight: "600",
        fontSize: FontSize.size_sm,
        position: "absolute",
        top: 0,
      },
      group: {
        top: 647,
        left: 279,
        width: 132,
        height: 0,
        position: "absolute",
      },
      ellipseIcon: {
        top: 235,
        left: 383,
        width: 16,
        height: 10,
        position: "absolute",
      },
      groupChild6: {
        borderRadius: Border.br_7xs,
        left: 0,
        top: 0,
      },
      createInvoice3: {
        top: 10,
        left: 132,
        color: Color.snow,
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.poppinsMedium,
        alignContent:"center",
      },
      vectorContainer: {
        top: 690,
        left: 25,
      },
      createInvoiceChild9: {
        top: 3,
        width: 372,
        left: 29,
      },
      createInvoiceChild10: {
        top: 830,
        shadowColor: "rgba(0, 0, 0, 0.03)",
        shadowRadius: 10,
        elevation: 10,
        height: 102,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        backgroundColor: Color.steelblue_300,
        width: 430,
        left: 0,
        position: "absolute",
      },
      createInvoiceChild11: {
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
        left: 99,
        top: 895,
        lineHeight: 18,
      },
      addVehicle: {
        top: 867,
        left: 172,
      },
      records: {
        left: 271,
        top: 895,
        lineHeight: 18,
      },
      invoices1: {
        left: 359,
        top: 895,
        lineHeight: 18,
      },
      createInvoiceChild12: {
        left: 20,
      },
      homeMutedIcon1: {
        height: 27,
        width: 25,
      },
      housefill1: {
        top: 852,
        left: 31,
        alignItems: "center",
        justifyContent: "center",
      },
      container: {
        left: 277,
      },
      createInvoiceChild13: {
        left: 105,
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
      createInvoiceChild14: {
        left: 164,
      },
      maskGroupIcon: {
        top: 63,
        left: 377,
        width: 31,
        height: 31,
        position: "absolute",
      },
      microphoneSvgrepoCom1Icon: {
        top: 854,
        left: 287,
      },
      createInvoice: {
      //   backgroundColor: Color.white,
      //    //flex: 6,
      //   //overflow: "hidden",
      //    height: 1000,
      //    width: "100%",
          left:-8,
       position:"absolute",
      },
    
    });

export default InvoiceDiscount;