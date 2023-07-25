import React, { useState, useCallback } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import FrameComponent from "../components/FrameComponent";
import Footer from "../components/Footer";
import CreateInvoice from "./CreateInvoice";

import { FontFamily, Border, Color, FontSize, Padding } from "../GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

function InvoiceDetailView({route}) {
  const [groupContainer10Visible, setGroupContainer10Visible] = useState(false);
  const navigation = useNavigation();

  const openGroupContainer10 = useCallback(() => {
    setGroupContainer10Visible(true);
  }, []);

  const closeGroupContainer10 = useCallback(() => {
    setGroupContainer10Visible(false);
  }, []);
  const { data } = route.params;

  const [name,itemName, status,selectedDate, rate, total,quantity,amount,taxRate,disRateper] = data;
function  editInvoiceFunction (){ 
navigation.navigate("CreateInvoice");
 }
  return (
    <>
      <View style={styles.invoiceDetailView}>
        
        <Image
          style={styles.lightTexture22341Icon}
          contentFit="cover"
          source={require("../assets/light-texture2234-1.png")}
        />
        <Text style={styles.total}>Total</Text>
        <View style={styles.invoiceDetailViewChild} />
        <View style={styles.invoiceDetailViewItem} />
        <Image
          style={[styles.invoiceDetailViewInner, styles.parentLayout1]}
          contentFit="cover"
          source={require("../assets/line-15.png")}
        />
        <View style={styles.breadcrumbsParent}>
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
              <Text style={styles.text}>\</Text>
            </View>
            <Text style={[styles.invoice, styles.dueTypo]}>Invoice</Text>
          </View>
          {/* <TouchableOpacity onPress={editInvoiceFunction}>
          <View style={[styles.editInvoiceWrapper, styles.invoiceShadowBox]}>
            <Text style={[styles.editInvoice, styles.invoiceTypo1]}>
              Edit Invoice
            </Text>
          </View>
          </TouchableOpacity> */}
          <View style={[styles.vectorContainer, styles.groupChild6Layout]}>
        <TouchableOpacity onPress={editInvoiceFunction}>
        {/* <Image
          style={[styles.groupChild6, styles.groupChild6Layout]}
          contentFit="cover"
          source={require("../assets/rectangle-73.png")}
        /> */}
        <Pressable onPress={editInvoiceFunction}>
          <Text style={[styles.editInvoice2, styles.totalTypo]}>
          Edit Invoice
        </Text>
        </Pressable>
        </TouchableOpacity> 
      </View> 

        </View>
        <View style={styles.rectangleView} />
        <View style={[styles.groupParent, styles.parentLayout]}>
          <View style={[styles.vectorParent, styles.parentLayout]}>
            <Image
              style={[styles.groupChild, styles.groupLayout2]}
              contentFit="cover"
              source={require("../assets/rectangle-62.png")}
            />
            <View style={[styles.groupItem, styles.groupItemPosition]} />
          </View>
          <Text style={[styles.description, styles.changePosition]}>
            DESCRIPTION
          </Text>
          <Text style={[styles.oilChange, styles.textTypo4]}>{itemName}</Text>
          
          <Text style={[styles.rate, styles.qtyTypo]}>RATE</Text>
          <Text style={[styles.text1, styles.textTypo2]}>{rate}</Text>
  
          <Text style={[styles.qty, styles.qtyTypo]}>QTY</Text>
          <Text style={[styles.text5, styles.textTypo1]}>{quantity}</Text>
         
          <Text style={[styles.amount, styles.textPosition1]}>Amount</Text>
          <Text style={[styles.text9, styles.textPosition1]}>{amount}</Text>

          <View style={[styles.groupInner, styles.groupLayout1]} />
          <View style={[styles.lineView, styles.groupLayout1]} />
          <View style={[styles.groupChild1, styles.inv0001Position]} />
        </View>
        <View style={[styles.element2, styles.housefillFlexBox]}>
          <Text style={styles.text}>\</Text>
        </View>
        <Text style={[styles.inv0001, styles.inv0001Position]}>INV0001</Text>
        <LinearGradient
          style={styles.rectangleLineargradient}
          locations={[0, 1]}
          colors={["rgba(7, 132, 199, 0.16)", "rgba(217, 217, 217, 0)"]}
        />
        <View style={styles.setstyle}>
        <Text style={[styles.corollaGli2016, styles.dueTypo]}>
          COROLLA GLI 2016 (ABC-123)
        </Text>
        <View style={[styles.ellipseParent, styles.ellipseLayout]}>
          <Image
            style={[styles.ellipseIcon, styles.ellipseLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-10.png")}
          />
          <Text style={styles.paid}>{status}</Text>
        </View>
        <Text style={[styles.loritaDaniel, styles.dueTypo]}>{name}</Text>
        <View style={[styles.dateParent, styles.parentLayout1]}>
          <Text style={[styles.date, styles.dueTypo]}>DATE</Text>
          <Text style={[styles.jan2023, styles.rs3000Typo]}>{selectedDate.toDateString()}</Text>
          <Text style={[styles.text14, styles.textLayout]}>-</Text>
        </View>
        <View style={[styles.dueParent, styles.parentLayout1]}>
          <Text style={[styles.due, styles.textLayout1]}>Due </Text>
          <Text style={[styles.onReceipt, styles.rs3000Typo]}>On Receipt</Text>
          <Text style={[styles.text14, styles.textLayout]}>-</Text>
        </View>
        <View style={[styles.balanceParent, styles.parentLayout1]}>
          <Text style={[styles.date, styles.dueTypo]}>Balance</Text>
          <Text style={styles.rs3000Typo}>{total} </Text>
          <Text style={[styles.text14, styles.textLayout]}>-</Text>
        </View>
        <Text style={[styles.inv00011, styles.invoiceTypo]}>#INV0001</Text>
        <Text style={[styles.invoiceTo, styles.invoiceTypo]}>Invoice To</Text>
        <Text style={[styles.invoiceTo, styles.invoiceTypo]}>Invoice To</Text>
        </View>
        <View style={[styles.groupContainer, styles.groupLayout]}>
          <View style={styles.parent}>
            <Text style={[styles.text17, styles.textTypo]}>-</Text>
            <Text style={[styles.text18, styles.rs0Position]}>-</Text>
            <Text style={[styles.subtotal, styles.tax0Typo]}>Subtotal</Text>
            <Text style={[styles.tax0, styles.tax0Typo]}>Tax (%)</Text>
            <Text style={[styles.rs3550, styles.rs0Typo]}>{amount}</Text>
            <Text style={[styles.rs0, styles.rs0Typo]}>{taxRate}</Text>
            <Text style={[styles.text19, styles.textPosition]}>-</Text>
            <Text style={[styles.discount, styles.textPosition]}>Discount</Text>
            <Text style={[styles.text20, styles.textPosition]}>{disRateper}</Text>
            <View style={styles.group}>
              <Text style={[styles.text17, styles.textTypo]}>-</Text>
              <Text style={[styles.text18, styles.rs0Position]}>-</Text>
              <Text style={[styles.total1, styles.total1Typo]}>Total</Text>
              <Text style={[styles.balanceDue, styles.rs0Position]}>
                Balance Due
              </Text>
              <Text style={[styles.rs3550, styles.rs0Typo]}>{total}</Text>
              <Text style={[styles.rs0, styles.rs0Typo]}>{total}</Text>
            </View>
          </View>
          <View style={[styles.groupChild2, styles.groupLayout]} />
        </View>
        {/* <Image
          style={[styles.groupIcon, styles.groupIconLayout]}
          contentFit="cover"
          source={require("../assets/group-1712.png")}
        /> */}
        
                <Pressable
          style={[styles.container, styles.framePosition]}//printer button
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/ellipse-8.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.frame, styles.framePosition]}//share button
          
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/ellipse-8.png")}
          />
        </Pressable>
      
        
        
        <Image
          style={[styles.printer2Icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/printer-2.png")}
        />
        <Image
          style={[styles.icbaselineShareIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/icbaselineshare.png")}
        />
        <View style={styles.vectorGroup}>
          <Image
            style={styles.rectangleIcon}
            contentFit="cover"
            source={require("../assets/rectangle-57.png")}
          />
          <View style={styles.groupChild3} />
          <Pressable
            style={styles.invoiceDetailParent}
            onPress={openGroupContainer10}
          >
            <Text style={[styles.invoiceDetail, styles.invoiceTypo]}>
              Invoice Detail
            </Text>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require("../assets/vector2.png")}
            />
          </Pressable>
          <Pressable
            style={[styles.rectanglePressable, styles.groupIconLayout]}
            onPress={() => navigation.navigate("Invoices")}
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

       <Modal animationType="fade" transparent visible={groupContainer10Visible}>
        <View style={styles.groupContainer10Overlay}>
          <Pressable
            style={styles.groupContainer10Bg}
            onPress={closeGroupContainer10}
          />
          <FrameComponent onClose={closeGroupContainer10} />
        </View>
      </Modal> 
      <Footer />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  editInvoice2: {
    color: Color.white,
    lineHeight: 18,
   // textAlign: "center",
    fontSize: FontSize.caption2Regular_size,
    width:120,
    left:10,

  },
  groupChild6: {
    borderRadius: Border.br_7xs,
    left: 0,
    top: 0,
  },
  groupChild6Layout: {
    height: 30,
    width: 150,
    position: "absolute",
  },
  vectorContainer: {

    top: -8,
    left: 230,
    backgroundColor: Color.darkslateblue,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    // elevation: 20,
    flexDirection: "row",
    paddingHorizontal: Padding.p_11xl,
    paddingVertical: Padding.p_6xs,
    borderRadius: Border.br_11xl,
    // borderRadius:20,
  },
  parentLayout1: {
    height: 0,
    position: "absolute",
  },
  housefillFlexBox: {
    justifyContent: "center",
    position: "absolute",
  },
  dueTypo: {
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
  },
  invoiceShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  setstyle:{

  },
  invoiceTypo1: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  parentLayout: {
    height: 179,
    width: 392,
    position: "absolute",
  },
  groupLayout2: {
    borderRadius: Border.br_3xs,
    width: 392,
  },
  groupItemPosition: {
    backgroundColor: Color.steelblue_300,
    left: 0,
    position: "absolute",
  },
  changePosition: {
    left: 15,
    textAlign: "left",
    position: "absolute",
  },
  textTypo4: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
  },
  textTypo3: {
    top: 148,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
  },
  qtyTypo: {
    top: 9,
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.poppinsMedium,
    color: Color.textTxtPrimary,
    fontWeight: "500",
  },
  textTypo2: {
    width: 38,
    fontFamily: FontFamily.poppinsRegular,
    top: 42,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
  },
  textLayout1: {
    width: 30,
    color: Color.darkslateblue,
  },
  textTypo1: {
    width:30,
    left: 238,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
  },
  textLayout: {
    width: 9,
    color: Color.darkslateblue,
    textAlign: "left",
    position: "absolute",
  },
  textPosition1: {
    left: 313,
    textAlign: "left",
    position: "absolute",
  },
  groupLayout1: {
    width: 393,
    borderColor: "#d9d9d9",
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    left: 0,
  },
  inv0001Position: {
    top: 130,
    position: "absolute",
  },
  ellipseLayout: {
    height: 10,
    position: "absolute",
  },
  rs3000Typo: {
    left: 75,
    color: Color.darkslateblue,
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.poppinsSemibold,
    textAlign: "left",
    fontWeight: "600",
    top: 0,
    position: "absolute",
  },
  invoiceTypo: {
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  groupLayout: {
    height: 106,
    width: 189,
    position: "absolute",
  },
  textTypo: {
    color: Color.dimgray_100,
    left: 104,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
  },
  rs0Position: {
    top: 24,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
  },
  tax0Typo: {
    left: 30,
    fontFamily: FontFamily.poppinsMedium,
    color: Color.textTxtPrimary,
    fontWeight: "500",
  },
  rs0Typo: {
    left: 126,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
  },
  textPosition: {
    top: 48,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
  },
  total1Typo: {
    fontFamily: FontFamily.poppinsMedium,
    color: Color.textTxtPrimary,
    fontWeight: "500",
  },
  groupIconLayout: {
    height: 43,
    position: "absolute",
  },
  invoiceLayout: {
    borderRadius: Border.br_11xl,
    position: "absolute",
  },
  homeTypo: {
    top: 895,
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    position: "absolute",
  },
  invoiceViewLayout: {
    height: 45,
    width: 45,
    top: 845,
    position: "absolute",
  },
  framePosition: {
    left: 364,
    height: 45,
    width: 45,
    position: "absolute",
  },
  groupPressableLayout: {
    height: 104,
    width: 104,
    top: 777,
    position: "absolute",
  },
  iconLayout: {
    width: 24,
    left: 375,
    height: 24,
    position: "absolute",
    overflow: "hidden",
  },
  lightTexture22341Icon: {
    width: 430,
    left: 0,
    top: 0,
    position: "absolute",
    height: 932,
  },
  total: {
    top: 1032,
    left: 17,
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.montserratSemibold,
    color: Color.red,
    textAlign: "left",
    fontWeight: "600",
    position: "absolute",
  },
  invoiceDetailViewChild: {
    top: 1003,
    left: 322,
    width: 149,
    height: 1,
    borderTopWidth: 1,
    borderColor: "#ff0000",
    borderStyle: "solid",
    position: "absolute",
  },
  invoiceDetailViewItem: {
    top: 970,
    left: 348,
    borderRightWidth: 1,
    width: 1,
    height: 20,
    borderColor: "#ff0000",
    borderStyle: "solid",
    position: "absolute",
  },
  invoiceDetailViewInner: {
    top: 980,
    left: 339,
    width: 19,
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
    fontFamily: FontFamily.caption2Regular,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    fontSize: FontSize.caption2Regular_size,
    textAlign: "left",
  },
  invoice: {
    top: 0,
    left: 27,
    color: Color.steelblue_100,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "relative",
  },
  breadcrumbs: {
    top: 2,
    width: 79,
    height: 20,
    left: 0,
    position: "absolute",
  },
  editInvoice: {
    color: Color.white,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.caption2Regular_size,
  },
  editInvoiceWrapper: {
    left: 230,
    backgroundColor: Color.darkslateblue,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 20,
    // elevation: 20,
    flexDirection: "row",
    paddingHorizontal: Padding.p_11xl,
    paddingVertical: Padding.p_6xs,
    borderRadius: Border.br_11xl,
    position: "relative",
    top: 0,
  },
  breadcrumbsParent: {
    top: 128,
    height: 32,
    width: 392,
    left: 19,
    position: "absolute",
  },
  rectangleView: {
    top: 180,
    left: 5,
    borderRadius: 16,
    backgroundColor: "rgba(217, 217, 217, 0.27)",
    width: 420,
    height: 482,
    position: "absolute",
  },
  groupChild: {
    height: 38,
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupItem: {
    top: 38,
    height: 141,
    borderRadius: Border.br_3xs,
    width: 392,
  },
  vectorParent: {
    left: 0,
    top: 0,
  },
  description: {
    width: 91,
    fontSize: FontSize.size_smi,
    top: 9,
    fontFamily: FontFamily.poppinsMedium,
    color: Color.textTxtPrimary,
    fontWeight: "500",
  },
  oilChange: {
    color: Color.darkslateblue,
    top: 42,
    left: 15,
    textAlign: "left",
    position: "absolute",
    width: 79,
  },
  tuning: {
    width: 48,
    top: 80,
    color: Color.darkslateblue,
    left: 15,
    textAlign: "left",
    position: "absolute",
  },
  filterChange: {
    width: 94,
    top: 114,
    color: Color.darkslateblue,
    left: 15,
    textAlign: "left",
    position: "absolute",
  },
  sparkPlug: {
    width: 75,
    color: Color.darkslateblue,
    left: 15,
    textAlign: "left",
    position: "absolute",
  },
  rate: {
    width: 35,
    left: 164,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    position: "absolute",
  },
  text1: {
    left: 164,
    textAlign: "left",
    position: "absolute",
  },
  text2: {
    width: 35,
    left: 164,
    top: 80,
    color: Color.darkslateblue,
    textAlign: "left",
    position: "absolute",
  },
  text3: {
    left: 164,
    top: 114,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
  },
  text4: {
    left: 164,
    top: 148,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
  },
  qty: {
    width: 28,
    left: 238,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    position: "absolute",
  },
  text5: {
    top: 42,
  },
  text6: {
    top: 80,
  },
  text7: {
    top: 114,
  },
  text8: {
    left: 238,
    top: 148,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
  },
  amount: {
    width: 57,
    fontSize: FontSize.size_smi,
    top: 9,
    fontFamily: FontFamily.poppinsMedium,
    color: Color.textTxtPrimary,
    fontWeight: "500",
  },
  text9: {
    width: 38,
    fontFamily: FontFamily.poppinsRegular,
    top: 42,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
  },
  text10: {
    width: 35,
    top: 80,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
  },
  text11: {
    width: 26,
    color: Color.darkslateblue,
    top: 114,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
  },
  text12: {
    width: 26,
    color: Color.darkslateblue,
    top: 148,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
  },
  groupInner: {
    top: 73,
    position: "absolute",
  },
  lineView: {
    top: 107,
    position: "absolute",
  },
  groupChild1: {
    width: 393,
    borderColor: "#d9d9d9",
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    left: 0,
  },
  groupParent: {
    top: 337,
    left: 11,
  },
  element2: {
    top: 130,
    left: 102,
    height: 20,
  },
  inv0001: {
    left: 111,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  rectangleLineargradient: {
    top: 220,
    borderRadius: Border.br_5xs,
    width: 391,
    height: 97,
    backgroundColor: "transparent",
    left: 11,
    position: "absolute",
  },
  corollaGli2016: {
    top: 273,
    left: 205,
    width: 200,
    color: Color.darkslateblue,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    position: "absolute",
  },
  ellipseIcon: {
    width: 10,
    left: -15,
    top: 9,
  },
  paid: {
    left: 0,
    color: Color.darkolivegreen,
    top: 5,
    fontFamily: FontFamily.poppinsSemibold,
    fontSize: FontSize.caption2Regular_size,
    textAlign: "left",
    fontWeight: "600",
    position: "absolute",
  },
  ellipseParent: {
    top: 294,
    width: 40,
    left: 365,
  },
  loritaDaniel: {
    top: 255,
    left: 316,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    textAlign: "left",
    position: "absolute",
  },
  date: {
    color: Color.darkslateblue,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    left: -9,
    top: 0,
    position: "absolute",
  },
  jan2023: {
    width: 82,
  },
  text14: {
    left: 50,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    fontSize: FontSize.caption2Regular_size,
    top: 2,
  },
  dateParent: {
    top: 263,
    width: 163,
    left: 35,
  },
  due: {
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    textAlign: "left",
    left: -9,
    top: 0,
    position: "absolute",
  },
  onReceipt: {
    width: 90,
  },
  dueParent: {
    top: 281,
    width: 153,
    left: 35,
  },
  balanceParent: {
    top: 299,
    width: 136,
    left: 35,
  },
  inv00011: {
    width: 85,
    top: 237,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsSemibold,
    textAlign: "left",
    fontWeight: "600",
    left: 25,
  },
  invoiceTo: {
    left: 310,
    top: 237,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsSemibold,
    textAlign: "left",
    fontWeight: "600",
  },
  text17: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    top: 0,
    position: "absolute",
  },
  text18: {
    color: Color.dimgray_100,
    left: 104,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
  },
  subtotal: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    top: 0,
    position: "absolute",
  },
  tax0: {
    top: 24,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
  },
  rs3550: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    top: 0,
    position: "absolute",
  },
  rs0: {
    top: 24,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
  },
  text19: {
    color: Color.dimgray_100,
    left: 104,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
  },
  discount: {
    left: 30,
    fontFamily: FontFamily.poppinsMedium,
    color: Color.textTxtPrimary,
    fontWeight: "500",
  },
  text20: {
    left: 126,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
  },
  total1: {
    left: 57,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    top: 0,
    position: "absolute",
  },
  balanceDue: {
    fontFamily: FontFamily.poppinsMedium,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    left: 0,
  },
  group: {
    top: 72,
    height: 24,
    width: 189,
    left: 0,
    position: "absolute",
  },
  parent: {
    height: 96,
    width: 189,
    top: 5,
    left: 0,
    position: "absolute",
  },
  groupChild2: {
    left: 0,
    top: 0,
  },
  groupContainer: {
    top: 536,
    left: 216,
  },
  groupIcon: {
    top: 3,
    left: 29,
    width: 372,
  },
  invoiceDetailViewChild1: {
    top: 830,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowRadius: 10,
    elevation: 10,
    height: 102,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    width: 430,
  },
  invoiceDetailViewChild2: {
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
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    position: "absolute",
  },
  records: {
    left: 271,
  },
  invoices: {
    left: 359,
  },
  invoiceDetailViewChild3: {
    left: 20,
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
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    left: 277,
  },
  container: {
    top: 730,
  },
  frame: {
    top: 680,
  },
  invoiceDetailViewChild4: {
    left: 105,
  },
  microphoneSvgrepoCom1Icon: {
    top: 854,
    left: 288,
    height: 26,
    width: 26,
    position: "absolute",
    overflow: "hidden",
  },
  ellipsePressable: {
    left: 365,
  },
  invoiceWarrantyLineSvgrepoIcon: {
    top: 855,
    left: 375,
    height: 26,
    width: 26,
    position: "absolute",
    overflow: "hidden",
  },
  groupPressable: {
    left: 163,
  },
  invoiceDetailViewChild5: {
    left: 164,
  },
  printer2Icon: {
    top: 743,
  },
  icbaselineShareIcon: {
    top: 693,
  },
  rectangleIcon: {
    top: -6,
    height: 80,
    width: 430,
    left: 0,
    position: "absolute",
  },
  groupChild3: {
    top: 13,
    left: 43,
    width: 340,
    height: 50,
    position: "absolute",
  },
  groupContainer10Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  groupContainer10Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  invoiceDetail: {
    top: "0%",
    left: "55.51%",
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    color: Color.textTxtPrimary,
  },
  vectorIcon: {
    height: "88.85%",
    width: "8.93%",
    top: "8.33%",
    right: "91.07%",
    bottom: "2.82%",
    left: "0%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  invoiceDetailParent: {
    height: "38.1%",
    width: "56.98%",
    top: "30.16%",
    right: "37.91%",
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
    width: 430,
    left: -7,
    position: "absolute",
  },
  maskGroupIcon: {
    top: 62,
    left: 370,
    width: 31,
    height: 31,
    position: "absolute",
  },
  invoiceDetailView: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    height: 932,
    width: "100%",
    
  },
});

export default InvoiceDetailView;
