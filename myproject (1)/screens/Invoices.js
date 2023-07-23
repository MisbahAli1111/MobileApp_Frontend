import React, { useState, useCallback, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FrameComponent from "../components/FrameComponent";
import { Border, FontFamily, Color, FontSize, Padding } from "../GlobalStyles";
import Footer from "../components/Footer";
import { TextInput } from "react-native-gesture-handler";

const Invoices = ({route}) => {
  const [groupContainer38Visible, setGroupContainer38Visible] = useState(false);
  const navigation = useNavigation();

  const openGroupContainer38 = useCallback(() => {
    setGroupContainer38Visible(true);
  }, []);

  const closeGroupContainer38 = useCallback(() => {
    setGroupContainer38Visible(false);
  }, []);
  const [search,setSearch]=useState('');
  useEffect(()=>{
    
  },[search])
 const {invoices}=route.params;
 const [name,itemName, status,date, rate, total,quantity,amount,taxRate,disRateper]=invoices;
 function searchFunction()
 {
  
 } 
 return (
    <>
      <View style={styles.invoices}>
        <Image
          style={[styles.lightTexture22341Icon, styles.invPosition]}
          contentFit="cover"
          source={require("../assets/light-texture2234-1.png")}
        />
        <View style={styles.groupParent}>
          <Pressable
            style={[styles.vectorParent, styles.parentLayout]}
            onPress={() => navigation.navigate("InvoiceDetailView")}
          >
            <Image
              style={[styles.groupChild, styles.groupChildLayout1]}
              contentFit="cover"
              source={require("../assets/rectangle-692.png")}
            />
            <Text style={[styles.muhammadAli, styles.paidTypo]}>
              {name}
            </Text>
            <View style={[styles.inv0001Parent, styles.inv0001ParentLayout]}>
              <Text style={[styles.inv0001, styles.textTypo]}>#INV0001</Text>
              <Text style={[styles.jan2023, styles.janPosition]}>
                01/Jan/2023
              </Text>
              <Text style={[styles.text, styles.textPosition]}>-</Text>
            </View>
            <Text style={[styles.rs3000, styles.rs3000Typo]}>{total}</Text>
                {
                  
                status.toUpperCase()==='PAID'? 
                <View style={[styles.frameWrapper, styles.frameWrapperPosition]}>
                <View style={[styles.paidWrapper, styles.paidWrapperPosition]}>
              
                    <Text style={[styles.paid, styles.paidTypo]}>{status}</Text>
                    
                    </View>
            </View>
                  :
                  
                  <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
              <View style={[styles.groupInner, styles.groupChildLayout]} />
              <Text style={[styles.due, styles.paidTypo]}>{status}</Text>
            </View>
                  
                }
               
             
          </Pressable>
          {/* <Pressable
            style={[styles.rectangleParent, styles.parentLayout]}
            onPress={() => navigation.navigate("InvoiceDetailView")}
          >
            <View style={[styles.groupItem, styles.groupChildLayout1]} />
            <Text style={[styles.muhammadAli, styles.paidTypo]}>
              Muhammad Ali
            </Text>
            <View style={[styles.inv0001Parent, styles.inv0001ParentLayout]}>
              <Text style={[styles.inv0001, styles.textTypo]}>#INV0001</Text>
              <Text style={[styles.jan2023, styles.janPosition]}>
                01/Jan/2023
              </Text>
              <Text style={[styles.text, styles.textPosition]}>-</Text>
            </View>
            <Text style={[styles.rs3000, styles.rs3000Typo]}>Rs. 3000</Text>
            <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
              <View style={[styles.groupInner, styles.groupChildLayout]} />
              <Text style={[styles.due, styles.paidTypo]}>Due</Text>
            </View>
          </Pressable> */}
          {/* <Pressable
            style={[styles.rectangleContainer, styles.parentLayout]}
            onPress={() => navigation.navigate("InvoiceDetailView")}
          >
            <View style={[styles.groupItem, styles.groupChildLayout1]} />
            <Text style={[styles.muhammadAli, styles.paidTypo]}>
              Muhammad Ali
            </Text>
            <View style={[styles.inv0001Parent, styles.inv0001ParentLayout]}>
              <Text style={[styles.inv0001, styles.textTypo]}>#INV0001</Text>
              <Text style={[styles.jan2023, styles.janPosition]}>
                01/Jan/2023
              </Text>
              <Text style={[styles.text, styles.textPosition]}>-</Text>
            </View>
            <Text style={[styles.rs3000, styles.rs3000Typo]}>Rs. 3000</Text>
            <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
              <View style={[styles.groupChild1, styles.groupChildLayout]} />
              <Text style={[styles.paid1, styles.paidTypo]}>Paid</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.groupPressable, styles.parentLayout]}
            onPress={() => navigation.navigate("InvoiceDetailView")}
          >
            <View style={[styles.groupItem, styles.groupChildLayout1]} />
            <Text style={[styles.muhammadAli, styles.paidTypo]}>
              Muhammad Ali
            </Text>
            <View style={[styles.inv0001Parent, styles.inv0001ParentLayout]}>
              <Text style={[styles.inv0001, styles.textTypo]}>#INV0001</Text>
              <Text style={[styles.jan2023, styles.janPosition]}>
                01/Jan/2023
              </Text>
              <Text style={[styles.text, styles.textPosition]}>-</Text>
            </View>
            <Text style={[styles.rs3000, styles.rs3000Typo]}>Rs. 3000</Text>
            <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
              <View style={[styles.groupInner, styles.groupChildLayout]} />
              <Text style={[styles.due, styles.paidTypo]}>Due</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.rectangleParent2, styles.parentLayout]}
            onPress={() => navigation.navigate("InvoiceDetailView")}
          >
            <View style={[styles.groupChild4, styles.groupChild4Bg]} />
            <Text style={[styles.muhammadAli4, styles.text4Typo]}>
              Muhammad Ali
            </Text>
            <View style={[styles.inv0001Parent2, styles.inv0001ParentLayout]}>
              <Text style={[styles.inv00014, styles.text4Typo]}>#INV0001</Text>
              <Text style={[styles.jan20234, styles.text4Typo]}>
                01/Jan/2023
              </Text>
              <Text style={[styles.text4, styles.text4Typo]}>-</Text>
            </View>
            <Text style={[styles.rs30004, styles.rs3000Typo]}>Rs. 3000</Text>
            <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
              <View style={[styles.groupChild1, styles.groupChildLayout]} />
              <Text style={[styles.paid1, styles.paidTypo]}>Paid</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.rectangleParent4, styles.parentLayout]}
            onPress={() => navigation.navigate("InvoiceDetailView")}
          >
            <View style={[styles.groupChild6, styles.groupChildLayout1]} />
            <Text style={[styles.muhammadAli, styles.paidTypo]}>
              Muhammad Ali
            </Text>
            <View style={[styles.inv0001Parent, styles.inv0001ParentLayout]}>
              <Text style={[styles.inv0001, styles.textTypo]}>#INV0001</Text>
              <Text style={[styles.jan2023, styles.janPosition]}>
                01/Jan/2023
              </Text>
              <Text style={[styles.text, styles.textPosition]}>-</Text>
            </View>
            <Text style={[styles.rs3000, styles.rs3000Typo]}>Rs. 3000</Text>
            <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
              <View style={[styles.groupChild7, styles.groupChildLayout]} />
              <Text style={[styles.due, styles.paidTypo]}>Due</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.rectangleParent4, styles.parentLayout]}
            onPress={() => navigation.navigate("InvoiceDetailView")}
          >
            <View style={[styles.groupChild6, styles.groupChildLayout1]} />
            <Text style={[styles.muhammadAli, styles.paidTypo]}>
              Muhammad Ali
            </Text>
            <View style={[styles.inv0001Parent, styles.inv0001ParentLayout]}>
              <Text style={[styles.inv0001, styles.textTypo]}>#INV0001</Text>
              <Text style={[styles.jan2023, styles.janPosition]}>
                01/Jan/2023
              </Text>
              <Text style={[styles.text, styles.textPosition]}>-</Text>
            </View>
            <Text style={[styles.rs3000, styles.rs3000Typo]}>Rs. 3000</Text>
            <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
              <View style={[styles.groupChild7, styles.groupChildLayout]} />
              <Text style={[styles.due, styles.paidTypo]}>Due</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.rectangleParent4, styles.parentLayout]}
            onPress={() => navigation.navigate("InvoiceDetailView")}
          >
            <View style={[styles.groupItem, styles.groupChildLayout1]} />
            <Text style={[styles.muhammadAli, styles.paidTypo]}>
              Muhammad Ali
            </Text>
            <View style={[styles.inv0001Parent, styles.inv0001ParentLayout]}>
              <Text style={[styles.inv0001, styles.textTypo]}>#INV0001</Text>
              <Text style={[styles.jan2023, styles.janPosition]}>
                01/Jan/2023
              </Text>
              <Text style={[styles.text, styles.textPosition]}>-</Text>
            </View>
            <Text style={[styles.rs3000, styles.rs3000Typo]}>Rs. 3000</Text>
            <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
              <View style={[styles.groupChild7, styles.groupChildLayout]} />
              <Text style={[styles.due, styles.paidTypo]}>Due</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.rectangleParent10, styles.parentLayout]}
            onPress={() => navigation.navigate("InvoiceDetailView")}
          >
            <View style={[styles.groupChild6, styles.groupChildLayout1]} />
            <Text style={[styles.muhammadAli, styles.paidTypo]}>
              Muhammad Ali
            </Text>
            <View style={[styles.inv0001Parent, styles.inv0001ParentLayout]}>
              <Text style={[styles.inv0001, styles.textTypo]}>#INV0001</Text>
              <Text style={[styles.jan2023, styles.janPosition]}>
                01/Jan/2023
              </Text>
              <Text style={[styles.text, styles.textPosition]}>-</Text>
            </View>
            <Text style={[styles.rs3000, styles.rs3000Typo]}>Rs. 3000</Text>
            <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
              <View style={[styles.groupChild7, styles.groupChildLayout]} />
              <Text style={[styles.due, styles.paidTypo]}>Due</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.rectangleParent10, styles.parentLayout]}
            onPress={() => navigation.navigate("InvoiceDetailView")}
          >
            <View style={[styles.groupChild6, styles.groupChildLayout1]} />
            <Text style={[styles.muhammadAli, styles.paidTypo]}>
              Muhammad Ali
            </Text>
            <View style={[styles.inv0001Parent, styles.inv0001ParentLayout]}>
              <Text style={[styles.inv0001, styles.textTypo]}>#INV0001</Text>
              <Text style={[styles.jan2023, styles.janPosition]}>
                01/Jan/2023
              </Text>
              <Text style={[styles.text, styles.textPosition]}>-</Text>
            </View>
            <Text style={[styles.rs3000, styles.rs3000Typo]}>Rs. 3000</Text>
            <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
              <View style={[styles.groupChild7, styles.groupChildLayout]} />
              <Text style={[styles.paid1, styles.paidTypo]}>Paid</Text>
            </View>
          </Pressable> */}
          {/* <Pressable
            style={[styles.rectangleParent14, styles.parentLayout]}
            onPress={() => navigation.navigate("InvoiceDetailView")}
          >
            <View style={[styles.groupChild6, styles.groupChildLayout1]} />
            <Text style={[styles.muhammadAli, styles.paidTypo]}>
              Muhammad Ali
            </Text>
            <View style={[styles.inv0001Parent, styles.inv0001ParentLayout]}>
              <Text style={[styles.inv0001, styles.textTypo]}>#INV0001</Text>
              <Text style={[styles.jan2023, styles.janPosition]}>
                01/Jan/2023
              </Text>
              <Text style={[styles.text, styles.textPosition]}>-</Text>
            </View>
            <Text style={[styles.rs3000, styles.rs3000Typo]}>Rs. 3000</Text>
            <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
              <View style={[styles.groupChild7, styles.groupChildLayout]} />
              <Text style={[styles.due, styles.paidTypo]}>Due</Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.rectangleParent16, styles.parentLayout]}
            onPress={() => navigation.navigate("InvoiceDetailView")}
          >
            <View style={[styles.groupChild6, styles.groupChildLayout1]} />
            <Text style={[styles.muhammadAli, styles.paidTypo]}>
              Muhammad Ali
            </Text>
            <View style={[styles.inv0001Parent, styles.inv0001ParentLayout]}>
              <Text style={[styles.inv0001, styles.textTypo]}>#INV0001</Text>
              <Text style={[styles.jan2023, styles.janPosition]}>
                01/Jan/2023
              </Text>
              <Text style={[styles.text, styles.textPosition]}>-</Text>
            </View>
            <Text style={[styles.rs3000, styles.rs3000Typo]}>Rs. 3000</Text>
            <View style={[styles.rectangleGroup, styles.groupChildLayout]}>
              <View style={[styles.groupChild7, styles.groupChildLayout]} />
              <Text style={[styles.due, styles.paidTypo]}>Due</Text>
            </View>
          </Pressable> */}
        </View>
        <Image
          style={[styles.image2Icon, styles.iconChildPosition]}
          contentFit="cover"
          source={require("../assets/image-2.png")}
        />
        <Pressable
          style={[styles.vectorGroup, styles.iconChildPosition]}
          onPress={openGroupContainer38}
        >
          <Image
            style={[styles.rectangleIcon, styles.iconChildPosition]}
            contentFit="cover"
            source={require("../assets/rectangle-571.png")}
          />
          <View style={styles.groupChild20} />
          <View style={styles.invoicesParent}>
            <Text style={styles.invoices1}>Invoices</Text>
            <Image
              style={[styles.vectorIcon, styles.iconLayout2]}
              contentFit="cover"
              source={require("../assets/vector2.png")}
            />
          </View>
          <Image
            style={[styles.groupChild21, styles.groupChild21Layout]}
            contentFit="cover"
            source={require("../assets/rectangle-58.png")}
          />
        </Pressable>
        <Text style={[styles.text12, styles.totalClr]}>$1200,00</Text>
        <Text style={[styles.total, styles.totalTypo]}>Total</Text>
        <View style={styles.invoicesChild} />
        <Image
          style={styles.invoicesItem}
          contentFit="cover"
          source={require("../assets/line-15.png")}
        />
        <View style={[styles.rectangleParent18, styles.rectangleLayout]}>
           <View
            style={[styles.rectanglePressable, styles.rectangleLayout]}
           
          /> 
           <TextInput style={[styles.searchInvoice, styles.paidTypo]} placeholder=" Search Invoice" onChangeText={setSearch}>
           
          </TextInput> 
          <Pressable
            style={styles.vector}
            onPress={searchFunction}
          >
            <Image
              style={[styles.icon, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/vector13.png")}
            />
          </Pressable>
        </View>
      
        <Image
          style={styles.maskGroupIcon}
          contentFit="cover"
          source={require("../assets/mask-group.png")}
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
            onPress={() => navigation.navigate("CreateInvoice")}
          >
            <Text style={[styles.createInvoice, styles.text13Typo]}>
              Create Invoice
            </Text>
          </Pressable>
        </View>
          <Footer data={invoices} /> 
      </View>

      <Modal animationType="fade" transparent visible={groupContainer38Visible}>
        <View style={styles.groupContainer38Overlay}>
          <Pressable
            style={styles.groupContainer38Bg}
            onPress={closeGroupContainer38}
          />
          <FrameComponent onClose={closeGroupContainer38} />
        </View>
      </Modal>
    
    </>
  );
};

const styles = StyleSheet.create({
  invPosition: {
    left: 0,
    top: 0,
  },
  parentLayout: {
    height: 85,
    width: 393,
    left: 0,
    position: "absolute",
  },
  groupChildLayout1: {
    borderRadius: Border.br_3xs,
    height: 85,
    width: 393,
    left: 0,
    position: "absolute",
  },
  paidTypo: {
    fontFamily: FontFamily.poppinsMedium,
    textAlign: "left",
    fontWeight: "500",
  },
  inv0001ParentLayout: {
    height: 23,
    position: "absolute",
  },
  textTypo: {
    color: Color.dimgray_100,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  janPosition: {
    left: 86,
    top: 1,
    fontSize: FontSize.size_sm,
  },
  textPosition: {
    left: 75,
    fontSize: FontSize.size_sm,
    top: 1,
  },
  rs3000Typo: {
    left: 285,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    top: 15,
    position: "absolute",
  },
  frameWrapperPosition: {
    left: 325,
    top: 47,
  },
  paidWrapperPosition: {
    backgroundColor: Color.darkolivegreen,
    borderRadius: Border.br_sm,
    left: 0,
    top: 0,
  },
  groupChildLayout: {
    width: 53,
    height: 23,
    position: "absolute",
  },
  groupChild4Bg: {
    backgroundColor: Color.darkslateblue,
    top: 0,
  },
  text4Typo: {
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    color: Color.white,
    textAlign: "left",
    position: "absolute",
  },
  iconChildPosition: {
    width: 430,
    left: -10,
    position: "absolute",
  },
  iconLayout2: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  groupChild21Layout: {
    height: 43,
    position: "absolute",
  },
  totalClr: {
    color: Color.red,
    fontSize: FontSize.size_lg,
    top: 1032,
  },
  totalTypo: {
    fontWeight: "600",
    textAlign: "left",
    position: "absolute",
  },
  rectangleLayout: {
    height: 55,
    width: 392,
    position: "absolute",
  },
  iconLayout1: {
    height: "100%",
    width: "100%",
  },
  invoicesChild2ShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: -4,
    },
  },
  invoicesChild3Layout: {
    borderRadius: Border.br_11xl,
    position: "absolute",
  },
  homeTypo: {
    lineHeight: 18,
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
  },
  iconLayout: {
    height: 45,
    width: 45,
    top: 845,
    position: "absolute",
  },
  housefillFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  svgrepoIconLayout: {
    height: 26,
    width: 26,
    top: 855,
    position: "absolute",
    overflow: "hidden",
  },
  frameLayout: {
    height: 104,
    width: 104,
    top: 777,
    position: "absolute",
  },
  housefill1Position: {
    height: 20,
    left: 0,
    position: "absolute",
  },
  text13Typo: {
    fontSize: FontSize.caption2Regular_size,
    fontWeight: "500",
  },
  lightTexture22341Icon: {
    width: 424,
    position: "absolute",
    height: 932,
    left: 0,
  },
  groupChild: {
    top: 0,
  },
  muhammadAli: {
    textAlign: "left",
    color: Color.textTxtPrimary,
    fontSize: FontSize.size_base,
    left: 15,
    top: 15,
    position: "absolute",
  },
  inv0001: {
    fontSize: FontSize.size_mini,
    left: 0,
    top: 0,
  },
  jan2023: {
    fontSize: FontSize.size_sm,
    color: Color.dimgray_100,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  text: {
    color: Color.dimgray_100,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    position: "absolute",
  },
  inv0001Parent: {
    width: 175,
    top: 47,
    left: 15,
  },
  rs3000: {
    color: Color.textTxtPrimary,
  },
  paid: {
    color: Color.white,
    fontSize: FontSize.size_mini,
    textAlign: "left",
  },
  paidWrapper: {
    paddingHorizontal: 9,
    paddingVertical: 0,
    flexDirection: "row",
    position: "absolute",
  },
  frameWrapper: {
    width: 60,
    height: 23,
    position: "absolute",
  },
  vectorParent: {
    top: 0,
  },
  groupItem: {
    backgroundColor: Color.steelblue_300,
    top: 0,
  },
  groupInner: {
    backgroundColor: Color.gold,
    borderRadius: Border.br_sm,
    width: 53,
    left: 0,
    top: 0,
  },
  due: {
    left: 12,
    color: Color.white,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    top: 0,
    position: "absolute",
  },
  rectangleGroup: {
    left: 325,
    top: 47,
  },
  rectangleParent: {
    top: 210,
  },
  groupChild1: {
    backgroundColor: Color.darkolivegreen,
    borderRadius: Border.br_sm,
    left: 0,
    top: 0,
  },
  paid1: {
    left: 10,
    color: Color.white,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    top: 0,
    position: "absolute",
  },
  rectangleContainer: {
    top: 420,
  },
  groupPressable: {
    top: 105,
  },
  groupChild4: {
    borderRadius: Border.br_3xs,
    height: 85,
    width: 393,
    left: 0,
    position: "absolute",
  },
  muhammadAli4: {
    fontSize: FontSize.size_base,
    left: 15,
    top: 15,
  },
  inv00014: {
    fontSize: FontSize.size_mini,
    left: 0,
    top: 0,
  },
  jan20234: {
    fontSize: FontSize.size_sm,
    left: 86,
    top: 1,
  },
  text4: {
    left: 75,
    fontSize: FontSize.size_sm,
    top: 1,
  },
  inv0001Parent2: {
    width: 174,
    top: 47,
    left: 15,
  },
  rs30004: {
    color: Color.white,
  },
  rectangleParent2: {
    top: 315,
  },
  groupChild6: {
    backgroundColor: Color.gainsboro_100,
    top: 0,
  },
  groupChild7: {
    backgroundColor: Color.dimgray_100,
    borderRadius: Border.br_sm,
    width: 53,
    left: 0,
    top: 0,
  },
  rectangleParent4: {
    top: 525,
  },
  rectangleParent10: {
    top: 630,
  },
  rectangleParent14: {
    top: 742,
  },
  rectangleParent16: {
    top: 847,
  },
  groupParent: {
    top: 257,
    width: 393,
    left: 10,
    position: "absolute",
    height: 932,
  },
  image2Icon: {
    top: 803,
    height: 129,
    display: "none",
  },
  groupContainer38Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  groupContainer38Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  rectangleIcon: {
    top: -6,
    height: 80,
  },
  groupChild20: {
    top: 13,
    left: 43,
    width: 340,
    height: 50,
    position: "absolute",
  },
  invoices1: {
    top: "0%",
    left: "70.22%",
    textAlign: "center",
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  vectorIcon: {
    height: "88.85%",
    width: "9.72%",
    top: "8.33%",
    right: "90.28%",
    bottom: "2.82%",
    left: "0%",
    position: "absolute",
  },
  invoicesParent: {
    height: "38.1%",
    width: "52.33%",
    top: "30.16%",
    right: "42.56%",
    bottom: "31.75%",
    left: "5.12%",
    position: "absolute",
  },
  groupChild21: {
    top: 59,
    width: 49,
    left: 19,
  },
  vectorGroup: {
    height: 63,
    top: 47,
  },
  text12: {
    left: 383,
    fontFamily: FontFamily.montserratRegular,
    textAlign: "left",
    position: "absolute",
  },
  total: {
    left: 17,
    fontFamily: FontFamily.montserratSemibold,
    color: Color.red,
    fontSize: FontSize.size_lg,
    top: 1032,
  },
  invoicesChild: {
    top: 1003,
    left: 322,
    borderStyle: "solid",
    borderColor: "#ff0000",
    borderTopWidth: 1,
    width: 149,
    height: 1,
    position: "absolute",
  },
  invoicesItem: {
    top: 980,
    left: 339,
    width: 19,
    height: 0,
    position: "absolute",
  },
  rectanglePressable: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.steelblue_300,
    left: 0,
    top: 0,
  },
  searchInvoice: {
    top: 14,
    left: 21,
    color: "#1e1e1e",
    textAlign: "left",
    fontSize: FontSize.size_base,
    position: "absolute",
    width:300,
  },
  icon: {
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
  rectangleParent18: {
    top: 182,
    left: 10,
  },
  invoicesInner: {
    top: 3,
    left: 29,
    width: 372,
  },
  maskGroupIcon: {
    top: 63,
    left: 368,
    width: 31,
    height: 31,
    position: "absolute",
  },
  invoicesChild1: {
    top: 782,
    backgroundColor: Color.aliceblue_100,
    height: 150,
  },
  invoicesChild2: {
    top: 830,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowRadius: 10,
    elevation: 10,
    height: 102,
    width: 430,
    left: 0,
    position: "absolute",
    backgroundColor: Color.steelblue_300,
  },
  invoicesChild3: {
    top: 917,
    left: 139,
    backgroundColor: Color.textTxtPrimary,
    width: 154,
    height: 6,
  },
  home: {
    left: 22,
    top: 895,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    position: "absolute",
  },
  vehicles: {
    left: 99,
    top: 895,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    position: "absolute",
  },
  addVehicle: {
    top: 867,
    left: 172,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    lineHeight: 18,
    position: "absolute",
  },
  records: {
    left: 271,
    top: 895,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    position: "absolute",
  },
  invoices2: {
    left: 359,
    top: 895,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    fontWeight: "500",
    position: "absolute",
  },
  ellipseIcon: {
    left: 20,
  },
  homeMutedIcon: {
    width: 25,
    height: 27,
  },
  housefill: {
    top: 852,
    left: 31,
    position: "absolute",
  },
  wrapper: {
    left: 277,
  },
  groupIcon: {
    left: 105,
  },
  microphoneSvgrepoCom1Icon: {
    left: 287,
  },
  container: {
    left: 365,
  },
  invoiceWarrantyLineSvgrepoIcon: {
    left: 375,
  },
  frame: {
    left: 163,
  },
  invoicesChild4: {
    left: 164,
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
  elementPosition: {
    left: 18,
    height: 20,
    justifyContent: "center",
    top: 0,
    position: "absolute",
  },
  text13: {
    lineHeight: 17,
    fontFamily: FontFamily.caption2Regular,
    textAlign: "left",
    color: Color.textTxtPrimary,
  },
  invoices3: {
    top: 0,
    left: 27,
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.darkslateblue,
    fontSize: FontSize.size_sm,
  },
  breadcrumbs: {
    top: 6,
    width: 87,
  },
  createInvoice: {
    lineHeight: 18,
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    color: Color.white,
  },
  createInvoiceWrapper: {
    left: 242,
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
  breadcrumbsParent: {
    top: 130,
    width: 390,
    height: 32,
    left: 10,
    position: "absolute",
  },
  invoices: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    width: "100%",
    height: 932,
  },
});

export default Invoices;
