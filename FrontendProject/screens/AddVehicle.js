import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
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
  const [vehicleType, setvehicleType] = React.useState("");
  const [vehicleModel, setvehicleModel] = React.useState("");
  const [Registration, setRegistration] = React.useState("");
  const [name, setName] = useState("");
  const [keyCustomer, setKeyCustomer] = useState("");
  const [Vehiclecolor, setvehiclecolor] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [customerType, setCusomterType] = useState("");
  const [customerTypeError, setCusomterTypeError] = useState(false);
  const [CompanyNameError, setCompanyNameError] = useState(false);

  const [km, setKm] = useState("");
  const [Nmsg, setNmsg] = useState("");
  const [error, setError] = useState("Enter this field");
  const [vehicleTypeError, setvehicleTypeError] = useState(false);
  const [vehicleModelError, setvehicleModelError] = useState(false);
  const [RegistrationError, setRegistrationError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [VehiclecolorError, setvehiclecolorError] = useState(false);
  const [phoneNumberError, setphoneNumberError] = useState(false);
  const [kmError, setKmError] = useState(false);
  const [Msg, setMsg] = useState("");
  const [RMsg, setRMsg] = useState("");
  const [make, setMake] = useState("");
  const [year, setYear] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isImageModalVisible, setImageModalVisible] = useState("false");
  const [isFullImageModalVisible, setFullImageModalVisible] = useState(false);
  const [makeError, setMakeError] = useState(false);
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
  }, []);

  const transformedResponse = customers.map((item) => {
    const { id, name } = item;
    return {
      name: name,
      id: id,
    };
  });

  const renderCarouselItem = ({ item, index }) => (
    <View key={index} style={styles.carouselItem}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handleShowImage(item.uri)}>
          <Image source={{ uri: item.uri }} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleImageDelete(index)}
          style={styles.closeButtonDelete}
        >
          <AntDesign name="closecircle" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

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

  const uploadImage = async (vehicleId) => {
    if (selectedImage) {
      let token = await AsyncStorage.getItem("accessToken");
      const accessToken = "Bearer " + token;
      const imageData = new FormData();
      if (selectedImage) {
        // Iterate through the image array and append images to the FormData
        try {
          selectedImage.forEach((entry, index) => {
            const image_uri = entry.uri;
            imageData.append("files", {
              uri: image_uri,
              name: new Date() + ".jpeg",
              type: "image/jpeg",
            });
          });

          const response = await axios.post(
            `${Config.apiServerUrl}/api/file/upload/vehicle/${vehicleId}`,
            imageData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } catch (error) {
          console.error("Error:", error.message);
        }
      }
    }
  };

  const saveVehicle = async () => {
    let isValid = true;

    if (!vehicleType) {
      setMsg("Please Enter Vehicle Type");
      setvehicleTypeError(true);
      isValid = false;
    } else {
      if (!vehicleModel) {
        setMsg("Please Enter Vehicle Modal");
        setvehicleTypeError(true);
        isValid = false;
      } else {
        setvehicleTypeError(false);
      }
    }

    if (!Registration) {
      setRMsg("Please Enter Registration Number");
      setRegistrationError(true);
      isValid = false;
    } else {
      if (!Vehiclecolor) {
        setRMsg("Please Enter Vehicle Color");
        setvehiclecolorError(true);
        isValid = false;
      } else {
        setvehiclecolorError(false);
      }
    }

    if (!make || !year) {
      setMakeError(true);
      setNmsg("Please provide make and Year of vehicle");
    } else {
      setMakeError(false);
    }

    if (!customerType) {
      setCusomterTypeError(true);
      isValid = false;
    } else {
      setCusomterTypeError(false);
    }

    if (customerType == "Company") {
      setCompanyNameError(false);
      if (!CompanyName) {
        setCompanyNameError(true);
      }
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
    <View style={styles.container}>
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
          <View style={styles.imageModalContainer}>
            {profileImage && (
              <Image source={{ uri: profileImage }} style={styles.fullImage} />
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFullImageModalVisible(false)}
            >
              <AntDesign name="closecircle" size={30} color="red" />
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isImageModalVisible}
          onRequestClose={() => setImageModalVisible(false)}
        >
          <View style={styles.imageModalContainer}>
            {/* Background Close Button */}
            <TouchableOpacity
              onPress={() => setImageModalVisible(false)}
              style={styles.closeButton}
            >
              <AntDesign
                name="closecircle"
                size={30}
                color="rgba(3, 29, 68, 1)"
              />
            </TouchableOpacity>

            {/* Image Source Options */}
            <View style={styles.imageModalContent}>
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
            <Picker
              style={styles.textInput}
              selectedValue={vehicleType}
              onValueChange={(itemValue, itemIndex) =>
                setvehicleType(itemValue)
              }
            >
              <Picker.Item label="Type" value="" />
              {vehicleCategories.map((category, index) => (
                <Picker.Item label={category} value={category} key={index} />
              ))}
            </Picker>
            <Picker
              style={styles.textInput}
              selectedValue={year}
              onValueChange={(itemValue, itemIndex) => setYear(itemValue)}
            >
              <Picker.Item label="Year" value="" />
              {modelCategories.map((category, index) => (
                <Picker.Item label={category} value={category} key={index} />
              ))}
            </Picker>
            {vehicleTypeError ||
              (makeError && <Text style={styles.errorText}>{error}</Text>)}
          </View>

          {/* Row 2 */}
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Make"
              onChangeText={(text) => setMake(text)}
              value={make}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Model"
              onChangeText={(text) => setvehicleModel(text)}
              value={vehicleModel}
            />
            {vehicleTypeError ||
              (makeError && <Text style={styles.errorText}>{error}</Text>)}
          </View>

          {/* Row 3 */}
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Registration Number"
              onChangeText={(text) => setRegistration(text)}
              value={Registration}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Vehicle Colour"
              onChangeText={(text) => setvehiclecolor(text)}
              value={Vehiclecolor}
            />
            {VehiclecolorError ||
              (RegistrationError && (
                <Text style={styles.errorText}>{error}</Text>
              ))}
          </View>

          {/* Single Text Inputs */}

          <View style={styles.singleTextInputContainer}>
            <View style={styles.inputWithIcon}>
              <TouchableOpacity onPress={handleClick}>
                <Text style={styles.singleTextInput}>
                  {selectedCountry == "" ? "Select Customer" : selectedCountry}
                </Text>
              </TouchableOpacity>
              <AntDesign
                name="user"
                size={24}
                color="rgba(3, 29, 68, 1)"
                style={styles.inputIcon}
              />
            </View>
            {clicked ? (
              <Modal transparent={true} animationType="slide">
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                  }}
                >
                  <View
                    style={{
                      elevation: 5,
                      marginTop: 20,
                      height: 600,
                      alignSelf: "center",
                      width: "90%",
                      backgroundColor: "#fff",
                      borderRadius: 10,
                    }}
                  >
                    <TextInput
                      placeholder="Search.."
                      value={search}
                      ref={searchRef}
                      onChangeText={(txt) => {
                        onSearch(txt);
                        setSearch(txt);
                      }}
                      style={{
                        width: "90%",
                        height: 50,
                        alignSelf: "center",
                        borderWidth: 0.2,
                        borderColor: "#8e8e8e",
                        borderRadius: 7,
                        marginTop: 20,
                        paddingLeft: 20,
                      }}
                    />
                    <ScrollView>
                      <FlatList
                        data={data}
                        style={styles.FlatList}
                        renderItem={({ item, index }) => {
                          return (
                            <TouchableOpacity
                              style={{
                                width: "85%",
                                alignSelf: "center",
                                height: 50,
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
                        paddingVertical: 10,
                        alignSelf: "center",
                        borderRadius: 5,
                        paddingLeft: 10,
                        width: "50%",
                        marginTop: 10,
                        position: "fixed",
                        zIndex: 999,
                        bottom: 5,
                      }}
                      onPress={handleAddCustomer}
                    >
                      <Text
                        style={{
                          fontSize: FontSize.size_sm,
                          fontFamily: FontFamily.poppinsMedium,
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        Add Customer
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      zIndex: 999,
                    }}
                    onPress={handleClick}
                  >
                    <AntDesign
                      name="closecircle"
                      size={24}
                      color="rgba(3, 29, 68, 1)"
                    />
                  </TouchableOpacity>
                </View>
              </Modal>
            ) : null}
            {nameError && <Text style={styles.errorText}>{error}</Text>}
          </View>
          <View style={styles.singleTextInputContainer1}>
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

          <View style={styles.singleTextInputContainer1}>
            <View style={styles.inputContainer1}>
              <Picker
                style={styles.singleTextInput}
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
                placeholder="Company Name   "
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
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>{/* <Footer prop={"Vehicles"} /> */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2%"),
    // Add paddingBottom to accommodate the "Km Driven" input
  },

  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("10%"),
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
    width: wp("80%"), // Adjust the width as needed
    backgroundColor: "rgba(3, 29, 68, 1)",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center", // Center the button horizontally // Add some margin at the top for spacing
    borderRadius: wp("1%"), // Add border radius if needed
    paddingHorizontal: wp("2%"), // Add horizontal padding
    marginBottom: hp("1%"),
  },
  buttonText: {
    color: "white",
    fontSize: wp("4%"), // Adjust the font size as needed
  },

  imageModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    position: "absolute",
    top: hp("1%"), // Adjust as needed
    right: wp("2%"), // Adjust as needed
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
  fullImage: {
    width: "100%",
    height: "100%",
  },
  mediaContainer: {
    width: "100%",
    height: "100%",
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
    position: "relative",
    width: "100%",
    height: "100%",
  },
  formContainer: {
    paddingHorizontal: wp("5%"),
    backgroundColor: "white",
    borderBottomLeftRadius: wp("2%"),
    borderBottomRightRadius: wp("2%"),
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: hp("2%"), // Add marginBottom to create space for the "Save" button
  },

  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp("1%"), // Add vertical margin using responsive screen
  },

  textInput: {
    flex: 1, // Allow text inputs to expand to fill available space in the row
    marginRight: wp("2%"), // Add right margin using responsive screen for spacing between text inputs
    height: hp("5%"), // Set height using responsive screen
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: wp("2%"),
    fontFamily: FontFamily.poppinsMedium, // Add padding using responsive screen
  },

  singleTextInputContainer: {
    marginTop: hp("1%"),
    marginBottom: hp("1%"), // Add spacing between single text inputs using responsive screen
  },
  singleTextInputContainer1: {
    marginTop: hp("0%"),
    marginBottom: hp("1%"),
    // Add spacing between single text inputs using responsive screen
  },

  singleTextInput: {
    width: wp("80%"), // Set width using responsive screen
    height: hp("5%"), // Set height using responsive screen
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: wp("2%"),
    fontFamily: FontFamily.poppinsMedium, // Add padding using responsive screen
  },
  singleTextInput1: {
    width: wp("80%"), // Set width using responsive screen
    height: hp("5%"), // Set height using responsive screen
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: wp("2%"),
    fontFamily: FontFamily.poppinsMedium, // Add padding using responsive screen
  },
  picker: {
    flex: 1,
    marginRight: wp("2%"),
    height: hp("5%"),
    borderWidth: 0,
    borderBottomWidth: 1, // Add bottom border
    borderColor: "gray", // Border color
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1, // Add bottom border to the container
    borderColor: "gray", // Border color
    marginVertical: hp("1%"),
  },
  inputContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1, // Add bottom border to the container
    borderColor: "gray", // Border color
    marginVertical: hp("0%"),
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
    borderBottomWidth: 1,
    borderColor: "gray",
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
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
