import React, { useCallback } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import { printToFileAsync } from "expo-print";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import * as Sharing from "expo-sharing";
import { FontFamily, Border, Color, FontSize, Padding } from "../GlobalStyles";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Config from "./Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const rem = screenWidth / 16;
function InvoiceDetailView() {
  const route = useRoute();

  const invoiceId = route.params?.recordId;
  const [Invoice, setInvoice] = useState([]);

  const navigation = useNavigation();
  const [invoiceID, setInvoiceID] = useState("");
  const [date, setDate] = useState("");
  const [due, setDue] = useState("");
  const [balance, setBalance] = useState("");
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [status, setStatus] = useState("");
  const [subTotal, setSubTotal] = useState("0");
  const [tax, setTax] = useState("");
  const [discount, setDiscount] = useState("");
  const [total, setTotal] = useState("");
  const [balanceDue, setBalanceDue] = useState("");
  const [description, setDescription] = useState([]);
  const [taxr, setTaxr] = useState([]);
  const [discountr, setDiscountr] = useState([]);
  const [vehicle, setVehicle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [businessProfile, setBusinessProfile] = useState("");
  const [currency, setCurrency] = useState("");
  useEffect(() => {
    getData();
    getProfileImage();
  }, [invoiceId]);
  useEffect(() => {
    calculateTotalAmount();
  });


  const getData = async () => {
    setIsLoading(true);
    let token = await AsyncStorage.getItem("accessToken");
    const accessToken = "Bearer " + token;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${Config.apiServerUrl}/api/invoice/get-invoice/${invoiceId}`,
      headers: {
        Authorization: accessToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        const dateObj = new Date(response.data.date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        setDate(`${month}/${day}/${year}`);
        setDue(response.data.invoiceDue);
        setInvoiceID(response.data.id);
        setTotal(response.data.total);
        setDescription(response.data.descriptions);
        setTaxr(response.data.taxes);
        setDiscountr(response.data.discounts);
        setName(response.data.name);
        setRegistrationNumber(response.data.registrationNumber);
        setVehicle(response.data.vehicleName);
        setCurrency(response.data.currency);
        let st = response.data.status;
        setStatus(st ? "Paid" : "Due");
        setBalance(st ? 0 : response.data.total);
        calculateTotalAmount();
        setIsLoading(false);
      })
      .catch((error) => {
         if (error.response.status === 401) {
        
          navigation.navigate("Login");
        }
        console.log(error);
      });
  };

  const getProfileImage = async () => {
    try {
      const accessTokens = await AsyncStorage.getItem("accessToken");
      const token = "Bearer " + accessTokens;
      const Business_id = await AsyncStorage.getItem("Business_id");

      if (Business_id) {

        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${Config.apiServerUrl}/api/business/${Business_id}/profile-image`,
          headers: {
            Authorization: token,
          },
        };

        const response = await axios.request(config);

        if (response.status === 200) {
          const responseData = response.data;

          setBusinessProfile(`${Config.baseUrl1}` + responseData.url);
        }
        else if (error.response.status === 401) {
          navigation.navigate("Login");
        } else {
          console.log("Error: " + response.statusText);
        }
      }
    } catch (error) {
      console.log("Error fetching profile image:", error);
    }
  };

  const calculateTotalAmount = () => {
    setDiscount(0);
    setTax(0);
    if (
      description.length === 0 &&
      discountr.length === 0 &&
      taxr.length === 0
    ) {
      setTotal(0.0);
      return;
    }

    let totalAmount = 0.0;

    for (const item of description) {
      const itemAmount = parseFloat(item.quantity) * parseFloat(item.rate);
      totalAmount += isNaN(itemAmount) ? 0 : itemAmount;
    }

    setSubTotal(totalAmount);

    let totalDiscount = 0.0;
    for (const disc of discountr) {
      const discountRate = parseFloat(disc.discountRate);
      if (!isNaN(discountRate)) {
        totalDiscount += (discountRate / 100) * totalAmount; // Convert rate to decimal
      }
    }

    setDiscount(totalDiscount);

    let totaltax = 0.0;
    for (const t of taxr) {
      const taxRate = parseFloat(t.taxRate);

      if (!isNaN(taxRate)) {
        totaltax += (taxRate / 100) * totalAmount; // Convert rate to decimal
      }
    }
    setTax(totaltax);

    totalAmount -= totalDiscount;
    totalAmount += totaltax;

    totalAmount = totalAmount.toFixed(2);
    setTotal(totalAmount);
  };

  const descriptionRows = description
    .map(
      (desc, index) => `
  <tr>
    <td>${desc.item}</td>
    <td>$${desc.rate.toFixed(2)}</td>
    <td>${desc.quantity}</td>
    <td>$${desc.amount.toFixed(2)}</td>

  </tr>
`
    )
    .join("");

  const html = `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 10px;
    }
    .header {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .header-left {
      float: left;
      text-align: left;
      width: 33%;
    }
    .header-middle {
      float: left;
      text-align: center;
      width: 33%;
    }
    .header-right {
      float: right;
      text-align: right;
      text-decoration: underline;
      width: 33%;
    }
    .details {
      text-align: left;
      margin-top: 50px; /* Reduce top margin for details section */
    }
    .details label {
      font-weight: bold;
      margin-bottom: 1px; /* Reduce margin below labels */
    }
    .details p {
      margin: 1px 0; /* Reduce vertical margin for data rows */
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px; /* Reduce top margin for the table */
    }
    .items-table th, .items-table td {
      border: 1px solid #ccc;
      padding: 10px;
      text-align: center;
    }
    .items-table th {
      background-color: #f2f2f2;
    }
    .items-table tr {
      border-collapse: collapse; /* Add this line to remove gaps between rows in the table */
    }
    .total {
      text-align: right;
      font-weight: bold;
      margin-top: 10px; /* Reduce top margin for the totals section */
    }
    .total p {
      margin: 1px 0; /* Reduce vertical margin for data rows */
    }
  </style>
</head>
<body>
  <div class="container">
    <p class="header">
      <span class="header-left">Invoice ID: ${invoiceID}</span>
      <span class="header-middle">
        <img src="${businessProfile}" alt="Logo" style="width: 30px; height: 30px;">
      </span>

      <span class="header-right">Invoice</span>
    </p>
    <p><br></p>
    <div class="details">
      <div>
        <p>Date: ${date}</p>
        <p>Name: ${name}</p>
        <p>Registration Number: ${registrationNumber}</p>
        <p>Status: ${status}</p>
        <p>Balance Due: ${total}</p>
        <p>Currency: ${currency}</p>
      </div>
    </div>
    <table class="items-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Rate</th>
          <th>Quantity</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        ${descriptionRows}
      </tbody>
    </table>
    <div class="total">
      <p>Subtotal: ${subTotal}</p>
      <p>Tax: ${tax}</p>
      <p>Discount: ${discount}</p>
      <p>Total: ${total}</p>
    </div>
  </div>
</body>
</html>`;

  const generatePDF = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });
    await shareAsync(file.uri);
  };

  const printPDf = async () => {
    try {
      const file = await printToFileAsync({
        html: html,
        base64: false,
      });

      const downloadObject = await FileSystem.downloadAsync(
        file.uri,
        FileSystem.documentDirectory + "invoice.pdf"
      );
      if (downloadObject.status === 200) {
      } else {
        console.error("Error downloading the PDF.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  function editInvoiceFunction() {
    navigation.navigate("CreateInvoice", { InvoiceId: invoiceId });
  }
  const [invoiceNumber, setinvoiceNumber] = useState("");

  return (
    <>
      <View style={styles.invoiceDetailView}>
        <Image
          style={styles.lightTexture22341Icon}
          contentFit="cover"
          source={require("../assets/light-texture2234-1.png")}
        />

        <View style={styles.breadcrumbsParent}>
          <TouchableOpacity
         onPress={() => navigation.navigate('Home')}
          >
          <Image
            style={styles.homeMutedIcon}
            contentFit="cover"
            source={require("../assets/homemuted.png")}
          />
          </TouchableOpacity>
          <Text>/</Text>
          <TouchableOpacity 
         onPress={() => navigation.navigate('Invoices')}          
          >
          <Text style={{fontSize: rem * 0.58, fontWeight: 500,color:"#6ba2f2" }}>Invoices</Text>
          </TouchableOpacity>
          <Text style={{fontSize: rem * 0.58, fontWeight: 500,color:"black" }}>/</Text>
          <Text style={{fontSize: rem * 0.58, fontWeight: 500,color:"#6ba2f2" }}>Invoice Detail View</Text>
          <Text style={{fontSize: rem * 0.58, fontWeight: 500,color:"black" }}>/ {invoiceId}</Text>
        </View>


        <View style={styles.containerView}>
          <LinearGradient
            style={styles.rectangleLineargradient}
            locations={[0, 1]}
            colors={["rgba(7, 132, 199, 0.16)", "rgba(217, 217, 217, 0)"]}
          >
            <View
              style={{
                alignSelf: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: rem * 0.8,
                    fontWeight: 500,
                    fontStyle: 'italic',
                  }}
                >
                  #INV
                </Text>
                <Text
                  style={{
                    fontSize: rem * 0.8,
                    fontWeight: 500,
                  }}
                >
                  {invoiceID}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: rem * 0.55,
                    fontWeight: 500,
                    width: screenWidth * 0.5,
                  }}
                >
                  Date: {date}
                </Text>
                <Text
                  style={{
                    fontSize: rem * 0.6,
                    fontWeight: 600,
                    width: screenWidth * 0.34,
                    textAlign: "right",
                  }}
                >
                  Invoice To
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: rem * 0.55,
                    fontWeight: 500,
                    
                    width: screenWidth * 0.55,
                  }}
                >
                  Invoice Due: {due}
                </Text>
                <Text
                  style={{
                    fontSize: rem * 0.6,
                    fontWeight: 600,
                    width: screenWidth * 0.34,
                    textAlign: "right",
                  }}
                  numberOfLines={1}
                >
                  {name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: rem * 0.55,
                    fontWeight: 500,
                    width: screenWidth * 0.55,
                  }}
                >
                  Balance: {total}
                </Text>
                <Text
                  style={{
                    fontSize: rem * 0.6,
                    fontWeight: 600,
                    width: screenWidth * 0.34,
                    textAlign: "right",
                  }}
                >
                  {registrationNumber}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: rem * 0.55,
                    fontWeight: 500,
                    width: screenWidth * 0.55,
                  }}
                  numberOfLines={1} 
                  ellipsizeMode="tail"
                >
                  Currency: {currency}
                </Text>
                <Text
                  style={{
                    fontSize: rem * 0.6,
                    fontWeight: 600,
                    color:
                      status === "Paid"
                        ? "green"
                        : status === "Due"
                          ? "#ffcc00"
                          : "black",
                    width: screenWidth * 0.34,
                    textAlign: "right",
                  }}
                >
                  {status}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>



        <ScrollView style={styles.wrap}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell} numberOfLines={1} ellipsizeMode="tail">DESCRIPTION</Text>
            <Text style={styles.headerCell} numberOfLines={1} ellipsizeMode="tail">RATE</Text>
            <Text style={styles.headerCell} numberOfLines={1} ellipsizeMode="tail">QUANTITY</Text>
            <Text style={styles.headerCell} numberOfLines={1} ellipsizeMode="tail">AMOUNT</Text>
          </View>
          {description.map((desc, index) => (
            <View key={index} style={styles.dataRow}>
              <Text style={styles.dataCell}>{desc.item}</Text>
              <Text style={styles.dataCell}>{desc.rate}</Text>
              <Text style={styles.dataCell}>{desc.quantity}</Text>
              <Text style={styles.dataCell}>{desc.amount}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={[styles.groupLayout]}>
          <View style={styles.parent}>
            <Text style={[styles.list]}>Subtotal -  {subTotal}</Text>
            <Text style={[styles.list]}>Tax -  {tax}</Text>
            <Text style={[styles.list]}>Discount -  {discount}</Text>
            <Text style={[styles.list]}
             
            >Total -  {total}</Text>
          </View>
        </View>

        <View style={[styles.groupLayout]}>
          
          <Pressable
            style={[styles.framePosition]} //share button
            onPress={generatePDF}
          >
            <Image
              style={[styles.iconP]}
              contentFit="cover"
              source={require("../assets/icbaselineshare.png")}
            />
          </Pressable>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            position: "absolute",
            width: screenWidth,
            height: screenHeight,
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="2" color="#031d44" style={styles.loader} />
          ) : (
            <View></View>
          )}
        </View>
        <View style={styles.foot}>
          <Footer prop={"Invoices"} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  editInvoice2: {
    color: Color.white,
    left: -9,
    // lineHeight: 18,
    textAlign: "center",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    fontSize: FontSize.caption2Regular_size,
    width: 80,
  },
  list: {
    fontSize: rem * 0.6, fontWeight: 500, textAlign: 'right',
  },
  containerView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.02,
  },
  dataRow: {
    flexDirection: "row",
    borderBottomWidth: 0.8,
    borderColor: "white",
    paddingVertical: 8,
  },
  dataCell: {
    flex: 1,
    textAlign: "center",
  },

  groupChild6: {
    borderRadius: Border.br_7xs,
    left: 0,
    top: 0,
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  loader: {
    // borderWidth: 4, // Adjust the line width as needed
    // borderColor: '#0000ff',
  },
  groupChild6Layout: {
    height: 30,
    width: 120,
    position: "absolute",
  },

  vectorContainer: {
    top: -8,
    left: 250,
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
  wrap: {
    marginTop: screenWidth * 0.1,
    maxHeight: screenWidth * 0.45,
    width: screenWidth * 0.93,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: Color.steelblue_300,
    flexGrow: 1,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'space-around',
    backgroundColor: '#96c6f2',
    height: rem * 1.2,
    alignItems: 'center',
    borderRadius: 10,
  },
  parentLayout1: {
    height: 0,
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
  setstyle: {
    top: -50,
    position: "absolute",
  },
  invoiceTypo1: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  foot: {
    flex: 1,
    position: "absolute",
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
    width: 30,
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
    left: 70,
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
    alignSelf: 'center',
    alignItems:'flex-end',
    flex: 1,
    width: screenWidth * 0.93,
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#3894c9",
    height: rem * 1.5,
    width: rem * 1.5,
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
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
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
    width: 15,
    top: 2,
    height: 15,
  },
  housefill: {
    width: 14,
    alignItems: "center",
    // justifyContent: "center",
    height: 20,
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
    marginTop: screenHeight * 0.14,
    flexDirection: 'row',
    gap: screenWidth * 0.01,
    marginLeft: screenWidth * 0.05
  },
  rectangleView: {
    top: 180,
    left: 6,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "rgba(217, 217, 217, 0.27)",
    width: 400,
    height: 470,
    position: "absolute",
  },
  groupChild: {
    height: 38,
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupItem: {
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
    left: 134,
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
    top: 290,
    left: 11,
  },
  element2: {
    top: 128,
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
    borderRadius: Border.br_5xs,
    width: screenWidth * 0.93,
    height: screenHeight * 0.12,
    backgroundColor: "transparent",
    position: "relative",
  },
  corollaGli2016: {
    top: 280,
    left: 343,
    width: 100,
    color: Color.darkslateblue,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    position: "absolute",
  },
  ellipseIcon: {
    width: 10,
    left: -23,
    top: 9,
  },
  paid: {
    left: 0,
    color: Color.darkolivegreen,
    top: 300,
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
    top: 260,
    marginLeft: 310,
    // left: 320,
    width: 180,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    textAlign: "left",
    alignContent: "flex-end",
    justifyContent: "flex-end",
    position: "absolute",
  },
  loritaDanielV: {
    marginTop: -272,

    // marginLeft:310,
    left: 200,
    width: 180,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    textAlign: "right",
    // alignContent:'flex-end',
    // justifyContent:'flex-end',
    position: "relative",
    alignSelf: "flex-start",
  },
  loritaDanielS: {
    marginTop: 0,

    // marginLeft:310,
    left: 200,
    width: 180,
    fontSize: FontSize.size_sm,
    color: "green",
    textAlign: "right",
    // alignContent:'flex-end',
    // justifyContent:'flex-end',
    position: "relative",
    alignSelf: "flex-start",
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
    width: 180,
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
    top: 297,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsSemibold,
    textAlign: "left",
    fontWeight: "600",
    left: 110,
  },
  invoiceTo: {
    left: 315,
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
    textAlign: 'right',
    // flex:1,
  },
  groupChild2: {
    left: 0,
    top: 0,
  },
  groupContainer: {
    // top: 500,
    // left: 210,
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
    right: 0,
    top: -20,
    position: "absolute",
  },
  iconP: {
    height: 25,
    width: 25,
  },
  wrapper: {
    left: 277,
  },
  container: {
    top: 730,
    height: 40,
    width: 40,
  },
  frame: {
    height: 40,
    width: 40,
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
    top: 0,
  },
  icbaselineShareIcon: {
    top: 672,
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
    top: "30%",
    left: "39.51%",
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
    // backgroundColor: Color.aliceblue_100,
    flex: 1,
    overflow: "hidden",
    height: screenHeight,
    width: screenWidth,
  },
});

export default InvoiceDetailView;
