import * as React from "react";
import { Image } from "expo-image";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View, Text, Pressable,Dimensions,ActivityIndicator, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";
import ErrorPopup from "../components/ErrorPopup";
import ErrorPopup2 from "../components/ErrorPopup2";

import InvoiceDetailView from "./InvoiceDetailView";
import DateTimePicker from '@react-native-community/datetimepicker';
import CreateInvoiceForm from "../components/CreateInvoiceForm";
import InvoiceDescription from "../components/InvoiceDescription";
import InvoiceTax from "../components/InvoiceDiscount";
import InvoiceDiscount from "../components/InvoiceTax";
import { useRef } from "react";


const CreateInvoice = (parans) => {
  const navigation = useNavigation();
  const [APIData, setAPIData] = useState();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [APIDiscount, setAPIDiscount] = useState();
  const [APITax, setAPITax] = useState();
  const [APIDescription, setAPIDescription] = useState();
  // contains the record id details
  const recordId = route.params?.InvoiceRecord;
  const invoiceId = route.params?.InvoiceId;
  // console.log(invoiceId);
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;







  const [showPicker, setShowPicker] = useState(false);

  const [itemName, setItemName] = useState('');
  const [rate, setRate] = useState('');
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState('');

  const [ subtotal , setSubTotal]= useState(0);

  const [disRateper, setdisRateper] = useState(0);
  const [total, setTotal] = useState('');
  const [calculation, setCalculation] = useState(0);


  const [Description, setDescription] = useState(['']);
  const [discount, setDiscount] = useState(['']);
  const [tax, setTax] = useState(['']);

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showErrorPopups, setShowErrorPopups] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsg2, setErrorMsg2] = useState('');
  const [Duedate, setDueDate] = useState('');
  const invoiceStatus = ['Paid', 'Due'];
  const [Name, setName] = useState('');
  const [regNumber, setregNumber] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [save, setSave] = useState(false);
  const [EmptyItem, setEmptyItem] = useState(false);
  const [EmptyFeildsDesc, setEmptyFeildsDesc] = useState(false);
  const [EmptyFeildsDisc, setEmptyFeildsDisc] = useState(false);
  const [EmptyFeildsTax, setEmptyFeildsTax] = useState(false);
  const [descriptionArray, setDescriptionArray] = useState([]);
  const [DiscountArray, setDiscountArray] = useState([]);
  const [TaxArray, setTaxArray] = useState([]);
  const handleItemsChange = (items) => {
    setDescription(items);
    setEmptyFeildsDesc(false);
    setEmptyItem(false);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemName = item.itemName;
      const quantity = item.quantity;
      const rate = item.rate;

      if (!itemName && !quantity && !rate) {

        setEmptyItem(true);
      }
      if (
        (!itemName && quantity && rate) ||
        (itemName && !quantity && rate) ||
        (itemName && quantity && !rate) ||
        (itemName && !quantity && !rate) ||
        (!itemName && !quantity && rate) ||
        (!itemName && quantity && !rate)) {

        setEmptyFeildsDesc(true);
      }



    }

    const filteredItems = items.filter(item => {
      return !(item.rate === "" && item.quantity === "" && item.itemName === "");
    });

    const descriptions = filteredItems.map(item => ({
      item: item.itemName,
      rate: parseFloat(item.rate),
      quantity: parseInt(item.quantity),
      amount: parseFloat(item.rate) * parseInt(item.quantity)
    }));

    setDescriptionArray(descriptions);


  };
  // const changeRecord = () =>{
  //   navigation.navigate("MaintenanceRecord", { fromPreviousScreen: true })
  // };

  const handleTaxChange = (items) => {
    setDiscount(items);


    setEmptyFeildsDisc(false);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemName = item.discountName;
      const rate = item.discountRate;

      if ((!itemName && rate) || (itemName && !rate)) {

        setEmptyFeildsDisc(true);
      }
    }

    const filteredItems = items.filter(item => {
      return !(item.discountRate === "" && item.discountName === "");
    });

    const taxes = filteredItems.map(item => ({
      discountName: item.discountName,
      discountRate: parseFloat(item.discountRate)
    }));

    setDiscountArray(taxes);
  }


  const handleDiscount = (items) => {

    setTax(items);
    setEmptyFeildsTax(false);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemName = item.taxName;
      const rate = item.taxRate;

      if ((!itemName && rate) || (itemName && !rate)) {

        setEmptyFeildsTax(true);
      }
    }


    const filteredItems = items.filter(item => {
      return !(item.taxRate === "" && item.taxName === "");
    });

    const taxes = filteredItems.map(item => ({
      taxName: item.taxName,
      taxRate: parseFloat(item.taxRate)
    }));

    setTaxArray(taxes);

  }





  const handleFormDataChange = (data) => {
    setName(data.name);
    setDate(data.date);
    setDueDate(data.Duedate);
    setregNumber(data.regNumber);
    setStatus(data.status);
    
  };

  const handleSave = () => {
    setErrorMsg('');
    setErrorMsg2('');
    setSave(true);
    if (!Name || !regNumber || !status || !date || !Duedate) {


    }
    else {

      if (EmptyFeildsDesc || EmptyFeildsTax || EmptyFeildsDisc) {
        setErrorMsg2('Please provide complete detail for entered feild');
        setShowErrorPopups(true);

      } else {
        if (EmptyItem) {
          setErrorMsg('You are about to create empty invoice. Are you sure you want to proceed?');
          setShowErrorPopup(true);
        } else {
          
            // console.log("create");
            sendData();
          

        }
      }

    }


  };

 


  sendData = async () => {

    console.log("here");
    const token = await AsyncStorage.getItem("accessToken");
    const accessToken = 'Bearer ' + token;

    let st;

    if (status == "Paid") {
      st = true;
    } else {
      st = false;
    }
    console.log("subtotal here");
    console.log(subtotal);
      

    let data = JSON.stringify({
      "invoiceDue": Duedate,
      "date": date,
      "registrationNumber": regNumber,
      "total": parseFloat(subtotal),
      "status": st,

      "descriptions": descriptionArray,
      "discounts": DiscountArray,
      "taxes": TaxArray
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://192.168.100.71:8080/api/invoice/create-invoice/${recordId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        navigation.navigate('Invoices');
      })
      .catch((error) => {
        console.log(error);
      });


  };


  useEffect(() => {
    setAmount(0.0);
    calculateTotalAmount();
  }, [Description, discount, tax]);

  const calculateTotalAmount = () => {
    if (Description.length === 0 || discount.length === 0 || tax.length === 0) {
      setTotalAmount(0.0);
      return;
    }

    let totalAmount = 0.0;

    for (const item of Description) {
      const itemAmount = parseFloat(item.quantity) * parseFloat(item.rate);
      totalAmount += isNaN(itemAmount) ? 0 : itemAmount;
    }
    setSubTotal(totalAmount);



    let totalDiscount = 0.0;
    for (const disc of discount) {
      const discountRate = parseFloat(disc.discountRate);
      if (!isNaN(discountRate)) {
        totalDiscount += (discountRate / 100) * totalAmount; // Convert rate to decimal
      }
    }
    


    let totaltax = 0.0;
    for (const t of tax) {

      const taxRate = parseFloat(t.taxRate);

      if (!isNaN(taxRate)) {
        totaltax += (taxRate / 100) * totalAmount; // Convert rate to decimal
      }
    }

    totalAmount -= totalDiscount;
    totalAmount += totaltax;

    totalAmount = totalAmount.toFixed(2);

    setTotalAmount(totalAmount);
  };


  return (
    <View style={styles.createInvoice}>
      <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', width: screenWidth, height: screenHeight, alignItems: 'center' }}>

        {isLoading ? (
          <ActivityIndicator size="2" color="#031d44" style={styles.loader} />
        ) : (
          <View>
          </View>
        )}
      </View>

      <Image
        style={[styles.lightTexture22341Icon, styles.groupChildPosition]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />

      <View style={[styles.breadcrumbs, styles.element2Position]}>
        <View style={[styles.housefill, styles.elementFlexBox]}>
          <Image
            style={styles.homeMutedIcon}
            contentFit="cover"
            source={require("../assets/homemuted.png")}
          />
        </View>
        <View style={[styles.element, styles.elementFlexBox]} />
        <View style={[styles.element1, styles.elementFlexBox]}>
          <Text style={styles.text}>\</Text>
        </View>
        <Text style={[styles.invoices, styles.text5Typo]}>Invoices</Text>
      </View>


      {/* reg number  */}
      <Image
        style={[styles.groupIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/group-141.png")}
      />



      <View style={[styles.element2, styles.elementFlexBox]}>
        <Text style={styles.textt}>\</Text>
      </View>
      <Text style={styles.createInvoice2}>Create Invoice</Text>

      <ScrollView style={styles.wrap}>
        <View style={styles.form}>
          <CreateInvoiceForm onFormDataChange={handleFormDataChange} APIData={APIData} recordId={recordId} save={save} setSave={setSave} />
        </View>
        <View style={styles.scroll}>
          <View>
            <InvoiceDescription onItemsChange={handleItemsChange} APIDescription={APIDescription} />
          </View>
          <View style={styles.tableRow}>
            <View style={styles.taxd}>
              <InvoiceDiscount onItemsChange={handleDiscount} APITax={APITax} />
            </View>
            <View style={styles.taxdd}>
              <InvoiceTax onItemsChange={handleTaxChange} APIDiscount={APIDiscount} />
            </View>
          </View>
        </View>
      </ScrollView>





      <View style={[styles.createInvoiceChild6, styles.createChildLayout1]} />
      <View style={[styles.createInvoiceChild7, styles.createChildPosition]} />


      <View style={styles.group}>
        <Text style={[styles.text5, styles.text5Clr]}>-</Text>
        <Text style={[styles.total, styles.totalTypo]}>Total</Text>
        <Text style={[styles.rs3050, styles.text5Clr]}>Rs {totalAmount}</Text>
      </View>





      {/* Submit Button  */}
      <View style={[styles.vectorContainer, styles.groupChild6Layout]}>
        <TouchableOpacity onPress={handleSave}>
          <Image
            style={[styles.groupChild6, styles.groupChild6Layout]}
            contentFit="cover"
            source={require("../assets/rectangle-73.png")}
          />
        
            <TouchableOpacity onPress={handleSave}>
              <Text style={[styles.createInvoice3, styles.totalTypo]}>
                Create Invoice
              </Text>
            </TouchableOpacity>
        
        </TouchableOpacity>
      </View>

      {/* footer  */}
      <View style={[styles.footer]}>
        <Footer prop={"Invoices"} />
      </View>

      <ErrorPopup
        visible={showErrorPopup}
        message={errorMsg}
        onConfirm={() => {
          setShowErrorPopup(false);
          sendData();
        }}
        onCancel={() => setShowErrorPopup(false)}
      />

      <ErrorPopup2
        visible={showErrorPopups}
        message={errorMsg2}
        onConfirm={() => setShowErrorPopups(false)}
        onCancel={() => setShowErrorPopups(false)}
      />
    </View>

  );
};

const styles = StyleSheet.create({

  tableRow: {
    flexDirection: 'row',
    top: 0,

    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  form: {
    marginTop: 0,
    position: 'relative',
    // backgroundColor:'red',
  },
  picker: {
    top: -685,
    left: 360,
    width: 50,
  },
  createChildLayout3: {
    height: 126,
    top: 501,
    width: 186,
  },
  taxd: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,

  },
  containerr: {
    flex: 1,
  },
  editInvoice2: {
    color: Color.white,
    lineHeight: 18,
    top: -1,
    // textAlign: "center",
    fontSize: FontSize.caption2Regular_size,
    width: 120,
    left: -13,

  },
  vectorContainerr: {

    marginTop: 112,
    left: 275,
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

  footer: {
    position: 'absolute',
    paddingRight: 10,
    left: 8,
  },
  groupChild6Layoutt: {
    height: 30,
    width: 130,
    position: "absolute",
  },
  tablewrapper: {
    flex: 1,
  },
  taxdd: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    // maxHeight: 300,

    position: 'relative',
    // marginTop:0,
    // backgroundColor:'red',
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
    top: 120,
    height: 20,
  },
  wrap: {
    marginTop: 160,
    height: 480,
    flexGrow: 1,
    // flex:1,
    // overflow:'hidden',
    // backgroundColor:'red',
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
    top: 5,
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
    width: 150,
  },
  lineViewPosition: {
    top: 34,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    position: "absolute",
  },
  groupLayout: {
    height: 164,
    width: 392,
    position: "absolute",
  },
  rectangleViewBg: {
    backgroundColor: Color.steelblue_300,
    borderRadius: Border.br_3xs,
    position: "absolute",
  },
  rateTypo: {
    fontSize: FontSize.size_smi,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsMedium,
    textAlign: "left",
    fontWeight: "500",
  },
  taxTypo1: {
    color: Color.dimgray_200,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  addTypo1: {
    left: 132,
    width: 64,
    color: Color.dimgray_200,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
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

    borderColor: "#d9d9d9",
    borderStyle: "solid",
    position: "absolute",
  },
  createChildPosition: {
    top: 569,
    width: 187,
    height: 1,

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
  textt: {
    fontSize: FontSize.caption2Regular_size,
    lineHeight: 17,
    fontFamily: FontFamily.caption2Regular,
    textAlign: "left",
    color: Color.textTxtPrimary,
    fontWeight: "500",
    left: 10,
  },
  text: {
    fontSize: FontSize.caption2Regular_size,
    lineHeight: 17,
    fontFamily: FontFamily.caption2Regular,
    textAlign: "left",
    color: Color.textTxtPrimary,
    fontWeight: "500",
    left: 0,
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
    left: 30,
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
    position: "absolute",
  },
  text1: {
    left: 5,
  },
  invoiceStatusPicker: {
    top: 232
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
    top: 120,
  },
  createInvoice2: {
    top: 120,
    left: 130,
    color: Color.darkslateblue,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
  },
  rectangleIcon: {
    height: 38,
    width: 392,
    left: 0,
    top: 0,
    borderRadius: Border.br_3xs,
    position: "absolute",
  },
  rectangleView: {
    top: 39,
    height: 125,
    width: 392,
    left: 0,
  },
  vectorGroup: {
    left: 0,
    top: 0,
  },
  description: {
    width: 91,
    left: 15,
    position: "absolute",
    top: 10,
  },
  addItem: {
    width: 79,
    top: 43,
    left: 15,
    position: "absolute",
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
    left: 134,
    width: 35,
    top: 10,
    position: "absolute",
  },
  addRate: {
    top: 43,
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
    top: 43,
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
  addAmount: {
    top: 43,
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
    width: 80,
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
    width: 180,
  },
  vectorIcon4: {
    height: "2.68%",
    width: "5.81%",
    top: "200.27%",
    right: "52.79%",
    bottom: "79.08%",
    left: "41.4%",
    position: "absolute",
  },
  text5: {
    left: 37,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    position: "absolute",
    top: -25,
  },
  total: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_sm,
    color: Color.textTxtPrimary,
    left: -8,
    top: -25,
  },
  rs3050: {
    left: 50,
    fontFamily: FontFamily.poppinsSemibold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    position: "absolute",
    top: -25,
  },
  group: {
    left: 300,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    textAlign: 'right',
    width: 132,
    height: 0,
    top: 680,
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
    alignContent: "center",
  },
  createInvoice3E: {
    top: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: Color.snow,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    alignContent: "center",
  },
  vectorContainer: {
    top: 700,
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
    left: -8,
    position: "absolute",
  },
});

export default CreateInvoice;