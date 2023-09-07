import React from 'react';
import { Image } from "expo-image";
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TextInput, Modal,Dimensions, FlatList, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import DueDateTimePicker from '@react-native-community/datetimepicker';
import ErrorPopup from "../components/ErrorPopup";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const rem = screenWidth / 16;

const CreateInvoiceForm = ({ onFormDataChange, APIData, save, recordId, setSave }) => {


  const [selectedCountry, setSelectedCountry] = useState('');
  const invoiceStatus = ['Paid', 'Due'];
  const [name, setName] = useState('');
  const [numberPlates, setNumberPlates] = useState([]);
  const [data, setData] = useState(transformedResponse);
  // console.warn(name);
  const [status, setStatus] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [search, setSearch] = useState('');
  const [localDate, setLocalDate] = useState();
  const [localDueDate, setLocalDueDate] = useState();
  const [regNumber, setregNumber] = useState('');
  // const [status,setStatus] = useState('');
  const searchRef = useRef();
  const transformedResponse = numberPlates.map(item => {
    const { registration_number } = item;
    return {
      name: registration_number,

    };
  });

  useEffect(() => {
    if (APIData) {
      console.log("API");
      console.log(APIData);


      console.log(APIData[0]);
      const data = APIData[0];
      setName(data.name);
      setregNumber(data.registrationNumber);
      let st = '';
      if (status) {
        st = 'Paid';
      } else {
        st = 'Due';
      }
      setStatus(st);

      // console.log(d);

      const date = formatDate(data.date);
      const DueDate = formatDate(data.invoiceDue);
      // console.log(date);
      // setDate(date);
      // setSelectedDueDate(data.invoiceDue);
      // setSelectedDate(date);
      setLocalDate(data.date);
      setLocalDueDate(data.invoiceDue);
      setAPDate(date);
      setAPDueDate(DueDate);

    }
    // // setData();
  }, [APIData]);


  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toDateString();
  };


  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDueDate, setSelectedDueDate] = useState(null);
  const [carNumberFocused, setCarNumberFocused] = useState(false);
  const [carNumber, setCarNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [Duedate, setDueDate] = useState();
  const [formHeight, setFormHeight] = useState(150);
  const [msg, setmsg] = useState('');
  const [clicked, setClicked] = useState(false);
  const [user, setUser] = useState('');
  const [msgg, setmsgg] = useState('');
  const [DueDateError, setDueDateError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [regNumberError, setregNumberError] = useState(false);
  const [DateError, setDataError] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [APDate, setAPDate] = useState(null);
  const [APDueDate, setAPDueDate] = useState(null);



  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };
  const handleDueDateChange = (event, Duedate) => {
    setShowDueDatePicker(false);
    if (Duedate) {
      setSelectedDueDate(Duedate, "Please Fill");

    }
  };
  const openDueDatePicker = () => {
    setShowDueDatePicker(true);
  };
  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  const handleInvoiceStatusSelect = (code) => {
    setStatus(code);
  };

  getCustomer = async (carNumber) => {

    let token = await AsyncStorage.getItem("accessToken");
    const accessToken = 'Bearer ' + token;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://192.168.100.71:8080/api/maintenance-record/get-customer/${carNumber}`,
      headers: {
        'Authorization': accessToken
      }
    };

    axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        const Name = `${response.data[0].firstName} ${response.data[0].lastName}`;
        // setUser(Name);
        setName(Name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setName('No Customer');

    getRegistrationNumber();
    getCustomer(regNumber);
  }, [regNumber], [recordId]);


  const getRegistrationNumber = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://192.168.100.71:8080/api/maintenance-record/${recordId}/registration-number`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        // console.log("regNumber");
        // console.log(JSON.stringify(response.data));
        setregNumber(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onSearch = search => {
    if (search != '') {
      let tempData = transformedResponse.filter(item => {
        return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(transformedResponse);
    }
  }
  const handleAddCustomer = () => {
    navigation.navigate('AddVehicle');
  };

  useEffect(() => {
    if (save) {
      setFormHeight(150);
      setDueDateError(false);
      setDataError(false);
      setNameError(false);
      setregNumberError(false);
      setStatusError(false);
      setmsg('');
      setmsgg('');



      if (!name) {
        setFormHeight(200);
        setNameError(true);
        setmsg('Select Registration Number');
      } else {
        if (!regNumber) {
          setFormHeight(200);
          setregNumberError(true);
          setNameError(true);
          setmsg('Please provide Registration Number');
        }
      }
      if (!regNumber) {
        setFormHeight(200);
        setregNumberError(true);
      }

      if (!selectedDate) {
        setFormHeight(200);
        setDataError(true);
        setmsgg('Provide Date');
      } else {
        if (!status) {
          setFormHeight(200);
          setDataError(true);
          setStatusError(true);
          setmsgg('Provide Status');
        }
      }
      if (!status) {
        setFormHeight(200);
        setStatusError(true);
      }

      if (!selectedDueDate) {
        setFormHeight(200);
        setDueDateError(true);
      }

      setSave(false);
    }
  }, [save]);



  useEffect(() => {

    let date;
    let Duedate;
    if (selectedDate) {
      date = selectedDate;
    }
    if (selectedDueDate) {
      Duedate = selectedDueDate;
    }
    if (APDate && APDueDate) {
      console.log("dates present");
      date = localDate;
      Duedate = localDueDate;
      date = localDate;
      Duedate = localDueDate;
    }

    if (typeof onFormDataChange === 'function') {
      onFormDataChange({ name, regNumber, date, Duedate, status });
    }
  }, [name, regNumber, date, Duedate, status, onFormDataChange]);

  return (
    <View style={{ flex: 1, marginTop: 0, height: formHeight, overflow: 'hidden' }}>


      {/* Name  */}
      <View style={styles.inLine}>
        <TextInput style={[
          nameError ? styles.loritaR : styles.lorita
          , styles.text5ClrName]} onChangeText={setName}
          editable={false}
        >
          {name}

        </TextInput>
        <Image
          style={styles.date2SvgrepoCom11}
          contentFit="cover"
          source={require("../assets/frame2.png")}
        />

        <Text style={[styles.regNumber,
        regNumberError ? styles.text5ClrR : styles.text5Clr
        ]}
          editable={false}
        >

          {regNumber}
        </Text>


        <Image
          style={styles.date2SvgrepoCom11R}
          contentFit="cover"
          source={require("../assets/licenseplatenumbersvgrepocom-12.png")}
        />
      </View>
      {nameError ? <Text style={styles.nameError}>{msg}</Text> : null}


      {/* date and status  */}
      <View style={styles.parent}>

        <TextInput
          style={[
            DateError ? styles.text1R : styles.text1
            , styles.text1Typo]}
          value={selectedDate ? selectedDate.toDateString() : APDate}
          placeholder="Select Creation date"
          editable={false}></TextInput>

        <Pressable
          onPress={openDatePicker}
        >
          <Image
            style={styles.date2SvgrepoCom11C}
            contentFit="cover"
            source={require("../assets/date2svgrepocom-1-11.png")}
          />
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TextInput style={[
          statusError ? styles.statusPaiddueR : styles.statusPaiddue
          , styles.text1Typo]}
          value={status}
          editable={false}
          placeholder="Status"
        />


        <Image
          style={styles.pick}
          contentFit="cover"
          source={require("../assets/vector-7.png")}
        />

        <View style={styles.picker}>
          <Picker
            selectedValue={invoiceStatus}
            onValueChange={(itemValue) => handleInvoiceStatusSelect(itemValue)}
          >
            <Picker.Item label="Select Invoice Status" value="" />
            {invoiceStatus.map((code) => (
              <Picker.Item key={code} label={code} value={code} />
            ))}
          </Picker>
        </View>


      </View>
      {DateError ? <Text style={styles.nameError}>{msgg}</Text> : null}


      <View style={styles.parentp}>


        <Pressable
         style={{
          flexDirection:'row',           
        }}
          onPress={openDueDatePicker}
        >
          <TextInput
            style={[
              DateError ? styles.text1R : styles.text1
              , styles.text1Typo]}
            value={selectedDueDate ? selectedDueDate.toDateString() : APDueDate}
            placeholder="Select Due date"
            editable={false}>
          </TextInput>
          <Image
            style={styles.date2SvgrepoCom11C}
            contentFit="cover"
            source={require("../assets/date2svgrepocom-1-11.png")}
          />
        </Pressable>
        {showDueDatePicker && (
          <DueDateTimePicker
            value={selectedDueDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDueDateChange}
          />
        )}


        {/* <Pressable
          style={{
            flexDirection:'row',           
          }}
          onPress={openDueDatePicker}
        > 
        <TextInput
          style={[
            DateError ? styles.text1R : styles.text1
            , styles.text1Typo]}
          value={selectedDueDate ? selectedDueDate.toDateString() : APDueDate}
          placeholder="Select Due date"
          editable={false}></TextInput>
          <Image
            style={styles.date2SvgrepoCom11C}
            contentFit="cover"
            source={require("../assets/date2svgrepocom-1-11.png")}
          />
        </Pressable>
        {showDueDatePicker && (
          <DueDateTimePicker
            value={selectedDueDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDueDateChange}
          />
        )} */}
      </View>
      {DueDateError ? <Text style={styles.nameError}>Provide Due Date for Invoice</Text> : null}

    </View>
  );
};

const styles = StyleSheet.create({

  invoiceStatusPicker: {
    top: 232
  },
  // container:{
  //  // marginLeft:0,
  // },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  picker: {
    left: 385,
    height: 15,
    width: 15,
    top: 5,
    position: "absolute",
    overflow: "hidden",
  },

  createChildLayout3: {
    height: 126,
    top: 501,
    width: 186,
  },

  ss: {
    top: 176,
    left: 215,
  },
  inLine: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  pick: {
    left: 385,
    height: 15,
    width: 15,
    top: 5,
    position: "absolute",
    overflow: "hidden",
  },
  parent: {
    flexDirection: 'row',
    marginTop: 10,
  },
  parentp: {
    flexDirection: 'row',
    marginTop: 18,
    justifyContent: 'space-between',
    width:screenWidth*.9,
  },

  text5Clr: {
    borderBottomWidth: 2,
    width: "120%",
    borderBottomColor: '#ccc',
    paddingHorizontal: 10,
  },
  text5ClrR: {
    borderBottomWidth: 2,
    width: "120%",
    borderBottomColor: 'red',
    paddingHorizontal: 10,
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
    width: 174,
    position: "absolute",
  },
  text5ClrName: {
    top: 0,
    position: 'relative',
    color: Color.dimgray_100,
    textAlign: "left",
    left: 30,
  },
  text1Typo: {
    top: 0,
    color: Color.dimgray_100,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    textAlign: "left",
    position: "relative",
    width: 150,
    // left:-15,
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
  nameError: {
    marginLeft: 30,
    color: 'red',

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
  pickerr: {
    top: 0,
    left: 80,
    width: 50,
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
    top: 0,
    marginTop: 0,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.dimgray_100,
    fontSize: FontSize.size_base,
    left: 35,
    position: "relative",
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
    left: 28,
    width: "40%",
    borderBottomWidth: 2, // Set the width of the underline
    borderBottomColor: '#ccc', // Set the color of the underline
    paddingHorizontal: 10,
  },
  text1R: {
    left: 28,
    width: "40%",
    borderBottomWidth: 2, // Set the width of the underline
    borderBottomColor: 'red', // Set the color of the underline
    paddingHorizontal: 10,
  },
  invoiceStatusPicker: {
    top: 232
  },
  groupInner: {
    left: 8,
    top: 34,
    width: 174,
  },
  lineView: {
    left: 205,
    width: 174,
    top: 34,
  },
  statusPaiddue: {
    marginLeft: 50,
    width: "38%",
    borderBottomWidth: 2, // Set the width of the underline
    borderBottomColor: '#ccc', // Set the color of the underline
    paddingHorizontal: 10,
  },
  statusPaiddueR: {
    marginLeft: 50,
    width: "38%",
    borderBottomWidth: 2, // Set the width of the underline
    borderBottomColor: 'red', // Set the color of the underline
    paddingHorizontal: 10,
  },
  date2SvgrepoCom11: {
    left: 18,
    height: 25,
    width: 25,
    top: 0,
    position: "relative",
    overflow: "hidden",
  },
  date2SvgrepoCom11C: {
    left: 30,
    height: 25,
    width: 25,
    top: 0,
    position: "relative",
    overflow: "hidden",
  },
  date2SvgrepoCom11R: {
    // left: 50,
    height: 25,
    width: 25,
    top: 0,
    left: 380,
    position: "absolute",
    overflow: "hidden",
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
    left: 26,
  },
  lorita: {
    fontFamily: FontFamily.poppinsRegular,
    color: Color.dimgray_100,
    fontSize: FontSize.size_base,
    borderBottomWidth: 2,
    width: "39%",
    borderBottomColor: '#ccc',
    paddingHorizontal: 10,
  },
  loritaR: {
    fontFamily: FontFamily.poppinsRegular,
    color: Color.dimgray_100,
    fontSize: FontSize.size_base,
    borderBottomWidth: 2,
    width: "39%",
    borderBottomColor: "red",
    paddingHorizontal: 10,
  },
  loritaWrapper: {
    position: 'relative',
    //flexDirection: "row",
  },
  frameView: {
    top: 171,
    left: 20,

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
    left: 279,
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
export default CreateInvoiceForm;