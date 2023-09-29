import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { Image } from "expo-image";
import { useIsFocused } from '@react-navigation/native';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Dimensions,
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import Config from "../screens/Config";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const rem = screenWidth / 16;

const RecordList = ({
  dsearch,
  searchType,
  searchOrder,
  fromPreviousScreen,
  create,
  setCreate,
}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [InvoiceScreen, setInvoiceScreen] = useState(false);
  const [CreateInvoice, setCreateInvoice] = useState(false);
  const [currentPressedIndex, setCurrentPressedIndex] = useState(-1);
  const [InvoiceIndex, setInvoiceIndex] = useState("");
  const [InvoiceRecord, setInvoiceRecord] = useState("");

  // const displayedRecords = search ? data : records;

  const handlePress = (index, recordId) => {
    if (InvoiceScreen) {
      setCurrentPressedIndex(index);
      setInvoiceIndex(index);
      setInvoiceRecord(recordId);
    } else {
      setCurrentPressedIndex(index);
      navigation.navigate("MaintenanceDetailView", { recordId: recordId });
    }
  };

  getData = async () => {
    const Business_id = await AsyncStorage.getItem("Business_id");

    let token = await AsyncStorage.getItem("accessToken");
    const accessToken = "Bearer " + token;
    // 192.168.100.71

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${Config.apiServerUrl}/api/maintenance-record/get-all-records/${Business_id}`,
      headers: {
        Authorization: accessToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setRecords(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };



  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  useEffect(() => {
    setInvoiceScreen(false);
    setCreateInvoice(false);
    if (fromPreviousScreen) {
      setInvoiceScreen(true);
    }
    if (create) {
      setCreate(false);
      if (InvoiceRecord) {
        navigation.navigate("CreateInvoice", { InvoiceRecord: InvoiceRecord });
      }
      // setCreateInvoice(true);
    }
  }, [create]);

  const displayedRecords = useMemo(() => {
    let filteredVehicles;

    if (search) {
      filteredVehicles = data;
    } else {
      filteredVehicles = records;
    }
    const sortedVehicles = filteredVehicles.slice().sort((a, b) => {
      const dateA = new Date(a.maintanenceDateTime);
      const dateB = new Date(b.maintanenceDateTime);

      if (searchOrder === "ascending") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return sortedVehicles;
  }, [search, data, records, searchType, searchOrder]);

  useEffect(() => {
    setSearch(dsearch);

    const formattedQuery = dsearch.toUpperCase().trim();
    const maintained = records.filter((record) => {
      const nameMatches =
        record.name && record.name.toUpperCase().includes(formattedQuery);
      const drivenMatches = record.kilometerDriven
        .toString()
        .includes(formattedQuery);
      const ownerMatches =
        record.vehicleOwner &&
        record.vehicleOwner.toUpperCase().includes(formattedQuery);
      const numberMatches = record.registrationNumber
        .toUpperCase()
        .includes(formattedQuery);
      const serviceMatches =
        record.service && record.service.toUpperCase().includes(formattedQuery);
      const parentCompanyMatches =
        record.parentCompany &&
        record.parentCompany.toUpperCase().includes(formattedQuery);

      const dateMatches = (query) => {
        const formattedDate = query.split("/").reverse().join("-"); // Convert to 'YYYY-MM-DD' format
        const maintanenceDate = record.maintanenceDateTime.split("T")[0];
        return maintanenceDate.includes(formattedDate);
      };

      return (
        nameMatches ||
        parentCompanyMatches ||
        drivenMatches ||
        serviceMatches ||
        numberMatches ||
        ownerMatches ||
        dateMatches(formattedQuery)
      );
    });

    setData(maintained);
  }, [dsearch, searchType, searchOrder]);

  const formatDateTime = (isoDateTime) => {
    const date = new Date(isoDateTime);
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${month}/${day}/${year}`;
  };
  return (
    <ScrollView style={styles.wrap}>
      {displayedRecords.map((record, index) => {
        return (
          <View
            key={index}
            style={[
              currentPressedIndex === index
                ? styles.groupParentLayoutW
                : styles.groupParentLayout,
            ]}
          >
            <View>
              <Pressable
                onPress={() => handlePress(index, record.id)}
              >
                <View style={styles.textWrap}>
                  <View style={styles.rowWrap}>
                    <Icon
                      name="wrench"
                      size={0.5 * rem}
                      color={currentPressedIndex === index ? "white" : "black"}
                    />
                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.maintainedOnW
                          : styles.maintainedOn,
                        styles.davidTypo,
                      ]}
                    >
                      Service
                    </Text>
                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.carWashW
                          : styles.carWash,
                      ]}
                    >
                      {record.service}
                    </Text>
                    <View style={{ flex: 1 }}></View>
                    <Text
                      style={[
                        styles.dated,
                        currentPressedIndex === index
                          ? styles.text2TypoW
                          : styles.text2Typo,
                      ]}
                    >
                      {formatDateTime(record.maintanenceDateTime)}
                    </Text>
                  </View>
                  <View style={styles.rowWrap}>
                    <Icon
                      name="car"
                      size={0.5 * rem}
                      color={currentPressedIndex === index ? "white" : "black"}
                    />

                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.maintainedOnW
                          : styles.maintainedOn,
                      ]}
                    >
                      Reg. Number
                    </Text>
                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.carWashW
                          : styles.carWash,
                      ]}
                    >
                      {record.registrationNumber}
                    </Text>
                  </View>
                  <View style={styles.rowWrap}>
                    <Icon
                      name="user"
                      size={0.6 * rem}
                      marginLeft={0.1 * rem}
                      color={currentPressedIndex === index ? "white" : "black"}
                    />

                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.maintainedOnW
                          : styles.maintainedOn,
                      ]}
                    >
                      Maintained By
                    </Text>
                    <Text
                      style={[
                        styles.stJanuary2023,
                        currentPressedIndex === index
                          ? styles.text2TypoW
                          : styles.text2Typo,
                      ]}
                    >
                      {record.name}
                    </Text>
                  </View>
                  <View style={styles.rowWrap}>
                    <Icon
                      name="tachometer"
                      size={0.6 * rem}
                      color={currentPressedIndex === index ? "white" : "black"}
                    />
                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.maintainedOnW
                          : styles.maintainedOn,
                      ]}
                    >
                      Mileage
                    </Text>
                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.text2W
                          : styles.text2,
                        styles.textPosition,
                      ]}
                    >
                      {record.kilometerDriven}
                    </Text>
                  </View>
                  <View style={styles.rowWrap}>
                    <Icon
                      name="user"
                      size={0.62 * rem}
                      marginLeft={0.15 * rem}
                      color={currentPressedIndex === index ? "white" : "black"}
                    />

                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.maintainedOnW
                          : styles.maintainedOn,
                      ]}
                    >
                      Vehicle Owner
                    </Text>
                    <Text
                      style={[
                        currentPressedIndex === index
                          ? styles.carWashW
                          : styles.carWash,
                      ]}
                    >
                      {record.vehicleOwner}
                    </Text>
                  </View>
                  {record.parentCompany && (
                    <View style={styles.rowWrap}>
                      <Icon
                        name="building"
                        size={0.5 * rem}
                        marginLeft={0.2 * rem}
                        color={
                          currentPressedIndex === index ? "white" : "black"
                        }
                      />
                      <Text
                        style={[
                          currentPressedIndex === index
                            ? styles.maintainedOnW
                            : styles.maintainedOn,
                        ]}
                      >
                        Parent Company
                      </Text>
                      <Text
                        style={[
                          currentPressedIndex === index
                            ? styles.carWashW
                            : styles.carWash,
                        ]}
                      >
                        {record.parentCompany}
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  groupParentLayout: {
    backgroundColor: Color.steelblue_300,
    padding: 0.5 * rem,
    marginVertical: 0.2 * rem,
    alignSelf: "center",
    width: screenWidth * 0.9, 
    borderRadius: 8,
  },
  groupParentLayoutW: {
    backgroundColor: Color.darkslateblue,
    padding: 0.5 * rem,
    marginVertical: 0.2 * rem,
    alignSelf: "center",
    width: screenWidth * 0.9, // Set a maximum width (adjust as needed)
    borderRadius: 8,

  },
  textWrap: {
    fontSize: FontSize.size_smi,
  },
  rowWrap: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 0.02 * rem,
  },
  serviceWrapper: {
    top: 84,
  },
  wrap: {
    width: screenWidth,
    height: screenWidth * 1.30,
    
  },
  dated: {
    // marginLeft: 4.4 * rem,
  },
  rightwrap: {
    flexDirection: "row",
    marginLeft: 1.2 * rem,
  },
  text2Typo: {
    color: Color.gray_300,
    fontSize: 0.5 * rem,

    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  frameParent: {
    top: 15,
    width: 209,
    left: 43,
  },

  text2TypoW: {
    color: Color.white,
    fontSize: 0.5 * rem,

    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
  },
  mileageWrapper: {
    top: 56,
  },
  frameParentLayout: {
    height: 104,
    position: "absolute",
  },
  maintainedOnParent: {
    left: 0,
    top: 0,
  },
  wrapperPosition: {
    left: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },

  maintainedByParent: {
    top: 28,
    left: 0,
  },

  surfaceParentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  maintainedOn: {
    color: Color.dimgray_200,
    fontFamily: FontFamily.poppinsRegular,
    marginLeft: 0.45 * rem,
  },

  maintainedOnW: {
    color: Color.white,
    fontFamily: FontFamily.poppinsRegular,
    marginLeft: 0.45 * rem,
  },
  davidTypo: {},
  groupIcon: {
    height: 0.9 * rem,
    width: 0.65 * rem,
  },

  vehicleServicesSvgrepoCom1Icon: {
    top: 97,
    left: 15,
  },
  vehicleIconLayout: {
    width: 20,
    height: 20,
    position: "absolute",
    overflow: "hidden",
  },
  stJanuary2023: {
    marginLeft: 0.3 * rem,
  },
  carWashW: {
    color: Color.white,
    fontSize: FontSize.size_smi,
    textAlign: "right",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
    marginLeft: 0.4 * rem,
  },
  carWash: {
    color: Color.gray_300,
    fontSize: FontSize.size_smi,
    textAlign: "right",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
    marginLeft: 0.4 * rem,
  },
  text2W: {
    color: Color.white,
    fontSize: 0.5 * rem,
    textAlign: "left",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
    marginLeft: 0.2 * rem,
  },
  carPosition: {
    left: 100,
    top: 98,
    position: "absolute",
  },

  text2: {
    color: Color.gray_300,
    fontSize: 0.5 * rem,
    textAlign: "left",
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
    marginLeft: 0.2 * rem,
  },
  rectangleIcon: {
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
  },
});

export default RecordList;
