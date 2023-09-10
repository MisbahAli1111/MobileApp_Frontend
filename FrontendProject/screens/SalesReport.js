import * as React from "react";
import { useState,useEffect } from "react";
import { Image } from "expo-image";
import { Picker } from "@react-native-picker/picker";
import {
  TouchableOpacity,
  Modal,
  Dimensions,
  Pressable,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
const windowWidth = Dimensions.get("window");
import DateTimePicker from "@react-native-community/datetimepicker";
import Date2TimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { printToFileAsync } from "expo-print";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

const SalesReport = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [DateError, setDataError] = useState(false);
  const [Date2Error, setData2Error] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDate2Picker, setShowDate2Picker] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const [Error, setError] = useState("");
  const [businessProfile,setBusinessProfile] = useState("");
  const [baseUrl, setBaseUrl] = useState("http://192.168.0.236:8080");
  const [baseUrlM, setBaseUrlM] = useState("http://192.168.100.71:8080");

  const getProfileImage = async () => {
    try {
      const accessTokens = await AsyncStorage.getItem("accessToken");
      const token = "Bearer " + accessTokens;
      const Business_id = await AsyncStorage.getItem("Business_id");

      if (Business_id) {
        console.log("userID found");

        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `http://192.168.0.236:8080/api/business/${Business_id}/profile-image`,
          headers: {
            Authorization: token,
          },
        };

        const response = await axios.request(config);

        if (response.status === 200) {
          const responseData = response.data;
          console.log("Data Image:", response.data);
          setBusinessProfile(baseUrl + responseData.url);
        } else {
          console.log("Error: " + response.statusText);
        }
      }
    } catch (error) {
      console.log("Error fetching profile image:", error);
    }
  };

  useEffect(() => {
    getProfileImage();
  }, []);

  function generatehtml(
    data,
    total,
    currency,
    formatedDate,
    dateFrom,
    dateTo,
    businessName
  ) {
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
          <span class="header-left">Date: ${formatedDate}</span>
          <span class="header-middle"><img src="${businessProfile}" alt="Logo"></span>
          <span class="header-right">Sales Report</span>
        </p>
        <p><br></p>
        <div class="details">
          <div>
            <p>Date From : ${dateFrom}</p>
            <p>Date To : ${dateTo}</p>
            <p>Business Name: ${businessName}</p>
            </div>
        </div>
        <table class="items-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Generated For</th>
              <th>Type</th>
              <th>Reg. np</th>
              <th>Currency</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${data}
          </tbody>
        </table>
        <div class="total">
        <p>Total: ${total}</p>
      </div>
      </div>
    </body>
    </html>`;
    return html;
  }

  const generatePDF = async (
    data,
    total,
    currency,
    formatedDate,
    dateFrom,
    dateTo,
    businessName
  ) => {
    let html = generatehtml(
      data,
      total,
      currency,
      formatedDate,
      dateFrom,
      dateTo,
      businessName
    );

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
        console.log("PDF downloaded successfully:", downloadObject.uri);
        // You can also share the downloaded PDF if needed
        // await Sharing.shareAsync(downloadObject.uri);
      } else {
        console.error("Error downloading the PDF.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const openDate2Picker = () => {
    setShowDate2Picker(true);
  };

  const handleDateChange = (event, Duedate) => {
    setShowDatePicker(false);
    if (Duedate) {
      setSelectedDate(Duedate, "Please Fill");
    }
  };

  const handleDate2Change = (event, Duedate2) => {
    setShowDate2Picker(false);
    if (Duedate2) {
      setSelectedDate2(Duedate2, "Please Fill");
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  handleDate = async () => {
    setError("");
    let hasErrors = false;
    setDataError(false);
    setData2Error(false);

    if (!selectedDate) {
      setDataError(true);
      hasErrors = true;
    }
    if (!selectedDate2) {
      setData2Error(true);
      hasErrors = true;
    }
    if (!hasErrors) {
      const date = new Date(selectedDate).toLocaleDateString();
      const date2 = new Date(selectedDate2).toLocaleDateString();
      const Business_id = await AsyncStorage.getItem("Business_id");
      const token = await AsyncStorage.getItem("accessToken");
      const accessToken = "Bearer " + token;

      // let data = JSON.stringify({
      //   "date": "2023-08-31T00:00",
      //   "invoiceDue": "2023-09-06T00:00"
      // });

      let data = JSON.stringify({
        date: selectedDate,
        invoiceDue: selectedDate2,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `http://192.168.0.236:8080/api/invoice/get-invoice-salesReport/${Business_id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          const data = response.data
            .map(
              (item) => `
          <tr>
            <td>${item.id}</td>
            <td>${item.parentCompany || item.name}</td>
            <td>${item.vehicleType}</td>
            <td>${item.registrationNumber}</td>
            <td>${item.currency}</td>
            <td>${item.total}</td>
          </tr>
        `
            )
            .join("");

          const total = response.data.reduce(
            (accumulator, item) => accumulator + item.total,
            0
          );
          const currentDate = new Date();
          const formatedDate = formatDate(currentDate);
          const dateFrom = formatDate(selectedDate);
          const currency = response.data[0].currency;
          const dateTo = formatDate(selectedDate2);
          const businessName = response.data[0].businessName;
          generatePDF(
            data,
            total,
            currency,
            formatedDate,
            dateFrom,
            dateTo,
            businessName
          );
        })
        .catch((error) => {
          console.log(error);
          setError("No invoices were found within the specified date range.");
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select range of dates for Sales Report</Text>
      <View style={styles.Formcontainer}>
        <View
          style={{
            marginTop: 18,
            alignItems: "center",
            justifyContent: "center",
            width: widthPercentageToDP("90%"),
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
            }}
            onPress={openDatePicker}
          >
            <TextInput
              style={[
                DateError ? styles.text1R : styles.text1,
                styles.text1Typo,
              ]}
              value={selectedDate ? selectedDate.toDateString() : ""}
              placeholder="Select from date"
              editable={false}
            ></TextInput>
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
          {DateError ? (
            <Text style={styles.nameError}>Please provide Date</Text>
          ) : null}

          <Pressable
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
            onPress={openDate2Picker}
          >
            <TextInput
              style={[
                DateError ? styles.text1R : styles.text1,
                styles.text1Typo,
              ]}
              value={selectedDate2 ? selectedDate2.toDateString() : ""}
              placeholder="Select to date"
              editable={false}
            ></TextInput>
            <Image
              style={styles.date2SvgrepoCom11C}
              contentFit="cover"
              source={require("../assets/date2svgrepocom-1-11.png")}
            />
          </Pressable>
          {showDate2Picker && (
            <Date2TimePicker
              value={selectedDate2 || new Date()}
              mode="date"
              display="default"
              onChange={handleDate2Change}
            />
          )}
        </View>
        {Date2Error ? (
          <Text style={styles.nameError}>Please provide Date</Text>
        ) : null}

        <View
          style={{
            marginTop: 28,
            alignItems: "center",
            justifyContent: "center",
            width: widthPercentageToDP("90%"),
          }}
        >
          <Text>{Error}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleDate} style={styles.button}>
            <Image
              style={styles.buttonImage}
              source={require("../assets/rectangle-73.png")}
            />
            <Text style={styles.buttonText}>Generate PDF</Text>
          </TouchableOpacity>
        </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#dcebf5",
  },
  Formcontainer: {
    // backgroundColor:'red',
    alignItems: "center",
    // justifyContent: 'center',
    marginTop: heightPercentageToDP("1%"),
  },
  buttonContainer: {
    marginTop: heightPercentageToDP("65%"),
    alignItems: "center",
    position: "absolute",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(3, 29, 68, 1)",
    borderRadius: 10,
    width: "100%",
    height: heightPercentageToDP("6%"),
    paddingHorizontal: widthPercentageToDP("40%"),
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    position: "absolute", // Added position absolute
    textAlign: "center",
  },
  text1R: {
    borderBottomWidth: 2, // Set the width of the underline
    borderBottomColor: "red", // Set the color of the underline
    // paddingHorizontal: 10,
  },
  nameError: {
    color: "red",
    marginTop: heightPercentageToDP("1%"),
  },
  heading: {
    marginTop: heightPercentageToDP("15%"),
    marginLeft: widthPercentageToDP("5%"),
    fontSize: 18,
    fontWeight: "bold",
  },

  date2SvgrepoCom11C: {
    left: -10,
    height: 25,
    width: 25,
    top: 0,
    position: "relative",
    overflow: "hidden",
  },
  text1Typo: {
    top: 0,
    color: Color.dimgray_100,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    position: "relative",
    width: widthPercentageToDP("80%"),
  },
  text1: {
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
  },
});

export default SalesReport;
