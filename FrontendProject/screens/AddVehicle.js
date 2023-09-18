import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  Modal,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import Footer from "../components/Footer";
import { Picker } from "@react-native-picker/picker";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Video } from "expo-av";
import ImagePickerCamera from "../components/ImagePickerCamera";
import ImagePickerGallery from "../components/ImagePickerGallery";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Config from "./Config";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AddVehicle = () => {
  const navigation = useNavigation();
  const [vehicleType, setvehicleType] = React.useState("Type");
  const [vehicleModel, setvehicleModel] = React.useState("");
  const [Registration, setRegistration] = React.useState("");
  const [profileImageLink, setProfileImageLink] = useState("");
  const [keyCustomer, setKeyCustomer] = useState("");
  const [Vehiclecolor, setvehiclecolor] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [customerType, setCusomterType] = useState("Customer Type");
  const [customerTypeError, setCusomterTypeError] = useState(false);
  const [CompanyNameError, setCompanyNameError] = useState(false);
  const videos = useRef(null);
  const [km, setKm] = useState("");
  const [yearError, setYearError] = useState(false);
  const [error, setError] = useState("Enter this field");
  const [vehicleTypeError, setvehicleTypeError] = useState(false);
  const [vehicleModelError, setvehicleModelError] = useState(false);
  const [RegistrationError, setRegistrationError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [VehiclecolorError, setvehiclecolorError] = useState(false);
  const [phoneNumberError, setphoneNumberError] = useState(false);
  const [kmError, setKmError] = useState(false);
  const [vehicleColorError, setvehicleColorError] = useState(false);
  const [RMsg, setRMsg] = useState("");
  const [make, setMake] = useState("");
  const [year, setYear] = useState("Year");
  const [profileImage, setProfileImage] = useState(null);
  const [isImageModalVisible, setImageModalVisible] = useState("false");
  const [isFullImageModalVisible, setFullImageModalVisible] = useState(false);
  const [makeError, setMakeError] = useState(false);
  const isVideo = profileImage && profileImage.endsWith('.mp4');
  const vehicleCategories = ["Bike", "Car", "Truck", "Auto", "Other"];
  const CusomterCategories = ["Walk-in", "Company"];
  const modelCategories = [
    "1980",
    "1981",
    "1982",
    "1983",
    "1984",
    "1985",
    "1986",
    "1987",
    "1988",
    "1989",
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ];
  const [showCameraImagePicker, setShowCameraImagePicker] = useState(false);
  const [showGalleryImagePicker, setShowGalleryImagePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [originalUri, setOriginalUri] = useState("");
  const [status, setStatus] = useState({});
  const video = React.useRef(null);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(transformedResponse);
  const [selectedCountry, setSelectedCountry] = useState("");
  const searchRef = useRef();
  const [userId, setUserId] = useState("");
  const [CompanyName, setCompanyName] = useState("");

  const clearErrors = () => {
    setvehicleTypeError("");
    setMakeError("");
    setvehicleModelError("");
    setRegistrationError("");
    setvehiclecolorError("");
    setphoneNumberError("");
    setNameError("");
    setCompanyNameError("");
    setCusomterTypeError("");
    setKmError("");
    setYearError("");
    setvehicleColorError("");
  };

  const handleImageUpload = () => {
    setImageModalVisible(true);
  };

  const handleShowImage = (uri) => {
    if (uri) {
      setProfileImage(uri);
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

  const getCustomer = async () => {
    let token = await AsyncStorage.getItem("accessToken");
    const accessToken = "Bearer " + token;
    const Business_id = await AsyncStorage.getItem("Business_id");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${Config.apiServerUrl}/api/users/get-customer/${Business_id}`,
      headers: {
        Authorization: accessToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        JSON.stringify(response.data);
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCustomer();
    getCustomerImage(keyCustomer);
  }, []);

  const transformedResponse = customers.map((item) => {
    const { id, name } = item;
    return {
      name: name,
      id: id,
    };
  });

  const renderCarouselItem = ({ item, index }) => {
    const fileExtension = item.uri.split('.').pop().toLowerCase();
  
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
  const handleAddCustomer = () => {
    navigation.navigate("AddCustomer");
    setClicked(!clicked);
  };

  const fetchData = async () => {
    const index = parseInt(await AsyncStorage.getItem("Business_id"));
    setCurrentPressedIndex(index);
  };

  const handleImageDelete = (index) => {
    const newSelectedImage = [...selectedImage];
    newSelectedImage.splice(index, 1);
    setSelectedImage(newSelectedImage);
  };

  const handleVechileTypeSelect = (code) => {
    setvehicleType(code);
  };

  const handleCustomerTypeSelect = (code) => {
    setCusomterType(code);
  };

  const getCustomerImage = async (keyCustomer) => {
    try {
      const accessTokens = await AsyncStorage.getItem("accessToken");
      const token = "Bearer " + accessTokens;

      if (keyCustomer) {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${Config.apiServerUrl}/api/users/${keyCustomer}/profile-image`,
          headers: {
            Authorization: token,
          },
        };

        const response = await axios.request(config);

        if (response.status === 200) {
          const responseData = response.data;
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

  // const uploadImage = async (vehicleId) => {
  //   if (selectedImage) {
  //     let token = await AsyncStorage.getItem("accessToken");
  //     const accessToken = "Bearer " + token;
  //     const imageData = new FormData();
  //     if (selectedImage) {
  //       // Iterate through the image array and append images to the FormData
  //       try {
  //         selectedImage.forEach((entry, index) => {
  //           const image_uri = entry.uri;
  //           imageData.append("files", {
  //             uri: image_uri,
  //             name: new Date() + ".jpeg",
  //             type: "image/jpeg",
  //           });
  //         });

  //         const response = await axios.post(
  //           `${Config.apiServerUrl}/api/file/upload/vehicle/${vehicleId}`,
  //           imageData,
  //           {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //             },
  //           }
  //         );
  //       } catch (error) {
  //         console.error("Error:", error.message);
  //       }
  //     }
  //   }
  // };

  const uploadImage = async (vehicleId) => {
    try {
      if (selectedImage) {
        let token = await AsyncStorage.getItem("accessToken");
        const accessToken = "Bearer " + token;
        const formData = new FormData();
  
        selectedImage.forEach((entry, index) => {
          const fileUri = entry.uri;
          const fileType = fileUri.endsWith(".mp4") ? "video/mp4" : "image/jpeg";
  
          formData.append("files", {
            uri: fileUri,
            name: new Date().getTime() + (fileType === "video/mp4" ? ".mp4" : ".jpeg"),
            type: fileType,
          });
        });
  
        const response = await axios.post(
          `${Config.apiServerUrl}/api/file/upload/vehicle/${vehicleId}`,
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
      // Handle errors as necessary
      // For example, you can show an error message to the user
      // or perform some error handling logic.
    }
  };
  
  const saveVehicle = async () => {
    let isValid = true;

    if (vehicleType === "Type") {
      setvehicleTypeError(true);
      isValid = false;
    } else {
      setvehicleTypeError(false);
    }

    if (!vehicleModel) {
      setvehicleModelError(true);
      isValid = false;
    } else {
      setvehicleModelError(false);
    }

    if (!Registration) {
      setRegistrationError(true);
      isValid = false;
    }

    if (!Vehiclecolor) {
      setvehiclecolorError(true);
      isValid = false;
    } else {
      setvehiclecolorError(false);
    }

    if (!make) {
      setMakeError(true);
    } else {
      setMakeError(false);
    }
    if (year === "Year") {
      setYearError(true);
    }

    if (customerType === "Customer Type") {
      setCusomterTypeError(true);
      isValid = false;
    } else {
      setCusomterTypeError(false);
    }

    if (!CompanyName) {
      setCompanyNameError(true);
    }

    if (!keyCustomer) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (!phoneNumber) {
      setphoneNumberError(true);
      isValid = false;
    } else {
      setphoneNumberError(false);
    }

    if (!km) {
      setKmError(true);
      isValid = false;
    } else {
      setKmError(false);
    }
    setTimeout(() => {
      clearErrors();
    }, 10000);

    if (isValid) {
      let token = await AsyncStorage.getItem("accessToken");
      const accessToken = "Bearer " + token;
      const Business_id = await AsyncStorage.getItem("Business_id");

      let data = JSON.stringify({
        type: vehicleType,
        model: vehicleModel,
        make: make,
        year: year,

        registrationNumber: Registration,
        color: Vehiclecolor,
        ownerId: keyCustomer,
        kilometerDriven: km,
        customerType: customerType,
        parentCompany: customerType === "Walk-in" ? null : CompanyName,
      });

      const ownerId = toString(keyCustomer);

      try {
        // Store ownerId in AsyncStorage
        await AsyncStorage.setItem("ownerId", ownerId);
      } catch (error) {
        console.error("Error setting ownerId in AsyncStorage:", error);
      }

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${Config.apiServerUrl}/api/vehicle/${Business_id}/add-vehicle`,
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.status === "OK") {
            const createdUserId = response.data.data;
            setUserId(createdUserId);

            if (createdUserId) {
              uploadImage(createdUserId);
            }
            navigation.navigate("Vehicles", { type: "default" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const customer = customers.map((customer) => ({
    key: customer.id.toString(),
    value: customer.name,
  }));

  return (
    <ImageBackground
      source={require("../assets/light-texture2234-1.png")}
      style={styles.container}
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
          <Text style={styles.breadcrumbText}>Vehicles</Text>
        </TouchableOpacity>
        <Text style={styles.breadcrumbSeparator}> / </Text>
        <Text style={styles.breadcrumbText}>Add Vehicle</Text>
      </View>

      {/* ScrollView */}
      <ScrollView style={styles.scrollViewContainer}>
        {/* Image Carousel */}

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
          <TouchableOpacity
            onPress={handleImageUpload}
            style={styles.uploadButton}
          >
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
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
            style={isVideo ? styles.videoCloseButton : styles.imageCloseButton}
            onPress={() => setFullImageModalVisible(false)}
          >
            <AntDesign name="closecircle" size={hp("4%")} color="rgba(3, 29, 68, 1)" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>




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
                <Text style={styles.imageModalButtonText}>Take a Photo</Text>
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

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Row 1 */}
          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <Picker
                style={styles.textInput}
                selectedValue={vehicleType}
                onValueChange={(itemValue) => setvehicleType(itemValue)}
              >
                <Picker.Item label="Type" value="" />
                {vehicleCategories.map((category, index) => (
                  <Picker.Item label={category} value={category} key={index} />
                ))}
              </Picker>
              <Picker
                style={styles.textInput}
                selectedValue={year}
                onValueChange={(itemValue) => setYear(itemValue)}
              >
                <Picker.Item label="Year" value="" />
                {modelCategories.map((category, index) => (
                  <Picker.Item label={category} value={category} key={index} />
                ))}
              </Picker>
            </View>
            {(vehicleTypeError || yearError) && (
              <Text style={styles.errorText}>Enter this field</Text>
            )}
          </View>

          {/* Row 2 */}
          <View style={styles.formRow}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Make"
                onChangeText={(text) => setMake(text)}
                value={make}
              />
              {makeError ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Model"
                onChangeText={(text) => setvehicleModel(text)}
                value={vehicleModel}
              />
              {vehicleModelError ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}
            </View>
          </View>

          {/* Row 3 */}
          <View style={styles.formRow}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Registration Number"
                onChangeText={(text) => setRegistration(text)}
                value={Registration}
              />
              {RegistrationError && (
                <Text style={styles.errorText}>{error}</Text>
              )}
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Vehicle Colour"
                onChangeText={(text) => setvehiclecolor(text)}
                value={Vehiclecolor}
              />
              {VehiclecolorError && (
                <Text style={styles.errorText}>{error}</Text>
              )}
            </View>
          </View>

          {/* Single Text Inputs */}

          <View style={styles.singleTextInputContainer1}>
            <View style={styles.inputWithIcon1}>
              <TouchableOpacity onPress={handleClick}>
                <Text style={styles.customerText}>
                  {selectedCountry == "" ? "Select Customer" : selectedCountry}
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
                                setKeyCustomer(item.id);
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
                          fontSize: wp("3%"),
                          fontFamily: "Poppin-Medium",
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
            {nameError && <Text style={styles.errorText}>{error}</Text>}
          </View>
          <View style={styles.singleTextInputContainer}>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.singleTextInput}
                onChangeText={(text) => setphoneNumber(text)}
                placeholder="Phone Number"
                keyboardType="numeric"
                maxLength={11}
                value={phoneNumber}
              />
              <AntDesign
                name="phone"
                size={24}
                color="rgba(3, 29, 68, 1)"
                style={styles.inputIcon}
              />
            </View>
            {phoneNumberError && <Text style={styles.errorText}>{error}</Text>}
          </View>

          <View style={styles.singleTextInputContainer}>
            <View style={styles.inputContainer1}>
              <Picker
                style={styles.picker}
                selectedValue={customerType}
                onValueChange={(itemValue, itemIndex) =>
                  setCusomterType(itemValue)
                }
              >
                <Picker.Item label="Customer Type" value="" />
                {CusomterCategories.map((category, index) => (
                  <Picker.Item label={category} value={category} key={index} />
                ))}
              </Picker>
            </View>
            {customerTypeError && <Text style={styles.errorText}>{error}</Text>}
          </View>
          {customerType === "Company" && (
            <View style={styles.singleTextInputContainer1}>
              <TextInput
                style={styles.singleTextInput}
                onChangeText={(text) => setCompanyName(text)}
                placeholder="Company Name"
                value={CompanyName}
              />
              {CompanyNameError && (
                <Text style={styles.errorText}>{error}</Text>
              )}
            </View>
          )}

          <View style={styles.singleTextInputContainer}>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.singleTextInput}
                onChangeText={(text) => setKm(text)}
                placeholder="Km Driven"
                keyboardType="numeric"
                value={km}
              />
              <AntDesign
                name="car"
                size={24}
                color="rgba(3, 29, 68, 1)"
                style={styles.inputIcon}
              />
            </View>
            {kmError && <Text style={styles.errorText}>{error}</Text>}
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveVehicle}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>{/* <Footer prop={"Vehicles"} /> */}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    contentFit: "cover",
    justifyContent: "center",
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
    marginRight: wp("1%"), // Add margin to separate the image from text
    // Adjust the color of the image
  },

  breadcrumbText: {
    fontSize: wp("4%"), // Adjust font size using wp
    color: "rgba(3, 29, 68, 1)",
    fontFamily: FontFamily.poppinsMedium,
    marginTop: hp("0.5%"), // Breadcrumb text color
  },

  breadcrumbSeparator: {
    fontSize: wp("4%"), // Adjust font size using wp
    color: "rgba(3, 29, 68, 1)", // Separator text color
    paddingHorizontal: wp("1%"), // Add horizontal padding using wp to separate items
  },

  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2%"),
    // Add paddingBottom to accommodate the "Km Driven" input
  },

  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("3%"),
  },
  profileImage: {
    width: wp("30%"),
    height: wp("30%"),
  },
  profileImagePlaceholder: {
    width: wp("90%"),
    height: wp("55%"),
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
    backgroundColor: "gray", // Customize the inactive dot color
  },
  saveButton: {
    height: hp("5%"), // Adjust the height as needed
    width: wp("90.5%"), // Adjust the width as needed
    backgroundColor: "rgba(3, 29, 68, 1)",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center", // Center the button horizontally // Add some margin at the top for spacing
    borderRadius: wp("1%"), // Add border radius if needed
    paddingHorizontal: wp("2%"), // Add horizontal padding
    marginBottom: hp("1%"),
    left: wp("0.5%"),
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (last number) for transparency
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageModalContainer: {
    position: 'relative',
    width: wp('80%'), // Adjust the width percentage as needed
    height: hp('80%'), // Adjust the height percentage as needed
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
    position: 'absolute',
    top: hp('7%'), // Adjust the top percentage as needed
    right: wp('0%'), // Adjust the right percentage as needed
    zIndex: 1,
  },
  imageCloseButton: {
    position: 'absolute',
    top: hp('15%'), // Adjust the top percentage as needed
    right: wp('0%'), // Adjust the right percentage as needed
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
  fullVideo:
  {
    width: "100%",
    height: "100%",
    flex:1
    
  },
  fullImage:
  {
    width: "100%",
    height: "100%",
    flex:1
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
    justifyContent: "space-between",
    marginVertical: hp("1%"),
  },

  textInput: {
    flex: 1, // Allow text inputs to expand to fill available space in the row
    marginRight: wp("2%"), // Add right margin using responsive screen for spacing between text inputs
    height: hp("5%"), // Set height using responsive screen
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: wp("0%"),
    fontFamily: FontFamily.poppinsMedium,
    fontSize: wp("4%"), // Add padding using responsive screen
  },

  singleTextInputContainer: {
    marginTop: hp("0%"),
    marginBottom: hp("1%"), // Add spacing between single text inputs using responsive screen
  },
  singleTextInputContainer1: {
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
    // Add spacing between single text inputs using responsive screen
  },

  singleTextInput: {
    width: wp("90%"), // Set width using responsive screen
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
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
  },
  inputWithIcon1: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: wp("0%"),
    paddingVertical: wp("1%"),
  },
  // Style for the Ant Design icons in the input with icon
  inputIcon: {
    position: "absolute",
    right: wp("2%"), // Adjust the right position as needed
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
  },

  footer: {
    height: hp("10%"), // Increase the height of the footer as needed
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "white", // Customize your footer text style
    fontSize: wp("3%"), // Responsive font size
  },
});

export default AddVehicle;