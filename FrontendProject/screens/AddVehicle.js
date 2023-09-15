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
        setRegistrationError(true);
        isValid = false;
      } else {
        setRegistrationError(false);
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
      style={styles.container}
      resizeMode="cover"
      source={require("../assets/light-texture2234-1.png")}
    >
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

            {/* Content */}
            <View style={styles.imageModalContent}>
              {/* Image Source Options */}
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
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>{/* <Footer prop={"Vehicles"} /> */}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 0.8, // Take 80% of the available height
    backgroundColor: "white", // Customize your ScrollView background color
    paddingHorizontal: wp("5%"), // Responsive padding
    paddingTop: hp("2%"), // Responsive padding
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
    height: hp("5%"), // Responsive button height
    backgroundColor: "rgba(3, 29, 68, 1)", // Customize your button style
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white", // Customize your button text style
    fontSize: wp("4%"), // Responsive font size
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
  footer: {
    height: hp("5%"), // Responsive footer height
    backgroundColor: "gray", // Customize your footer style
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "white", // Customize your footer text style
    fontSize: wp("3%"), // Responsive font size
  },
});

export default AddVehicle;
