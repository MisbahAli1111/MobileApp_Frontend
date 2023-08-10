import React from "react";
import { Image } from "expo-image";
import {Modal,ScrollView, TouchableOpacity, StyleSheet, View, Text, Pressable, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import ImagePickerCamera from "../components/ImagePickerCamera";
import ImagePickerGallery from "../components/ImagePickerGallery";
import Footer from "../components/Footer";
import Carousel,{Pagination} from "react-native-snap-carousel";
import {Video} from "expo-av";
import EvilIcons from "@expo/vector-icons/EvilIcons";



const AddRecord = () => {
  const navigation = useNavigation();

const [Msg,setMsg]=useState('');
  const [NumberError, setNumberError] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [driven, setDriven] = useState('');
  const [user, setUser] = useState('');
  const [service, setService] = useState('');

  const [details, setDetails] = useState(false);
  const [NameError, setNameError] = useState(false);
  const [DateError, setDateError] = useState(false);
  const [TimeError, setTimeError] = useState(false);
  const [drivenError, setDrivenError] = useState(false);
  const [DetailError, setDetailError] = useState('');
  const [serviceError, setServiceError] = useState('');





  const [detailFocused, setDetailFocused] = useState(false);
  const [carNumberFocused, setCarNumberFocused] = useState(false);
  const [DateFocused, setDateFocused] = useState(false);
  const [drivenFocused, setDrivenFocused] = useState(false);
  const [UserFocused, setUserFocused] = useState(false);
  const [TimeFocused, setTimeFocused] = useState(false);
  const [ServiceFocused, setServiceFocused] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');
  const services = ['Oil and Coolant Level', 'Air Filter', 'Tire Pressure', 'Lights', 'Oil and Filter Change', 'Rotate tires', 'Wax Vechile', 'Transmission Fluid', 'Spark Plugs', 'Serpentine Belt', 'Winshield Wipers', 'Battery Checkup'];
  const [showCameraImagePicker, setShowCameraImagePicker] = useState(false);
  const [showGalleryImagePicker, setShowGalleryImagePicker] = useState(false);
 const [selectedImage,setSelectedImage] = useState([]);
 const [activeSlide, setActiveSlide] = useState(0);

 const [modalVisible, setModalVisible] = useState(false);
  const [originalUri, setOriginalUri] = useState('');
  const [status, setStatus] = useState({});
  const video = React.useRef(null);


  
   const renderCarouselItem = ({ item, index }) => (
    <View key={index} style={styles.carouselItem}>
      {item.type === "image" ? (
        <Pressable style={styles.mediaContainer}
        onPress={() => handleOpen(item.uri)}>
        <Image source={{ uri: item.uri }} style={styles.image} />
        </Pressable>
      ) : (
        <View style={styles.videoContainer1}>
        <Pressable style={styles.mediaContainer}
        onPress={() => handleOpen(item.uri)}>
        <Video
          source={{ uri: item.uri }}
          style={styles.video}
          controls
        />
       <View style={styles.iconContainer}>
            <EvilIcons name="play" size={50} color="white" />
          </View>
        </Pressable>
        </View>
      )}
      <TouchableOpacity onPress={() => handleImageDelete(index)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const handlePlayButton = async () => {
    if (video.current) {
      await video.current.playAsync();
    }
  };
  
  const handleOpen = (uri) => {
    setOriginalUri(uri);
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    setOriginalUri('');
  };

 
    const handleCameraIconClick = () => {
      setShowCameraImagePicker(true);
    };
  
    const handleGalleryIconClick = () => {
      setShowGalleryImagePicker(true);
    };
  
    const handleCameraImageSelected = (uri,type) => {
      
      setSelectedImage([...selectedImage, { uri, type }]);
      setShowGalleryImagePicker(false);
    };
  
    const handleGalleryImageSelected = (uri,type) => {
      
      setSelectedImage([...selectedImage, { uri, type }]);
      setShowGalleryImagePicker(false);
    };
  
    const handleImageDelete = (index) => {
      const newSelectedImage = [...selectedImage];
      newSelectedImage.splice(index, 1);
      setSelectedImage(newSelectedImage);
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






  const handleSave = () => {
    let hasErrors = false; // Initialize the flag
  
    if (!carNumber) {
      setNumberError(true);
      hasErrors = true;
    } else {
      setNumberError(false);
    }
  
    if (!date) {
      setDateError(true);
      setMsg('Please provide Date');
      hasErrors = true;
    } else {
      if (!time) {
        setDateError(true);
        setMsg('Please provide Time');
        hasErrors = true;
      }
      setDateError(false);
    }
  
    if (!user) {
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
  
    if (!selectedCode) {
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
  
   
    if (!hasErrors) {
      navigation.navigate('MaintenanceRecord');
    }
  };
  



  return (
    <View style={styles.addRecord}>

      <Image
        style={[styles.lightTexture22341Icon, styles.iconGroupLayout]}
        contentFit="cover"
        source={require("../assets/light-texture2234-1.png")}
      />


      <View style={styles.breadcrumbs}>
        <View style={[styles.housefill, styles.housefillFlexBox]}>
          <Image
            style={styles.homeMutedIcon}
            contentFit="cover"
            source={require("../assets/homemuted.png")}
          />
        </View>
        <View style={styles.elementPosition} />
        <View style={styles.elementPosition}>
          <Text style={styles.textTypo}>\</Text>
        </View>

      </View>
      <Image
        style={[styles.addRecordChild, styles.text1Position]}
        contentFit="cover"
        source={require("../assets/rectangle-65.png")}
      />


      <ScrollView  style={styles.wrap}>
      <TextInput style={[styles.jxc7789, styles.pmTypof]}
        placeholder="JXC - 7789"
        value={carNumber}
        onFocus={() => setCarNumberFocused(true)}
        onBlur={() => setCarNumberFocused(false)}
        onChangeText={setCarNumber}
      >
      </TextInput>
      <Image
        style={styles.licensePlateNumberSvgrepoCIcon}
        contentFit="cover"
        source={require("../assets/licenseplatenumbersvgrepocom-1.png")}
      />
      <View style={[styles.addRecordChild3,
          NumberError ? styles.childLayoutR :styles.childLayout
         ]} />
      {NumberError ? <Text style={styles.nameError}>Please provide valid car Number</Text> : null}


      <TextInput style={[styles.text2, styles.pmTypo]}
        value={selectedDate ? selectedDate.toDateString() : ''}
        placeholder="Select a date"
        editable={false}
      ></TextInput>
      <Pressable
        onPress={openDatePicker}
      >
        <Image
          style={[styles.date2SvgrepoCom11, styles.svgrepoIconLayout1]}
          contentFit="cover"
          source={require("../assets/date2svgrepocom-1-1.png")}
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
      <View style={[styles.addRecordItem, styles.addPosition]} />


      <TextInput style={[styles.pm, styles.pmTypo]}
        placeholder="06: 00pm"
        value={selectedTime ? selectedTime.toLocaleTimeString() : ''}
        editable={false}
      ></TextInput>
      <Pressable
        onPress={openTimePicker}>
        <Image
          style={[styles.timeOclockSvgrepoCom1Icon, styles.svgrepoIconLayout1]}
          contentFit="cover"
          source={require("../assets/timeoclocksvgrepocom-1.png")}
        />
      </Pressable>
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <View style={[styles.addRecordInner, styles.addPosition]} />
      {DateError ? <Text style={styles.nameError}>{Msg}</Text> : null}


      <TextInput style={[styles.loritaDaniel, styles.pmTypo]}
        placeholder="Lorita Daniel"
        value={user}
        onFocus={() => setUserFocused(true)}
        onBlur={() => setUserFocused(false)}
        onChangeText={setUser}
      ></TextInput>
    <Image
        style={[styles.vectorIcon1, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vector1.png")}
      />
      <View style={[styles.groupChild,
          NameError ? styles.childLayoutR :styles.childLayout
         ]} />
      {NameError ? <Text style={styles.nameError}>Please provide User Name</Text> : null}


      <TextInput style={[styles.kmDriven, styles.pmTypo]}
        placeholder="KM Driven"
        keyboardType="numeric"
        value={driven}
        onFocus={() => setDrivenFocused(true)}
        onBlur={() => setDrivenFocused(false)}
        onChangeText={setDriven}
      ></TextInput>
      <Image
        style={[styles.groupIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/group-92.png")}
      />
<View style={[styles.lineView,
   drivenError ? styles.childLayoutR :styles.childLayout
   ]} />
{drivenError ? <Text style={styles.nameError}>Please provide Mileage</Text> : null}



      <TextInput style={[styles.oilChange, styles.pmTypo]}
        placeholder="Oil Change"
        value={selectedCode}
        editable={false}
      ></TextInput>
      <Image
        style={[styles.vectorIcon3, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vector3.png")}
      />
       {(
        <View style={styles.servicesClick} >
          <Picker
            selectedValue={selectedCode}
            onValueChange={(itemValue) => handleCodeSelect(itemValue)}
          >
            <Picker.Item label="Select Maintenance Type " value="" />
            {services.map((code) => (
              <Picker.Item key={code} label={code} value={code} />
            ))}
          </Picker>
        </View>
      )}
       <View style={[styles.addRecordChild2,
          serviceError ? styles.childLayoutR :styles.childLayout
         ]} />
       {serviceError ? <Text style={styles.nameError}>Please provide service</Text> : null}

      
      
      
     

      {/* this  */}

      <View style={styles.enterDetailParent}>
        <TextInput style={[styles.enterDetail, styles.pmTypo]}
          placeholder="Enter Detail..."
          value={details}
          onFocus={() => setDetailFocused(true)}
          onBlur={() => setDetailFocused(false)}
          onChangeText={setDetails}
        ></TextInput>
        <View style={[position = "absolute"]}>
          {/* gallery image start  */}
          <Pressable onPress={handleGalleryIconClick} >
            <Image
              style={[styles.gallerySvgrepoCom1Icon, styles.svgrepoIconLayout1]}
              contentFit="cover"
              source={require("../assets/gallerysvgrepocom-1.png")}
            />
          </Pressable>

          {/* gallery image end  */}

          {/* camera image start */}
          <Pressable onPress={handleCameraIconClick}
          >
            <Image
              style={[styles.cameraSvgrepoCom61, 
                styles.svgrepoIconLayout1
              ]}
              contentFit="cover"
              source={require("../assets/camerasvgrepocom-6-1.png")}
            />
          </Pressable>

          {/* camera image end  */}
        </View>
        <View style={[styles.addRecordChild22,
          DetailError ? styles.childLayoutR :styles.childLayout
           ]} />
        {DetailError ? <Text style={styles.nameError}>Please provide Details</Text> : null}


        {showCameraImagePicker && (
          <ImagePickerCamera onImageSelected={(uri, type) => handleCameraImageSelected(uri, type)} />
        )}
        {showGalleryImagePicker && (
          <ImagePickerGallery onImageSelected={(uri, type) => handleGalleryImageSelected(uri, type)} />
        )}
        
       
     
      </View>

      
      
    {selectedImage.length > 0 && (
      <View style={styles.imageContainer}>
        <Carousel
          data={selectedImage}
          renderItem={renderCarouselItem}
          sliderWidth={350}
          itemWidth={400}
          onSnapToItem={(index) => setActiveSlide(index)}
          sliderHeight={100}
        />
    <Pagination
          dotsLength={selectedImage.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotColor="#007aff"
          dotStyle={styles.paginationDot}
          inactiveDotColor="#ccc"
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        
      </View>
    )} 
     
      </ScrollView>
     

      

      

    
      
      <View style={[styles.vectorParent, styles.groupItemLayout]}>
      <Pressable onPress={handleSave}>
          <Image
            style={[styles.groupItem, styles.groupItemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-73.png")}
          />
          <Text style={styles.save}>Save</Text>
          </Pressable>
        </View>
      
      

      












    

      <View style={[styles.cont]}>
        <Footer prop={"MaintenanceRecord"} />
      </View>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {originalUri.endsWith('.mp4') ? (
            <View style={styles.videoContainer}>
            <Video
            ref={video}
            source={{ uri: originalUri }}
            style={styles.modalMedia}
            useNativeControls
            contentFit="contain"
            isLooping
            onPlaybackStatusUpdate={setStatus}
            />
            <View style={styles.iconContainer1}>
            {!status.isPlaying && ( 
              <TouchableOpacity onPress={handlePlayButton} style={styles.playButton}>
            <EvilIcons name="play" size={50} color="white" />
            </TouchableOpacity>
            )}
          </View>
          </View>
          ) : (
            <Image source={{ uri: originalUri }} style={styles.modalMedia} contentFit="contain" />
          )}
          <TouchableOpacity onPress={handleClose} style={styles.deleteButton1}>
            <Text style={styles.deleteButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>




      {/* addMaintenanceRecord */}
      <View style={[styles.vectorGroup, styles.iconGroupLayout]}>


        <View style={styles.groupChild1} />

        <View style={styles.addMaintenanceRecordGroupp}>
          <Text style={styles.addTypo}>
            Add Maintenance Record
          </Text>
        </View>

      </View>



      
     


    </View>

  );
};

const styles = StyleSheet.create({
  pgContainer:{
    top:200,
  },
  videoContainer1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    
    
  },
  iconContainer1:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  iconContainer: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Adjust the values based on the icon size
  },
  modalContainer: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center"
  },
  modalMedia: {
    width: '100%',
    height: '100%',
    
  },
  modalImage: {
    width: "100%",
    height:"100%",
  },
  modalVideo: {
    width: '100%',
    height:"100%"
    
  },
  mediaContainer: {
    width: 350,
    height: 160,
    position: 'relative',
    alignItems:"center",
    justifyContent:"center"
  },

  media: {
    width: '100%',
    height: '100%',
  },

  playIcon: {
    position: 'absolute',
    width: 50, // Adjust the size of the play icon as needed
    height: 50, // Adjust the size of the play icon as needed
    alignSelf: 'center',
    tintColor: 'white', // Customize the play icon color
  },
  deleteButton1: {
    position: "relative",
    top: -30,
    left:0,
    backgroundColor: "#ff0000", // Customize the background color as needed
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
video: {
    width: "100%",
    height:"100%",
    left:80
  },

  imageUpload:{
    position:"absolute",

  },
  
  imageContainer: {
    alignItems: 'center',
    marginTop: 40,
    position: 'relative',
    width: "100%",
    height: "60%",
    justifyContent: 'center',
    
  },
  image: {
    width: "100%",
    height: "100%",
    contentFit: 'cover',
  },
  carouselItem: {
    width: 350,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    top:-130,
    position:"relative"
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  imageUpload:{
    position:"absolute",

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height:"100%",
    width:"100%",
  },
  deleteButton: {
    position: "absolute",
    top: 190,
    left:130,
    backgroundColor: "#ff0000", // Customize the background color as needed
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconGroupLayout: {
    width: 430,
    left: 0,
  },
  nameError: {
    marginTop: 12,
    marginLeft: 28,
    color: 'red',
  },
  nameErrorL: {
    marginTop: 12,
    marginLeft: 28,
   position:'relative',
    color: 'red',
  },
  text1Position: {
    display: "none",
    position: "absolute",
  },
  housefillFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    color: Color.textTxtPrimary,
    fontFamily: FontFamily.caption2Regular,
    fontWeight: "500",
    lineHeight: 17,
    fontSize: FontSize.caption2Regular_size,
  },
  pmTypof: {
    marginLeft: 8,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    textAlign: "left",
    position: "relative",
    width: 200,
    marginTop: 10,
  },
  pmTypo: {
    marginLeft: 8,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_base,
    color: Color.darkslateblue,
    textAlign: "left",
    position: "relative",
    width: 200,
    
  },
  addPosition: {
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    top: 0,
marginTop:5,
    position: "relative",
  },



  childLayout: {
    width: 375,
    height: 2,
    borderTopWidth: 2,
    borderColor: "#cbcbcb",
    borderStyle: "solid",
    position: "relative",
  },
  childLayoutR: {
    width: 375,
    height: 2,
    borderTopWidth: 2,
    borderColor: 'red',
    borderStyle: "solid",
    position: "relative",
  },
  // here 
  iconLayout: {
    maxHeight: "150%",
    maxWidth: "100%",
    position: "relative",
    overflow: "hidden",

  },
  iconLayout1: {
    maxHeight: "150%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",

  },
  servicesClick: {
    top: 0,
    width: 80,
    left: 323,
    marginTop:-38,
    marginBottom:6,

  },
  cont: {
    position:'absolute',
  },
  
  svgrepoIconLayout1: {
    height: 25,
    width: 25,
    position: "relative",
    overflow: "hidden",
  },

  wrap:{
    // backgroundColor:'red',
    marginVertical:225,
    marginTop:170,
    flex:1,
    overflow:'hidden',
  },
  groupItemLayout: {
    height: 45,
    width: 381,
    position: "relative",
  },
  groupItem2Layout: {
    height: 45,
    width: 381,
    position: "absolute",
  },
  addRecordChild4Layout: {
    height: 43,
    position: "absolute",
  },
  addTypo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    color: Color.darkslateblue,
    fontWeight: "500",
    position: "absolute",
  },
  frameLayout: {
    width: 45,
    top: 797,
    height: 45,
    position: "absolute",

  },
  frameLayoutt: {
    width: 45,
    top: 747,
    height: 45,
    position: "absolute",

  },
  wrapperPosition: {
    left: 98,
    width: 45,
    top: 798,
    height: 45,
    position: "absolute",
  },
  svgrepoIconLayout: {

    height: 26,
    width: 26,
    position: "absolute",
    overflow: "hidden",
  },
  groupPressableLayout: {
    height: 104,
    width: 104,
    top: 732,
    position: "absolute",
  },
  groupPressableLayoutt: {
    height: 104,
    width: 104,
    top: 679,
    position: "absolute",
  },
  lightTexture22341Icon: {
    top: 0,
    position: "absolute",
    height: 932,
  },
  image2Icon: {
    top: 803,
    height: 129,
    width: 430,
    left: 0,
  },
  homeMutedIcon: {
    width: 12,
    height: 14,
  },
  housefill: {
    width: 14,
    height: 20,
    left: -2,
    top: 0,
  },
  elementPosition: {
    left: 18,
    justifyContent: "center",
    height: 20,
    top: 0,
    position: "absolute",
  },
  addMaintenanceRecord: {
    top: 9,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.darkslateblue,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  text1: {
    left: 88,
    display: "none",
    position: "absolute",
    top: 0,
  },
  addMaintenanceRecordParent: {
    left: 40,
    width: 93,
    height: 17,
    top: -25,
    position: "absolute",
  },
  breadcrumbs: {
    top: 130,
    width: 120,
    height: 20,
    left: 19,
    position: "absolute",
  },
  addRecordChild: {
    top: 381,
    height: 216,
    width: 430,
    left: 0,
  },
  text2: {
    left: 24,
    top: 0,
    marginTop: 25,
    fontFamily: FontFamily.poppinsRegular,
  },
  addRecordItem: {
    width: 175,
    left: 28,

  },
  addRecordInner: {
    left: 220,
    width: 182,
    marginTop:25,
  },
  pm: {
    left: 221,
    top: 0,
    marginTop: -35,
    fontFamily: FontFamily.poppinsRegular,
  },
  loritaDaniel: {
    top: 0,
    marginTop:25,
    marginBottom:6,
    left: 24,
  },
  kmDriven: {
    top: 0,
    left: 24,
    marginTop:25,
    marginBottom:5,
  },
  oilChange: {
    top: 0,
    left: 24,
    marginTop:25,
  },
  lineView: {
    top: 0,
    left: 23,
    marginTop:10,
  },
  addRecordChild1: {
    top: 0,
    left: 23,
    
  },
  addRecordChild22: {
    top: 0,
    left: 0,
    marginTop:6,
    marginBottom:10,
  },
  addRecordChild2: {
    top: 0,
    left: 23,
    marginTop:-10,
  },
  addRecordChild3: {
    top: 0,
    left: 23,
  },
  jxc7789: {

    left: 24,
  },
  vectorIcon: {
    right: "7.09%",
    left: "87.09%",
    bottom: "66.63%",
    top: "30.69%",
    width: "5.81%",
    height: "2.68%",
    maxWidth: "100%",
  },
  // this 
  vectorIcon1: {
    right: "6.98%",
    left: "89.20%",
    bottom: "66.63%",
    top: 0,
    marginTop:-35,
    marginBottom:5,
    width: 25,
    height: 25,
    maxWidth: "100%",
    position: "relative",
  },
  groupIcon: {
    height: 25,
    width: 25,
    top: 0,
    marginTop:-35,
    right: "6.95%",
    bottom: "60.6%",
    left: "88.99%",
    marginBottom:6,
  },
  date2SvgrepoCom11: {
    marginLeft: 178,
    top: 0,
    marginTop: -30,
    height: 25,
  },
  licensePlateNumberSvgrepoCIcon: {
    top: 0,
    marginTop: -40,
    marginLeft: 350,
    width: 40,
    height: 40,
    position: "relative",
    overflow: "hidden",
  },
  enterDetail: {
    left: 0,
    top: 0,
  },
  groupChild: {
    top: 0,
    left: 18,
    marginTop:10,
  },
  gallerySvgrepoCom1Icon: {
    left: 345,
    top: 0,
    marginTop:-30,
    position: "relative"
  },
  cameraSvgrepoCom61: {
    left: 310,
    top: 0,
    marginTop:-30,
    position: "relative"
  },
  enterDetailParent: {
    top: 0,
    width: 382,
    height: 35,
    left: 24,
    marginTop:25,
    position: "relative",
  },
  timeOclockSvgrepoCom1Icon: {
    left: 365,
    top: 0,
    height: 25,
    marginTop:-30,
  },
  groupItem: {
    borderRadius: Border.br_7xs,
    left: 0,
    top: 0,
  },
  save: {
    top: 0,
    left: 171,
    
    color: Color.snow,
    marginTop:-35,
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSize.size_base,
    textAlign: "left",
    fontWeight: "500",
    position: "relative",
  },
  vectorParent: {
    top: -190,
    left: 18,
  },
  addRecordChild4: {
    top: 3,
    left: 29,
    width: 372,
  },
  rectangleView: {
    top: 785,
    backgroundColor: Color.steelblue_300,
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    height: 102,
    position: "absolute",
  },
  addRecordChild5: {
    top: 917,
    left: 139,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.darkslateblue,
    width: 154,
    height: 6,
    position: "absolute",
  },
  home: {
    left: 22,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
    top: 845,
  },
  vehicles: {
    left: 92,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
    top: 845,
  },
  addVehicle: {
    top: 825,
    left: 172,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
  },
  records: {
    left: 271,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
    top: 845,
  },
  invoices: {
    left: 350,
    lineHeight: 18,
    textAlign: "center",
    fontSize: FontSize.size_sm,
    top: 845,
  },
  // dashboard and down
  ellipseIcon: {
    left: 20,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  homeMutedIcon1: {
    height: 27,
    width: 25,
  },
  // dashboard
  housefill1: {
    top: 755,
    left: 30,
  },
  // invoicecss
 
  carCitroenTopVehicleSvgrepIcon: {
    overflow: "hidden",
  },
  frame: {
    left: 358,
  },
  //invoiceicon
  invoiceWarrantyLineSvgrepoIcon: {
    top: 9,
    left: 11,
  },
  // wheelcss
  groupPressable: {
    left: 163,
  },
  addRecordChild6: {

    left: 164,
  },
  groupInner: {
    top: -6,
    height: 80,
    position: "absolute",
  },
  groupChild1: {
    top: 13,
    left: 43,
    width: 340,
    height: 50,
    position: "absolute",
  },
  addMaintenanceRecord1: {
    top: -5,
    left: "30.03%",
    textAlign: "center",
    fontSize: FontSize.size_base,
  },
  // here 
  vectorIcon2: {
    height: "30.85%",
    width: "4.70%",
    top: 17,
    right: "42.53%",
    bottom: "2.82%",
    left: "4%",
  },
  addMaintenanceRecordGroupp: {
    height: "38.1%",
    width: "68.14%",
    top: "132.16%",
    right: "26.74%",
    bottom: "31.75%",
    left: "12.12%",
    position: "absolute",
  },
  addMaintenanceRecordGroup: {
    height: "38.1%",
    width: "68.14%",
    top: "30.16%",
    right: "26.74%",
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
    position: "absolute",
  },
  maskGroupIcon: {
    top: 58,
    left: 372,
    width: 31,
    height: 31,
    position: "absolute",
  },
  microphoneSvgrepoCom1Icon: {
    left: 12,
    top: 8,
  },
  vectorIcon3: {
    height: "4.00%",
    width: "4.00%",
    top: 0,
    marginTop:-20,
    marginBottom:5,
    right: "7.67%",
    bottom: "55.39%",
    left: "89.80%",
  },
  addRecord: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    height: 932,
    width: "100%",
    position: "absolute"
  },
});

export default AddRecord;