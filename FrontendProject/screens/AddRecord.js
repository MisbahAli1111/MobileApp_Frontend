import { React } from "react";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import {
  ImageBackground,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useState, useEffect, useRef } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import ImagePickerCamera from "../components/ImagePickerCamera";
import ImagePickerGallery from "../components/ImagePickerGallery";
import Footer from "../components/Footer";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Video } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Config from "./Config";
import SaveButton from "../components/SaveButton";

const AddRecord = () => {
  const navigation = useNavigation();

  const [Msg, setMsg] = useState("");
  const [userId, setUserId] = useState("");
  const [NumberError, setNumberError] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [driven, setDriven] = useState("");
  const [user, setUser] = useState("");
  const [service, setService] = useState("");
  const [type, setType] = useState("");
  const [details, setDetails] = useState(false);
  const [NameError, setNameError] = useState(false);
  const [DateError, setDateError] = useState(false);
  const [TimeError, setTimeError] = useState(false);
  const [drivenError, setDrivenError] = useState(false);
  const [DetailError, setDetailError] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [serviceDue, setServiceDue] = useState("");
  const [isImageModalVisible, setImageModalVisible] = useState("false");
  const [isFullImageModalVisible, setFullImageModalVisible] = useState(false);
  const services = [
    "Oil Change",
    "Car Wash",
    "Car Maintenance",
    "Servicing",
    "Alignment",
  ];
  const [selectedImage, setSelectedImage] = useState([]);
  const [isVideo, setIsVideo] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const [activeSlide, setActiveSlide] = useState(0);
  const [OwnerName, setOwnerName] = useState("");
  const [numberPlates, setNumberPlates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [originalUri, setOriginalUri] = useState("");
  const [status, setStatus] = useState({});
  const video = useRef(null);
  const [error, setError] = useState("Enter this field");
  const [RegMsg, setRegMsg] = useState("");
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(transformedResponse);
  const [selectedCountry, setSelectedCountry] = useState("");
  const searchRef = useRef();
  const [profileImageLink, setProfileImageLink] = useState("");

  const renderCarouselItem = ({ item, index }) => {
    const fileExtension = item.uri.split(".").pop().toLowerCase();

    return (
      <View key={index} style={styles.carouselItem}>
        <View style={styles.mediaContainer}>
          {fileExtension === "jpeg" ? (
            <TouchableOpacity onPress={() => handleShowImage(item.uri)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.uri }} style={styles.fullVideo} />
              </View>
            </TouchableOpacity>
          ) : fileExtension === "mp4" ? (
            <TouchableOpacity onPress={() => handleShowImage(item.uri)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.uri }} style={styles.fullVideo} />
              </View>

              <View style={styles.playIconContainer}>
                <AntDesign name="playcircleo" size={wp("10%")} color="white" />
              </View>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => handleImageDelete(index)}
            style={styles.closeButtonDelete}
          >
            <Icon name="trash" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleImageDelete = (index) => {
    const newSelectedImage = [...selectedImage];
    newSelectedImage.splice(index, 1);
    setSelectedImage(newSelectedImage);
  };

  const getCustomerImage = async (userId) => {
    try {
      const accessTokens = await AsyncStorage.getItem("accessToken");
      const token = "Bearer " + accessTokens;

      if (userId) {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${Config.apiServerUrl}/api/users/${userId}/profile-image`,
          headers: {
            Authorization: token,
          },
        };

        const response = await axios.request(config);

        if (response.status === 200) {
          const responseData = response.data;
          console.log(responseData);
          if (responseData.url !== null) {
            setProfileImageLink(`${Config.baseUrl1}` + responseData.url);
            console.log(profileImageLink);
          }
        } else {
          console.log("Error: " + response.statusText);
        }
      }
    } catch (error) {
      console.log("Error fetching profile image:", error);
    }
  };

  const clearErrors = () => {
    setNameError("");
    setDateError("");
    setTimeError("");
    setDrivenError("");
    setDetailError("");
    setServiceError("");
    setNumberError("");
    // setCompanyNameError("");
    // setCusomterTypeError("");
    // setKmError("");
    // setYearError("");
    // setvehicleColorError("");
    // const [NameError, setNameError] = useState(false);
    // const [DateError, setDateError] = useState(false);
    // const [TimeError, setTimeError] = useState(false);
    // const [drivenError, setDrivenError] = useState(false);
    // const [DetailError, setDetailError] = useState("");
    // const [serviceError, setServiceError] = useState("");
  };

  const handleImageUpload = () => {
    setImageModalVisible(true);
  };

  const handleShowImage = (uri) => {
    if (uri) {
      setProfileImage(uri);
      console.log(uri);
      if (uri.endsWith(".mp4")) {
        setIsVideo(true);
      } else {
        setIsVideo(false);
      }
      setFullImageModalVisible(true);
    }
  };

  const handleImageFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true, // Enable multiple image selection
    });

    if (!result.canceled && result.assets.length > 0) {
      // Iterate through selected assets and add each to the selectedImage array
      result.assets.forEach((asset) => {
        setSelectedImage([...selectedImage, { uri: asset.uri, type: "image" }]);
      });
    }

    setImageModalVisible(false);
  };

  const handleImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true, // Enable multiple image selection
    });

    if (!result.canceled && result.assets.length > 0) {
      // Iterate through selected assets and add each to the selectedImage array
      result.assets.forEach((asset) => {
        setSelectedImage([...selectedImage, { uri: asset.uri, type: "image" }]);
      });
    }

    setImageModalVisible(false);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };

  const openTimePicker = () => {
    setShowTimePicker(true);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCodeSelect = (code) => {
    setSelectedCode(code);
    setShowDropdown(false);
  };

  const handleAddCustomer = () => {
    navigation.navigate("AddVehicle");
  };

  const calculateServiceDue = (type, service) => {
    const serviceTypeMap = {
      Car: {
        "Oil Change": {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 3000,
        },
        "Car Wash": {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 1000,
        },
        "Car Maintenance": {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 15000,
        },
        Alignment: {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 2000,
        },
        Servicing: {
          kilometersDrivenPerDay: 50,
          totalKilometersBetweenServices: 2500,
        },
      },
      Auto: {
        "Oil Change": {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 3000,
        },
        "Car Wash": {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 1000,
        },
        "Car Maintenance": {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 1350,
        },
        Alignment: {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 1800,
        },
        Servicing: {
          kilometersDrivenPerDay: 45,
          totalKilometersBetweenServices: 2250,
        },
      },
      Bike: {
        "Oil Change": {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1000,
        },
        "Car Wash": {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 600,
        },
        "Car Maintenance": {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 900,
        },
        Alignment: {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1200,
        },
        Servicing: {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1500,
        },
      },
      Truck: {
        "Oil Change": {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 10000,
        },
        "Car Wash": {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 2000,
        },
        "Car Maintenance": {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 3000,
        },
        Alignment: {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 4000,
        },
        Servicing: {
          kilometersDrivenPerDay: 100,
          totalKilometersBetweenServices: 5000,
        },
      },
      Other: {
        "Oil Change": {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1000,
        },
        "Car Wash": {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1000,
        },
        "Car Maintenance": {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 2000,
        },
        Alignment: {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1200,
        },
        Servicing: {
          kilometersDrivenPerDay: 30,
          totalKilometersBetweenServices: 1500,
        },
      },
    };

    if (serviceTypeMap[type] && serviceTypeMap[type][service]) {
      const { kilometersDrivenPerDay, totalKilometersBetweenServices } =
        serviceTypeMap[type][service];
      const daysUntilNextService =
        totalKilometersBetweenServices / kilometersDrivenPerDay;
      return addDays(selectedDate, Math.floor(daysUntilNextService));
    }

    return addDays(selectedDate, 30);
  };

  // Function to add days to a date
  const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setServiceDue(newDate.toISOString());
  };

  const getType = async (carNumber) => {
    let token = await AsyncStorage.getItem("accessToken");
    const accessToken = "Bearer " + token;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${Config.apiServerUrl}/api/maintenance-record/${carNumber}/type`,
      headers: {
        Authorization: accessToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setType(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRegistrationNumber = async () => {
    let token = await AsyncStorage.getItem("accessToken");
    const accessToken = "Bearer " + token;
    const Business_id = await AsyncStorage.getItem("Business_id");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${Config.apiServerUrl}/api/maintenance-record/get-registration-number/${Business_id}`,
      headers: {
        Authorization: accessToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        JSON.stringify(response.data);
        setNumberPlates(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getCustomer = async (carNumber) => {
    let token = await AsyncStorage.getItem("accessToken");
    const accessToken = "Bearer " + token;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${Config.apiServerUrl}/api/maintenance-record/get-customer/${carNumber}`,
      headers: {
        Authorization: accessToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        const Name = `${response.data[0].firstName} ${response.data[0].lastName}`;
        setUser(Name);
        setUserId(response.data[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setUser("No Customer Found");
    getCustomer(carNumber);
    getRegistrationNumber();
    if (carNumber) {
      getType(carNumber);
    }
    if (userId) {
      getCustomerImage(userId);
    }
    if (type && selectedCode) {
      calculateServiceDue(type, selectedCode);
    }
  }, [carNumber, selectedCode]);

  const transformedResponse = numberPlates.map((item) => {
    const { registration_number } = item;
    return {
      name: registration_number,
    };
  });

  const onSearch = (search) => {
    if (search != "") {
      let tempData = transformedResponse.filter((item) => {
        return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(transformedResponse);
    }
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  const uploadImage = async (recordId) => {
    try {
      if (selectedImage) {
        let token = await AsyncStorage.getItem("accessToken");
        const accessToken = "Bearer " + token;
        const formData = new FormData();

        selectedImage.forEach((entry, index) => {
          const fileUri = entry.uri;
          const fileType = fileUri.endsWith(".mp4")
            ? "video/mp4"
            : "image/jpeg";

          formData.append("files", {
            uri: fileUri,
            name:
              new Date().getTime() +
              (fileType === "video/mp4" ? ".mp4" : ".jpeg"),
            type: fileType,
          });
        });

        const response = await axios.post(
          `${Config.apiServerUrl}/api/file/upload/vehicle/${recordId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: accessToken,
            },
          }
        );

        // Handle the response from the server if needed
        console.log("Upload success:", response.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleSave = async () => {
    let hasErrors = false; // Initialize the flag
    setNumberError(false);
    if (!carNumber) {
      setNumberError(true);
      setRegMsg("Please provide Vehicle Registration Number");
      hasErrors = true;
    } else {
      setNumberError(false);
    }

    if (!selectedDate) {
      setDateError(true);
      hasErrors = true;
    } else {
      setTimeError(false);
      setDateError(false); // Clear any previous date errors
    }
    if (!selectedTime) {
      setDateError(true);

      hasErrors = true;
    } else {
      setDateError(false);
    }

    if (user === "No Customer Found") {
      setNameError(true);
      hasErrors = true;
    } else {
      setNameError(false);
    }

    if (!driven) {
      setDrivenError(true);
      hasErrors = true;
    } else {
      setDrivenError(false);
    }

    if (!service) {
      setServiceError(true);
      hasErrors = true;
    } else {
      setServiceError(false);
    }

    if (!details) {
      setDetailError(true);
      hasErrors = true;
    } else {
      setDetailError(false);
    }

    setTimeout(() => {
      clearErrors();
    }, 10000);

    if (!hasErrors) {
      try {
        const dateTime = `${selectedDate.toISOString().split("T")[0]}T${
          selectedTime.toISOString().split("T")[1]
        }`;
        const Business_id = await AsyncStorage.getItem("Business_id");

        const token = await AsyncStorage.getItem("accessToken");
        const accessToken = "Bearer " + token;
        // const axios = require('axios');
        const data = {
          kilometerDriven: driven,
          service: selectedCode,
          maintanenceDetail: details,
          registrationNumber: carNumber,
          maintanenceDateTime: selectedDate,
          serviceDue: serviceDue,
        };

        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${Config.apiServerUrl}/api/maintenance-record/add-record/${Business_id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          data: data,
        };

        const response = await axios.request(config);
        if (response.data.status == "EXPECTATION_FAILED") {
          setRegMsg(JSON.stringify(response.data.message));
          setNumberError(true);
        } else {
          if (response.data.status === "OK") {
            const createdUserId = response.data.data;
            setUserId(createdUserId);

            if (createdUserId) {
              uploadImage(createdUserId);
            }
            navigation.navigate("MaintenanceRecord");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ImageBackground
      source={require("../assets/light-texture2234-1.png")}
      style={styles.addRecord}
    >
      <View style={styles.breadcrumbContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.breadcrumbImage}
            contentFit="cover"
            source={require("../assets/homemuted.png")}
          />
        </TouchableOpacity>
        <Text style={styles.breadcrumbSeparator}> / </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Vehicles")}>
          <Text style={styles.breadcrumbText}>Records</Text>
        </TouchableOpacity>
        <Text style={styles.breadcrumbSeparator}> / </Text>
        <Text style={styles.breadcrumbText}>Add Maintenance Record</Text>
      </View>

      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={{ paddingBottom: hp("20%") }}
      >
        <View style={styles.formContainer}>
          {/* Row 1 */}
          <View style={styles.inputContainer}>
            <View style={styles.singleTextInputContainer1}>
              <View style={styles.inputWithIcon1}>
                <TouchableOpacity onPress={handleClick}>
                  <Text style={styles.customerText}>
                    {selectedCountry == ""
                      ? "Select Number Plate"
                      : selectedCountry}
                  </Text>
                </TouchableOpacity>
              </View>
              {NumberError ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}

              {clicked ? (
                <Modal transparent={true} animationType="slide">
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <View
                      style={{
                        elevation: 5,
                        marginTop: hp("2%"),
                        height: hp("70%"),
                        alignSelf: "center",
                        width: wp("90%"),
                        backgroundColor: "#fff",
                        borderRadius: wp("4%"),
                      }}
                    >
                      {/* Place AntDesign icon inside this white area */}
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          top: hp("0.5%"),
                          right: wp("2%"),
                          zIndex: 999,
                        }}
                        onPress={handleClick}
                      >
                        <AntDesign
                          name="closecircle"
                          size={wp("6%")}
                          color="rgba(3, 29, 68, 1)"
                        />
                      </TouchableOpacity>

                      <TextInput
                        placeholder="Search.."
                        value={search}
                        onChangeText={(txt) => {
                          onSearch(txt);
                          setSearch(txt);
                        }}
                        style={{
                          width: "90%",
                          height: hp("7%"),
                          alignSelf: "center",
                          borderWidth: 1,
                          borderColor: "#8e8e8e",
                          borderRadius: wp("2%"),
                          marginTop: hp("6%"),
                          paddingLeft: wp("4%"),
                        }}
                      />
                      <ScrollView>
                        <FlatList
                          data={data}
                          style={{ width: "85%", alignSelf: "center" }}
                          renderItem={({ item, index }) => {
                            return (
                              <TouchableOpacity
                                style={{
                                  width: "100%",
                                  alignSelf: "center",
                                  height: hp("7%"),
                                  justifyContent: "center",
                                  borderBottomWidth: 0.5,
                                  borderColor: "#8e8e8e",
                                }}
                                onPress={() => {
                                  setSelectedCountry(item.name);
                                  setCarNumber(item.name);
                                  setClicked(!clicked);
                                  onSearch("");
                                  setSearch("");
                                }}
                              >
                                <Text style={{ fontWeight: "600" }}>
                                  {item.name}
                                </Text>
                              </TouchableOpacity>
                            );
                          }}
                        />
                      </ScrollView>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "rgba(3, 29, 68, 1)",
                          paddingVertical: hp("2%"),
                          alignSelf: "center",
                          borderRadius: wp("2%"),
                          paddingLeft: wp("5%"),
                          width: "50%",
                          marginTop: hp("2%"),
                          position: "absolute",
                          zIndex: 999,
                          bottom: hp("2%"),
                        }}
                        onPress={handleAddCustomer}
                      >
                        <Text
                          style={{
                            fontSize: wp("4%"),
                            fontFamily: FontFamily.poppinsMedium,
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          Add Customer
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              ) : null}
            </View>

            {/* Row 2 */}
            <View style={styles.formRow}>
              <View style={styles.textInputContainer}>
                <View style={styles.inputWithIcon1}>
                  <TextInput
                    style={[styles.textInput1]} // Added margin
                    value={selectedDate ? selectedDate.toDateString() : ""}
                    placeholder="Select a date"
                    editable={false}
                  />
                  <TouchableOpacity
                    onPress={openDatePicker}
                    style={styles.iconContainer}
                  >
                    <Icon
                      name="calendar"
                      size={wp("6%")}
                      color="rgba(3, 29, 68, 1)"
                      style={styles.inputIcon}
                    />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={selectedDate || new Date()}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                    />
                  )}
                </View>
                {DateError ? (
                  <Text style={styles.errorText}>{error}</Text>
                ) : null}
              </View>
              <View style={styles.textInputContainer}>
                <View style={styles.inputWithIcon1}>
                  <TextInput
                    style={[styles.textInput1]} // Added margin
                    placeholder="Select a Time"
                    value={
                      selectedTime ? selectedTime.toLocaleTimeString() : ""
                    }
                    editable={false}
                  />
                  <TouchableOpacity
                    onPress={openTimePicker}
                    style={styles.iconContainer}
                  >
                    <Icon
                      name="clock-o"
                      size={wp("7%")}
                      color="rgba(3, 29, 68, 1)"
                      style={styles.inputIcon}
                    />
                  </TouchableOpacity>
                  {showTimePicker && (
                    <DateTimePicker
                      value={selectedTime || new Date()}
                      mode="time"
                      display="default"
                      onChange={handleTimeChange}
                    />
                  )}
                </View>
                {TimeError ? (
                  <Text style={styles.errorText}>{error}</Text>
                ) : null}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.singleTextInputContainer1}>
                <View style={styles.inputWithIcon1}>
                  <TouchableOpacity onPress={handleClick}>
                    <Text style={styles.customerText}>
                      {user == "" ? "No Customer Found" : user}
                    </Text>
                  </TouchableOpacity>

                  {profileImageLink ? (
                    <Image
                      source={{ uri: profileImageLink }}
                      style={styles.profileImageIcon} // Assuming you have a style for the profile image
                    />
                  ) : (
                    <AntDesign
                      name="user"
                      size={24}
                      color="rgba(3, 29, 68, 1)"
                      style={styles.inputIcon}
                    />
                  )}
                </View>
              </View>
              {NameError ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            <View style={styles.singleTextInputContainer}>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={styles.singleTextInput}
                  value={driven}
                  onChangeText={(text) => setDriven(text)}
                  placeholder="Km Driven"
                  keyboardType="numeric"
                  maxLength={15}
                />
                <Icon
                  name="car"
                  size={24}
                  color="rgba(3, 29, 68, 1)"
                  style={styles.inputIcon}
                />
              </View>
              {drivenError ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}
            </View>

            <View style={styles.singleTextInputContainer}>
              <View style={styles.inputContainer1}>
                <Picker
                  style={styles.picker}
                  selectedValue={service}
                  onValueChange={(itemValue, itemIndex) =>
                    setService(itemValue)
                  }
                >
                  <Picker.Item label="Select Service" value="" />
                  {services.map((category, index) => (
                    <Picker.Item
                      label={category}
                      style={styles.pickerItem}
                      value={category}
                      key={index}
                    />
                  ))}
                </Picker>

                {/* <AntDesign
  name="down" // Use "down" for a dropdown picker icon
  size={24}
  color="rgba(3, 29, 68, 1)"
  style={styles.inputIcon}
/> */}
              </View>
              {serviceError ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}
            </View>

            <View style={styles.singleTextInputContainer}>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={styles.singleTextInput}
                  value={driven}
                  onChangeText={(text) => setDetails(text)}
                  placeholder="Enter Details"
                />
                <TouchableOpacity
                  style={styles.inputIcon}
                  onPress={handleImageUpload}
                >
                  <Icon
                    name="image" // Use the FontAwesome icon name for image upload
                    size={24}
                    color="rgba(3, 29, 68, 1)"
                    style={styles.uploadIcon}
                  />
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isImageModalVisible}
                  onRequestClose={() => setImageModalVisible(false)}
                >
                  <View style={styles.imageModalContainer1}>
                    {/* Background Close Button */}

                    {/* Image Source Options */}
                    <View style={styles.imageModalContent}>
                      <TouchableOpacity
                        onPress={() => setImageModalVisible(false)}
                        style={styles.closeButton1}
                      >
                        <AntDesign
                          name="closecircle"
                          size={30}
                          color="rgba(3, 29, 68, 1)"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.imageModalButton}
                        onPress={handleImageFromCamera}
                      >
                        <Text style={styles.imageModalButtonText}>
                          Take a Photo
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.imageModalButton1}
                        onPress={handleImageFromGallery}
                      >
                        <Text style={styles.imageModalButtonText}>
                          Choose from Gallery
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
              {DetailError ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}
            </View>

            <View style={styles.profileImageContainer}>
              <View style={styles.imageUploadContainer}>
                {selectedImage && selectedImage.length > 0 ? (
                  <View style={styles.profileImagePlaceholder}>
                    <Carousel
                      data={selectedImage}
                      renderItem={renderCarouselItem}
                      sliderWidth={wp("100%")}
                      itemWidth={wp("80%")}
                      onSnapToItem={(index) => setActiveSlide(index)}
                    />
                    <Pagination
                      dotsLength={selectedImage.length}
                      activeDotIndex={activeSlide}
                      containerStyle={styles.paginationContainer}
                      dotStyle={styles.paginationDot}
                      inactiveDotStyle={styles.paginationInactiveDot}
                      inactiveDotOpacity={0.6}
                      inactiveDotScale={0.8}
                    />
                  </View>
                ) : (
                  <View style={styles.profileImageContainer} />
                )}
              </View>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={isFullImageModalVisible}
              onRequestClose={() => setFullImageModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.imageModalContainer}>
                  {profileImage ? (
                    isVideo ? (
                      <Video
                        source={{ uri: profileImage }}
                        style={styles.fullVideo}
                        resizeMode="contain"
                        shouldPlay
                        isLooping
                        useNativeControls
                      />
                    ) : (
                      <Image
                        source={{ uri: profileImage }}
                        style={styles.fullImage}
                        resizeMode="contain"
                      />
                    )
                  ) : null}

                  <TouchableOpacity
                    style={
                      isVideo
                        ? styles.videoCloseButton
                        : styles.imageCloseButton
                    }
                    onPress={() => setFullImageModalVisible(false)}
                  >
                    <AntDesign
                      name="closecircle"
                      size={hp("4%")}
                      color="rgba(3, 29, 68, 1)"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          
        </View>
      </ScrollView>

      <View style={styles.save}>
        <SaveButton/>
      </View>

      <View style={[styles.footer]}>
        <Footer prop={"MaintenanceRecord"} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  addRecord: {
    flex: 1,
    overflow: "hidden",
    height: "100%",
    width: "100%",
  },
  breadcrumbContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("11%"), // Adjust this value as needed to move the breadcrumbs down // Set the background color to match the container's background
    paddingLeft: wp("5%"), // Add padding to align with the content
    paddingRight: wp("5%"), // Add padding to align with the content
  },
  // Move the breadcrumb below the header

  breadcrumbImage: {
    width: wp("4%"), // Adjust the width as needed
    height: hp("2%"), // Adjust the height as needed
    marginRight: wp("0%"), // Add margin to separate the image from text
    // Adjust the color of the image
  },

  breadcrumbText: {
    fontSize: wp("3.5%"), // Adjust font size using wp
    color: "rgba(3, 29, 68, 1)",
    fontFamily: FontFamily.poppinsMedium,
    marginTop: hp("0.5%"), // Breadcrumb text color
  },

  breadcrumbSeparator: {
    fontSize: wp("3.5%"), // Adjust font size using wp
    color: "rgba(3, 29, 68, 1)", // Separator text color
    paddingHorizontal: wp("0%"), // Add horizontal padding using wp to separate items
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2%"),
  },

  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("0%"),
  },
  profileImage: {
    width: wp("30%"),
    height: wp("30%"),
  },
  profileImagePlaceholder: {
    width: wp("90%"),
    height: wp("50%"),
  },
  uploadButton: {
    backgroundColor: "rgba(3, 29, 68, 1)",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("5%"),
    borderRadius: wp("2%"),
    marginTop: hp("0%"),
  },
  uploadButtonText: {
    color: "white",
    fontSize: wp("4%"),
  },
  imageUploadContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  carouselItem: {
    width: wp("70%"), // Match the width of profileImagePlaceholder
    height: wp("40%"), // Match the height of profileImagePlaceholder
  },
  carouselImage: {
    width: "100%", // Use 100% width to maintain aspect ratio
    height: "100%", // Use 100% height to maintain aspect ratio
    resizeMode: "contain", // Use 'contain' to keep the image's aspect ratio
  },
  paginationContainer: {
    marginTop: hp("0%"), // Adjust spacing as needed
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(3, 29, 68, 1)", // Customize the active dot color
  },
  paginationInactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(3, 29, 68, 1)", // Customize the inactive dot color
  },
  save: {
   // Add horizontal padding
    flex:1,

  },
  buttonText: {
    color: "white",
    fontSize: wp("4%"), // Adjust the font size as needed
  },
  customerText: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: wp("4%"),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value (last number) for transparency
    justifyContent: "center",
    alignItems: "center",
  },
  imageModalContainer: {
    position: "relative",
    width: wp("80%"), // Adjust the width percentage as needed
    height: hp("80%"), // Adjust the height percentage as needed
  },
  imageModalContainer1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: wp("5%"), // Adjust horizontal padding using wp
    paddingVertical: hp("5%"), // Adjust vertical padding using hp
    position: "relative",
  },

  mediaContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },

  videoContainer: {
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    width: wp("70%"), // Set the width to your desired value
    height: wp("40%"),
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  playButtonContainer: {
    ...StyleSheet.absoluteFillObject, // Position the play button absolutely
    justifyContent: "center",
    alignItems: "center",
  },
  videoCloseButton: {
    position: "absolute",
    top: hp("7%"), // Adjust the top percentage as needed
    right: wp("0%"), // Adjust the right percentage as needed
    zIndex: 1,
  },
  imageCloseButton: {
    position: "absolute",
    top: hp("15%"), // Adjust the top percentage as needed
    right: wp("0%"), // Adjust the right percentage as needed
    zIndex: 1,
  },
  closeButton1: {
    position: "absolute",
    top: hp("0%"), // Adjust top position using hp
    right: wp("0%"), // Adjust right position using wp
    zIndex: 999,
  },

  imageModalContent: {
    backgroundColor: "white",
    padding: wp("4%"), // Adjust the percentage as needed
    borderRadius: wp("2%"), // Adjust the percentage as needed
    width: wp("80%"), // Adjust the percentage as needed
    alignItems: "center",
    height: hp("30%"),
  },
  imageModalButton: {
    backgroundColor: "rgba(3, 29, 68, 1)",
    padding: hp("1.5%"), // Adjust the percentage as needed
    borderRadius: wp("1%"), // Adjust the percentage as needed
    marginVertical: hp("0%"), // Adjust the percentage as needed
    width: "100%",
    alignItems: "center",
    marginTop: hp("6%"),
  },
  imageModalButton1: {
    backgroundColor: "rgba(3, 29, 68, 1)",
    padding: hp("1.5%"), // Adjust the percentage as needed
    borderRadius: wp("1%"), // Adjust the percentage as needed
    marginVertical: hp("0%"), // Adjust the percentage as needed
    width: "100%",
    alignItems: "center",
    marginTop: hp("2%"),
  },
  imageModalButton2: {
    backgroundColor: "rgba(3, 29, 68, 1)",
    padding: hp("1.5%"), // Adjust the percentage as needed
    borderRadius: wp("2%"), // Adjust the percentage as needed
    marginVertical: hp("1%"), // Adjust the percentage as needed
    width: "100%",
    alignItems: "center",
    marginTop: hp("1%"),
  },
  imageModalButtonText: {
    color: "white",
    fontSize: wp("4%"), // Adjust the percentage as needed
  },
  fullImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "100%",
    width: "100%", // Adjust this value as needed
  },
  fullVideo: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  fullImage: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  closeButtonDelete: {
    position: "absolute",
    top: 0, // Place it at the top
    right: 0, // Place it at the left
    padding: 5, // Adjust padding as needed
    zIndex: 1, // Ensure it's above the image
  },
  imageContainer: {
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    position: "relative",
    width: "100%",
    height: "100%",
  },

  playIconContainer: {
    position: "absolute",
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  formContainer: {
    paddingHorizontal: wp("0%"),
    borderBottomLeftRadius: wp("2%"),
    borderBottomRightRadius: wp("2%"),
    marginBottom: hp("2%"), // Add marginBottom to create space for the "Save" button
  },

  formRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  iconContainer: {
    width: wp("10%"), // Set a fixed width for the TouchableOpacity
    alignItems: "flex-end", // Align the icon to the right
    justifyContent: "center", // Center vertically
    marginRight: wp("1%"), // Center the content horizontally
  },

  textInput: {
    flex: 1, // Allow text inputs to expand to fill available space in the row
    marginRight: wp("2%"), // Add right margin using responsive screen for spacing between text inputs
    height: hp("5%"), // Set height using responsive screen
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: wp("0%"),
    fontFamily: FontFamily.poppinsRegular,
    fontSize: wp("4%"),
    color: "black",
    // Add padding using responsive screen
  },
  textInput1: {
    flex: 1, // Allow text inputs to expand to fill available space in the row // Add right margin using responsive screen for spacing between text inputs
    height: hp("5%"), // Set height using responsive screen
    paddingHorizontal: wp("1%"),
    fontFamily: FontFamily.poppinsRegular,
    fontSize: wp("4%"),
    color: "black",
    // Add padding using responsive screen
  },

  singleTextInputContainer: {
    marginTop: hp("0%"),
    marginBottom: hp("1%"), // Add spacing between single text inputs using responsive screen
  },
  singleTextInputContainer1: {
    marginTop: hp("2%"),
    marginBottom: hp("1%"),
    // Add spacing between single text inputs using responsive screen
  },

  singleTextInput: {
    width: wp("100%"), // Set width using responsive screen
    height: hp("5%"), // Set height using responsive screen
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: wp("0%"),
    fontFamily: FontFamily.poppinsMedium,
    fontSize: wp("4%"), // Add padding using responsive screen
  },

  inputContainer: {
    width: "100%", // Adjust the width as needed
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: hp("1%"),
  },
  picker: {
    flex: 1,
    height: hp("5%"),
    width: "100%",
  },
  pickerItem: {
    fontFamily: FontFamily.poppinsMedium, // Apply your FontFamily.poppinsMedium
    color: "black", // Apply black color
  },

  inputContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: hp("1%"),
    flex: 1,
  },

  errorText: {
    color: "red",
    fontSize: wp("3%"),
    marginTop: hp("1%"),
    fontFamily: FontFamily.poppinsMedium,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:"space-between",
    marginTop: hp("1%"),
    marginRight: wp("0%"),
    marginBottom: hp("1%"),
  },
  inputWithIcon1: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("0%"),
    marginBottom: hp("1%"),
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: wp("0%"),
    paddingVertical: wp("1%"),
  },
  // Style for the Ant Design icons in the input with icon
  inputIcon: {
    position: "absolute",
    right: wp("0%"), // Adjust the right position as needed
  },
  selectCustomerButton: {
    flexDirection: "row", // Make sure the text and icon are in a row
    alignItems: "center", // Vertically align items in the center
    height: hp("5%"), // Set a fixed height
    borderBottomWidth: 1, // Add any other styling you need
    borderColor: "gray",
    paddingHorizontal: wp("2%"),
  },
  profileImageIcon: {
    width: wp("8%"), // Adjust the width using wp for responsiveness
    height: wp("8%"), // Adjust the height using wp for responsiveness
    borderRadius: wp("4%"),
    marginLeft: wp("50%"),
    marginBottom: wp("1%"),
  },
  textInputContainer: {
    flex: 1,
    flexDirection: "column",
    // Add this line to create space between columns
  },

  footer: {
    position: "absolute",
  },
});

export default AddRecord;