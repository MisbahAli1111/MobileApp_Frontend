import * as React from "react";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import Footer from "../components/Footer";
import VehicleDetails from "../components/VehicleDetail";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { AntDesign } from "@expo/vector-icons";
import Config from "./Config";
const VehicleDetailView = ({ route }) => {
  const [isImageModalVisible, setImageModalVisible] = useState("false");
  const [isFullImageModalVisible, setFullImageModalVisible] = useState(false);
  const [fetchedImages, setFetchedImages] = React.useState([]);
  const navigation = useNavigation();
  const [originalUri, setOriginalUri] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const isVideo = originalUri && originalUri.endsWith(".mp4");
  // const route = useRoute();
  const vehicleId = route.params.vehicleId;
  const [registrationNumber, setRegistrationNumber] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true); // Set loading to true while fetching
        let token = await AsyncStorage.getItem("accessToken");
        const accessToken = "Bearer " + token;

        if (vehicleId) {
          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${Config.apiServerUrl}/api/vehicle/${vehicleId}/images`,
            headers: {
              Authorization: accessToken,
            },
          };

          const response = await axios.request(config);
          const imageUrls = response.data.map(
            (item) => `${Config.baseUrl1}` + item.url
          );
          setFetchedImages(imageUrls);
          console.log(fetchedImages)
          setLoading(false); // Set loading to false when images are fetched
        }
      } catch (error) {
        console.log(error);
        setLoading(false); // Make sure to set loading to false in case of an error
      }

      if (vehicleId) {
        let token = await AsyncStorage.getItem("accessToken");
        const accessToken = "Bearer " + token;
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${Config.apiServerUrl}/api/vehicle/${vehicleId}`,
          headers: {
            Authorization: accessToken,
          },
        };

        axios
          .request(config)
          .then((response) => {
            setRegistrationNumber(response.data.registrationNumber);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    fetchImages();
  }, [vehicleId]);

  const renderCarouselItem = ({ item }) => {
    // Check if the item is a video (assuming item has a property 'isVideo')
    const fileExtension = item.split(".").pop().toLowerCase();
    return (
      <View style={styles.carouselItem}>
        <View style={styles.mediaContainer}>
          {fileExtension === "jpeg" ? (
            <TouchableOpacity onPress={() => handleShowImage(item)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item }} style={styles.fullVideo} />
              </View>
            </TouchableOpacity>
          ) : fileExtension === "mp4" ? (
            <TouchableOpacity onPress={() => handleShowImage(item)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item }} style={styles.fullVideo} />
              </View>

              <View style={styles.playIconContainer}>
                <AntDesign name="playcircleo" size={wp("10%")} color="white" />
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  const handleShowImage = (uri) => {
    if (uri) {
      setOriginalUri(uri);
      setFullImageModalVisible(true);
    }
  };

  return (
    <View style={styles.maintenanceDetailView}>
    <ImageBackground
      source={require("../assets/light-texture2234-1.png")}
      style={styles.container}>
      {/* home  */}

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
          <Text style={styles.breadcrumbText1}>Vehicles</Text>
        </TouchableOpacity>
        <Text style={styles.breadcrumbSeparator}> / </Text>
        <Text style={styles.breadcrumbText}>{registrationNumber}</Text>
      </View>

      {/* Images */}
      <ScrollView>
      <View style={styles.profileImageContainer}>
      <View style={styles.imageUploadContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#007aff" />
      ) : (
        fetchedImages && fetchedImages.length > 0 ? (
          <View style={styles.profileImagePlaceholder}>
            <Carousel
              data={fetchedImages}
              renderItem={renderCarouselItem}
              sliderWidth={wp("100%")}
              itemWidth={wp("100%")}
              onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Pagination
              dotsLength={fetchedImages.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotStyle={styles.paginationDot}
              inactiveDotStyle={styles.paginationInactiveDot}
              inactiveDotOpacity={0.6}
              inactiveDotScale={0.8}
            />
          </View>
        ) : (
          <View style={styles.profileImagePlaceholder1} >
          <Text style={styles.noImage}>No Images/Videos Were Uploaded</Text>
          </View>
        )
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
            {originalUri ? (
              isVideo ? (
                <Video
                  source={{ uri: originalUri }}
                  style={styles.fullVideo}
                  resizeMode="contain"
                  shouldPlay
                  isLooping
                  useNativeControls
                />
              ) : (
                <Image
                  source={{ uri: originalUri }}
                  style={styles.fullImage}
                  resizeMode="contain"
                />
              )
            ) : null}

            <TouchableOpacity
              style={
                isVideo ? styles.videoCloseButton : styles.imageCloseButton
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

      <VehicleDetails prop={vehicleId} />
      </ScrollView>
      <View style={styles.footer}>
        <Footer prop={"Vehicles"} />
      </View>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    position: "absolute",
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
    fontSize: wp("3.5%"), // Adjust font size using wp
    color: "rgba(3, 29, 68, 1)",
    fontFamily: FontFamily.poppinsMedium,
    marginTop: hp("0.7%"), // Breadcrumb text color
  },
  breadcrumbText1: {
    fontSize: wp("3.5%"), // Adjust font size using wp
    color: Color.steelblue_100,
    fontFamily: FontFamily.poppinsMedium,
    marginTop: hp("0.7%"), // Breadcrumb text color
  },

  breadcrumbSeparator: {
    fontSize: wp("4%"), // Adjust font size using wp
    color: "rgba(3, 29, 68, 1)", // Separator text color
    // paddingHorizontal: wp("1%"), // Add horizontal padding using wp to separate items
  },

  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2%"),
    // Add paddingBottom to accommodate the "Km Driven" input
  },

  // ...
profileImageContainer: {
  width: "100%", // Use "100%" to ensure it stays within the parent container
  justifyContent: "center",
  alignItems: "center",
  marginTop: hp("3%"),
},
profileImagePlaceholder: {
  // maxWidth: "90%", // Limit the maximum width to avoid going out of bounds
  width: "100%", // Use "100%" to maintain responsiveness
  height: "auto", 
  // Automatically adjust the height to maintain aspect rati
},
profileImagePlaceholder1: {
  maxWidth: "90%", // Limit the maximum width to avoid going out of bounds
  width: "100%", // Use "100%" to maintain responsiveness
  height: "auto", // Automatically adjust the height to maintain aspect ratio
},
// ...

  // profileImageContainer: {
  //   width: wp("100%"),
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: hp("3%"),
  //   backgroundColor:"red",
    
    
  // },
  profileImage: {
    width: wp("30%"),
    height: wp("30%"),
  },
  // profileImagePlaceholder: {
  //   width: wp("90%"),
  //   height: wp("70%"),
  //   backgroundColor:"blue",
  //   marginHorizontal:wp("2%"),
    
  // },
  // profileImagePlaceholder1: {
  //   width: wp("90%"),
  //   height: wp("30%"),
    
  // },
  noImage:{
    textAlign:"center",
    fontSize:hp("2%"),
    fontFamily:FontFamily.poppinsMedium,
    fontWeight:"400",
    marginBottom:hp("10%")
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
    width: "100%", // Match the width of profileImagePlaceholder
    height: wp("60%"),
    paddingHorizontal:wp("2%") // Match the height of profileImagePlaceholder
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
    position: "absolute",
  },
  maintenanceDetailView: {
    flex: 1,
    overflow: "hidden",
    height:"100%",
    width: "100%",
  },
  container:{
    flex:1,
    paddingHorizontal:"2%"
  },
  
});

export default VehicleDetailView;
